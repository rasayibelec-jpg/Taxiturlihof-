#!/usr/bin/env python3
"""
Focused Backend Test Suite for Service Areas Removal Validation
Tests key endpoints: health check, booking system, admin authentication
"""

import asyncio
import aiohttp
import json
from datetime import datetime

# Test configuration
BACKEND_URL = "https://seo-landing-page-4.preview.emergentagent.com/api"

class FocusedBackendTester:
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
    
    async def test_health_check(self):
        """Test 1: Basic health check endpoint"""
        try:
            async with self.session.get(f"{BACKEND_URL}/") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("message") == "Hello World":
                        self.log_result(
                            "Health Check", 
                            True, 
                            f"Backend API is running (Status: {response.status})",
                            data
                        )
                        return True
                    else:
                        self.log_result(
                            "Health Check", 
                            False, 
                            f"Unexpected response content: {data}"
                        )
                        return False
                else:
                    self.log_result(
                        "Health Check", 
                        False, 
                        f"API returned status {response.status}"
                    )
                    return False
        except Exception as e:
            self.log_result(
                "Health Check", 
                False, 
                f"Failed to connect to API: {str(e)}"
            )
            return False
    
    async def test_admin_login(self):
        """Test 2: Admin authentication endpoint"""
        try:
            admin_data = {
                "username": "admin",
                "password": "TaxiTurlihof2025!"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/auth/admin/login",
                json=admin_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data.get('success') and data.get('token'):
                        self.log_result(
                            "Admin Login", 
                            True, 
                            "Admin login successful - JWT token received",
                            {
                                "success": data['success'],
                                "token_length": len(data['token']),
                                "expires_at": data.get('expires_at')
                            }
                        )
                        return data['token']
                    else:
                        self.log_result(
                            "Admin Login", 
                            False, 
                            f"Login failed: {data.get('message')}"
                        )
                        return None
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Admin Login", 
                        False, 
                        f"API returned status {response.status}: {response_text}"
                    )
                    return None
                    
        except Exception as e:
            self.log_result(
                "Admin Login", 
                False, 
                f"Request failed: {str(e)}"
            )
            return None
    
    async def test_booking_creation(self):
        """Test 3: Booking system endpoint"""
        try:
            test_data = {
                "customer_name": "Service Areas Test User",
                "customer_email": "test.service.areas@example.com",
                "customer_phone": "076 123 45 67",
                "pickup_location": "Luzern",
                "destination": "Zürich",
                "booking_type": "scheduled",
                "pickup_datetime": "2025-12-15T14:30:00",
                "passenger_count": 2,
                "vehicle_type": "standard",
                "special_requests": "Testing after service areas removal"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/bookings",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data.get('success') and data.get('booking_details'):
                        booking = data['booking_details']
                        self.log_result(
                            "Booking Creation", 
                            True, 
                            f"Booking created successfully - ID: {data['booking_id'][:8]}, Total: CHF {booking['total_fare']}",
                            {
                                "booking_id": data['booking_id'],
                                "total_fare": booking['total_fare'],
                                "customer_name": booking['customer_name'],
                                "status": booking.get('status', 'pending')
                            }
                        )
                        return data['booking_id']
                    else:
                        self.log_result(
                            "Booking Creation", 
                            False, 
                            f"Booking creation failed: {data.get('message')}"
                        )
                        return None
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Booking Creation", 
                        False, 
                        f"API returned status {response.status}: {response_text}"
                    )
                    return None
                    
        except Exception as e:
            self.log_result(
                "Booking Creation", 
                False, 
                f"Request failed: {str(e)}"
            )
            return None
    
    async def test_booking_retrieval(self, booking_id):
        """Test 4: Booking retrieval endpoint"""
        if not booking_id:
            self.log_result(
                "Booking Retrieval", 
                False, 
                "No booking ID provided"
            )
            return False
            
        try:
            async with self.session.get(f"{BACKEND_URL}/bookings/{booking_id}") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data.get('id') == booking_id:
                        self.log_result(
                            "Booking Retrieval", 
                            True, 
                            f"Booking retrieved successfully - {data['customer_name']}",
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
                            f"ID mismatch or invalid data: {data}"
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
    
    async def test_admin_bookings_access(self, admin_token):
        """Test 5: Admin bookings access with authentication"""
        if not admin_token:
            self.log_result(
                "Admin Bookings Access", 
                False, 
                "No admin token provided"
            )
            return False
            
        try:
            headers = {
                "Authorization": f"Bearer {admin_token}",
                "Content-Type": "application/json"
            }
            
            async with self.session.get(f"{BACKEND_URL}/bookings", headers=headers) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if isinstance(data, list):
                        self.log_result(
                            "Admin Bookings Access", 
                            True, 
                            f"Admin can access bookings - {len(data)} bookings retrieved",
                            {
                                "booking_count": len(data),
                                "sample_booking": data[0] if data else None
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Admin Bookings Access", 
                            False, 
                            f"Unexpected response format: {type(data)}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Admin Bookings Access", 
                        False, 
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Admin Bookings Access", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_price_calculation(self):
        """Test 6: Price calculation endpoint"""
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
                    
                    required_fields = ['distance_km', 'total_fare', 'route_info']
                    if all(field in data for field in required_fields):
                        self.log_result(
                            "Price Calculation", 
                            True, 
                            f"Price calculation working - Distance: {data['distance_km']}km, Fare: CHF {data['total_fare']}",
                            {
                                "distance_km": data['distance_km'],
                                "total_fare": data['total_fare'],
                                "calculation_source": data.get('calculation_source')
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Price Calculation", 
                            False, 
                            f"Missing required fields in response: {data}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Price Calculation", 
                        False, 
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Price Calculation", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_payment_methods(self):
        """Test 7: Payment methods endpoint"""
        try:
            async with self.session.get(f"{BACKEND_URL}/payment-methods") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if isinstance(data, list) and len(data) > 0:
                        payment_methods = [method.get('name') for method in data]
                        self.log_result(
                            "Payment Methods", 
                            True, 
                            f"Payment methods available: {', '.join(payment_methods)}",
                            {
                                "method_count": len(data),
                                "methods": payment_methods
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Payment Methods", 
                            False, 
                            f"No payment methods or invalid format: {data}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Payment Methods", 
                        False, 
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Payment Methods", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_availability_endpoint(self):
        """Test 8: Availability endpoint"""
        try:
            test_date = "2025-12-15"
            async with self.session.get(f"{BACKEND_URL}/availability?date={test_date}") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if 'available_slots' in data and isinstance(data['available_slots'], list):
                        self.log_result(
                            "Availability Endpoint", 
                            True, 
                            f"Availability check working - {len(data['available_slots'])} slots available for {test_date}",
                            {
                                "date": data.get('date'),
                                "slot_count": len(data['available_slots']),
                                "sample_slots": data['available_slots'][:3]
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Availability Endpoint", 
                            False, 
                            f"Invalid availability response: {data}"
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
    
    async def run_all_tests(self):
        """Run all focused tests"""
        print("🔍 FOCUSED BACKEND TESTING - Service Areas Removal Validation")
        print("=" * 70)
        
        # Test 1: Health Check
        await self.test_health_check()
        
        # Test 2: Admin Login
        admin_token = await self.test_admin_login()
        
        # Test 3: Booking Creation
        booking_id = await self.test_booking_creation()
        
        # Test 4: Booking Retrieval
        await self.test_booking_retrieval(booking_id)
        
        # Test 5: Admin Bookings Access
        await self.test_admin_bookings_access(admin_token)
        
        # Test 6: Price Calculation
        await self.test_price_calculation()
        
        # Test 7: Payment Methods
        await self.test_payment_methods()
        
        # Test 8: Availability
        await self.test_availability_endpoint()
        
        # Summary
        passed = sum(1 for result in self.results if result['success'])
        total = len(self.results)
        success_rate = (passed / total) * 100 if total > 0 else 0
        
        print("\n" + "=" * 70)
        print("📊 FOCUSED TEST SUMMARY")
        print("=" * 70)
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {total - passed}")
        print(f"📈 Success Rate: {passed}/{total} ({success_rate:.1f}%)")
        
        if passed < total:
            print(f"\n🔍 FAILED TESTS:")
            for result in self.results:
                if not result['success']:
                    print(f"   • {result['test']}: {result['message']}")
        
        return passed == total

async def main():
    async with FocusedBackendTester() as tester:
        success = await tester.run_all_tests()
        return 0 if success else 1

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    exit(exit_code)