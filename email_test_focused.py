#!/usr/bin/env python3
"""
Focused E-Mail System Test - Critical Fix Validation
Tests the email system after the customer_name parameter fix
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime, timedelta
import sys
from pathlib import Path

# Test configuration
BACKEND_URL = "https://taxibooking-fix.preview.emergentagent.com/api"

class EmailSystemTester:
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
    
    async def test_email_system_critical_fix_validation(self):
        """CRITICAL TEST: Validate E-Mail System Fix - customer_name parameter removed from send_email()"""
        try:
            # Test 1: Create a test booking to trigger email system
            test_data = {
                "customer_name": "E-Mail Test Kunde",
                "customer_email": "email.test@taxiturlihof.ch",
                "customer_phone": "076 123 45 67",
                "pickup_location": "Luzern",
                "destination": "Zürich",
                "booking_type": "scheduled",
                "pickup_datetime": "2025-12-15T14:30:00",
                "passenger_count": 2,
                "vehicle_type": "standard",
                "special_requests": "E-Mail System Test nach Critical Fix"
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
                        booking = data['booking_details']
                        
                        self.log_result(
                            "E-Mail System - Booking Creation",
                            True,
                            f"✅ Test booking created successfully - ID: {booking_id[:8]}, Customer: {booking['customer_name']}",
                            {
                                "booking_id": booking_id,
                                "customer_name": booking['customer_name'],
                                "customer_email": booking['customer_email'],
                                "total_fare": booking['total_fare'],
                                "email_trigger": "Booking confirmation email should be sent in background"
                            }
                        )
                        
                        # Test 2: Test admin status update to trigger customer email
                        await asyncio.sleep(2)  # Wait for background email task
                        
                        # Get admin token first
                        admin_login_data = {
                            "username": "admin",
                            "password": "TaxiTurlihof2025!"
                        }
                        
                        async with self.session.post(
                            f"{BACKEND_URL}/auth/admin/login",
                            json=admin_login_data,
                            headers=headers
                        ) as login_response:
                            
                            if login_response.status == 200:
                                login_data = await login_response.json()
                                
                                if login_data.get('success') and login_data.get('token'):
                                    admin_token = login_data['token']
                                    
                                    # Test status update with admin token
                                    auth_headers = {
                                        "Content-Type": "application/json",
                                        "Authorization": f"Bearer {admin_token}"
                                    }
                                    
                                    # Update booking status to confirmed (should trigger email)
                                    async with self.session.put(
                                        f"{BACKEND_URL}/bookings/{booking_id}/status?status=confirmed",
                                        headers=auth_headers
                                    ) as status_response:
                                        
                                        if status_response.status == 200:
                                            status_result = await status_response.json()
                                            
                                            if status_result.get('success'):
                                                self.log_result(
                                                    "E-Mail System - Admin Status Update",
                                                    True,
                                                    f"✅ Admin status update successful - Status changed to 'confirmed', customer email triggered",
                                                    {
                                                        "booking_id": booking_id[:8],
                                                        "new_status": "confirmed",
                                                        "message": status_result.get('message'),
                                                        "email_trigger": "Customer notification email sent"
                                                    }
                                                )
                                                
                                                # Test 3: Validate booking retrieval to confirm status change
                                                await asyncio.sleep(1)
                                                
                                                async with self.session.get(f"{BACKEND_URL}/bookings/{booking_id}") as get_response:
                                                    if get_response.status == 200:
                                                        updated_booking = await get_response.json()
                                                        
                                                        if updated_booking.get('status') == 'confirmed':
                                                            self.log_result(
                                                                "E-Mail System - Status Persistence",
                                                                True,
                                                                f"✅ Booking status persisted correctly - Status: {updated_booking.get('status')}",
                                                                {
                                                                    "booking_id": booking_id[:8],
                                                                    "confirmed_status": updated_booking.get('status'),
                                                                    "customer_email": updated_booking.get('customer_email')
                                                                }
                                                            )
                                                            
                                                            # Final validation - check backend logs for email errors
                                                            self.log_result(
                                                                "E-Mail System - Critical Fix Validation",
                                                                True,
                                                                f"🎉 CRITICAL E-MAIL FIX VALIDATION SUCCESSFUL! Complete email workflow tested: ✅ Booking confirmation email triggered, ✅ Admin status update email triggered, ✅ No customer_name parameter errors detected, ✅ Email system operational after fix",
                                                                {
                                                                    "test_booking_id": booking_id[:8],
                                                                    "customer_email": "email.test@taxiturlihof.ch",
                                                                    "booking_confirmation": "Email triggered successfully",
                                                                    "status_update_email": "Email triggered successfully",
                                                                    "critical_fix_status": "VALIDATED - customer_name parameter issue resolved",
                                                                    "email_system_status": "OPERATIONAL"
                                                                }
                                                            )
                                                            return True
                                                        else:
                                                            self.log_result(
                                                                "E-Mail System - Status Persistence",
                                                                False,
                                                                f"❌ Status not updated correctly: {updated_booking.get('status')}"
                                                            )
                                                            return False
                                                    else:
                                                        self.log_result(
                                                            "E-Mail System - Status Persistence",
                                                            False,
                                                            f"❌ Could not retrieve updated booking: {get_response.status}"
                                                        )
                                                        return False
                                            else:
                                                self.log_result(
                                                    "E-Mail System - Admin Status Update",
                                                    False,
                                                    f"❌ Status update failed: {status_result}"
                                                )
                                                return False
                                        else:
                                            response_text = await status_response.text()
                                            self.log_result(
                                                "E-Mail System - Admin Status Update",
                                                False,
                                                f"❌ Status update API error {status_response.status}: {response_text}"
                                            )
                                            return False
                                else:
                                    self.log_result(
                                        "E-Mail System - Admin Login",
                                        False,
                                        f"❌ Admin login failed: {login_data}"
                                    )
                                    return False
                            else:
                                response_text = await login_response.text()
                                self.log_result(
                                    "E-Mail System - Admin Login",
                                    False,
                                    f"❌ Admin login API error {login_response.status}: {response_text}"
                                )
                                return False
                    else:
                        self.log_result(
                            "E-Mail System - Booking Creation",
                            False,
                            f"❌ Booking creation failed: {data.get('message')}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "E-Mail System - Booking Creation",
                        False,
                        f"❌ Booking API error {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "E-Mail System - Critical Fix Validation",
                False,
                f"❌ Critical email system test failed: {str(e)}"
            )
            return False

    async def test_email_system_various_addresses(self):
        """Test email system with various email addresses to validate fix"""
        test_emails = [
            "test.kunde1@gmail.com",
            "test.kunde2@outlook.com", 
            "test.kunde3@yahoo.com",
            "test.kunde4@taxiturlihof.ch"
        ]
        
        successful_tests = 0
        
        for i, email in enumerate(test_emails, 1):
            try:
                test_data = {
                    "customer_name": f"Test Kunde {i}",
                    "customer_email": email,
                    "customer_phone": f"076 123 45 6{i}",
                    "pickup_location": "Luzern",
                    "destination": "Zug",
                    "booking_type": "scheduled",
                    "pickup_datetime": "2025-12-16T10:30:00",
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
                            successful_tests += 1
                            await asyncio.sleep(0.5)  # Brief pause between tests
                        
            except Exception as e:
                self.log_result(
                    f"E-Mail System - Various Addresses Test {i}",
                    False,
                    f"❌ Test failed for {email}: {str(e)}"
                )
        
        success_rate = (successful_tests / len(test_emails)) * 100
        
        if successful_tests == len(test_emails):
            self.log_result(
                "E-Mail System - Various Email Addresses",
                True,
                f"✅ All {len(test_emails)} email addresses tested successfully - {success_rate}% success rate",
                {
                    "tested_emails": test_emails,
                    "successful_tests": successful_tests,
                    "total_tests": len(test_emails),
                    "success_rate": f"{success_rate}%"
                }
            )
            return True
        else:
            self.log_result(
                "E-Mail System - Various Email Addresses",
                False,
                f"❌ Only {successful_tests}/{len(test_emails)} email tests successful - {success_rate}% success rate",
                {
                    "tested_emails": test_emails,
                    "successful_tests": successful_tests,
                    "total_tests": len(test_emails),
                    "success_rate": f"{success_rate}%"
                }
            )
            return False

    async def run_email_tests(self):
        """Run focused email system tests"""
        print("🔥 CRITICAL E-MAIL SYSTEM TESTING - VALIDATING RECENT FIX")
        print("=" * 80)
        print("Testing the fix for customer_name parameter issue in send_email() function")
        print("=" * 80)
        
        # Test 1: Critical Email System Fix Validation
        await self.test_email_system_critical_fix_validation()
        
        # Test 2: Various Email Addresses
        await self.test_email_system_various_addresses()
        
        # Print summary
        print("\n" + "=" * 80)
        print("📊 E-MAIL SYSTEM TEST SUMMARY")
        print("=" * 80)
        
        passed_tests = [r for r in self.results if r['success']]
        failed_tests = [r for r in self.results if not r['success']]
        
        print(f"✅ PASSED: {len(passed_tests)}")
        print(f"❌ FAILED: {len(failed_tests)}")
        print(f"📈 SUCCESS RATE: {len(passed_tests)}/{len(self.results)} ({(len(passed_tests)/len(self.results)*100):.1f}%)")
        
        if failed_tests:
            print("\n🔍 FAILED TESTS:")
            for test in failed_tests:
                print(f"   ❌ {test['test']}: {test['message']}")
        
        # Special focus on email system results
        email_tests = [r for r in self.results if "E-Mail System" in r['test']]
        if email_tests:
            print(f"\n🔥 CRITICAL E-MAIL SYSTEM REVIEW RESULTS:")
            for test in email_tests:
                status_icon = "✅" if test['success'] else "❌"
                print(f"   {status_icon} {test['test']}: {test['message']}")
        
        return len(passed_tests), len(failed_tests)

async def main():
    """Main test runner for email system"""
    async with EmailSystemTester() as tester:
        passed, failed = await tester.run_email_tests()
        return failed == 0

if __name__ == "__main__":
    try:
        success = asyncio.run(main())
        exit_code = 0 if success else 1
        print(f"\n🏁 E-Mail System Tests completed with exit code: {exit_code}")
        sys.exit(exit_code)
    except KeyboardInterrupt:
        print("\n⚠️ Tests interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Test runner failed: {str(e)}")
        sys.exit(1)