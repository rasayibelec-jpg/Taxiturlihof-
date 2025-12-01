#!/usr/bin/env python3
"""
Admin Login API Test - Focused test for user review request
Tests the admin login endpoint with correct and incorrect credentials
"""

import asyncio
import aiohttp
import json
from datetime import datetime

# Test configuration
BACKEND_URL = "https://seo-landing-page-4.preview.emergentagent.com/api"

class AdminLoginTester:
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
        if details:
            print(f"   Details: {json.dumps(details, indent=2)}")
    
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

    async def test_admin_login_correct_credentials(self):
        """Test admin login with correct credentials"""
        try:
            correct_credentials = {
                "username": "admin",
                "password": "TaxiTurlihof2025!"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/auth/admin/login",
                json=correct_credentials,
                headers=headers
            ) as response:
                
                response_text = await response.text()
                print(f"Response Status: {response.status}")
                print(f"Response Text: {response_text}")
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate successful login response
                    if (data.get('success') == True and 
                        data.get('token') and 
                        data.get('message') == "Erfolgreich angemeldet" and
                        data.get('expires_at')):
                        
                        self.log_result(
                            "Admin Login - Correct Credentials",
                            True,
                            f"✅ Admin login successful with correct credentials",
                            {
                                "success": data.get('success'),
                                "message": data.get('message'),
                                "token_length": len(data.get('token', '')),
                                "expires_at": data.get('expires_at'),
                                "has_token": bool(data.get('token'))
                            }
                        )
                        
                        # Store token for further tests
                        self.admin_token = data.get('token')
                        return True
                    else:
                        self.log_result(
                            "Admin Login - Correct Credentials",
                            False,
                            f"❌ Invalid response structure: {data}"
                        )
                        return False
                else:
                    self.log_result(
                        "Admin Login - Correct Credentials",
                        False,
                        f"❌ API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Admin Login - Correct Credentials",
                False,
                f"❌ Request failed: {str(e)}"
            )
            return False

    async def test_admin_login_wrong_password(self):
        """Test admin login with wrong password"""
        try:
            wrong_credentials = {
                "username": "admin",
                "password": "wrongpassword"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/auth/admin/login",
                json=wrong_credentials,
                headers=headers
            ) as response:
                
                response_text = await response.text()
                print(f"Wrong Password Response Status: {response.status}")
                print(f"Wrong Password Response Text: {response_text}")
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Should return success=false with error message
                    if (data.get('success') == False and 
                        data.get('message') == "Ungültige Anmeldedaten"):
                        
                        self.log_result(
                            "Admin Login - Wrong Password",
                            True,
                            f"✅ Correctly rejected wrong password",
                            {
                                "success": data.get('success'),
                                "message": data.get('message'),
                                "token": data.get('token')
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Admin Login - Wrong Password",
                            False,
                            f"❌ Unexpected response for wrong password: {data}"
                        )
                        return False
                else:
                    self.log_result(
                        "Admin Login - Wrong Password",
                        False,
                        f"❌ API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Admin Login - Wrong Password",
                False,
                f"❌ Request failed: {str(e)}"
            )
            return False

    async def test_admin_token_verification(self):
        """Test admin token verification"""
        if not self.admin_token:
            self.log_result(
                "Admin Token Verification",
                False,
                "❌ No admin token available for verification test"
            )
            return False
            
        try:
            headers = {
                "Authorization": f"Bearer {self.admin_token}",
                "Content-Type": "application/json"
            }
            
            async with self.session.post(
                f"{BACKEND_URL}/auth/admin/verify",
                headers=headers
            ) as response:
                
                response_text = await response.text()
                print(f"Token Verification Response Status: {response.status}")
                print(f"Token Verification Response Text: {response_text}")
                
                if response.status == 200:
                    data = await response.json()
                    
                    if (data.get('success') == True and 
                        data.get('user') and
                        data.get('user', {}).get('role') == 'admin'):
                        
                        self.log_result(
                            "Admin Token Verification",
                            True,
                            f"✅ Admin token verification successful",
                            {
                                "success": data.get('success'),
                                "user_role": data.get('user', {}).get('role'),
                                "username": data.get('user', {}).get('username')
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Admin Token Verification",
                            False,
                            f"❌ Invalid verification response: {data}"
                        )
                        return False
                else:
                    self.log_result(
                        "Admin Token Verification",
                        False,
                        f"❌ API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Admin Token Verification",
                False,
                f"❌ Request failed: {str(e)}"
            )
            return False

    async def test_admin_protected_endpoint(self):
        """Test accessing admin-protected endpoint"""
        if not self.admin_token:
            self.log_result(
                "Admin Protected Endpoint Access",
                False,
                "❌ No admin token available for protected endpoint test"
            )
            return False
            
        try:
            headers = {
                "Authorization": f"Bearer {self.admin_token}",
                "Content-Type": "application/json"
            }
            
            # Test accessing the admin bookings endpoint
            async with self.session.get(
                f"{BACKEND_URL}/bookings",
                headers=headers
            ) as response:
                
                response_text = await response.text()
                print(f"Protected Endpoint Response Status: {response.status}")
                print(f"Protected Endpoint Response Length: {len(response_text)}")
                
                if response.status == 200:
                    data = await response.json()
                    
                    if isinstance(data, list):
                        self.log_result(
                            "Admin Protected Endpoint Access",
                            True,
                            f"✅ Admin can access protected bookings endpoint - {len(data)} bookings retrieved",
                            {
                                "booking_count": len(data),
                                "endpoint": "/bookings",
                                "auth_method": "Bearer token"
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Admin Protected Endpoint Access",
                            False,
                            f"❌ Unexpected response format: {type(data)}"
                        )
                        return False
                elif response.status == 401:
                    self.log_result(
                        "Admin Protected Endpoint Access",
                        False,
                        "❌ Admin token was rejected (401 Unauthorized)"
                    )
                    return False
                else:
                    self.log_result(
                        "Admin Protected Endpoint Access",
                        False,
                        f"❌ API returned status {response.status}: {response_text[:200]}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Admin Protected Endpoint Access",
                False,
                f"❌ Request failed: {str(e)}"
            )
            return False

    async def test_cors_headers(self):
        """Test CORS headers for admin login endpoint"""
        try:
            # Test preflight OPTIONS request
            headers = {
                "Origin": "https://seo-landing-page-4.preview.emergentagent.com",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type"
            }
            
            async with self.session.options(
                f"{BACKEND_URL}/auth/admin/login",
                headers=headers
            ) as response:
                
                cors_headers = {
                    "access-control-allow-origin": response.headers.get("Access-Control-Allow-Origin"),
                    "access-control-allow-methods": response.headers.get("Access-Control-Allow-Methods"),
                    "access-control-allow-headers": response.headers.get("Access-Control-Allow-Headers"),
                    "access-control-allow-credentials": response.headers.get("Access-Control-Allow-Credentials")
                }
                
                print(f"CORS Preflight Response Status: {response.status}")
                print(f"CORS Headers: {json.dumps(cors_headers, indent=2)}")
                
                # Check if CORS is properly configured
                cors_ok = (
                    cors_headers["access-control-allow-origin"] in ["*", "https://seo-landing-page-4.preview.emergentagent.com"] and
                    ("POST" in (cors_headers["access-control-allow-methods"] or "") or response.status in [200, 204])
                )
                
                if cors_ok or response.status in [200, 204]:
                    self.log_result(
                        "CORS Configuration",
                        True,
                        f"✅ CORS headers properly configured",
                        {
                            "preflight_status": response.status,
                            "cors_headers": cors_headers
                        }
                    )
                    return True
                else:
                    self.log_result(
                        "CORS Configuration",
                        False,
                        f"❌ CORS configuration issues detected",
                        {
                            "preflight_status": response.status,
                            "cors_headers": cors_headers
                        }
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "CORS Configuration",
                False,
                f"❌ CORS test failed: {str(e)}"
            )
            return False

    async def run_admin_login_tests(self):
        """Run all admin login tests"""
        print("🔐 ADMIN LOGIN API ENDPOINT TESTING")
        print("=" * 60)
        print("Testing admin login endpoint as requested by user:")
        print("- Username: 'admin'")
        print("- Password: 'TaxiTurlihof2025!'")
        print("- User reported: 'Ungültige Anmeldedaten' error")
        print("=" * 60)
        
        # Test 1: API Health Check
        api_healthy = await self.test_api_health_check()
        
        if not api_healthy:
            print("\n❌ API is not accessible. Stopping tests.")
            return False
        
        # Test 2: Admin Login with Correct Credentials
        print("\n🔑 Testing Admin Login with Correct Credentials")
        print("-" * 50)
        admin_login_success = await self.test_admin_login_correct_credentials()
        
        # Test 3: Admin Login with Wrong Password
        print("\n🚫 Testing Admin Login with Wrong Password")
        print("-" * 50)
        await self.test_admin_login_wrong_password()
        
        # Test 4: Admin Token Verification
        if admin_login_success:
            print("\n🎫 Testing Admin Token Verification")
            print("-" * 50)
            await self.test_admin_token_verification()
            
            # Test 5: Admin Protected Endpoint Access
            print("\n🔒 Testing Admin Protected Endpoint Access")
            print("-" * 50)
            await self.test_admin_protected_endpoint()
        
        # Test 6: CORS Configuration
        print("\n🌐 Testing CORS Configuration")
        print("-" * 50)
        await self.test_cors_headers()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 ADMIN LOGIN TEST SUMMARY")
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
        
        if admin_login_success:
            print("   ✅ Admin login endpoint is working with correct credentials")
            print("   ✅ Username: 'admin' and Password: 'TaxiTurlihof2025!' are correct")
        else:
            print("   ❌ Admin login failed - credentials may be incorrect or endpoint has issues")
        
        # Check for specific issues
        login_tests = [r for r in self.results if "Admin Login" in r["test"]]
        login_passed = [r for r in login_tests if r["success"]]
        if login_tests:
            print(f"   🔐 Admin Login Tests: {len(login_passed)}/{len(login_tests)} passed")
        
        return len(failed_tests) == 0

async def main():
    """Main test runner for admin login"""
    async with AdminLoginTester() as tester:
        success = await tester.run_admin_login_tests()
        return success

if __name__ == "__main__":
    try:
        success = asyncio.run(main())
        exit_code = 0 if success else 1
        print(f"\n🏁 Admin login tests completed with exit code: {exit_code}")
        exit(exit_code)
    except KeyboardInterrupt:
        print("\n⚠️ Tests interrupted by user")
        exit(1)
    except Exception as e:
        print(f"\n💥 Test runner failed: {str(e)}")
        exit(1)