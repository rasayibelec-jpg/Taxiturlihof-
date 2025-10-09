"""
Payment Service - TWINT, Stripe, PayPal Integration
"""
import os
import uuid
from datetime import datetime, timezone
import pytz
from pathlib import Path
from dotenv import load_dotenv
from fastapi import HTTPException, Request
from pydantic import BaseModel, Field, EmailStr
from typing import Dict, List, Optional, Any
from motor.motor_asyncio import AsyncIOMotorClient
import logging

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Set up logging
logger = logging.getLogger(__name__)

# MongoDB connection (reuse from main app)
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Payment Models
class PaymentMethod(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    enabled: bool = True
    currency: str = "CHF"

class PaymentTransactionCreate(BaseModel):
    booking_id: str
    customer_email: EmailStr
    amount: float
    currency: str = "CHF"
    payment_method: str  # 'twint', 'stripe', 'paypal'
    metadata: Optional[Dict[str, Any]] = None

class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    booking_id: str
    customer_email: EmailStr
    amount: float
    currency: str = "CHF"
    payment_method: str
    payment_status: str = "pending"  # pending, authorized, processing, completed, failed, cancelled, refunded
    session_id: Optional[str] = None
    payment_intent_id: Optional[str] = None
    authorization_id: Optional[str] = None  # For authorized but not captured payments
    capture_method: str = "manual"  # manual or automatic
    metadata: Optional[Dict[str, Any]] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(pytz.timezone('Europe/Zurich')))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PaymentStatusResponse(BaseModel):
    transaction_id: str
    payment_status: str
    payment_method: str
    amount: float
    currency: str
    session_id: Optional[str] = None
    booking_id: str

class PaymentInitiateResponse(BaseModel):
    success: bool
    transaction_id: str
    payment_url: Optional[str] = None
    session_id: Optional[str] = None
    qr_code_url: Optional[str] = None
    message: str

# Available payment methods
PAYMENT_METHODS = [
    PaymentMethod(
        id="twint",
        name="TWINT",
        description="Schnell und sicher mit der TWINT App bezahlen",
        icon="🇨🇭",
        currency="CHF"
    ),
    PaymentMethod(
        id="stripe",
        name="Kreditkarte",
        description="Visa, Mastercard, American Express",
        icon="💳",
        currency="CHF"
    ),
    PaymentMethod(
        id="paypal",
        name="PayPal",
        description="Bezahlen Sie sicher mit PayPal",
        icon="🏦",
        currency="CHF"
    )
]

class PaymentService:
    def __init__(self):
        self.stripe_api_key = os.getenv('STRIPE_SECRET_KEY') or os.getenv('STRIPE_API_KEY')
        if not self.stripe_api_key:
            logger.warning("STRIPE_SECRET_KEY not found in environment variables")
    
    async def get_available_payment_methods(self) -> List[PaymentMethod]:
        """Get list of available payment methods"""
        return PAYMENT_METHODS
    
    async def create_payment_transaction(self, payment_data: PaymentTransactionCreate) -> PaymentTransaction:
        """Create a new payment transaction record"""
        transaction = PaymentTransaction(
            booking_id=payment_data.booking_id,
            customer_email=payment_data.customer_email,
            amount=payment_data.amount,
            currency=payment_data.currency,
            payment_method=payment_data.payment_method,
            metadata=payment_data.metadata or {}
        )
        
        # Save to database
        transaction_dict = transaction.dict()
        await db.payment_transactions.insert_one(transaction_dict)
        
        logger.info(f"Payment transaction created: {transaction.id} for booking {transaction.booking_id}")
        return transaction
    
    async def get_payment_transaction(self, transaction_id: str) -> Optional[PaymentTransaction]:
        """Get payment transaction by ID"""
        transaction_data = await db.payment_transactions.find_one({"id": transaction_id})
        if transaction_data:
            return PaymentTransaction(**transaction_data)
        return None
    
    async def update_payment_status(self, transaction_id: str, status: str, session_id: Optional[str] = None) -> bool:
        """Update payment transaction status"""
        update_data = {
            "payment_status": status,
            "updated_at": datetime.now(timezone.utc)
        }
        
        if session_id:
            update_data["session_id"] = session_id
        
        result = await db.payment_transactions.update_one(
            {"id": transaction_id},
            {"$set": update_data}
        )
        
        if result.modified_count > 0:
            logger.info(f"Payment transaction {transaction_id} status updated to {status}")
            return True
        return False
    
    async def initiate_stripe_payment(self, transaction: PaymentTransaction, request: Request) -> PaymentInitiateResponse:
        """Initiate Stripe checkout session with manual capture (authorization only)"""
        try:
            from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionRequest
            
            if not self.stripe_api_key:
                raise HTTPException(status_code=500, detail="Stripe API key not configured")
            
            # Get host URL from request
            host_url = str(request.base_url)
            webhook_url = f"{host_url}api/webhooks/stripe"
            
            # Initialize Stripe checkout
            stripe_checkout = StripeCheckout(api_key=self.stripe_api_key, webhook_url=webhook_url)
            
            # Create success and cancel URLs
            frontend_url = host_url.replace(':8001', ':3000').replace('/api/', '')  # Adjust for frontend
            success_url = f"{frontend_url}booking/payment-success?session_id={{CHECKOUT_SESSION_ID}}&booking_id={transaction.booking_id}"
            cancel_url = f"{frontend_url}booking/payment-cancelled?booking_id={transaction.booking_id}"
            
            # Prepare metadata
            metadata = {
                "booking_id": transaction.booking_id,
                "transaction_id": transaction.id,
                "customer_email": transaction.customer_email,
                "payment_method": transaction.payment_method,
                "capture_method": "manual"
            }
            
            # Create checkout session request with manual capture
            checkout_request = CheckoutSessionRequest(
                amount=transaction.amount,
                currency=transaction.currency.lower(),
                success_url=success_url,
                cancel_url=cancel_url,
                metadata=metadata,
                payment_intent_data={
                    "capture_method": "manual"  # This authorizes but doesn't charge
                }
            )
            
            # Create Stripe checkout session
            session = await stripe_checkout.create_checkout_session(checkout_request)
            
            # Update transaction with session ID and set status to processing
            await self.update_payment_status(transaction.id, "processing", session.session_id)
            
            message = "Kreditkarte" if transaction.payment_method == "stripe" else "TWINT"
            
            return PaymentInitiateResponse(
                success=True,
                transaction_id=transaction.id,
                payment_url=session.url,
                session_id=session.session_id,
                message=f"{message} Autorisierung wird vorbereitet. Der Betrag wird zunächst nur reserviert."
            )
            
        except Exception as e:
            logger.error(f"Stripe payment initiation failed: {str(e)}")
            await self.update_payment_status(transaction.id, "failed")
            raise HTTPException(
                status_code=500, 
                detail=f"Zahlung konnte nicht initialisiert werden: {str(e)}"
            )
    
    async def initiate_paypal_payment(self, transaction: PaymentTransaction, request: Request) -> PaymentInitiateResponse:
        """Initiate PayPal payment (placeholder - would need PayPal SDK integration)"""
        try:
            # For now, return a placeholder response
            # In real implementation, you would integrate PayPal SDK here
            logger.info(f"PayPal payment initiation for transaction {transaction.id}")
            
            await self.update_payment_status(transaction.id, "processing")
            
            # This would be replaced with actual PayPal integration
            paypal_url = f"https://www.paypal.com/checkout?amount={transaction.amount}&currency={transaction.currency}"
            
            return PaymentInitiateResponse(
                success=True,
                transaction_id=transaction.id,
                payment_url=paypal_url,
                message="PayPal Zahlung initialisiert. Sie werden zu PayPal weitergeleitet."
            )
            
        except Exception as e:
            logger.error(f"PayPal payment initiation failed: {str(e)}")
            await self.update_payment_status(transaction.id, "failed")
            raise HTTPException(
                status_code=500, 
                detail=f"PayPal Zahlung konnte nicht initialisiert werden: {str(e)}"
            )
    
    async def check_payment_status(self, session_id: str) -> Optional[PaymentStatusResponse]:
        """Check payment status using Stripe session ID"""
        try:
            from emergentintegrations.payments.stripe.checkout import StripeCheckout
            
            if not self.stripe_api_key:
                return None
            
            # Find transaction by session ID
            transaction_data = await db.payment_transactions.find_one({"session_id": session_id})
            if not transaction_data:
                logger.warning(f"Transaction not found for session_id: {session_id}")
                return None
            
            transaction = PaymentTransaction(**transaction_data)
            
            # Initialize Stripe checkout
            stripe_checkout = StripeCheckout(api_key=self.stripe_api_key, webhook_url="")
            
            # Get checkout status from Stripe
            checkout_status = await stripe_checkout.get_checkout_status(session_id)
            
            # Map Stripe status to our status
            payment_status = "pending"
            if checkout_status.payment_status == "paid":
                payment_status = "completed"
            elif checkout_status.status == "expired":
                payment_status = "failed"
            elif checkout_status.status == "complete":
                payment_status = "completed"
            
            # Update transaction status if changed
            if transaction.payment_status != payment_status:
                await self.update_payment_status(transaction.id, payment_status)
                
                # If payment completed, update booking status
                if payment_status == "completed":
                    await self._update_booking_payment_status(transaction.booking_id, "confirmed")
            
            return PaymentStatusResponse(
                transaction_id=transaction.id,
                payment_status=payment_status,
                payment_method=transaction.payment_method,
                amount=transaction.amount,
                currency=transaction.currency,
                session_id=session_id,
                booking_id=transaction.booking_id
            )
            
        except Exception as e:
            logger.error(f"Payment status check failed: {str(e)}")
            return None
    
    async def _update_booking_payment_status(self, booking_id: str, status: str):
        """Update booking payment status"""
        try:
            result = await db.bookings.update_one(
                {"id": booking_id},
                {
                    "$set": {
                        "payment_status": status,
                        "updated_at": datetime.now(timezone.utc)
                    }
                }
            )
            
            if result.modified_count > 0:
                logger.info(f"Booking {booking_id} payment status updated to {status}")
            
        except Exception as e:
            logger.error(f"Failed to update booking payment status: {str(e)}")

# Create payment service instance
payment_service = PaymentService()