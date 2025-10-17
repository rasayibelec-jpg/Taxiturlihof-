#!/usr/bin/env python3
"""
Admin Payments Deletion Test
Tests the Admin Payments API to verify that all payments have been successfully deleted.
"""

import asyncio
import aiohttp
import json
from datetime import datetime

# Test configuration
BACKEND_URL = "https://ride-manager-7.preview.emergentagent.com/api"
ADMIN_CREDENTIALS = {
    "username": "admin",
    "password": "TaxiTurlihof2025!"
}

class AdminPaymentsDeletionTester:
    def __init__(self):
        self.session = None
        self.admin_token = None
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
    
    async def test_admin_login(self):
        """Test admin login to get a valid token"""
        try:
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/auth/admin/login",
                json=ADMIN_CREDENTIALS,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data.get("success") and data.get("token"):
                        self.admin_token = data["token"]
                        self.log_result(
                            "Admin Login",
                            True,
                            f"Admin login successful - Token acquired",
                            {
                                "username": ADMIN_CREDENTIALS["username"],
                                "token_expires": data.get("expires_at"),
                                "message": data.get("message")
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Admin Login",
                            False,
                            f"Login failed: {data.get('message', 'Unknown error')}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Admin Login",
                        False,
                        f"Login API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Admin Login",
                False,
                f"Login request failed: {str(e)}"
            )
            return False
    
    async def test_admin_payments_endpoint(self):
        """Test GET /api/admin/payments endpoint to verify no payments exist"""
        if not self.admin_token:
            self.log_result(
                "Admin Payments Endpoint",
                False,
                "No admin token available - login required first"
            )
            return False
            
        try:
            headers = {
                "Authorization": f"Bearer {self.admin_token}",
                "Content-Type": "application/json"
            }
            
            async with self.session.get(
                f"{BACKEND_URL}/admin/payments",
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Verify response structure
                    if "success" in data and "transactions" in data:
                        transactions = data["transactions"]
                        transaction_count = len(transactions)
                        
                        # Check if all payments have been deleted (count should be 0)
                        if transaction_count == 0:
                            self.log_result(
                                "Admin Payments Endpoint",
                                True,
                                f"✅ All payments successfully deleted - Payment count: {transaction_count}",
                                {
                                    "success": data["success"],
                                    "transaction_count": transaction_count,
                                    "transactions": transactions,
                                    "verification": "All 17 payments have been successfully removed from test_database"
                                }
                            )
                            return True
                        else:
                            self.log_result(
                                "Admin Payments Endpoint",
                                False,
                                f"❌ Payments still exist - Found {transaction_count} payment transactions",
                                {
                                    "success": data["success"],
                                    "transaction_count": transaction_count,
                                    "remaining_transactions": transactions[:5] if transactions else [],  # Show first 5 for debugging
                                    "issue": f"Expected 0 payments, but found {transaction_count}"
                                }
                            )
                            return False
                    else:
                        self.log_result(
                            "Admin Payments Endpoint",
                            False,
                            f"Invalid response structure: {data}"
                        )
                        return False
                        
                elif response.status == 401:
                    self.log_result(
                        "Admin Payments Endpoint",
                        False,
                        "Unauthorized access - Admin token may be invalid or expired"
                    )
                    return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Admin Payments Endpoint",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Admin Payments Endpoint",
                False,
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_payment_count_verification(self):
        """Verify the payment count is exactly 0"""
        if not self.admin_token:
            self.log_result(
                "Payment Count Verification",
                False,
                "No admin token available - login required first"
            )
            return False
            
        try:
            headers = {
                "Authorization": f"Bearer {self.admin_token}",
                "Content-Type": "application/json"
            }
            
            async with self.session.get(
                f"{BACKEND_URL}/admin/payments",
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if "transactions" in data:
                        transaction_count = len(data["transactions"])
                        
                        if transaction_count == 0:
                            self.log_result(
                                "Payment Count Verification",
                                True,
                                f"✅ Payment count verification successful - Confirmed 0 payments in database",
                                {
                                    "expected_count": 0,
                                    "actual_count": transaction_count,
                                    "verification_status": "PASSED - All payments deleted",
                                    "database": "test_database"
                                }
                            )
                            return True
                        else:
                            self.log_result(
                                "Payment Count Verification",
                                False,
                                f"❌ Payment count verification failed - Expected 0, found {transaction_count}",
                                {
                                    "expected_count": 0,
                                    "actual_count": transaction_count,
                                    "verification_status": "FAILED - Payments still exist",
                                    "database": "test_database"
                                }
                            )
                            return False
                    else:
                        self.log_result(
                            "Payment Count Verification",
                            False,
                            "Invalid response - missing transactions field"
                        )
                        return False
                else:
                    self.log_result(
                        "Payment Count Verification",
                        False,
                        f"API error - status {response.status}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Payment Count Verification",
                False,
                f"Verification failed: {str(e)}"
            )
            return False
    
    async def test_api_response_structure(self):
        """Verify the API response structure is correct but empty"""
        if not self.admin_token:
            self.log_result(
                "API Response Structure",
                False,
                "No admin token available - login required first"
            )
            return False
            
        try:
            headers = {
                "Authorization": f"Bearer {self.admin_token}",
                "Content-Type": "application/json"
            }
            
            async with self.session.get(
                f"{BACKEND_URL}/admin/payments",
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Verify required fields exist
                    required_fields = ["success", "transactions"]
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if not missing_fields:
                        # Verify field types and values
                        success_valid = isinstance(data["success"], bool) and data["success"] is True
                        transactions_valid = isinstance(data["transactions"], list)
                        transactions_empty = len(data["transactions"]) == 0
                        
                        if success_valid and transactions_valid and transactions_empty:
                            self.log_result(
                                "API Response Structure",
                                True,
                                f"✅ API response structure is correct and empty as expected",
                                {
                                    "success": data["success"],
                                    "transactions_type": type(data["transactions"]).__name__,
                                    "transactions_length": len(data["transactions"]),
                                    "structure_validation": "PASSED - success=true, transactions=[] (empty array)",
                                    "response_format": "Correct JSON structure with empty payment list"
                                }
                            )
                            return True
                        else:
                            issues = []
                            if not success_valid:
                                issues.append(f"success field invalid: {data['success']}")
                            if not transactions_valid:
                                issues.append(f"transactions field not a list: {type(data['transactions'])}")
                            if not transactions_empty:
                                issues.append(f"transactions not empty: {len(data['transactions'])} items")
                            
                            self.log_result(
                                "API Response Structure",
                                False,
                                f"❌ API response structure issues: {', '.join(issues)}",
                                {
                                    "success": data["success"],
                                    "transactions": data["transactions"],
                                    "issues": issues
                                }
                            )
                            return False
                    else:
                        self.log_result(
                            "API Response Structure",
                            False,
                            f"Missing required fields: {missing_fields}",
                            {"response": data}
                        )
                        return False
                else:
                    self.log_result(
                        "API Response Structure",
                        False,
                        f"API error - status {response.status}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "API Response Structure",
                False,
                f"Structure validation failed: {str(e)}"
            )
            return False
    
    async def run_all_tests(self):
        """Run all admin payments deletion tests"""
        print("🚀 Starting Admin Payments Deletion Test Suite")
        print("=" * 60)
        
        # Test 1: Admin login
        login_success = await self.test_admin_login()
        if not login_success:
            print("\n❌ Admin login failed - cannot proceed with payment tests")
            return False
        
        # Test 2: Check admin payments endpoint
        payments_test = await self.test_admin_payments_endpoint()
        
        # Test 3: Verify payment count is 0
        count_test = await self.test_payment_count_verification()
        
        # Test 4: Verify API response structure
        structure_test = await self.test_api_response_structure()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed_tests = sum(1 for result in self.results if result["success"])
        total_tests = len(self.results)
        
        for result in self.results:
            print(f"{result['status']} {result['test']}")
        
        print(f"\n🎯 Overall Result: {passed_tests}/{total_tests} tests passed")
        
        if passed_tests == total_tests:
            print("🎉 ALL TESTS PASSED - All 17 payments have been successfully deleted from test_database!")
            return True
        else:
            print("❌ SOME TESTS FAILED - Payment deletion may not be complete")
            return False

async def main():
    """Main test execution"""
    async with AdminPaymentsDeletionTester() as tester:
        success = await tester.run_all_tests()
        return success

if __name__ == "__main__":
    result = asyncio.run(main())
    exit(0 if result else 1)