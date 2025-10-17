#!/usr/bin/env python3
"""
Real Admin Password Reset Test - Tests the complete workflow with actual tokens
"""

import asyncio
import aiohttp
import json
import re
import sys
from datetime import datetime

BACKEND_URL = "https://ride-manager-7.preview.emergentagent.com/api"

class RealPasswordResetTester:
    def __init__(self):
        self.session = None
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()

    async def test_complete_password_reset_workflow(self):
        """Test the complete password reset workflow with real tokens"""
        print("🔐 Testing Complete Admin Password Reset Workflow")
        print("=" * 60)
        
        # Step 1: Request email reset
        print("\n📧 Step 1: Requesting email password reset...")
        test_data = {"method": "email"}
        headers = {"Content-Type": "application/json"}
        
        async with self.session.post(
            f"{BACKEND_URL}/admin/password-reset/request",
            json=test_data,
            headers=headers
        ) as response:
            
            if response.status == 200:
                data = await response.json()
                print(f"✅ Email reset request successful: {data['message']}")
                
                # Step 2: Extract token from backend logs (simulating real usage)
                print("\n🔍 Step 2: Extracting token from system...")
                
                # In a real scenario, the user would get the token from their email
                # For testing, we'll simulate this by accessing the password reset service directly
                import sys
                import os
                sys.path.insert(0, '/app/backend')
                from password_reset_service import reset_tokens
                
                # Get the most recent token (this simulates getting it from email)
                if reset_tokens:
                    # Get the most recent token
                    latest_token = list(reset_tokens.keys())[-1]
                    print(f"✅ Token extracted: {latest_token[:20]}...")
                    
                    # Step 3: Verify the token
                    print("\n🔍 Step 3: Verifying the token...")
                    verify_data = {"token": latest_token}
                    
                    async with self.session.post(
                        f"{BACKEND_URL}/admin/password-reset/verify",
                        json=verify_data,
                        headers=headers
                    ) as verify_response:
                        
                        if verify_response.status == 200:
                            verify_result = await verify_response.json()
                            print(f"✅ Token verification successful: {verify_result['message']}")
                            
                            # Step 4: Complete password reset
                            print("\n✅ Step 4: Completing password reset...")
                            complete_data = {
                                "token": latest_token,
                                "new_password": "NewTaxiPassword2025!",
                                "confirm_password": "NewTaxiPassword2025!"
                            }
                            
                            async with self.session.post(
                                f"{BACKEND_URL}/admin/password-reset/complete",
                                json=complete_data,
                                headers=headers
                            ) as complete_response:
                                
                                if complete_response.status == 200:
                                    complete_result = await complete_response.json()
                                    print(f"✅ Password reset completed: {complete_result['message']}")
                                    
                                    # Step 5: Test login with new password
                                    print("\n🔑 Step 5: Testing login with new password...")
                                    await asyncio.sleep(1)  # Give system time to update
                                    
                                    new_login_data = {
                                        "username": "admin",
                                        "password": "NewTaxiPassword2025!"
                                    }
                                    
                                    async with self.session.post(
                                        f"{BACKEND_URL}/auth/admin/login",
                                        json=new_login_data,
                                        headers=headers
                                    ) as login_response:
                                        
                                        if login_response.status == 200:
                                            login_result = await login_response.json()
                                            if login_result.get('success'):
                                                print("✅ Login with new password successful!")
                                                print(f"   Token received: {bool(login_result.get('token'))}")
                                                print(f"   Expires at: {login_result.get('expires_at')}")
                                                
                                                # Step 6: Verify old password no longer works
                                                print("\n🔒 Step 6: Verifying old password no longer works...")
                                                old_login_data = {
                                                    "username": "admin",
                                                    "password": "TaxiTurlihof2025!"
                                                }
                                                
                                                async with self.session.post(
                                                    f"{BACKEND_URL}/auth/admin/login",
                                                    json=old_login_data,
                                                    headers=headers
                                                ) as old_login_response:
                                                    
                                                    if old_login_response.status == 200:
                                                        old_login_result = await old_login_response.json()
                                                        if not old_login_result.get('success'):
                                                            print("✅ Old password correctly rejected!")
                                                            print("🎉 COMPLETE PASSWORD RESET WORKFLOW SUCCESSFUL!")
                                                            return True
                                                        else:
                                                            print("⚠️ Old password still works - password may not have been updated")
                                                            return False
                                                    else:
                                                        print("✅ Old password correctly rejected (401/400 status)!")
                                                        print("🎉 COMPLETE PASSWORD RESET WORKFLOW SUCCESSFUL!")
                                                        return True
                                            else:
                                                print(f"❌ Login with new password failed: {login_result}")
                                                return False
                                        else:
                                            print(f"❌ Login API error: {login_response.status}")
                                            return False
                                else:
                                    complete_text = await complete_response.text()
                                    print(f"❌ Password reset completion failed: {complete_response.status} - {complete_text}")
                                    return False
                        else:
                            verify_text = await verify_response.text()
                            print(f"❌ Token verification failed: {verify_response.status} - {verify_text}")
                            return False
                else:
                    print("❌ No tokens found in system")
                    return False
            else:
                response_text = await response.text()
                print(f"❌ Email reset request failed: {response.status} - {response_text}")
                return False

    async def test_sms_workflow(self):
        """Test SMS workflow"""
        print("\n📱 Testing SMS Password Reset Workflow")
        print("-" * 40)
        
        # Step 1: Request SMS reset
        test_data = {"method": "sms"}
        headers = {"Content-Type": "application/json"}
        
        async with self.session.post(
            f"{BACKEND_URL}/admin/password-reset/request",
            json=test_data,
            headers=headers
        ) as response:
            
            if response.status == 200:
                data = await response.json()
                print(f"✅ SMS reset request successful: {data['message']}")
                
                # Extract SMS code from system
                import sys
                sys.path.insert(0, '/app/backend')
                from password_reset_service import sms_codes
                
                if sms_codes:
                    latest_code = list(sms_codes.keys())[-1]
                    print(f"✅ SMS code extracted: {latest_code}")
                    
                    # Verify SMS code
                    verify_data = {"code": latest_code}
                    
                    async with self.session.post(
                        f"{BACKEND_URL}/admin/password-reset/verify",
                        json=verify_data,
                        headers=headers
                    ) as verify_response:
                        
                        if verify_response.status == 200:
                            verify_result = await verify_response.json()
                            print(f"✅ SMS code verification successful: {verify_result['message']}")
                            return True
                        else:
                            print(f"❌ SMS code verification failed: {verify_response.status}")
                            return False
                else:
                    print("❌ No SMS codes found in system")
                    return False
            else:
                print(f"❌ SMS reset request failed: {response.status}")
                return False

async def main():
    """Main test runner"""
    async with RealPasswordResetTester() as tester:
        print("🚀 Starting Real Admin Password Reset Test")
        print("This test uses actual tokens/codes generated by the system")
        print("=" * 60)
        
        # Test complete email workflow
        email_success = await tester.test_complete_password_reset_workflow()
        
        # Test SMS workflow
        sms_success = await tester.test_sms_workflow()
        
        print("\n" + "=" * 60)
        print("📊 REAL PASSWORD RESET TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Email workflow: {'PASSED' if email_success else 'FAILED'}")
        print(f"✅ SMS workflow: {'PASSED' if sms_success else 'FAILED'}")
        
        if email_success and sms_success:
            print("\n🎉 ALL REAL PASSWORD RESET TESTS PASSED!")
            print("The admin password reset system is fully functional!")
            return True
        else:
            print("\n⚠️ Some tests failed. Please review the output above.")
            return False

if __name__ == "__main__":
    try:
        success = asyncio.run(main())
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\n💥 Test failed with error: {str(e)}")
        sys.exit(1)