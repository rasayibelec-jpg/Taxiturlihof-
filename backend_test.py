#!/usr/bin/env python3
"""
Backend Test Suite for Taxi Türlihof Contact Form Integration
Tests the contact form API endpoints and email functionality
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
    
    async def test_email_service_configuration(self):
        """Test email service configuration (without actually sending emails)"""
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
        print("🚀 Starting Backend Test Suite for Contact Form Integration")
        print("=" * 60)
        
        # Test 1: API Health Check
        api_healthy = await self.test_api_health_check()
        
        if not api_healthy:
            print("\n❌ API is not accessible. Stopping tests.")
            return False
        
        # Test 2: Contact Form Submission
        contact_id = await self.test_contact_form_submission()
        
        # Test 3: Contact Form Validation
        await self.test_contact_form_validation()
        
        # Test 4: Contact Form Retrieval
        await self.test_contact_form_retrieval()
        
        # Test 5: Email Service Configuration
        await self.test_email_service_configuration()
        
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
        
        # Check for email-related failures
        email_config_failed = any("Email Service Configuration" in r["test"] and not r["success"] for r in self.results)
        if email_config_failed:
            print("   ⚠️  Email service needs proper SMTP credentials (expected)")
        
        return len(failed_tests) == 0 or (len(failed_tests) == 1 and email_config_failed)

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