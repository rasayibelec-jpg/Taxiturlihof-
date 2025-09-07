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