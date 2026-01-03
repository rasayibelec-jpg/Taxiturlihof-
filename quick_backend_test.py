#!/usr/bin/env python3
"""
Quick Backend Test - Focused on specific endpoints as requested
Tests: /api/calculate-price, /api/bookings (POST), /api/availability
Uses existing example values, no permanent data changes
"""

import asyncio
import aiohttp
import json
from datetime import datetime, timedelta

# Test configuration
BACKEND_URL = "https://taxi-fix.preview.emergentagent.com/api"

class QuickBackendTester:
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
        """Quick health check of the backend API"""
        try:
            async with self.session.get(f"{BACKEND_URL}/") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("message") == "Hello World":
                        self.log_result(
                            "Health Check", 
                            True, 
                            f"Backend API is running (Status: {response.status})"
                        )
                        return True
                    else:
                        self.log_result(
                            "Health Check", 
                            False, 
                            f"Unexpected response: {data}"
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
                f"Failed to connect: {str(e)}"
            )
            return False
    
    async def test_calculate_price_endpoint(self):
        """Test /api/calculate-price endpoint with existing example values"""
        try:
            # Using existing test data from previous tests
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
                            "/api/calculate-price",
                            False,
                            f"Missing required fields: {missing_fields}"
                        )
                        return False
                    
                    distance = data['distance_km']
                    total_fare = data['total_fare']
                    
                    # Validate reasonable values
                    if distance > 0 and total_fare > 0:
                        self.log_result(
                            "/api/calculate-price",
                            True,
                            f"Price calculation successful - Distance: {distance}km, Fare: CHF {total_fare}",
                            {
                                "origin": data.get('origin'),
                                "destination": data.get('destination'),
                                "distance_km": distance,
                                "total_fare": total_fare,
                                "duration_minutes": data['estimated_duration_minutes']
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "/api/calculate-price",
                            False,
                            f"Invalid values - Distance: {distance}km, Fare: CHF {total_fare}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "/api/calculate-price",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "/api/calculate-price",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_bookings_post_endpoint(self):
        """Test /api/bookings POST endpoint with minimal payload"""
        try:
            # Minimal test booking data - using future date to avoid validation issues
            future_date = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%dT%H:%M:%S")
            
            test_data = {
                "customer_name": "Test Kunde",
                "customer_email": "test@example.com",
                "customer_phone": "076 123 45 67",
                "pickup_location": "Luzern",
                "destination": "Zug",
                "booking_type": "scheduled",
                "pickup_datetime": future_date,
                "passenger_count": 1,
                "vehicle_type": "standard"
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
                    required_fields = ['success', 'booking_id', 'message']
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_result(
                            "/api/bookings POST",
                            False,
                            f"Missing required fields: {missing_fields}"
                        )
                        return None
                    
                    if data['success'] and data['booking_id']:
                        booking_id = data['booking_id']
                        self.log_result(
                            "/api/bookings POST",
                            True,
                            f"Booking created successfully - ID: {booking_id[:8]}",
                            {
                                "booking_id": booking_id,
                                "customer_name": test_data['customer_name'],
                                "route": f"{test_data['pickup_location']} → {test_data['destination']}",
                                "message": data['message']
                            }
                        )
                        return booking_id
                    else:
                        self.log_result(
                            "/api/bookings POST",
                            False,
                            f"Booking creation failed: {data['message']}"
                        )
                        return None
                else:
                    response_text = await response.text()
                    self.log_result(
                        "/api/bookings POST",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return None
                    
        except Exception as e:
            self.log_result(
                "/api/bookings POST",
                False,
                f"Request failed: {str(e)}"
            )
            return None

    async def test_availability_endpoint(self):
        """Test /api/availability endpoint"""
        try:
            # Test with tomorrow's date
            tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
            
            async with self.session.get(f"{BACKEND_URL}/availability?date={tomorrow}") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate response structure
                    required_fields = ['date', 'available_slots']
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_result(
                            "/api/availability",
                            False,
                            f"Missing required fields: {missing_fields}"
                        )
                        return False
                    
                    available_slots = data['available_slots']
                    
                    if isinstance(available_slots, list):
                        self.log_result(
                            "/api/availability",
                            True,
                            f"Availability check successful - {len(available_slots)} slots available for {data['date']}",
                            {
                                "date": data['date'],
                                "slot_count": len(available_slots),
                                "sample_slots": available_slots[:5] if available_slots else []
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "/api/availability",
                            False,
                            f"Invalid available_slots format: {type(available_slots)}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "/api/availability",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "/api/availability",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def cleanup_test_booking(self, booking_id):
        """Clean up test booking if possible (optional)"""
        if not booking_id:
            return
            
        try:
            # Try to cancel the test booking to avoid permanent data
            async with self.session.delete(f"{BACKEND_URL}/bookings/{booking_id}") as response:
                if response.status == 200:
                    print(f"   ℹ️  Test booking {booking_id[:8]} cleaned up successfully")
                else:
                    print(f"   ⚠️  Could not clean up test booking {booking_id[:8]} (status: {response.status})")
        except Exception as e:
            print(f"   ⚠️  Cleanup failed for booking {booking_id[:8]}: {str(e)}")

    async def run_quick_tests(self):
        """Run all quick tests"""
        print("🚀 Starting Quick Backend Test...")
        print("=" * 60)
        
        # Test 1: Health Check
        health_ok = await self.test_health_check()
        
        if not health_ok:
            print("\n❌ Backend API is not accessible. Stopping tests.")
            return
        
        print()
        
        # Test 2: Calculate Price Endpoint
        await self.test_calculate_price_endpoint()
        print()
        
        # Test 3: Bookings POST Endpoint
        booking_id = await self.test_bookings_post_endpoint()
        print()
        
        # Test 4: Availability Endpoint
        await self.test_availability_endpoint()
        print()
        
        # Cleanup test booking if created
        if booking_id:
            await self.cleanup_test_booking(booking_id)
        
        # Summary
        print("=" * 60)
        print("📊 QUICK TEST SUMMARY:")
        print("=" * 60)
        
        passed_tests = [r for r in self.results if r['success']]
        failed_tests = [r for r in self.results if not r['success']]
        
        print(f"✅ Passed: {len(passed_tests)}")
        print(f"❌ Failed: {len(failed_tests)}")
        print(f"📈 Success Rate: {len(passed_tests)}/{len(self.results)} ({(len(passed_tests)/len(self.results)*100):.1f}%)")
        
        if failed_tests:
            print("\n🔍 Failed Tests:")
            for test in failed_tests:
                print(f"   • {test['test']}: {test['message']}")
        
        print("\n🎯 Focus Areas Tested:")
        print("   • /api/calculate-price - Price calculation functionality")
        print("   • /api/bookings (POST) - Booking creation with minimal payload")
        print("   • /api/availability - Time slot availability checking")
        
        return len(failed_tests) == 0

async def main():
    """Main test runner"""
    async with QuickBackendTester() as tester:
        success = await tester.run_quick_tests()
        
        if success:
            print("\n🎉 All quick tests passed! Backend is working correctly.")
        else:
            print("\n⚠️  Some tests failed. Check the details above.")
        
        return success

if __name__ == "__main__":
    asyncio.run(main())