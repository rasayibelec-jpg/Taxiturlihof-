#!/usr/bin/env python3
"""
Payment System Removal Test Suite
Tests that Stripe payment system has been completely removed from backend
"""

import asyncio
import aiohttp
import json
from datetime import datetime, timedelta

# Test configuration
BACKEND_URL = "https://taxibooking-fix.preview.emergentagent.com/api"

class PaymentRemovalTester:
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
            print(f"   Details: {json.dumps(details, indent=2)}")
    
    async def test_payment_methods_endpoint_removed(self):
        """Test 1: GET /api/payment-methods should return 404"""
        try:
            async with self.session.get(f"{BACKEND_URL}/payment-methods") as response:
                if response.status == 404:
                    self.log_result(
                        "Payment Methods Endpoint Removed",
                        True,
                        "✅ GET /api/payment-methods correctly returns 404 (endpoint removed)",
                        {"status_code": response.status}
                    )
                    return True
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Payment Methods Endpoint Removed",
                        False,
                        f"❌ GET /api/payment-methods returned {response.status} instead of 404",
                        {"status_code": response.status, "response": response_text}
                    )
                    return False
        except Exception as e:
            self.log_result(
                "Payment Methods Endpoint Removed",
                False,
                f"❌ Request failed: {str(e)}"
            )
            return False
    
    async def test_payment_initiate_endpoint_removed(self):
        """Test 2: POST /api/payments/initiate should return 404"""
        try:
            test_data = {
                "booking_id": "test-booking-id",
                "payment_method": "stripe"
            }
            headers = {"Content-Type": "application/json"}
            
            async with self.session.post(
                f"{BACKEND_URL}/payments/initiate",
                json=test_data,
                headers=headers
            ) as response:
                if response.status == 404:
                    self.log_result(
                        "Payment Initiate Endpoint Removed",
                        True,
                        "✅ POST /api/payments/initiate correctly returns 404 (endpoint removed)",
                        {"status_code": response.status}
                    )
                    return True
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Payment Initiate Endpoint Removed",
                        False,
                        f"❌ POST /api/payments/initiate returned {response.status} instead of 404",
                        {"status_code": response.status, "response": response_text}
                    )
                    return False
        except Exception as e:
            self.log_result(
                "Payment Initiate Endpoint Removed",
                False,
                f"❌ Request failed: {str(e)}"
            )
            return False
    
    async def test_payment_status_endpoint_removed(self):
        """Test 3: GET /api/payments/status/{id} should return 404"""
        try:
            test_payment_id = "test-payment-id-12345"
            
            async with self.session.get(f"{BACKEND_URL}/payments/status/{test_payment_id}") as response:
                if response.status == 404:
                    self.log_result(
                        "Payment Status Endpoint Removed",
                        True,
                        "✅ GET /api/payments/status/{id} correctly returns 404 (endpoint removed)",
                        {"status_code": response.status}
                    )
                    return True
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Payment Status Endpoint Removed",
                        False,
                        f"❌ GET /api/payments/status/{id} returned {response.status} instead of 404",
                        {"status_code": response.status, "response": response_text}
                    )
                    return False
        except Exception as e:
            self.log_result(
                "Payment Status Endpoint Removed",
                False,
                f"❌ Request failed: {str(e)}"
            )
            return False
    
    async def test_stripe_webhook_endpoint_removed(self):
        """Test 4: POST /api/webhooks/stripe should return 404"""
        try:
            test_data = {
                "type": "payment_intent.succeeded",
                "data": {"object": {"id": "pi_test"}}
            }
            headers = {"Content-Type": "application/json"}
            
            async with self.session.post(
                f"{BACKEND_URL}/webhooks/stripe",
                json=test_data,
                headers=headers
            ) as response:
                if response.status == 404:
                    self.log_result(
                        "Stripe Webhook Endpoint Removed",
                        True,
                        "✅ POST /api/webhooks/stripe correctly returns 404 (endpoint removed)",
                        {"status_code": response.status}
                    )
                    return True
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Stripe Webhook Endpoint Removed",
                        False,
                        f"❌ POST /api/webhooks/stripe returned {response.status} instead of 404",
                        {"status_code": response.status, "response": response_text}
                    )
                    return False
        except Exception as e:
            self.log_result(
                "Stripe Webhook Endpoint Removed",
                False,
                f"❌ Request failed: {str(e)}"
            )
            return False
    
    async def test_booking_creation_without_payment(self):
        """Test 5: POST /api/bookings should work and return payment_status='confirmed'"""
        try:
            # Calculate tomorrow's date at 10:00
            tomorrow = datetime.now() + timedelta(days=1)
            pickup_datetime = tomorrow.replace(hour=10, minute=0, second=0, microsecond=0)
            
            test_data = {
                "customer_name": "Test Kunde Ödeme",
                "customer_email": "test.odeme@example.com",
                "customer_phone": "076 123 45 67",
                "pickup_location": "Luzern",
                "destination": "Zürich",
                "booking_type": "scheduled",
                "pickup_datetime": pickup_datetime.isoformat(),
                "passenger_count": 1,
                "vehicle_type": "standard",
                "special_requests": "Test für Ödeme-System-Entfernung"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/bookings",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Check if booking was created successfully
                    if data.get('success') and data.get('booking_id'):
                        booking_id = data['booking_id']
                        booking_details = data.get('booking_details', {})
                        
                        # Check payment_status field
                        payment_status = booking_details.get('payment_status', 'NOT_FOUND')
                        
                        # The review request says payment_status should be "confirmed" after removing payment system
                        # But looking at the code, there's no payment_status field in the Booking model
                        # This is a critical finding!
                        
                        if payment_status == 'confirmed':
                            self.log_result(
                                "Booking Creation Without Payment",
                                True,
                                f"✅ Booking created successfully with payment_status='confirmed' (ID: {booking_id[:8]})",
                                {
                                    "booking_id": booking_id,
                                    "payment_status": payment_status,
                                    "total_fare": booking_details.get('total_fare'),
                                    "status": booking_details.get('status')
                                }
                            )
                            return booking_id
                        elif payment_status == 'NOT_FOUND':
                            self.log_result(
                                "Booking Creation Without Payment",
                                False,
                                f"❌ CRITICAL: Booking created but 'payment_status' field is missing! (ID: {booking_id[:8]})",
                                {
                                    "booking_id": booking_id,
                                    "payment_status": "FIELD_NOT_FOUND",
                                    "booking_status": booking_details.get('status'),
                                    "total_fare": booking_details.get('total_fare'),
                                    "issue": "The Booking model doesn't have a payment_status field. After removing payment system, bookings should have payment_status='confirmed'"
                                }
                            )
                            return booking_id
                        else:
                            self.log_result(
                                "Booking Creation Without Payment",
                                False,
                                f"❌ Booking created but payment_status='{payment_status}' instead of 'confirmed' (ID: {booking_id[:8]})",
                                {
                                    "booking_id": booking_id,
                                    "payment_status": payment_status,
                                    "expected": "confirmed",
                                    "total_fare": booking_details.get('total_fare')
                                }
                            )
                            return booking_id
                    else:
                        self.log_result(
                            "Booking Creation Without Payment",
                            False,
                            f"❌ Booking creation failed: {data.get('message')}",
                            {"response": data}
                        )
                        return None
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Booking Creation Without Payment",
                        False,
                        f"❌ API returned status {response.status}: {response_text}"
                    )
                    return None
                    
        except Exception as e:
            self.log_result(
                "Booking Creation Without Payment",
                False,
                f"❌ Request failed: {str(e)}"
            )
            return None
    
    async def test_booking_lookup(self, booking_id=None):
        """Test 6: POST /api/booking-lookup should list existing bookings"""
        try:
            # If we have a booking_id from previous test, use it
            # Otherwise, use a partial ID to search
            test_data = {
                "booking_id": booking_id[:8] if booking_id else "test",
                "email": "test.odeme@example.com"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/bookings/lookup",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data.get('success') and 'bookings' in data:
                        bookings = data['bookings']
                        
                        if len(bookings) > 0:
                            self.log_result(
                                "Booking Lookup",
                                True,
                                f"✅ Booking lookup successful - Found {len(bookings)} booking(s)",
                                {
                                    "bookings_found": len(bookings),
                                    "sample_booking": bookings[0] if bookings else None
                                }
                            )
                            return True
                        else:
                            self.log_result(
                                "Booking Lookup",
                                True,
                                "✅ Booking lookup endpoint working (no bookings found for test email)",
                                {"bookings_found": 0}
                            )
                            return True
                    else:
                        self.log_result(
                            "Booking Lookup",
                            False,
                            f"❌ Invalid response structure: {data}"
                        )
                        return False
                elif response.status == 404:
                    self.log_result(
                        "Booking Lookup",
                        True,
                        "✅ Booking lookup endpoint working (booking not found - expected for test data)",
                        {"status_code": response.status}
                    )
                    return True
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Booking Lookup",
                        False,
                        f"❌ API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Booking Lookup",
                False,
                f"❌ Request failed: {str(e)}"
            )
            return False
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*80)
        print("PAYMENT SYSTEM REMOVAL TEST SUMMARY")
        print("="*80)
        
        total_tests = len(self.results)
        passed_tests = sum(1 for r in self.results if r['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"\nTotal Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests*100):.1f}%")
        
        if failed_tests > 0:
            print("\n" + "="*80)
            print("FAILED TESTS:")
            print("="*80)
            for result in self.results:
                if not result['success']:
                    print(f"\n❌ {result['test']}")
                    print(f"   {result['message']}")
                    if result['details']:
                        print(f"   Details: {json.dumps(result['details'], indent=2)}")
        
        print("\n" + "="*80)

async def main():
    """Run all payment removal tests"""
    print("="*80)
    print("PAYMENT SYSTEM REMOVAL TEST SUITE")
    print("Testing that Stripe payment system has been completely removed")
    print("="*80 + "\n")
    
    async with PaymentRemovalTester() as tester:
        # Test 1-4: Payment endpoints should return 404
        print("\n📋 TESTING PAYMENT ENDPOINTS REMOVAL...")
        await tester.test_payment_methods_endpoint_removed()
        await tester.test_payment_initiate_endpoint_removed()
        await tester.test_payment_status_endpoint_removed()
        await tester.test_stripe_webhook_endpoint_removed()
        
        # Test 5: Booking creation should work without payment
        print("\n📋 TESTING BOOKING SYSTEM WITHOUT PAYMENT...")
        booking_id = await tester.test_booking_creation_without_payment()
        
        # Test 6: Booking lookup should work
        print("\n📋 TESTING BOOKING LOOKUP...")
        await tester.test_booking_lookup(booking_id)
        
        # Print summary
        tester.print_summary()

if __name__ == "__main__":
    asyncio.run(main())
