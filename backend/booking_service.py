from datetime import datetime, timedelta, timezone
from typing import Dict, List, Optional
from enum import Enum
import uuid
import logging
from pydantic import BaseModel, Field, EmailStr
from google_maps_service import google_maps_service
from email_service import email_service

logger = logging.getLogger(__name__)

class VehicleType(str, Enum):
    STANDARD = "standard"
    PREMIUM = "premium"
    VAN = "van"

class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class BookingType(str, Enum):
    IMMEDIATE = "immediate"
    SCHEDULED = "scheduled"

class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    
    # Customer Information
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    
    # Trip Details
    pickup_location: str
    destination: str
    additional_stops: List[str] = Field(default_factory=list)
    
    # Booking Details
    booking_type: BookingType = BookingType.SCHEDULED
    pickup_datetime: datetime
    passenger_count: int = Field(default=1, ge=1, le=8)
    vehicle_type: VehicleType = VehicleType.STANDARD
    
    # Pricing
    estimated_distance_km: float
    estimated_duration_minutes: int
    base_fare: float
    distance_fare: float
    booking_fee: float = Field(default=0.0)  # No booking fee (removed)
    total_fare: float
    
    # Status and Metadata
    status: BookingStatus = BookingStatus.PENDING
    special_requests: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    
    # Internal
    route_info: dict = Field(default_factory=dict)
    confirmation_sent: bool = Field(default=False)

class BookingRequest(BaseModel):
    customer_name: str = Field(..., min_length=2)
    customer_email: EmailStr
    customer_phone: str = Field(..., min_length=10)
    pickup_location: str = Field(..., min_length=3)
    destination: str = Field(..., min_length=3)
    additional_stops: List[str] = Field(default_factory=list)
    booking_type: BookingType = BookingType.SCHEDULED
    pickup_datetime: str  # ISO format datetime string
    passenger_count: int = Field(default=1, ge=1, le=8)
    vehicle_type: VehicleType = VehicleType.STANDARD
    special_requests: Optional[str] = None

class BookingResponse(BaseModel):
    success: bool
    booking_id: str
    message: str
    booking_details: Optional[Booking] = None

class BookingService:
    def __init__(self):
        self.vehicle_multipliers = {
            VehicleType.STANDARD: 1.0,
            VehicleType.PREMIUM: 1.2,    # 20% Aufschlag (reduziert)
            VehicleType.VAN: 1.25        # 25% Aufschlag (reduziert)
        }
        
        self.base_fares = {
            VehicleType.STANDARD: 6.60,
            VehicleType.PREMIUM: 6.60,
            VehicleType.VAN: 6.60
        }
        
        # Distance rates per km for different vehicle types
        self.distance_rates = {
            VehicleType.STANDARD: 4.20,
            VehicleType.PREMIUM: 4.20,   # Gleicher Rate für alle
            VehicleType.VAN: 4.20        # Gleicher Rate, nur Multiplikator unterschiedlich
        }

    async def create_booking(self, booking_request: BookingRequest) -> BookingResponse:
        """Create a new taxi booking"""
        try:
            # Parse pickup datetime and ensure it's timezone-aware
            pickup_datetime_str = booking_request.pickup_datetime.replace('Z', '+00:00')
            pickup_datetime = datetime.fromisoformat(pickup_datetime_str)
            
            # If pickup_datetime is timezone-naive, make it timezone-aware (assume UTC)
            if pickup_datetime.tzinfo is None:
                pickup_datetime = pickup_datetime.replace(tzinfo=timezone.utc)
            
            # Validate pickup time (must be at least 30 minutes in future for scheduled bookings)
            if booking_request.booking_type == BookingType.SCHEDULED:
                min_booking_time = datetime.now(timezone.utc) + timedelta(minutes=30)
                # Add a small buffer (10 seconds) to account for processing time
                if pickup_datetime < (min_booking_time - timedelta(seconds=10)):
                    return BookingResponse(
                        success=False,
                        booking_id="",
                        message="Terminbuchungen müssen mindestens 30 Minuten im Voraus erfolgen."
                    )
            
            # Calculate distance and pricing with Google Maps
            distance_result = await google_maps_service.calculate_real_distance(
                origin=booking_request.pickup_location,
                destination=booking_request.destination,
                departure_time=pickup_datetime
            )
            
            # Calculate pricing with vehicle type multiplier (NO TIME-BASED SURCHARGES)
            vehicle_multiplier = self.vehicle_multipliers[booking_request.vehicle_type]
            base_fare = self.base_fares[booking_request.vehicle_type]
            distance_rate = self.distance_rates[booking_request.vehicle_type]
            
            distance_km = distance_result['distance_km']
            distance_fare = distance_km * distance_rate * vehicle_multiplier
            
            # Simple pricing: Base + Distance (no time-based surcharges)
            total_base = base_fare + distance_fare
            
            # No booking fee (removed per client request)
            booking_fee = 0.0  # CHF 0 booking fee
            total_fare = total_base  # No additional booking fee
            
            # Create booking object
            booking = Booking(
                customer_name=booking_request.customer_name,
                customer_email=booking_request.customer_email,
                customer_phone=booking_request.customer_phone,
                pickup_location=booking_request.pickup_location,
                destination=booking_request.destination,
                additional_stops=booking_request.additional_stops,
                booking_type=booking_request.booking_type,
                pickup_datetime=pickup_datetime,
                passenger_count=booking_request.passenger_count,
                vehicle_type=booking_request.vehicle_type,
                estimated_distance_km=distance_km,
                estimated_duration_minutes=distance_result['duration_minutes'],
                base_fare=base_fare,
                distance_fare=distance_fare,
                booking_fee=booking_fee,
                total_fare=round(total_fare, 2),
                special_requests=booking_request.special_requests,
                route_info=distance_result
            )
            
            logger.info(f"Booking created: {booking.id} for {booking.customer_name}")
            
            return BookingResponse(
                success=True,
                booking_id=booking.id,
                message="Buchung erfolgreich erstellt! Sie erhalten eine Bestätigung per E-Mail.",
                booking_details=booking
            )
            
        except ValueError as e:
            logger.error(f"Booking validation error: {str(e)}")
            return BookingResponse(
                success=False,
                booking_id="",
                message=f"Ungültige Eingabe: {str(e)}"
            )
        except Exception as e:
            logger.error(f"Booking creation failed: {str(e)}")
            return BookingResponse(
                success=False,
                booking_id="",
                message="Buchung konnte nicht erstellt werden. Bitte versuchen Sie es erneut."
            )

    async def get_booking(self, booking_id: str) -> Optional[Booking]:
        """Retrieve a booking by ID"""
        # This would query the database - placeholder for now
        return None

    async def update_booking_status(self, booking_id: str, status: BookingStatus) -> bool:
        """Update booking status"""
        try:
            # Database update would go here
            logger.info(f"Booking {booking_id} status updated to {status}")
            return True
        except Exception as e:
            logger.error(f"Failed to update booking status: {str(e)}")
            return False

    async def cancel_booking(self, booking_id: str, reason: str = "") -> bool:
        """Cancel a booking"""
        try:
            success = await self.update_booking_status(booking_id, BookingStatus.CANCELLED)
            if success:
                logger.info(f"Booking {booking_id} cancelled: {reason}")
            return success
        except Exception as e:
            logger.error(f"Failed to cancel booking: {str(e)}")
            return False

    async def get_available_time_slots(self, date: datetime) -> List[str]:
        """Get available time slots for a specific date"""
        # Generate time slots from 6:00 to 23:00 in 30-minute intervals
        slots = []
        current_time = date.replace(hour=6, minute=0, second=0, microsecond=0)
        end_time = date.replace(hour=23, minute=0, second=0, microsecond=0)
        
        while current_time <= end_time:
            # Skip if time slot is in the past
            if current_time > datetime.now() + timedelta(minutes=30):
                slots.append(current_time.strftime("%H:%M"))
            current_time += timedelta(minutes=30)
        
        return slots

    async def send_booking_confirmation(self, booking: Booking) -> bool:
        """Send booking confirmation email"""
        try:
            # Format pickup time
            pickup_time_str = booking.pickup_datetime.strftime("%d.%m.%Y um %H:%M")
            
            # Create confirmation email
            subject = f"Buchungsbestätigung - Taxi Türlihof (#{booking.id[:8]})"
            
            html_content = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h2 style="color: #FFA500;">🚖 Taxi Türlihof</h2>
                        <h3 style="color: #FF8C00;">Buchungsbestätigung</h3>
                    </div>
                    
                    <div style="background-color: #FFF8DC; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h4 style="margin-top: 0; color: #FF8C00;">Buchungsdetails:</h4>
                        <p><strong>Buchungsnummer:</strong> #{booking.id[:8]}</p>
                        <p><strong>Kundenname:</strong> {booking.customer_name}</p>
                        <p><strong>Abholzeit:</strong> {pickup_time_str}</p>
                        <p><strong>Von:</strong> {booking.pickup_location}</p>
                        <p><strong>Nach:</strong> {booking.destination}</p>
                        {f'<p><strong>Zwischenstopps:</strong> {", ".join(booking.additional_stops)}</p>' if booking.additional_stops else ''}
                        <p><strong>Passagiere:</strong> {booking.passenger_count}</p>
                        <p><strong>Fahrzeugtyp:</strong> {booking.vehicle_type.value.title()}</p>
                        {f'<p><strong>Besondere Wünsche:</strong> {booking.special_requests}</p>' if booking.special_requests else ''}
                    </div>
                    
                    <div style="background-color: #F0F8FF; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h4 style="margin-top: 0; color: #1E90FF;">Preisübersicht:</h4>
                        <p><strong>Geschätzte Distanz:</strong> {booking.estimated_distance_km} km</p>
                        <p><strong>Geschätzte Fahrzeit:</strong> {booking.estimated_duration_minutes} Minuten</p>
                        <p><strong>Grundtarif:</strong> CHF {booking.base_fare}</p>
                        <p><strong>Distanzkosten:</strong> CHF {booking.distance_fare}</p>
                        <hr style="margin: 10px 0;">
                        <p style="font-size: 18px;"><strong>Gesamtkosten:</strong> CHF {booking.total_fare}</p>
                    </div>
                    
                    <div style="background-color: #E8F5E8; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h4 style="margin-top: 0; color: #228B22;">Wichtige Hinweise:</h4>
                        <ul>
                            <li>Seien Sie bitte 5 Minuten vor der Abholzeit bereit</li>
                            <li>Bei Verspätungen kontaktieren Sie uns unter 076 611 31 31</li>
                            <li>Stornierungen sind bis 2 Stunden vor Fahrtbeginn kostenlos möglich</li>
                            <li>Bei Nichterscheinen wird eine Gebühr von CHF 20 erhoben</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                        <p style="margin: 5px 0;"><strong>Taxi Türlihof</strong></p>
                        <p style="margin: 5px 0; color: #666;">Türlihof 4, 6414 Arth, Switzerland</p>
                        <p style="margin: 5px 0; color: #666;">
                            📞 <a href="tel:076 611 31 31" style="color: #FFA500;">076 611 31 31</a> | 
                            📧 <a href="mailto:info@taxiturlihof.ch" style="color: #FFA500;">info@taxiturlihof.ch</a>
                        </p>
                        <p style="margin: 15px 0; font-size: 14px; color: #888;">
                            Vielen Dank für Ihr Vertrauen in Taxi Türlihof!
                        </p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            text_content = f"""
Buchungsbestätigung - Taxi Türlihof

Buchungsnummer: #{booking.id[:8]}
Kundenname: {booking.customer_name}
Abholzeit: {pickup_time_str}
Von: {booking.pickup_location}
Nach: {booking.destination}
Passagiere: {booking.passenger_count}
Fahrzeugtyp: {booking.vehicle_type.value.title()}

Preisübersicht:
Geschätzte Distanz: {booking.estimated_distance_km} km
Grundtarif: CHF {booking.base_fare}
Distanzkosten: CHF {booking.distance_fare}
Gesamtkosten: CHF {booking.total_fare}

Wichtige Hinweise:
- Seien Sie bitte 5 Minuten vor der Abholzeit bereit
- Bei Verspätungen kontaktieren Sie uns unter 076 611 31 31
- Stornierungen sind bis 2 Stunden vor Fahrtbeginn kostenlos möglich

Taxi Türlihof
Türlihof 4, 6414 Arth, Switzerland
076 611 31 31 | info@taxiturlihof.ch
            """
            
            # Send confirmation to customer
            success = await email_service.send_email(
                booking.customer_email,
                subject,
                html_content,
                text_content
            )
            
            if success:
                # Send notification to business
                await self._send_business_notification(booking)
                
            return success
            
        except Exception as e:
            logger.error(f"Failed to send booking confirmation: {str(e)}")
            return False

    async def _send_business_notification(self, booking: Booking):
        """Send new booking notification to business owner"""
        try:
            pickup_time_str = booking.pickup_datetime.strftime("%d.%m.%Y um %H:%M")
            
            subject = f"🚖 Neue Buchung - {booking.customer_name} ({pickup_time_str})"
            
            html_content = f"""
            <html>
            <body style="font-family: Arial, sans-serif;">
                <h2 style="color: #FFA500;">🚖 Neue Taxi-Buchung</h2>
                
                <div style="background-color: #FFF8DC; padding: 15px; border-radius: 5px;">
                    <h3>Buchungsdetails:</h3>
                    <p><strong>Buchungsnummer:</strong> #{booking.id[:8]}</p>
                    <p><strong>Kunde:</strong> {booking.customer_name}</p>
                    <p><strong>Telefon:</strong> <a href="tel:{booking.customer_phone}">{booking.customer_phone}</a></p>
                    <p><strong>E-Mail:</strong> <a href="mailto:{booking.customer_email}">{booking.customer_email}</a></p>
                    <p><strong>Abholzeit:</strong> {pickup_time_str}</p>
                    <p><strong>Von:</strong> {booking.pickup_location}</p>
                    <p><strong>Nach:</strong> {booking.destination}</p>
                    <p><strong>Passagiere:</strong> {booking.passenger_count}</p>
                    <p><strong>Fahrzeug:</strong> {booking.vehicle_type.value.title()}</p>
                    <p><strong>Geschätzte Distanz:</strong> {booking.estimated_distance_km} km</p>
                    <p><strong>Gesamtkosten:</strong> CHF {booking.total_fare}</p>
                    {f'<p><strong>Besondere Wünsche:</strong> {booking.special_requests}</p>' if booking.special_requests else ''}
                </div>
                
                <p style="margin-top: 20px;">
                    <strong>Aktion erforderlich:</strong> Bitte bestätigen Sie die Buchung beim Kunden.
                </p>
            </body>
            </html>
            """
            
            await email_service.send_email(
                "rasayibelec@gmail.com",
                subject,
                html_content
            )
            
        except Exception as e:
            logger.error(f"Failed to send business notification: {str(e)}")

# Global service instance
booking_service = BookingService()