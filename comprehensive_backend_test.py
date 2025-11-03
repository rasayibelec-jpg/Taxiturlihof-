#!/usr/bin/env python3
"""
Comprehensive Backend Test Suite - Service Areas Removal Validation
Tests all critical backend functionality after service areas component removal
"""

import asyncio
import aiohttp
import json
from datetime import datetime

# Test configuration
BACKEND_URL = "https://taxibooking-fix.preview.emergentagent.com/api"

class ComprehensiveBackendTester:
    def __init__(self):
        self.session = None
        self.results = []
        self.admin_token = None
        
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
        if details and isinstance(details, dict):
            for key, value in details.items():
                print(f"   {key}: {value}")
    
    async def test_core_endpoints(self):
        """Test all core backend endpoints"""
        
        # 1. Health Check
        try:
            async with self.session.get(f"{BACKEND_URL}/") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("message") == "Hello World":
                        self.log_result("Health Check", True, "Backend API is running")
                    else:
                        self.log_result("Health Check", False, f"Unexpected response: {data}")
                else:
                    self.log_result("Health Check", False, f"Status {response.status}")
        except Exception as e:
            self.log_result("Health Check", False, f"Connection failed: {str(e)}")
        
        # 2. Admin Authentication
        try:
            admin_data = {"username": "admin", "password": "TaxiTurlihof2025!"}
            headers = {"Content-Type": "application/json"}
            
            async with self.session.post(f"{BACKEND_URL}/auth/admin/login", json=admin_data, headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get('success') and data.get('token'):
                        self.admin_token = data['token']
                        self.log_result("Admin Authentication", True, "Admin login successful")
                    else:
                        self.log_result("Admin Authentication", False, f"Login failed: {data}")
                else:
                    self.log_result("Admin Authentication", False, f"Status {response.status}")
        except Exception as e:
            self.log_result("Admin Authentication", False, f"Request failed: {str(e)}")
        
        # 3. Booking System - Create Booking
        booking_id = None
        try:
            test_data = {
                "customer_name": "Comprehensive Test User",
                "customer_email": "comprehensive.test@example.com",
                "customer_phone": "076 123 45 67",
                "pickup_location": "Luzern",
                "destination": "Zürich",
                "booking_type": "scheduled",
                "pickup_datetime": "2025-12-20T14:30:00",
                "passenger_count": 2,
                "vehicle_type": "standard"
            }
            
            async with self.session.post(f"{BACKEND_URL}/bookings", json=test_data, headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get('success') and data.get('booking_details'):
                        booking_id = data['booking_id']
                        booking = data['booking_details']
                        self.log_result("Booking Creation", True, f"Booking created - ID: {booking_id[:8]}, Total: CHF {booking['total_fare']}")
                    else:
                        self.log_result("Booking Creation", False, f"Creation failed: {data}")
                else:
                    self.log_result("Booking Creation", False, f"Status {response.status}")
        except Exception as e:
            self.log_result("Booking Creation", False, f"Request failed: {str(e)}")
        
        # 4. Booking Retrieval
        if booking_id:
            try:
                async with self.session.get(f"{BACKEND_URL}/bookings/{booking_id}") as response:
                    if response.status == 200:
                        data = await response.json()
                        if data.get('id') == booking_id:
                            self.log_result("Booking Retrieval", True, f"Booking retrieved - {data['customer_name']}")
                        else:
                            self.log_result("Booking Retrieval", False, "ID mismatch")
                    else:
                        self.log_result("Booking Retrieval", False, f"Status {response.status}")
            except Exception as e:
                self.log_result("Booking Retrieval", False, f"Request failed: {str(e)}")
        
        # 5. Admin Bookings Access
        if self.admin_token:
            try:
                auth_headers = {"Authorization": f"Bearer {self.admin_token}", "Content-Type": "application/json"}
                async with self.session.get(f"{BACKEND_URL}/bookings", headers=auth_headers) as response:
                    if response.status == 200:
                        data = await response.json()
                        if isinstance(data, list):
                            self.log_result("Admin Bookings Access", True, f"Admin can access {len(data)} bookings")
                        else:
                            self.log_result("Admin Bookings Access", False, "Invalid response format")
                    else:
                        self.log_result("Admin Bookings Access", False, f"Status {response.status}")
            except Exception as e:
                self.log_result("Admin Bookings Access", False, f"Request failed: {str(e)}")
        
        # 6. Price Calculation
        try:
            test_data = {"origin": "Luzern", "destination": "Zürich"}
            async with self.session.post(f"{BACKEND_URL}/calculate-price", json=test_data, headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    if 'distance_km' in data and 'total_fare' in data:
                        self.log_result("Price Calculation", True, f"Distance: {data['distance_km']}km, Fare: CHF {data['total_fare']}")
                    else:
                        self.log_result("Price Calculation", False, "Missing required fields")
                else:
                    self.log_result("Price Calculation", False, f"Status {response.status}")
        except Exception as e:
            self.log_result("Price Calculation", False, f"Request failed: {str(e)}")
        
        # 7. Payment Methods
        try:
            async with self.session.get(f"{BACKEND_URL}/payment-methods") as response:
                if response.status == 200:
                    data = await response.json()
                    if isinstance(data, list) and len(data) > 0:
                        methods = [method.get('name') for method in data]
                        self.log_result("Payment Methods", True, f"Available: {', '.join(methods)}")
                    else:
                        self.log_result("Payment Methods", False, "No payment methods available")
                else:
                    self.log_result("Payment Methods", False, f"Status {response.status}")
        except Exception as e:
            self.log_result("Payment Methods", False, f"Request failed: {str(e)}")
        
        # 8. Availability Check
        try:
            async with self.session.get(f"{BACKEND_URL}/availability?date=2025-12-20") as response:
                if response.status == 200:
                    data = await response.json()
                    if 'available_slots' in data:
                        self.log_result("Availability Check", True, f"{len(data['available_slots'])} time slots available")
                    else:
                        self.log_result("Availability Check", False, "No availability data")
                else:
                    self.log_result("Availability Check", False, f"Status {response.status}")
        except Exception as e:
            self.log_result("Availability Check", False, f"Request failed: {str(e)}")
        
        # 9. Contact Form
        try:
            contact_data = {
                "name": "Test Contact",
                "email": "test.contact@example.com",
                "phone": "076 123 45 67",
                "message": "Test contact form after service areas removal"
            }
            async with self.session.post(f"{BACKEND_URL}/contact", json=contact_data, headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get('success'):
                        self.log_result("Contact Form", True, "Contact form submission successful")
                    else:
                        self.log_result("Contact Form", False, f"Submission failed: {data}")
                else:
                    self.log_result("Contact Form", False, f"Status {response.status}")
        except Exception as e:
            self.log_result("Contact Form", False, f"Request failed: {str(e)}")
        
        # 10. Payment Initiation (if booking exists)
        if booking_id:
            try:
                payment_data = {"booking_id": booking_id, "payment_method": "stripe"}
                async with self.session.post(f"{BACKEND_URL}/payments/initiate", json=payment_data, headers=headers) as response:
                    if response.status == 200:
                        data = await response.json()
                        if data.get('payment_url'):
                            self.log_result("Payment Initiation", True, "Payment session created successfully")
                        else:
                            self.log_result("Payment Initiation", False, "No payment URL returned")
                    else:
                        self.log_result("Payment Initiation", False, f"Status {response.status}")
            except Exception as e:
                self.log_result("Payment Initiation", False, f"Request failed: {str(e)}")
    
    async def run_comprehensive_test(self):
        """Run comprehensive backend test suite"""
        print("🔍 COMPREHENSIVE BACKEND TESTING - Service Areas Removal Validation")
        print("=" * 80)
        print("Testing all critical backend endpoints after service areas component removal...")
        print()
        
        await self.test_core_endpoints()
        
        # Summary
        passed = sum(1 for result in self.results if result['success'])
        total = len(self.results)
        success_rate = (passed / total) * 100 if total > 0 else 0
        
        print("\n" + "=" * 80)
        print("📊 COMPREHENSIVE TEST SUMMARY")
        print("=" * 80)
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {total - passed}")
        print(f"📈 Success Rate: {passed}/{total} ({success_rate:.1f}%)")
        
        if passed < total:
            print(f"\n🔍 FAILED TESTS:")
            for result in self.results:
                if not result['success']:
                    print(f"   • {result['test']}: {result['message']}")
        else:
            print(f"\n🎉 ALL TESTS PASSED! Backend is fully operational after service areas removal.")
        
        print(f"\n📋 DETAILED RESULTS:")
        for result in self.results:
            print(f"   {result['status']} {result['test']}")
        
        return passed == total

async def main():
    async with ComprehensiveBackendTester() as tester:
        success = await tester.run_comprehensive_test()
        return 0 if success else 1

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    exit(exit_code)