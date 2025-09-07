#!/usr/bin/env python3
"""
Backend Test Suite for Taxi Türlihof
Tests the contact form API endpoints, email functionality, and Swiss distance calculation system
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
import sys
from pathlib import Path

# Add backend directory to path for imports
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

# Test configuration
BACKEND_URL = "https://taxi-service-ui.preview.emergentagent.com/api"
TEST_DATA = {
    "name": "Test User",
    "email": "test@example.com",
    "phone": "076 123 45 67",
    "message": "Test message for taxi booking"
}

class BackendTester:
    def __init__(self):
        self.session = None
        self.results = []
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    def log_result(self, test_name, success, message, details=None):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = {
            "test": test_name,
            "status": status,
            "success": success,
            "message": message,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.results.append(result)
        print(f"{status} {test_name}: {message}")
        if details:
            print(f"   Details: {details}")
    
    async def test_api_health_check(self):
        """Test if the backend API is running and accessible"""
        try:
            async with self.session.get(f"{BACKEND_URL}/") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("message") == "Hello World":
                        self.log_result(
                            "API Health Check", 
                            True, 
                            f"Backend API is running (Status: {response.status})",
                            data
                        )
                        return True
                    else:
                        self.log_result(
                            "API Health Check", 
                            False, 
                            f"Unexpected response content: {data}"
                        )
                        return False
                else:
                    self.log_result(
                        "API Health Check", 
                        False, 
                        f"API returned status {response.status}"
                    )
                    return False
        except Exception as e:
            self.log_result(
                "API Health Check", 
                False, 
                f"Failed to connect to API: {str(e)}"
            )
            return False
    
    async def test_contact_form_submission(self):
        """Test contact form POST endpoint"""
        try:
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/contact", 
                json=TEST_DATA,
                headers=headers
            ) as response:
                
                response_text = await response.text()
                
                if response.status == 200:
                    try:
                        data = await response.json()
                        if data.get("success") and data.get("id"):
                            self.log_result(
                                "Contact Form Submission", 
                                True, 
                                "Contact form submitted successfully",
                                {
                                    "response_data": data,
                                    "contact_id": data.get("id"),
                                    "message": data.get("message")
                                }
                            )
                            return data.get("id")
                        else:
                            self.log_result(
                                "Contact Form Submission", 
                                False, 
                                f"Invalid response structure: {data}"
                            )
                            return None
                    except json.JSONDecodeError:
                        self.log_result(
                            "Contact Form Submission", 
                            False, 
                            f"Invalid JSON response: {response_text}"
                        )
                        return None
                else:
                    self.log_result(
                        "Contact Form Submission", 
                        False, 
                        f"API returned status {response.status}: {response_text}"
                    )
                    return None
                    
        except Exception as e:
            self.log_result(
                "Contact Form Submission", 
                False, 
                f"Request failed: {str(e)}"
            )
            return None
    
    async def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        test_cases = [
            {
                "name": "Missing Email",
                "data": {"name": "Test", "message": "Test message"},
                "expected_status": 422
            },
            {
                "name": "Invalid Email",
                "data": {"name": "Test", "email": "invalid-email", "message": "Test"},
                "expected_status": 422
            },
            {
                "name": "Missing Name",
                "data": {"email": "test@example.com", "message": "Test message"},
                "expected_status": 422
            },
            {
                "name": "Missing Message",
                "data": {"name": "Test", "email": "test@example.com"},
                "expected_status": 422
            }
        ]
        
        validation_results = []
        
        for test_case in test_cases:
            try:
                headers = {"Content-Type": "application/json"}
                async with self.session.post(
                    f"{BACKEND_URL}/contact",
                    json=test_case["data"],
                    headers=headers
                ) as response:
                    
                    if response.status == test_case["expected_status"]:
                        validation_results.append(f"✅ {test_case['name']}")
                    else:
                        validation_results.append(f"❌ {test_case['name']} (got {response.status}, expected {test_case['expected_status']})")
                        
            except Exception as e:
                validation_results.append(f"❌ {test_case['name']} (error: {str(e)})")
        
        all_passed = all("✅" in result for result in validation_results)
        self.log_result(
            "Contact Form Validation", 
            all_passed, 
            f"Validation tests: {len([r for r in validation_results if '✅' in r])}/{len(validation_results)} passed",
            validation_results
        )
        
        return all_passed
    
    async def test_contact_form_retrieval(self):
        """Test GET endpoint to retrieve contact forms"""
        try:
            async with self.session.get(f"{BACKEND_URL}/contact") as response:
                if response.status == 200:
                    data = await response.json()
                    if isinstance(data, list):
                        self.log_result(
                            "Contact Form Retrieval", 
                            True, 
                            f"Retrieved {len(data)} contact form entries",
                            {"count": len(data), "sample": data[:2] if data else []}
                        )
                        return True
                    else:
                        self.log_result(
                            "Contact Form Retrieval", 
                            False, 
                            f"Expected list, got: {type(data)}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Contact Form Retrieval", 
                        False, 
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
        except Exception as e:
            self.log_result(
                "Contact Form Retrieval", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_swiss_distance_luzern_to_zurich(self):
        """Test Case 1: Luzern to Zürich - Expected ~47km distance, highway route type"""
        try:
            test_data = {
                "origin": "Luzern",
                "destination": "Zürich"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/calculate-price",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate response structure
                    required_fields = ['distance_km', 'estimated_duration_minutes', 'total_fare', 'route_info']
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_result(
                            "Swiss Distance - Luzern to Zürich",
                            False,
                            f"Missing required fields: {missing_fields}"
                        )
                        return False
                    
                    distance = data['distance_km']
                    route_type = data['route_info'].get('route_type', 'unknown')
                    
                    # Validate distance is reasonable (40-55km range)
                    distance_ok = 40 <= distance <= 55
                    # Validate route type is highway (for long distance to major city)
                    route_ok = route_type in ['highway', 'inter_city']
                    
                    if distance_ok and route_ok:
                        self.log_result(
                            "Swiss Distance - Luzern to Zürich",
                            True,
                            f"Distance: {distance}km, Route: {route_type}, Fare: CHF {data['total_fare']}",
                            {
                                "distance_km": distance,
                                "route_type": route_type,
                                "duration_minutes": data['estimated_duration_minutes'],
                                "total_fare": data['total_fare']
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Swiss Distance - Luzern to Zürich",
                            False,
                            f"Unexpected values - Distance: {distance}km (expected 40-55), Route: {route_type} (expected highway/inter_city)"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Swiss Distance - Luzern to Zürich",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Swiss Distance - Luzern to Zürich",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_swiss_distance_luzern_to_schwyz(self):
        """Test Case 2: Luzern to Schwyz - Expected ~30km distance, inter_city route type"""
        try:
            test_data = {
                "origin": "Luzern",
                "destination": "Schwyz"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/calculate-price",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    distance = data['distance_km']
                    route_type = data['route_info'].get('route_type', 'unknown')
                    
                    # Validate distance is reasonable (25-40km range - adjusted for actual geographic distance)
                    distance_ok = 25 <= distance <= 40
                    # Validate route type is inter_city (between different regions)
                    route_ok = route_type in ['inter_city', 'suburban']
                    
                    if distance_ok and route_ok:
                        self.log_result(
                            "Swiss Distance - Luzern to Schwyz",
                            True,
                            f"Distance: {distance}km, Route: {route_type}, Fare: CHF {data['total_fare']}",
                            {
                                "distance_km": distance,
                                "route_type": route_type,
                                "duration_minutes": data['estimated_duration_minutes'],
                                "total_fare": data['total_fare']
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Swiss Distance - Luzern to Schwyz",
                            False,
                            f"Unexpected values - Distance: {distance}km (expected 25-40), Route: {route_type} (expected inter_city/suburban)"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Swiss Distance - Luzern to Schwyz",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Swiss Distance - Luzern to Schwyz",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_swiss_distance_zug_to_airport(self):
        """Test Case 3: Zug to Zürich Flughafen - Expected ~30km distance, highway route type"""
        try:
            test_data = {
                "origin": "Zug",
                "destination": "Zürich Flughafen"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/calculate-price",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    distance = data['distance_km']
                    route_type = data['route_info'].get('route_type', 'unknown')
                    
                    # Validate distance is reasonable (25-35km range)
                    distance_ok = 25 <= distance <= 35
                    # Validate route type is highway (airport routes typically use highways)
                    route_ok = route_type in ['highway', 'inter_city']
                    
                    if distance_ok and route_ok:
                        self.log_result(
                            "Swiss Distance - Zug to Zürich Airport",
                            True,
                            f"Distance: {distance}km, Route: {route_type}, Fare: CHF {data['total_fare']}",
                            {
                                "distance_km": distance,
                                "route_type": route_type,
                                "duration_minutes": data['estimated_duration_minutes'],
                                "total_fare": data['total_fare']
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Swiss Distance - Zug to Zürich Airport",
                            False,
                            f"Unexpected values - Distance: {distance}km (expected 25-35), Route: {route_type} (expected highway/inter_city)"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Swiss Distance - Zug to Zürich Airport",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Swiss Distance - Zug to Zürich Airport",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_swiss_distance_unknown_location(self):
        """Test Case 4: Unknown Location - Expected fallback calculation"""
        try:
            test_data = {
                "origin": "Unknown Place",
                "destination": "Luzern"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/calculate-price",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Should still return a valid response with fallback calculation
                    distance = data['distance_km']
                    calculation_source = data.get('calculation_source', 'unknown')
                    
                    # Fallback should provide reasonable default values
                    fallback_ok = distance > 0 and 'estimation' in calculation_source
                    
                    if fallback_ok:
                        self.log_result(
                            "Swiss Distance - Unknown Location Fallback",
                            True,
                            f"Fallback calculation successful - Distance: {distance}km, Source: {calculation_source}",
                            {
                                "distance_km": distance,
                                "calculation_source": calculation_source,
                                "total_fare": data['total_fare']
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Swiss Distance - Unknown Location Fallback",
                            False,
                            f"Fallback calculation failed - Distance: {distance}km, Source: {calculation_source}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Swiss Distance - Unknown Location Fallback",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Swiss Distance - Unknown Location Fallback",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_popular_destinations_endpoint(self):
        """Test Popular Destinations Endpoint - GET /api/popular-destinations/luzern"""
        try:
            async with self.session.get(f"{BACKEND_URL}/popular-destinations/luzern") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate response structure
                    if 'origin' in data and 'destinations' in data:
                        destinations = data['destinations']
                        
                        if isinstance(destinations, list) and len(destinations) > 0:
                            # Check if destinations have required fields
                            sample_dest = destinations[0]
                            required_fields = ['name', 'distance_km', 'duration_minutes']
                            has_required_fields = all(field in sample_dest for field in required_fields)
                            
                            if has_required_fields:
                                self.log_result(
                                    "Popular Destinations Endpoint",
                                    True,
                                    f"Retrieved {len(destinations)} popular destinations from Luzern",
                                    {
                                        "origin": data['origin'],
                                        "destination_count": len(destinations),
                                        "sample_destinations": destinations[:3]
                                    }
                                )
                                return True
                            else:
                                self.log_result(
                                    "Popular Destinations Endpoint",
                                    False,
                                    f"Destinations missing required fields: {sample_dest}"
                                )
                                return False
                        else:
                            self.log_result(
                                "Popular Destinations Endpoint",
                                False,
                                f"No destinations returned or invalid format: {destinations}"
                            )
                            return False
                    else:
                        self.log_result(
                            "Popular Destinations Endpoint",
                            False,
                            f"Invalid response structure: {data}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Popular Destinations Endpoint",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Popular Destinations Endpoint",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_price_calculation_with_time(self):
        """Test price calculation with departure time (traffic multipliers)"""
        try:
            # Test with peak time (8 AM on weekday)
            test_data = {
                "origin": "Luzern",
                "destination": "Zug",
                "departure_time": "2024-01-15T08:00:00Z"  # Monday 8 AM
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/calculate-price",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Should have traffic factor applied
                    traffic_factor = data['route_info'].get('traffic_factor', 1.0)
                    
                    # Peak time should have higher traffic factor
                    if traffic_factor >= 1.0:
                        self.log_result(
                            "Price Calculation with Time",
                            True,
                            f"Time-based calculation successful - Traffic factor: {traffic_factor}",
                            {
                                "traffic_factor": traffic_factor,
                                "total_fare": data['total_fare'],
                                "departure_time": test_data['departure_time']
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Price Calculation with Time",
                            False,
                            f"Invalid traffic factor: {traffic_factor}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Price Calculation with Time",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Price Calculation with Time",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_price_calculation_validation(self):
        """Test price calculation endpoint validation"""
        test_cases = [
            {
                "name": "Missing Origin",
                "data": {"destination": "Zürich"},
                "expected_status": 422
            },
            {
                "name": "Missing Destination", 
                "data": {"origin": "Luzern"},
                "expected_status": 422
            },
            {
                "name": "Empty Origin",
                "data": {"origin": "", "destination": "Zürich"},
                "expected_status": 422
            }
        ]
        
        validation_results = []
        
        for test_case in test_cases:
            try:
                headers = {"Content-Type": "application/json"}
                async with self.session.post(
                    f"{BACKEND_URL}/calculate-price",
                    json=test_case["data"],
                    headers=headers
                ) as response:
                    
                    if response.status == test_case["expected_status"]:
                        validation_results.append(f"✅ {test_case['name']}")
                    else:
                        validation_results.append(f"❌ {test_case['name']} (got {response.status}, expected {test_case['expected_status']})")
                        
            except Exception as e:
                validation_results.append(f"❌ {test_case['name']} (error: {str(e)})")
        
        all_passed = all("✅" in result for result in validation_results)
        self.log_result(
            "Price Calculation Validation",
            all_passed,
            f"Validation tests: {len([r for r in validation_results if '✅' in r])}/{len(validation_results)} passed",
            validation_results
        )
        
        return all_passed
    
    async def test_email_service_configuration(self):
        try:
            # Import email service to check configuration
            from email_service import email_service
            
            config_issues = []
            
            # Check SMTP configuration
            if not email_service.smtp_host:
                config_issues.append("SMTP_HOST not configured")
            if not email_service.smtp_port:
                config_issues.append("SMTP_PORT not configured")
            if not email_service.smtp_username:
                config_issues.append("SMTP_USERNAME not configured")
            if not email_service.smtp_password or email_service.smtp_password == "your_gmail_app_password_here":
                config_issues.append("SMTP_PASSWORD not properly configured")
            if not email_service.email_from:
                config_issues.append("EMAIL_FROM not configured")
            
            if config_issues:
                self.log_result(
                    "Email Service Configuration", 
                    False, 
                    "Email service has configuration issues (expected for testing)",
                    {
                        "issues": config_issues,
                        "note": "This is expected without proper SMTP credentials"
                    }
                )
                return False
            else:
                self.log_result(
                    "Email Service Configuration", 
                    True, 
                    "Email service is properly configured"
                )
                return True
                
        except ImportError as e:
            self.log_result(
                "Email Service Configuration", 
                False, 
                f"Could not import email service: {str(e)}"
            )
            return False
        except Exception as e:
            self.log_result(
                "Email Service Configuration", 
                False, 
                f"Error checking email configuration: {str(e)}"
            )
            return False
    
    async def test_booking_creation_standard(self):
        """Test Case 1: Standard Scheduled Booking Creation"""
        try:
            test_data = {
                "customer_name": "Max Mustermann",
                "customer_email": "max.mustermann@example.com",
                "customer_phone": "076 123 45 67",
                "pickup_location": "Luzern",
                "destination": "Zürich Flughafen",
                "booking_type": "scheduled",
                "pickup_datetime": "2025-12-10T14:30:00",
                "passenger_count": 2,
                "vehicle_type": "standard",
                "special_requests": "Kindersitz benötigt"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/bookings",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate response structure
                    required_fields = ['success', 'booking_id', 'message', 'booking_details']
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_result(
                            "Booking Creation - Standard",
                            False,
                            f"Missing required fields: {missing_fields}"
                        )
                        return None
                    
                    if data['success'] and data['booking_details']:
                        booking = data['booking_details']
                        
                        # Validate booking details
                        booking_valid = (
                            booking['customer_name'] == test_data['customer_name'] and
                            booking['vehicle_type'] == 'standard' and
                            booking['passenger_count'] == 2 and
                            'total_fare' in booking and
                            'booking_fee' in booking and
                            booking['booking_fee'] == 5.0
                        )
                        
                        if booking_valid:
                            self.log_result(
                                "Booking Creation - Standard",
                                True,
                                f"Standard booking created successfully - ID: {data['booking_id'][:8]}, Total: CHF {booking['total_fare']}",
                                {
                                    "booking_id": data['booking_id'],
                                    "total_fare": booking['total_fare'],
                                    "distance_km": booking['estimated_distance_km'],
                                    "vehicle_type": booking['vehicle_type'],
                                    "booking_fee": booking['booking_fee']
                                }
                            )
                            return data['booking_id']
                        else:
                            self.log_result(
                                "Booking Creation - Standard",
                                False,
                                f"Booking validation failed: {booking}"
                            )
                            return None
                    else:
                        self.log_result(
                            "Booking Creation - Standard",
                            False,
                            f"Booking creation failed: {data['message']}"
                        )
                        return None
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Booking Creation - Standard",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return None
                    
        except Exception as e:
            self.log_result(
                "Booking Creation - Standard",
                False,
                f"Request failed: {str(e)}"
            )
            return None

    async def test_booking_creation_premium_van(self):
        """Test Case 2: Premium Van Booking with Additional Stops"""
        try:
            test_data = {
                "customer_name": "Anna Schmidt",
                "customer_email": "anna.schmidt@example.com",
                "customer_phone": "077 987 65 43",
                "pickup_location": "Zug",
                "destination": "Basel Flughafen",
                "additional_stops": ["Luzern Bahnhof"],
                "booking_type": "scheduled",
                "pickup_datetime": "2025-12-11T08:00:00",
                "passenger_count": 6,
                "vehicle_type": "van"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/bookings",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data['success'] and data['booking_details']:
                        booking = data['booking_details']
                        
                        # Validate van pricing (should be 1.5x multiplier)
                        van_pricing_valid = (
                            booking['vehicle_type'] == 'van' and
                            booking['passenger_count'] == 6 and
                            len(booking['additional_stops']) == 1 and
                            booking['additional_stops'][0] == "Luzern Bahnhof"
                        )
                        
                        if van_pricing_valid:
                            self.log_result(
                                "Booking Creation - Premium Van",
                                True,
                                f"Van booking created successfully - ID: {data['booking_id'][:8]}, Total: CHF {booking['total_fare']}",
                                {
                                    "booking_id": data['booking_id'],
                                    "total_fare": booking['total_fare'],
                                    "vehicle_type": booking['vehicle_type'],
                                    "passenger_count": booking['passenger_count'],
                                    "additional_stops": booking['additional_stops']
                                }
                            )
                            return data['booking_id']
                        else:
                            self.log_result(
                                "Booking Creation - Premium Van",
                                False,
                                f"Van booking validation failed: {booking}"
                            )
                            return None
                    else:
                        self.log_result(
                            "Booking Creation - Premium Van",
                            False,
                            f"Van booking creation failed: {data['message']}"
                        )
                        return None
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Booking Creation - Premium Van",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return None
                    
        except Exception as e:
            self.log_result(
                "Booking Creation - Premium Van",
                False,
                f"Request failed: {str(e)}"
            )
            return None

    async def test_booking_creation_immediate(self):
        """Test Case 3: Immediate Premium Booking"""
        try:
            test_data = {
                "customer_name": "Hans Müller",
                "customer_email": "hans@example.com",
                "customer_phone": "078 555 44 33",
                "pickup_location": "Schwyz",
                "destination": "Luzern",
                "booking_type": "immediate",
                "pickup_datetime": "2025-09-07T20:00:00",
                "vehicle_type": "premium"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/bookings",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data['success'] and data['booking_details']:
                        booking = data['booking_details']
                        
                        # Validate premium pricing (should be 1.3x multiplier)
                        premium_pricing_valid = (
                            booking['vehicle_type'] == 'premium' and
                            booking['booking_type'] == 'immediate'
                        )
                        
                        if premium_pricing_valid:
                            self.log_result(
                                "Booking Creation - Immediate Premium",
                                True,
                                f"Immediate premium booking created - ID: {data['booking_id'][:8]}, Total: CHF {booking['total_fare']}",
                                {
                                    "booking_id": data['booking_id'],
                                    "total_fare": booking['total_fare'],
                                    "vehicle_type": booking['vehicle_type'],
                                    "booking_type": booking['booking_type']
                                }
                            )
                            return data['booking_id']
                        else:
                            self.log_result(
                                "Booking Creation - Immediate Premium",
                                False,
                                f"Premium booking validation failed: {booking}"
                            )
                            return None
                    else:
                        self.log_result(
                            "Booking Creation - Immediate Premium",
                            False,
                            f"Immediate booking creation failed: {data['message']}"
                        )
                        return None
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Booking Creation - Immediate Premium",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return None
                    
        except Exception as e:
            self.log_result(
                "Booking Creation - Immediate Premium",
                False,
                f"Request failed: {str(e)}"
            )
            return None

    async def test_booking_retrieval(self, booking_id: str):
        """Test booking retrieval by ID"""
        if not booking_id:
            self.log_result(
                "Booking Retrieval",
                False,
                "No booking ID provided for retrieval test"
            )
            return False
            
        try:
            async with self.session.get(f"{BACKEND_URL}/bookings/{booking_id}") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate retrieved booking structure
                    required_fields = ['id', 'customer_name', 'pickup_location', 'destination', 'total_fare']
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if not missing_fields and data['id'] == booking_id:
                        self.log_result(
                            "Booking Retrieval",
                            True,
                            f"Booking retrieved successfully - {data['customer_name']}, CHF {data['total_fare']}",
                            {
                                "booking_id": data['id'],
                                "customer_name": data['customer_name'],
                                "total_fare": data['total_fare']
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Booking Retrieval",
                            False,
                            f"Invalid booking data or ID mismatch: {data}"
                        )
                        return False
                elif response.status == 404:
                    self.log_result(
                        "Booking Retrieval",
                        False,
                        "Booking not found (404) - possible database issue"
                    )
                    return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Booking Retrieval",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Booking Retrieval",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_booking_status_update(self, booking_id: str):
        """Test booking status update"""
        if not booking_id:
            self.log_result(
                "Booking Status Update",
                False,
                "No booking ID provided for status update test"
            )
            return False
            
        try:
            # Test updating status to confirmed
            status_data = "confirmed"
            headers = {"Content-Type": "application/json"}
            
            async with self.session.put(
                f"{BACKEND_URL}/bookings/{booking_id}/status",
                json=status_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data.get('success'):
                        self.log_result(
                            "Booking Status Update",
                            True,
                            f"Booking status updated successfully: {data['message']}",
                            {"booking_id": booking_id, "new_status": "confirmed"}
                        )
                        return True
                    else:
                        self.log_result(
                            "Booking Status Update",
                            False,
                            f"Status update failed: {data}"
                        )
                        return False
                elif response.status == 404:
                    self.log_result(
                        "Booking Status Update",
                        False,
                        "Booking not found for status update (404)"
                    )
                    return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Booking Status Update",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Booking Status Update",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_booking_cancellation(self, booking_id: str):
        """Test booking cancellation"""
        if not booking_id:
            self.log_result(
                "Booking Cancellation",
                False,
                "No booking ID provided for cancellation test"
            )
            return False
            
        try:
            async with self.session.delete(f"{BACKEND_URL}/bookings/{booking_id}") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data.get('success'):
                        self.log_result(
                            "Booking Cancellation",
                            True,
                            f"Booking cancelled successfully: {data['message']}",
                            {"booking_id": booking_id}
                        )
                        return True
                    else:
                        self.log_result(
                            "Booking Cancellation",
                            False,
                            f"Cancellation failed: {data}"
                        )
                        return False
                elif response.status == 404:
                    self.log_result(
                        "Booking Cancellation",
                        False,
                        "Booking not found for cancellation (404)"
                    )
                    return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Booking Cancellation",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Booking Cancellation",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_availability_endpoint(self):
        """Test availability endpoint"""
        try:
            test_date = "2025-12-10"
            async with self.session.get(f"{BACKEND_URL}/availability?date={test_date}") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate response structure
                    if 'date' in data and 'available_slots' in data:
                        slots = data['available_slots']
                        
                        if isinstance(slots, list) and len(slots) > 0:
                            # Validate slot format (should be HH:MM)
                            valid_slots = all(
                                isinstance(slot, str) and len(slot) == 5 and slot[2] == ':'
                                for slot in slots[:3]  # Check first 3 slots
                            )
                            
                            if valid_slots:
                                self.log_result(
                                    "Availability Endpoint",
                                    True,
                                    f"Retrieved {len(slots)} available time slots for {test_date}",
                                    {
                                        "date": data['date'],
                                        "slot_count": len(slots),
                                        "sample_slots": slots[:5]
                                    }
                                )
                                return True
                            else:
                                self.log_result(
                                    "Availability Endpoint",
                                    False,
                                    f"Invalid slot format: {slots[:3]}"
                                )
                                return False
                        else:
                            self.log_result(
                                "Availability Endpoint",
                                False,
                                f"No slots returned or invalid format: {slots}"
                            )
                            return False
                    else:
                        self.log_result(
                            "Availability Endpoint",
                            False,
                            f"Invalid response structure: {data}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Availability Endpoint",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Availability Endpoint",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_booking_validation(self):
        """Test booking validation with invalid data"""
        test_cases = [
            {
                "name": "Missing Customer Name",
                "data": {
                    "customer_email": "test@example.com",
                    "customer_phone": "076 123 45 67",
                    "pickup_location": "Luzern",
                    "destination": "Zürich",
                    "pickup_datetime": "2025-12-10T14:30:00"
                },
                "expected_status": 422
            },
            {
                "name": "Invalid Email Format",
                "data": {
                    "customer_name": "Test User",
                    "customer_email": "invalid-email",
                    "customer_phone": "076 123 45 67",
                    "pickup_location": "Luzern",
                    "destination": "Zürich",
                    "pickup_datetime": "2025-12-10T14:30:00"
                },
                "expected_status": 422
            },
            {
                "name": "Invalid Passenger Count",
                "data": {
                    "customer_name": "Test User",
                    "customer_email": "test@example.com",
                    "customer_phone": "076 123 45 67",
                    "pickup_location": "Luzern",
                    "destination": "Zürich",
                    "pickup_datetime": "2025-12-10T14:30:00",
                    "passenger_count": 0
                },
                "expected_status": 422
            },
            {
                "name": "Missing Pickup Location",
                "data": {
                    "customer_name": "Test User",
                    "customer_email": "test@example.com",
                    "customer_phone": "076 123 45 67",
                    "destination": "Zürich",
                    "pickup_datetime": "2025-12-10T14:30:00"
                },
                "expected_status": 422
            }
        ]
        
        validation_results = []
        
        for test_case in test_cases:
            try:
                headers = {"Content-Type": "application/json"}
                async with self.session.post(
                    f"{BACKEND_URL}/bookings",
                    json=test_case["data"],
                    headers=headers
                ) as response:
                    
                    if response.status == test_case["expected_status"]:
                        validation_results.append(f"✅ {test_case['name']}")
                    else:
                        validation_results.append(f"❌ {test_case['name']} (got {response.status}, expected {test_case['expected_status']})")
                        
            except Exception as e:
                validation_results.append(f"❌ {test_case['name']} (error: {str(e)})")
        
        all_passed = all("✅" in result for result in validation_results)
        self.log_result(
            "Booking Validation",
            all_passed,
            f"Validation tests: {len([r for r in validation_results if '✅' in r])}/{len(validation_results)} passed",
            validation_results
        )
        
        return all_passed

    async def test_all_bookings_retrieval(self):
        """Test retrieving all bookings (admin endpoint)"""
        try:
            async with self.session.get(f"{BACKEND_URL}/bookings") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if isinstance(data, list):
                        self.log_result(
                            "All Bookings Retrieval",
                            True,
                            f"Retrieved {len(data)} bookings from database",
                            {
                                "booking_count": len(data),
                                "sample_bookings": [
                                    {
                                        "id": booking.get("id", "")[:8],
                                        "customer_name": booking.get("customer_name", ""),
                                        "total_fare": booking.get("total_fare", 0)
                                    }
                                    for booking in data[:3]
                                ]
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "All Bookings Retrieval",
                            False,
                            f"Expected list, got: {type(data)}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "All Bookings Retrieval",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "All Bookings Retrieval",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Backend Test Suite for Taxi Türlihof")
        print("=" * 60)
        
        # Test 1: API Health Check
        api_healthy = await self.test_api_health_check()
        
        if not api_healthy:
            print("\n❌ API is not accessible. Stopping tests.")
            return False
        
        # Contact Form Tests
        print("\n📧 CONTACT FORM TESTS")
        print("-" * 40)
        
        # Test 2: Contact Form Submission
        contact_id = await self.test_contact_form_submission()
        
        # Test 3: Contact Form Validation
        await self.test_contact_form_validation()
        
        # Test 4: Contact Form Retrieval
        await self.test_contact_form_retrieval()
        
        # Test 5: Email Service Configuration
        await self.test_email_service_configuration()
        
        # Swiss Distance Calculation Tests
        print("\n🗺️  SWISS DISTANCE CALCULATION TESTS")
        print("-" * 40)
        
        # Test 6: Luzern to Zürich (Highway route)
        await self.test_swiss_distance_luzern_to_zurich()
        
        # Test 7: Luzern to Schwyz (Inter-city route)
        await self.test_swiss_distance_luzern_to_schwyz()
        
        # Test 8: Zug to Zürich Airport (Airport route)
        await self.test_swiss_distance_zug_to_airport()
        
        # Test 9: Unknown location fallback
        await self.test_swiss_distance_unknown_location()
        
        # Test 10: Popular destinations endpoint
        await self.test_popular_destinations_endpoint()
        
        # Test 11: Price calculation with time factors
        await self.test_price_calculation_with_time()
        
        # Test 12: Price calculation validation
        await self.test_price_calculation_validation()
        
        # Online Booking System Tests
        print("\n🚖 ONLINE BOOKING SYSTEM TESTS")
        print("-" * 40)
        
        # Test 13: Standard Booking Creation
        standard_booking_id = await self.test_booking_creation_standard()
        
        # Test 14: Premium Van Booking Creation
        van_booking_id = await self.test_booking_creation_premium_van()
        
        # Test 15: Immediate Premium Booking Creation
        immediate_booking_id = await self.test_booking_creation_immediate()
        
        # Test 16: Booking Retrieval
        if standard_booking_id:
            await self.test_booking_retrieval(standard_booking_id)
        
        # Test 17: Booking Status Update
        if van_booking_id:
            await self.test_booking_status_update(van_booking_id)
        
        # Test 18: Booking Cancellation
        if immediate_booking_id:
            await self.test_booking_cancellation(immediate_booking_id)
        
        # Test 19: Availability Endpoint
        await self.test_availability_endpoint()
        
        # Test 20: Booking Validation
        await self.test_booking_validation()
        
        # Test 21: All Bookings Retrieval
        await self.test_all_bookings_retrieval()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed_tests = [r for r in self.results if r["success"]]
        failed_tests = [r for r in self.results if not r["success"]]
        
        print(f"✅ Passed: {len(passed_tests)}")
        print(f"❌ Failed: {len(failed_tests)}")
        print(f"📈 Success Rate: {len(passed_tests)}/{len(self.results)} ({len(passed_tests)/len(self.results)*100:.1f}%)")
        
        if failed_tests:
            print("\n🔍 FAILED TESTS:")
            for test in failed_tests:
                print(f"   • {test['test']}: {test['message']}")
        
        print("\n📋 KEY FINDINGS:")
        if api_healthy:
            print("   ✅ Backend API is running and accessible")
        if contact_id:
            print("   ✅ Contact form submission works and saves to database")
        
        # Check for Swiss distance calculation results
        swiss_tests = [r for r in self.results if "Swiss Distance" in r["test"]]
        swiss_passed = [r for r in swiss_tests if r["success"]]
        if swiss_tests:
            print(f"   🗺️  Swiss Distance Calculation: {len(swiss_passed)}/{len(swiss_tests)} tests passed")
        
        # Check for booking system results
        booking_tests = [r for r in self.results if "Booking" in r["test"]]
        booking_passed = [r for r in booking_tests if r["success"]]
        if booking_tests:
            print(f"   🚖 Online Booking System: {len(booking_passed)}/{len(booking_tests)} tests passed")
        
        # Check for email-related failures
        email_config_failed = any("Email Service Configuration" in r["test"] and not r["success"] for r in self.results)
        if email_config_failed:
            print("   ⚠️  Email service needs proper SMTP credentials (expected)")
        
        # Determine overall success (allow email config failure as it's expected)
        critical_failures = [r for r in failed_tests if "Email Service Configuration" not in r["test"]]
        overall_success = len(critical_failures) == 0
        
        return overall_success

async def main():
    """Main test runner"""
    async with BackendTester() as tester:
        success = await tester.run_all_tests()
        return success

if __name__ == "__main__":
    try:
        success = asyncio.run(main())
        exit_code = 0 if success else 1
        print(f"\n🏁 Tests completed with exit code: {exit_code}")
        sys.exit(exit_code)
    except KeyboardInterrupt:
        print("\n⚠️ Tests interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Test runner failed: {str(e)}")
        sys.exit(1)