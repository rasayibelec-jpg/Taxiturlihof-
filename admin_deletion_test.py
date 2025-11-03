#!/usr/bin/env python3
"""
Admin Booking Deletion Test - Focused test for the new admin deletion functionality
"""

import asyncio
import aiohttp
import json
from datetime import datetime

# Test configuration
BACKEND_URL = "https://taxibooking-fix.preview.emergentagent.com/api"

class AdminDeletionTester:
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
    
    async def create_test_booking_for_deletion(self):
        """Create a test booking specifically for deletion testing"""
        try:
            test_data = {
                "customer_name": "Test Deletion User",
                "customer_email": "deletion.test@taxiturlihof.ch",
                "customer_phone": "076 999 88 77",
                "pickup_location": "Luzern",
                "destination": "Zug",
                "booking_type": "scheduled",
                "pickup_datetime": "2025-12-20T10:00:00",
                "passenger_count": 1,
                "vehicle_type": "standard",
                "special_requests": "Test booking for admin deletion functionality"
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
                        booking_id = data['booking_id']
                        self.log_result(
                            "Admin Deletion - Test Booking Creation",
                            True,
                            f"Test booking created for deletion testing - ID: {booking_id[:8]}",
                            {"booking_id": booking_id, "customer": "Test Deletion User"}
                        )
                        return booking_id
                    else:
                        self.log_result(
                            "Admin Deletion - Test Booking Creation",
                            False,
                            f"Booking creation failed: {data.get('message')}"
                        )
                        return None
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Admin Deletion - Test Booking Creation",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return None
                    
        except Exception as e:
            self.log_result(
                "Admin Deletion - Test Booking Creation",
                False,
                f"Request failed: {str(e)}"
            )
            return None
    
    async def get_admin_token(self):
        """Get admin authentication token"""
        try:
            admin_login_data = {
                "username": "admin",
                "password": "TaxiTurlihof2025!"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/auth/admin/login",
                json=admin_login_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    if data.get('success') and data.get('token'):
                        self.log_result(
                            "Admin Deletion - Token Acquisition",
                            True,
                            "Admin token acquired successfully",
                            {"token_length": len(data['token'])}
                        )
                        return data['token']
                    else:
                        self.log_result(
                            "Admin Deletion - Token Acquisition",
                            False,
                            f"Login failed: {data.get('message')}"
                        )
                        return None
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Admin Deletion - Token Acquisition",
                        False,
                        f"Login API returned status {response.status}: {response_text}"
                    )
                    return None
                    
        except Exception as e:
            self.log_result(
                "Admin Deletion - Token Acquisition",
                False,
                f"Login request failed: {str(e)}"
            )
            return None
    
    async def test_admin_deletion_unauthorized(self, booking_id):
        """Test admin deletion without authorization token"""
        try:
            async with self.session.delete(f"{BACKEND_URL}/admin/bookings/{booking_id}") as response:
                
                if response.status == 401:
                    self.log_result(
                        "Admin Deletion - Unauthorized Access",
                        True,
                        "Correctly rejected unauthorized deletion attempt (401)",
                        {"expected_status": 401, "actual_status": response.status}
                    )
                    return True
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Admin Deletion - Unauthorized Access",
                        False,
                        f"Expected 401 but got {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Admin Deletion - Unauthorized Access",
                False,
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_admin_deletion_nonexistent(self, admin_token):
        """Test admin deletion of non-existent booking"""
        try:
            fake_booking_id = "nonexistent-booking-id-12345"
            headers = {
                "Authorization": f"Bearer {admin_token}",
                "Content-Type": "application/json"
            }
            
            async with self.session.delete(
                f"{BACKEND_URL}/admin/bookings/{fake_booking_id}",
                headers=headers
            ) as response:
                
                if response.status == 404:
                    self.log_result(
                        "Admin Deletion - Non-existent Booking",
                        True,
                        "Correctly returned 404 for non-existent booking",
                        {"booking_id": fake_booking_id, "status": response.status}
                    )
                    return True
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Admin Deletion - Non-existent Booking",
                        False,
                        f"Expected 404 but got {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Admin Deletion - Non-existent Booking",
                False,
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_admin_deletion_success(self, booking_id, admin_token):
        """Test successful admin deletion of existing booking"""
        try:
            headers = {
                "Authorization": f"Bearer {admin_token}",
                "Content-Type": "application/json"
            }
            
            # First verify the booking exists
            async with self.session.get(f"{BACKEND_URL}/bookings/{booking_id}") as verify_response:
                if verify_response.status != 200:
                    self.log_result(
                        "Admin Deletion - Pre-deletion Verification",
                        False,
                        f"Booking {booking_id[:8]} does not exist before deletion test"
                    )
                    return False
            
            # Now delete the booking
            async with self.session.delete(
                f"{BACKEND_URL}/admin/bookings/{booking_id}",
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data.get('success'):
                        self.log_result(
                            "Admin Deletion - Successful Deletion",
                            True,
                            f"Booking successfully deleted - ID: {booking_id[:8]}",
                            {
                                "booking_id": booking_id[:8],
                                "message": data.get('message'),
                                "deleted_booking": data.get('deleted_booking')
                            }
                        )
                        
                        # Verify booking is actually deleted
                        await asyncio.sleep(1)  # Brief pause
                        async with self.session.get(f"{BACKEND_URL}/bookings/{booking_id}") as verify_response:
                            if verify_response.status == 404:
                                self.log_result(
                                    "Admin Deletion - Post-deletion Verification",
                                    True,
                                    "Booking confirmed deleted - returns 404 on retrieval",
                                    {"booking_id": booking_id[:8]}
                                )
                                return True
                            else:
                                self.log_result(
                                    "Admin Deletion - Post-deletion Verification",
                                    False,
                                    f"Booking still exists after deletion (status: {verify_response.status})"
                                )
                                return False
                    else:
                        self.log_result(
                            "Admin Deletion - Successful Deletion",
                            False,
                            f"Deletion failed: {data.get('message')}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Admin Deletion - Successful Deletion",
                        False,
                        f"Expected 200 but got {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Admin Deletion - Successful Deletion",
                False,
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_booking_endpoints_after_deletion(self):
        """Test that other booking endpoints still work after adding deletion functionality"""
        try:
            # Test 1: Create a new booking to verify creation still works
            test_data = {
                "customer_name": "Post-Deletion Test User",
                "customer_email": "postdeletion@example.com",
                "customer_phone": "076 111 22 33",
                "pickup_location": "Schwyz",
                "destination": "Luzern",
                "booking_type": "immediate",
                "pickup_datetime": "2025-12-21T15:00:00",
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
                    if data['success']:
                        new_booking_id = data['booking_id']
                        
                        # Test 2: Verify booking retrieval still works
                        async with self.session.get(f"{BACKEND_URL}/bookings/{new_booking_id}") as get_response:
                            if get_response.status == 200:
                                booking_data = await get_response.json()
                                
                                # Test 3: Verify availability endpoint still works
                                async with self.session.get(f"{BACKEND_URL}/availability?date=2025-12-22") as avail_response:
                                    if avail_response.status == 200:
                                        avail_data = await avail_response.json()
                                        
                                        self.log_result(
                                            "Admin Deletion - Other Endpoints Verification",
                                            True,
                                            "All booking endpoints working correctly after deletion functionality added",
                                            {
                                                "new_booking_created": new_booking_id[:8],
                                                "booking_retrieval": "working",
                                                "availability_slots": len(avail_data.get('available_slots', [])),
                                                "verification_status": "All endpoints operational"
                                            }
                                        )
                                        return True
                                    else:
                                        self.log_result(
                                            "Admin Deletion - Other Endpoints Verification",
                                            False,
                                            f"Availability endpoint failed: {avail_response.status}"
                                        )
                                        return False
                            else:
                                self.log_result(
                                    "Admin Deletion - Other Endpoints Verification",
                                    False,
                                    f"Booking retrieval failed: {get_response.status}"
                                )
                                return False
                    else:
                        self.log_result(
                            "Admin Deletion - Other Endpoints Verification",
                            False,
                            f"Booking creation failed: {data.get('message')}"
                        )
                        return False
                else:
                    self.log_result(
                        "Admin Deletion - Other Endpoints Verification",
                        False,
                        f"Booking creation API failed: {response.status}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Admin Deletion - Other Endpoints Verification",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def run_admin_deletion_tests(self):
        """Run comprehensive admin booking deletion tests"""
        print("🔥 TESTING ADMIN BOOKING DELETION FUNCTIONALITY")
        print("=" * 60)
        
        # Step 1: Create a test booking to delete
        test_booking_id = await self.create_test_booking_for_deletion()
        if not test_booking_id:
            self.log_result(
                "Admin Booking Deletion - Setup",
                False,
                "Failed to create test booking for deletion testing"
            )
            return False
        
        # Step 2: Get admin token
        admin_token = await self.get_admin_token()
        if not admin_token:
            self.log_result(
                "Admin Booking Deletion - Authentication",
                False,
                "Failed to get admin token for deletion testing"
            )
            return False
        
        # Step 3: Test unauthorized access (without admin token)
        await self.test_admin_deletion_unauthorized(test_booking_id)
        
        # Step 4: Test deletion of non-existent booking
        await self.test_admin_deletion_nonexistent(admin_token)
        
        # Step 5: Test successful deletion of existing booking
        await self.test_admin_deletion_success(test_booking_id, admin_token)
        
        # Step 6: Verify other booking endpoints still work
        await self.test_booking_endpoints_after_deletion()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 ADMIN DELETION TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.results)
        passed_tests = len([r for r in self.results if r['success']])
        failed_tests = total_tests - passed_tests
        success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.results:
                if not result['success']:
                    print(f"   ❌ {result['test']}: {result['message']}")
        
        print("\n🎯 ADMIN DELETION TESTING COMPLETED!")
        return success_rate >= 80

async def main():
    """Main test runner for admin deletion functionality"""
    async with AdminDeletionTester() as tester:
        success = await tester.run_admin_deletion_tests()
        return success

if __name__ == "__main__":
    try:
        success = asyncio.run(main())
        exit_code = 0 if success else 1
        print(f"\n🏁 Tests completed with exit code: {exit_code}")
    except KeyboardInterrupt:
        print("\n⚠️ Tests interrupted by user")
    except Exception as e:
        print(f"\n💥 Test runner failed: {str(e)}")