from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, date
from email_service import email_service
from google_maps_service import google_maps_service
from booking_service import booking_service, BookingRequest, BookingResponse, Booking, BookingStatus


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Models
class ContactFormData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now())
    status: str = Field(default="new")

class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

class ContactFormResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None

# Price Calculator Models
class PriceCalculationRequest(BaseModel):
    origin: str = Field(..., description="Start location")
    destination: str = Field(..., description="Destination location")
    departure_time: Optional[str] = Field(None, description="ISO format datetime")

class PriceCalculationResponse(BaseModel):
    origin: str
    destination: str
    distance_km: float
    estimated_duration_minutes: int
    base_fare: float = 6.80
    distance_fare: float
    total_fare: float
    route_info: dict
    calculation_source: str

# Booking Models (imported from booking_service)
class AvailabilityRequest(BaseModel):
    date: str  # ISO format date string (YYYY-MM-DD)

class AvailabilityResponse(BaseModel):
    date: str
    available_slots: List[str]

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactFormResponse)
async def submit_contact_form(request: ContactFormRequest, background_tasks: BackgroundTasks):
    """Submit contact form and send emails"""
    try:
        # Create contact form entry in database
        contact_data = ContactFormData(
            name=request.name,
            email=request.email,
            phone=request.phone,
            message=request.message
        )
        
        # Save to database
        await db.contact_forms.insert_one(contact_data.dict())
        
        # Send emails in background
        background_tasks.add_task(
            email_service.send_contact_form_email,
            request.name,
            request.email,
            request.phone,
            request.message
        )
        
        return ContactFormResponse(
            success=True,
            message="Ihre Nachricht wurde erfolgreich gesendet! Wir melden uns schnellstmöglich bei Ihnen.",
            id=contact_data.id
        )
        
    except Exception as e:
        logger.error(f"Contact form submission failed: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an: 076 611 31 31"
        )

@api_router.get("/contact", response_model=List[ContactFormData])
async def get_contact_forms():
    """Get all contact form submissions (admin only)"""
    try:
        contact_forms = await db.contact_forms.find().sort("timestamp", -1).to_list(100)
        return [ContactFormData(**form) for form in contact_forms]
    except Exception as e:
        logger.error(f"Failed to retrieve contact forms: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler beim Abrufen der Kontaktformulare")

# Price Calculator Endpoints
@api_router.post("/calculate-price", response_model=PriceCalculationResponse)
async def calculate_taxi_price(request: PriceCalculationRequest):
    """Calculate taxi price using intelligent Swiss distance estimation"""
    try:
        # Parse departure time if provided
        departure_time = None
        if request.departure_time:
            try:
                departure_time = datetime.fromisoformat(request.departure_time.replace('Z', '+00:00'))
            except ValueError:
                pass  # Use current time as fallback
        
        # Get distance calculation from Google Maps API
        distance_result = await google_maps_service.calculate_real_distance(
            origin=request.origin,
            destination=request.destination,
            departure_time=departure_time
        )
        
        # Swiss taxi fare calculation with vehicle-specific rates
        base_fare = 6.60  # CHF Standard (updated)
        distance_rate = 4.20  # CHF per km Standard
        
        distance_km = distance_result['distance_km']
        distance_fare = distance_km * distance_rate
        total_fare = base_fare + distance_fare
        
        # NO TIME-BASED SURCHARGES - Simple uniform pricing
        # Removed: traffic_factor, weekend surcharge, night surcharge, peak surcharge
        
        return PriceCalculationResponse(
            origin=distance_result['origin_address'],
            destination=distance_result['destination_address'],
            distance_km=distance_result['distance_km'],
            estimated_duration_minutes=distance_result['duration_minutes'],
            distance_fare=round(distance_fare, 2),
            total_fare=round(total_fare, 2),
            route_info={
                'route_type': distance_result.get('route_type', 'unknown'),
                'traffic_factor': distance_result.get('traffic_factor', 1.0),
                'straight_line_km': distance_result.get('straight_line_km', 0),
                'calculation_source': distance_result.get('source', 'google_maps_api')
            },
            calculation_source=distance_result.get('source', 'google_maps_api')
        )
        
    except Exception as e:
        logger.error(f"Price calculation failed: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Preisberechnung fehlgeschlagen: {str(e)}"
        )

@api_router.get("/test-google-maps")
async def test_google_maps_connection():
    """Test Google Maps API connection"""
    try:
        success = google_maps_service.test_api_connection()
        if success:
            return {"status": "success", "message": "Google Maps API connection successful"}
        else:
            return {"status": "error", "message": "Google Maps API connection failed"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Google Maps API test failed: {str(e)}")

# Booking System Endpoints
@api_router.post("/bookings", response_model=BookingResponse)
async def create_booking(request: BookingRequest, background_tasks: BackgroundTasks):
    """Create a new taxi booking"""
    try:
        # Create the booking
        booking_response = await booking_service.create_booking(request)
        
        if booking_response.success and booking_response.booking_details:
            # Save booking to database
            booking_dict = booking_response.booking_details.dict()
            await db.bookings.insert_one(booking_dict)
            
            # Send confirmation emails in background
            background_tasks.add_task(
                booking_service.send_booking_confirmation,
                booking_response.booking_details
            )
            
            logger.info(f"Booking created successfully: {booking_response.booking_id}")
        
        return booking_response
        
    except Exception as e:
        logger.error(f"Booking creation failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Buchung konnte nicht erstellt werden. Bitte versuchen Sie es erneut."
        )

@api_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str):
    """Get booking details by ID"""
    try:
        booking_data = await db.bookings.find_one({"id": booking_id})
        if not booking_data:
            raise HTTPException(status_code=404, detail="Buchung nicht gefunden")
        
        return Booking(**booking_data)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to retrieve booking: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler beim Abrufen der Buchung")

@api_router.get("/bookings", response_model=List[Booking])
async def get_all_bookings(status: Optional[str] = None, limit: int = 50):
    """Get all bookings (admin endpoint)"""
    try:
        query = {}
        if status:
            query["status"] = status
        
        bookings = await db.bookings.find(query).sort("pickup_datetime", -1).limit(limit).to_list(length=None)
        return [Booking(**booking) for booking in bookings]
        
    except Exception as e:
        logger.error(f"Failed to retrieve bookings: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler beim Abrufen der Buchungen")

@api_router.put("/bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: BookingStatus):
    """Update booking status"""
    try:
        result = await db.bookings.update_one(
            {"id": booking_id},
            {
                "$set": {
                    "status": status.value,
                    "updated_at": datetime.now()
                }
            }
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Buchung nicht gefunden")
        
        return {"success": True, "message": f"Buchungsstatus auf '{status.value}' aktualisiert"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to update booking status: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler beim Aktualisieren des Buchungsstatus")

@api_router.delete("/bookings/{booking_id}")
async def cancel_booking(booking_id: str):
    """Cancel a booking"""
    try:
        # Update booking status to cancelled
        result = await db.bookings.update_one(
            {"id": booking_id},
            {
                "$set": {
                    "status": BookingStatus.CANCELLED.value,
                    "updated_at": datetime.now()
                }
            }
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Buchung nicht gefunden")
        
        # TODO: Send cancellation notification email
        
        return {"success": True, "message": "Buchung erfolgreich storniert"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to cancel booking: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler beim Stornieren der Buchung")

@api_router.get("/availability", response_model=AvailabilityResponse)
async def get_availability(date: str):
    """Get available time slots for a specific date"""
    try:
        # Parse date string
        booking_date = datetime.fromisoformat(date)
        
        # Get available slots from booking service
        available_slots = await booking_service.get_available_time_slots(booking_date)
        
        return AvailabilityResponse(
            date=date,
            available_slots=available_slots
        )
        
    except ValueError:
        raise HTTPException(status_code=400, detail="Ungültiges Datumsformat. Verwenden Sie YYYY-MM-DD.")
    except Exception as e:
        logger.error(f"Failed to get availability: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler beim Abrufen der Verfügbarkeit")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
