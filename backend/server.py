from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks, Request, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, date, timezone, timedelta
import pytz
from email_service import email_service
from google_maps_service import google_maps_service
from booking_service import booking_service, BookingRequest, BookingResponse, Booking, BookingStatus
from payment_service import payment_service, PaymentMethod, PaymentTransactionCreate, PaymentTransaction, PaymentStatusResponse, PaymentInitiateResponse
from whatsapp_service import whatsapp_service
from task_scheduler import task_scheduler
from auth_service import auth_service, get_current_admin_user
from password_reset_service import password_reset_service


ROOT_DIR = Path(__file__).parent

# Schweizer Zeitzone definieren
SWISS_TZ = pytz.timezone('Europe/Zurich')

def get_swiss_time():
    """Gibt die aktuelle Schweizer Zeit zurück"""
    return datetime.now(SWISS_TZ)

def to_swiss_time(dt):
    """Konvertiert UTC-DateTime zu Schweizer Zeit"""
    if dt.tzinfo is None:
        dt = pytz.utc.localize(dt)
    return dt.astimezone(SWISS_TZ)
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
    timestamp: datetime = Field(default_factory=get_swiss_time)
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

# Multi-Route Models
class MultiRouteCalculationRequest(BaseModel):
    origin: str = Field(..., description="Start location")
    destination: str = Field(..., description="Destination location")
    departure_time: Optional[str] = Field(None, description="ISO format datetime")

class RouteOption(BaseModel):
    route_type: str  # 'fastest' or 'shortest'
    distance_km: float
    duration_minutes: int
    base_fare: float = 6.60
    distance_fare: float
    total_fare: float
    origin_address: str
    destination_address: str
    route_info: dict

class MultiRouteResponse(BaseModel):
    fastest_route: RouteOption
    shortest_route: RouteOption
    comparison: dict
    recommended_route: str  # 'fastest' or 'shortest' or 'same'

# Enhanced models for interactive route selection
class InteractiveRoute(BaseModel):
    route_type: str  # 'fastest', 'shortest', 'scenic', 'avoid_highways'
    route_description: str
    distance_km: float
    duration_minutes: int
    duration_in_traffic_minutes: int
    base_fare: float = 6.60
    distance_fare: float
    total_fare: float
    origin_address: str
    destination_address: str
    polyline: str  # Google Maps polyline for route visualization
    bounds: dict  # Map bounds for fitting the route
    steps: List[dict]  # Turn-by-turn directions
    traffic_factor: float
    warnings: List[str] = []

class InteractiveRoutesResponse(BaseModel):
    routes: List[InteractiveRoute]
    comparison: dict
    total_options: int
    recommended_route: str
class AvailabilityRequest(BaseModel):
    date: str  # ISO format date string (YYYY-MM-DD)

class AvailabilityResponse(BaseModel):
    date: str
    available_slots: List[str]

# Payment Models
class PaymentInitiateRequest(BaseModel):
    booking_id: str
    payment_method: str  # 'twint', 'stripe', 'paypal'

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

# Multi-Route Price Calculator Endpoint
@api_router.post("/calculate-route-options", response_model=MultiRouteResponse)
async def calculate_route_options(request: MultiRouteCalculationRequest):
    """Calculate both fastest and shortest route options for customer choice"""
    try:
        # Parse departure time if provided
        departure_time = None
        if request.departure_time:
            try:
                departure_time = datetime.fromisoformat(request.departure_time.replace('Z', '+00:00'))
            except ValueError:
                pass  # Use current time as fallback
        
        # Get both route options from Google Maps API
        route_options = await google_maps_service.calculate_route_options(
            origin=request.origin,
            destination=request.destination,
            departure_time=departure_time
        )
        
        # Swiss taxi fare calculation
        base_fare = 6.60  # CHF Standard
        distance_rate = 4.20  # CHF per km Standard
        
        def calculate_route_fare(route_data):
            distance_km = route_data['distance_km']
            distance_fare = distance_km * distance_rate
            total_fare = base_fare + distance_fare
            
            return RouteOption(
                route_type=route_data['route_option'],
                distance_km=route_data['distance_km'],
                duration_minutes=route_data['duration_minutes'],
                distance_fare=round(distance_fare, 2),
                total_fare=round(total_fare, 2),
                origin_address=route_data['origin_address'],
                destination_address=route_data['destination_address'],
                route_info={
                    'route_type': route_data.get('route_type', 'unknown'),
                    'traffic_factor': route_data.get('traffic_factor', 1.0),
                    'calculation_source': route_data.get('source', 'google_maps_api')
                }
            )
        
        # Calculate fares for both routes
        fastest_route = calculate_route_fare(route_options['fastest_route'])
        shortest_route = calculate_route_fare(route_options['shortest_route'])
        
        # Determine recommended route based on time/cost savings
        comparison = route_options['comparison']
        
        # Recommendation logic
        time_savings = comparison['time_savings_minutes']
        distance_savings = comparison['distance_savings_km']
        price_difference = abs(fastest_route.total_fare - shortest_route.total_fare)
        
        if time_savings <= 2 and price_difference <= 5:
            recommended_route = "same"  # Routes are very similar
        elif time_savings > 10 and price_difference <= 15:
            recommended_route = "fastest"  # Significant time savings, small price difference
        elif price_difference > 20:
            recommended_route = "shortest"  # Significant cost savings
        else:
            recommended_route = comparison['faster_option']  # Default to faster
        
        return MultiRouteResponse(
            fastest_route=fastest_route,
            shortest_route=shortest_route,
            comparison=comparison,
            recommended_route=recommended_route
        )
        
    except Exception as e:
        logger.error(f"Multi-route calculation failed: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Routenoptionen-Berechnung fehlgeschlagen: {str(e)}"
        )

# Interactive Route Selection Endpoint
@api_router.post("/get-interactive-routes", response_model=InteractiveRoutesResponse)
async def get_interactive_routes(request: MultiRouteCalculationRequest):
    """Get multiple route options with visual data for interactive selection"""
    try:
        # Parse departure time if provided
        departure_time = None
        if request.departure_time:
            try:
                departure_time = datetime.fromisoformat(request.departure_time.replace('Z', '+00:00'))
            except ValueError:
                pass  # Use current time as fallback
        
        # Get all route options from Google Directions API
        route_data = await google_maps_service.get_multiple_route_options(
            origin=request.origin,
            destination=request.destination,
            departure_time=departure_time
        )
        
        # Swiss taxi fare calculation
        base_fare = 6.60  # CHF Standard
        distance_rate = 4.20  # CHF per km Standard
        
        def calculate_interactive_route_fare(route):
            distance_km = route['distance_km']
            distance_fare = distance_km * distance_rate
            total_fare = base_fare + distance_fare
            
            return InteractiveRoute(
                route_type=route['route_type'],
                route_description=route['route_description'],
                distance_km=route['distance_km'],
                duration_minutes=route['duration_minutes'],
                duration_in_traffic_minutes=route['duration_in_traffic_minutes'],
                distance_fare=round(distance_fare, 2),
                total_fare=round(total_fare, 2),
                origin_address=route['origin_address'],
                destination_address=route['destination_address'],
                polyline=route['polyline'],
                bounds=route['bounds'],
                steps=route['steps'],
                traffic_factor=route['traffic_factor'],
                warnings=route.get('warnings', [])
            )
        
        # Calculate fares for all routes
        interactive_routes = []
        for route in route_data['routes']:
            interactive_route = calculate_interactive_route_fare(route)
            interactive_routes.append(interactive_route)
        
        # Find recommended route (fastest with reasonable price)
        if len(interactive_routes) > 0:
            fastest = min(interactive_routes, key=lambda r: r.duration_in_traffic_minutes)
            shortest = min(interactive_routes, key=lambda r: r.distance_km)
            cheapest = min(interactive_routes, key=lambda r: r.total_fare)
            
            # Recommendation logic: balance time vs cost
            time_diff = fastest.duration_in_traffic_minutes - cheapest.duration_in_traffic_minutes
            price_diff = fastest.total_fare - cheapest.total_fare
            
            if time_diff <= 5 or price_diff <= 10:
                recommended = fastest.route_type
            else:
                recommended = cheapest.route_type
        else:
            recommended = "fastest"
        
        return InteractiveRoutesResponse(
            routes=interactive_routes,
            comparison=route_data['comparison'],
            total_options=len(interactive_routes),
            recommended_route=recommended
        )
        
    except Exception as e:
        logger.error(f"Interactive routes calculation failed: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Interactive Routenberechnung fehlgeschlagen: {str(e)}"
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
async def get_all_bookings(request: Request):
    """Get all bookings for admin dashboard (ADMIN ONLY)"""
    try:
        # Verify admin token
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            raise HTTPException(status_code=401, detail="Admin-Autorisierung erforderlich")
        
        token = auth_header.split(' ')[1]
        payload = auth_service.verify_admin_token(token)
        if not payload:
            raise HTTPException(status_code=401, detail="Ungültiger Admin-Token")
        
        # Get bookings
        bookings = await db.bookings.find().sort("created_at", -1).to_list(length=1000)
        return bookings
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to fetch bookings: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler beim Laden der Buchungen")

@api_router.put("/bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: BookingStatus, request: Request):
    """Update booking status and send email notification to customer (ADMIN ONLY)"""
    try:
        # Verify admin token
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            raise HTTPException(status_code=401, detail="Admin-Autorisierung erforderlich")
        
        token = auth_header.split(' ')[1]
        payload = auth_service.verify_admin_token(token)
        if not payload:
            raise HTTPException(status_code=401, detail="Ungültiger Admin-Token")
        
        # First get the booking details for email
        booking = await db.bookings.find_one({"id": booking_id})
        if not booking:
            raise HTTPException(status_code=404, detail="Buchung nicht gefunden")
        
        # Update booking status
        result = await db.bookings.update_one(
            {"id": booking_id},
            {
                "$set": {
                    "status": status.value,
                    "updated_at": get_swiss_time()
                }
            }
        )
        
        # Send status update email to customer
        try:
            status_messages = {
                "confirmed": {
                    "subject": "✅ Ihre Taxi-Buchung wurde bestätigt - Taxi Türlihof",
                    "title": "Buchung bestätigt!",
                    "message": "Wir freuen uns, Ihnen mitteilen zu können, dass Ihre Taxi-Buchung erfolgreich bestätigt wurde. Unser Fahrer wird pünktlich bei Ihnen sein."
                },
                "in_progress": {
                    "subject": "🚗 Ihr Taxi ist unterwegs - Taxi Türlihof", 
                    "title": "Ihr Taxi ist unterwegs!",
                    "message": "Ihr Taxi-Fahrer ist jetzt auf dem Weg zu Ihrem Abholort. Bitte halten Sie sich bereit."
                },
                "completed": {
                    "subject": "🎉 Fahrt abgeschlossen - Vielen Dank - Taxi Türlihof",
                    "title": "Fahrt erfolgreich abgeschlossen!",
                    "message": "Vielen Dank für die Nutzung unseres Taxi-Service. Wir hoffen, Sie hatten eine angenehme Fahrt."
                },
                "cancelled": {
                    "subject": "❌ Buchung storniert - Taxi Türlihof",
                    "title": "Buchung wurde storniert",
                    "message": "Ihre Buchung wurde leider storniert. Bei Fragen kontaktieren Sie uns gerne unter 076 611 31 31."
                }
            }
            
            if status.value in status_messages:
                email_info = status_messages[status.value]
                
                # Create detailed email content
                email_content = f"""
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1f2937;">{email_info['title']}</h2>
                    
                    <p>{email_info['message']}</p>
                    
                    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1f2937; margin-top: 0;">📋 Buchungsdetails:</h3>
                        <p><strong>Buchungsnummer:</strong> #{booking_id[:8]}</p>
                        <p><strong>Von:</strong> {booking.get('pickup_location', 'N/A')}</p>
                        <p><strong>Nach:</strong> {booking.get('destination', 'N/A')}</p>
                        <p><strong>Datum & Zeit:</strong> {booking.get('pickup_datetime', 'N/A')}</p>
                        <p><strong>Fahrzeugtyp:</strong> {booking.get('vehicle_type', 'Standard')}</p>
                        <p><strong>Geschätzter Preis:</strong> CHF {booking.get('total_fare', 'N/A')}</p>
                        <p><strong>Status:</strong> <span style="color: #059669; font-weight: bold;">{status.value}</span></p>
                    </div>
                    
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <p style="margin: 0;"><strong>📞 Kontakt:</strong> 076 611 31 31</p>
                        <p style="margin: 5px 0 0 0;"><strong>📧 E-Mail:</strong> info@taxiturlihof.ch</p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                    
                    <p style="font-size: 14px; color: #6b7280;">
                        Mit freundlichen Grüßen<br>
                        <strong>Ihr Team von Taxi Türlihof</strong><br>
                        Zuverlässig • Pünktlich • Komfortabel
                    </p>
                </div>
                """
                
                await email_service.send_email(
                    to_email=booking.get('customer_email'),
                    subject=email_info['subject'],
                    html_content=email_content
                )
                
                logger.info(f"Status update email sent to {booking.get('customer_email')} for booking {booking_id}")
                
                # WhatsApp-Nachricht für den Admin generieren
                if booking.get('customer_phone'):
                    if status.value == "confirmed":
                        whatsapp_message = whatsapp_service.send_booking_confirmation_message(booking)
                    else:
                        whatsapp_message = whatsapp_service.send_driver_update_message(booking, status.value)
                    
                    whatsapp_link = whatsapp_service.get_customer_whatsapp_link(
                        booking.get('customer_phone'), 
                        whatsapp_message
                    )
                    
                    logger.info(f"WhatsApp link generated for {booking.get('customer_phone')}: {whatsapp_link}")
                
        except Exception as email_error:
            logger.warning(f"Failed to send status update email: {str(email_error)}")
            # Don't fail the status update if email fails
        
        # WhatsApp-Link für Admin zurückgeben (falls Telefonnummer vorhanden)
        whatsapp_link = None
        if booking.get('customer_phone'):
            if status.value == "confirmed":
                whatsapp_message = whatsapp_service.send_booking_confirmation_message(booking)
            else:
                whatsapp_message = whatsapp_service.send_driver_update_message(booking, status.value)
            
            whatsapp_link = whatsapp_service.get_customer_whatsapp_link(
                booking.get('customer_phone'), 
                whatsapp_message
            )
        
        return {
            "success": True, 
            "message": f"Buchungsstatus auf '{status.value}' aktualisiert und Kunde per E-Mail benachrichtigt",
            "whatsapp_link": whatsapp_link
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to update booking status: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler beim Aktualisieren des Buchungsstatus")

@api_router.post("/whatsapp/generate-link")
async def generate_whatsapp_link(request: dict):
    """Generiert WhatsApp-Link für Kundenkommunikation"""
    try:
        booking_id = request.get('booking_id')
        phone_number = request.get('phone_number') 
        message_type = request.get('message_type', 'confirmation')
        
        # Buchung abrufen
        booking = await db.bookings.find_one({"id": booking_id})
        if not booking:
            raise HTTPException(status_code=404, detail="Buchung nicht gefunden")
        
        # WhatsApp-Nachricht generieren je nach Typ
        if message_type == 'confirmation':
            whatsapp_message = whatsapp_service.send_booking_confirmation_message(booking)
        elif message_type == 'review':
            whatsapp_message = whatsapp_service.send_review_reminder_message(booking)
        elif message_type == 'update':
            whatsapp_message = whatsapp_service.send_driver_update_message(booking, booking.get('status', 'confirmed'))
        else:
            raise HTTPException(status_code=400, detail="Unbekannter Nachrichtentyp")
        
        # WhatsApp-Link generieren
        whatsapp_link = whatsapp_service.get_customer_whatsapp_link(phone_number, whatsapp_message)
        
        return {
            "success": True,
            "whatsapp_link": whatsapp_link,
            "message_preview": whatsapp_message[:100] + "..."
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to generate WhatsApp link: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler beim Generieren des WhatsApp-Links")

# Auth Models
class AdminLoginRequest(BaseModel):
    username: str
    password: str

class AdminLoginResponse(BaseModel):
    success: bool
    token: Optional[str] = None
    message: str
    expires_at: Optional[str] = None

class CustomerBookingLookupRequest(BaseModel):
    booking_id: str
    email: str

# Authentication endpoints
@api_router.post("/auth/admin/login", response_model=AdminLoginResponse)
async def admin_login(request: AdminLoginRequest):
    """Admin login endpoint"""
    try:
        # Verify credentials
        is_valid = auth_service.verify_admin_credentials(request.username, request.password)
        
        if not is_valid:
            return AdminLoginResponse(
                success=False,
                message="Ungültige Anmeldedaten"
            )
        
        # Create JWT token
        token = auth_service.create_admin_token()
        expires_at = (get_swiss_time() + timedelta(hours=8)).isoformat()
        
        return AdminLoginResponse(
            success=True,
            token=token,
            message="Erfolgreich angemeldet",
            expires_at=expires_at
        )
        
    except Exception as e:
        logger.error(f"Admin login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Anmeldefehler")

@api_router.post("/auth/admin/verify")
async def verify_admin_token(request: Request):
    """Verify admin token"""
    try:
        # Get token from Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            raise HTTPException(status_code=401, detail="Token fehlt")
        
        token = auth_header.split(' ')[1]
        
        # Verify token
        payload = auth_service.verify_admin_token(token)
        if not payload:
            raise HTTPException(status_code=401, detail="Ungültiger oder abgelaufener Token")
        
        return {"success": True, "user": payload}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Token verification error: {str(e)}")
        raise HTTPException(status_code=500, detail="Token-Überprüfungsfehler")

@api_router.post("/bookings/lookup")
async def customer_booking_lookup(request: CustomerBookingLookupRequest):
    """Customer booking lookup (no admin required)"""
    try:
        # Find bookings that start with the provided booking ID
        bookings = await db.bookings.find({
            "id": {"$regex": f"^{request.booking_id}", "$options": "i"}
        }).to_list(length=10)
        
        # Filter bookings that match the email
        matching_bookings = []
        for booking in bookings:
            if auth_service.verify_customer_booking_access(request.booking_id, request.email, booking):
                # Remove sensitive admin info
                safe_booking = {
                    "id": booking.get("id"),
                    "pickup_location": booking.get("pickup_location"),
                    "destination": booking.get("destination"),
                    "pickup_datetime": booking.get("pickup_datetime"),
                    "status": booking.get("status"),
                    "total_fare": booking.get("total_fare"),
                    "vehicle_type": booking.get("vehicle_type"),
                    "passenger_count": booking.get("passenger_count"),
                    "created_at": booking.get("created_at"),
                    "payment_status": booking.get("payment_status", "pending")
                }
                matching_bookings.append(safe_booking)
        
        if not matching_bookings:
            raise HTTPException(status_code=404, detail="Buchung nicht gefunden oder E-Mail stimmt nicht überein")
        
        return {
            "success": True,
            "bookings": matching_bookings
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Customer booking lookup error: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler bei der Buchungssuche")

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
                    "updated_at": get_swiss_time()
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

@api_router.delete("/admin/bookings/{booking_id}")
async def delete_booking_admin(booking_id: str, current_admin: dict = Depends(get_current_admin_user)):
    """Admin-only: Permanently delete a booking from the database"""
    try:
        # First check if booking exists and get its details for logging
        booking = await db.bookings.find_one({"id": booking_id})
        if not booking:
            raise HTTPException(status_code=404, detail="Buchung nicht gefunden")
        
        # Delete the booking from database
        result = await db.bookings.delete_one({"id": booking_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Buchung konnte nicht gelöscht werden")
        
        # Log the deletion for audit purposes
        logger.info(f"Admin {current_admin.get('username', 'unknown')} deleted booking {booking_id} - Customer: {booking.get('customer_name', 'unknown')}")
        
        return {
            "success": True, 
            "message": "Buchung erfolgreich gelöscht",
            "deleted_booking": {
                "id": booking_id,
                "customer_name": booking.get("customer_name", ""),
                "pickup_location": booking.get("pickup_location", ""),
                "destination": booking.get("destination", "")
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to delete booking {booking_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler beim Löschen der Buchung")

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

# Payment Endpoints
@api_router.get("/payment-methods", response_model=List[PaymentMethod])
async def get_payment_methods():
    """Get available payment methods"""
    try:
        return await payment_service.get_available_payment_methods()
    except Exception as e:
        logger.error(f"Failed to get payment methods: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler beim Abrufen der Zahlungsmethoden")

@api_router.post("/payments/initiate", response_model=PaymentInitiateResponse)
async def initiate_payment(request: PaymentInitiateRequest, http_request: Request):
    """Initiate payment for a booking"""
    try:
        # Get booking details
        booking_data = await db.bookings.find_one({"id": request.booking_id})
        if not booking_data:
            raise HTTPException(status_code=404, detail="Buchung nicht gefunden")
        
        booking = Booking(**booking_data)
        
        # Check if booking already has a payment
        existing_transaction = await db.payment_transactions.find_one({
            "booking_id": request.booking_id,
            "payment_status": {"$in": ["completed", "processing"]}
        })
        
        if existing_transaction:
            raise HTTPException(
                status_code=400, 
                detail="Zahlung für diese Buchung bereits vorhanden oder in Bearbeitung"
            )
        
        # Calculate payment amount dynamically based on booking details
        if hasattr(booking, 'estimated_fare') and booking.estimated_fare:
            payment_amount = float(booking.estimated_fare)
        else:
            # Calculate price using same logic as price calculator
            distance_result = await google_maps_service.calculate_real_distance(
                origin=booking.pickup_location,
                destination=booking.destination
            )
            
            # Apply vehicle multiplier from booking service
            from booking_service import BookingService
            booking_service_instance = BookingService()
            
            base_fare = 6.60
            distance_rate = 4.20
            distance_km = distance_result['distance_km']
            base_total = base_fare + (distance_km * distance_rate)
            
            # Apply vehicle type multiplier
            vehicle_multiplier = booking_service_instance.vehicle_multipliers.get(booking.vehicle_type, 1.0)
            payment_amount = base_total * vehicle_multiplier
        
        # Create payment transaction
        payment_data = PaymentTransactionCreate(
            booking_id=request.booking_id,
            customer_email=booking.customer_email,
            amount=payment_amount,
            currency="CHF",
            payment_method=request.payment_method,
            metadata={
                "pickup_location": booking.pickup_location,
                "destination": booking.destination,
                "vehicle_type": booking.vehicle_type
            }
        )
        
        transaction = await payment_service.create_payment_transaction(payment_data)
        
        # Initiate payment based on method
        if request.payment_method in ["stripe", "twint"]:
            return await payment_service.initiate_stripe_payment(transaction, http_request)
        elif request.payment_method == "paypal":
            return await payment_service.initiate_paypal_payment(transaction, http_request)
        else:
            raise HTTPException(status_code=400, detail="Unbekannte Zahlungsmethode")
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Payment initiation failed: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Zahlung konnte nicht initialisiert werden"
        )

@api_router.get("/payments/status/{session_id}", response_model=PaymentStatusResponse)
async def get_payment_status(session_id: str):
    """Get payment status by session ID"""
    try:
        status = await payment_service.check_payment_status(session_id)
        if not status:
            raise HTTPException(status_code=404, detail="Zahlungsstatus nicht gefunden")
        
        return status
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get payment status: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler beim Abrufen des Zahlungsstatus")

@api_router.post("/webhooks/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events"""
    try:
        from emergentintegrations.payments.stripe.checkout import StripeCheckout
        
        stripe_api_key = os.getenv('STRIPE_API_KEY')
        if not stripe_api_key:
            raise HTTPException(status_code=500, detail="Stripe API key not configured")
        
        # Get request body and headers
        webhook_body = await request.body()
        stripe_signature = request.headers.get("Stripe-Signature", "")
        
        # Initialize Stripe checkout
        stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url="")
        
        # Handle webhook
        webhook_response = await stripe_checkout.handle_webhook(webhook_body, stripe_signature)
        
        # Process webhook events
        if webhook_response.event_type == "checkout.session.completed":
            session_id = webhook_response.session_id
            
            # Find and update transaction
            transaction_data = await db.payment_transactions.find_one({"session_id": session_id})
            if transaction_data:
                transaction = PaymentTransaction(**transaction_data)
                
                # Update payment status
                await payment_service.update_payment_status(transaction.id, "completed")
                
                # Update booking status
                await db.bookings.update_one(
                    {"id": transaction.booking_id},
                    {
                        "$set": {
                            "payment_status": "confirmed",
                            "updated_at": get_swiss_time()
                        }
                    }
                )
                
                logger.info(f"Payment completed for booking {transaction.booking_id}")
        
        return {"status": "success", "event_type": webhook_response.event_type}
        
    except Exception as e:
        logger.error(f"Webhook processing failed: {str(e)}")
        return {"status": "error", "message": str(e)}

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

@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    # Starte den Task Scheduler für Bewertungserinnerungen
    asyncio.create_task(task_scheduler.start_scheduler())
    logger.info("Task Scheduler für Bewertungserinnerungen gestartet")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    await task_scheduler.stop_scheduler()
    logger.info("Task Scheduler gestoppt")
    client.close()
    logger.info("Database client closed")
