#!/usr/bin/env python3
"""
Distance Calculation Issue Test - Focused Testing
Testing the specific route showing wrong distance: Rothenthurm to Zürich Flughafen
Expected: ~55 km, Currently showing: 85.35 km
"""

import asyncio
import aiohttp
import json
import sys
from pathlib import Path
from datetime import datetime

# Add backend directory to path for imports
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

# Test configuration
BACKEND_URL = "https://nova-taxi-portal.preview.emergentagent.com/api"

class DistanceIssueTester:
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
    
    async def test_problematic_route_rothenthurm_to_zurich_airport(self):
        """Test the specific problematic route: Rothenthurm to Zürich Flughafen"""
        try:
            test_data = {
                "origin": "Ausserschwingerstrasse 2, 6418 Rothenthurm, Schweiz",
                "destination": "Zürich Flughafen"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/calculate-price",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    distance = data['distance_km']
                    route_info = data.get('route_info', {})
                    calculation_source = data.get('calculation_source', 'unknown')
                    
                    # Expected distance should be around 50-60 km, not 85.35 km
                    expected_min = 50
                    expected_max = 65
                    distance_correct = expected_min <= distance <= expected_max
                    
                    if distance_correct:
                        self.log_result(
                            "Problematic Route - Rothenthurm to Zürich Airport",
                            True,
                            f"✅ Distance calculation FIXED: {distance}km (within expected range {expected_min}-{expected_max}km)",
                            {
                                "actual_distance_km": distance,
                                "expected_range": f"{expected_min}-{expected_max} km",
                                "route_type": route_info.get('route_type'),
                                "calculation_source": calculation_source,
                                "origin_address": data.get('origin'),
                                "destination_address": data.get('destination'),
                                "duration_minutes": data.get('estimated_duration_minutes'),
                                "total_fare": data.get('total_fare'),
                                "traffic_factor": route_info.get('traffic_factor')
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Problematic Route - Rothenthurm to Zürich Airport",
                            False,
                            f"❌ Distance calculation STILL WRONG: {distance}km (expected {expected_min}-{expected_max}km, difference: {abs(distance - 55):.1f}km)",
                            {
                                "actual_distance_km": distance,
                                "expected_range": f"{expected_min}-{expected_max} km",
                                "error_magnitude": abs(distance - 55),
                                "route_type": route_info.get('route_type'),
                                "calculation_source": calculation_source,
                                "origin_address": data.get('origin'),
                                "destination_address": data.get('destination'),
                                "route_info": route_info,
                                "full_response": data
                            }
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Problematic Route - Rothenthurm to Zürich Airport",
                        False,
                        f"❌ API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Problematic Route - Rothenthurm to Zürich Airport",
                False,
                f"❌ Request failed: {str(e)}"
            )
            return False

    async def test_alternative_zurich_destinations(self):
        """Test different Zurich destinations to see if the problem is consistent"""
        zurich_destinations = [
            "Zürich HB",
            "Zürich Hauptbahnhof", 
            "Zürich Zentrum",
            "Zürich, Schweiz",
            "Zurich Airport"
        ]
        
        origin = "Ausserschwingerstrasse 2, 6418 Rothenthurm, Schweiz"
        results = []
        
        for destination in zurich_destinations:
            try:
                test_data = {
                    "origin": origin,
                    "destination": destination
                }
                
                headers = {"Content-Type": "application/json"}
                async with self.session.post(
                    f"{BACKEND_URL}/calculate-price",
                    json=test_data,
                    headers=headers
                ) as response:
                    
                    if response.status == 200:
                        data = await response.json()
                        distance = data['distance_km']
                        
                        results.append({
                            "destination": destination,
                            "distance_km": distance,
                            "origin_address": data.get('origin'),
                            "destination_address": data.get('destination'),
                            "route_type": data.get('route_info', {}).get('route_type'),
                            "calculation_source": data.get('calculation_source')
                        })
                    else:
                        results.append({
                            "destination": destination,
                            "error": f"API error {response.status}",
                            "distance_km": None
                        })
                        
            except Exception as e:
                results.append({
                    "destination": destination,
                    "error": str(e),
                    "distance_km": None
                })
        
        # Analyze results
        valid_results = [r for r in results if r.get('distance_km') is not None]
        if valid_results:
            distances = [r['distance_km'] for r in valid_results]
            avg_distance = sum(distances) / len(distances)
            min_distance = min(distances)
            max_distance = max(distances)
            
            # Check if distances are consistent and reasonable
            distance_variance = max_distance - min_distance
            reasonable_range = 50 <= avg_distance <= 65
            consistent = distance_variance < 10  # Less than 10km variance
            
            success = reasonable_range and consistent
            
            self.log_result(
                "Alternative Zurich Destinations",
                success,
                f"{'✅' if success else '❌'} Tested {len(valid_results)} Zurich destinations - Avg: {avg_distance:.1f}km, Range: {min_distance:.1f}-{max_distance:.1f}km",
                {
                    "results": results,
                    "statistics": {
                        "average_distance": round(avg_distance, 2),
                        "min_distance": min_distance,
                        "max_distance": max_distance,
                        "distance_variance": round(distance_variance, 2),
                        "reasonable_range": reasonable_range,
                        "consistent": consistent
                    }
                }
            )
            return success
        else:
            self.log_result(
                "Alternative Zurich Destinations",
                False,
                "❌ No valid distance calculations returned",
                {"results": results}
            )
            return False

    async def test_google_maps_api_direct_comparison(self):
        """Test Google Maps API directly to compare with manual Google Maps search"""
        try:
            # Import Google Maps service directly
            from google_maps_service import google_maps_service
            
            origin = "Ausserschwingerstrasse 2, 6418 Rothenthurm, Schweiz"
            destination = "Zürich Flughafen"
            
            # Call Google Maps service directly
            result = await google_maps_service.calculate_real_distance(origin, destination)
            
            if result.get('status') == 'OK':
                distance = result['distance_km']
                expected_range = (50, 65)
                
                distance_correct = expected_range[0] <= distance <= expected_range[1]
                
                self.log_result(
                    "Google Maps API Direct Test",
                    distance_correct,
                    f"{'✅' if distance_correct else '❌'} Direct Google Maps API: {distance}km (expected {expected_range[0]}-{expected_range[1]}km)",
                    {
                        "google_maps_result": result,
                        "distance_km": distance,
                        "expected_range": expected_range,
                        "origin_address": result.get('origin_address'),
                        "destination_address": result.get('destination_address'),
                        "duration_minutes": result.get('duration_minutes'),
                        "route_type": result.get('route_type'),
                        "traffic_factor": result.get('traffic_factor')
                    }
                )
                return distance_correct
            else:
                self.log_result(
                    "Google Maps API Direct Test",
                    False,
                    f"❌ Google Maps API error: {result.get('status')} - {result.get('error', 'Unknown error')}",
                    {"google_maps_result": result}
                )
                return False
                
        except Exception as e:
            self.log_result(
                "Google Maps API Direct Test",
                False,
                f"❌ Failed to test Google Maps API directly: {str(e)}"
            )
            return False

    async def test_coordinate_interpretation(self):
        """Test if coordinate interpretation is causing issues"""
        test_variations = [
            {
                "name": "Full Address",
                "origin": "Ausserschwingerstrasse 2, 6418 Rothenthurm, Schweiz",
                "destination": "Zürich Flughafen"
            },
            {
                "name": "City Only",
                "origin": "Rothenthurm",
                "destination": "Zürich Flughafen"
            },
            {
                "name": "With Postal Code",
                "origin": "6418 Rothenthurm",
                "destination": "Zürich Flughafen"
            },
            {
                "name": "Alternative Airport Name",
                "origin": "Ausserschwingerstrasse 2, 6418 Rothenthurm, Schweiz",
                "destination": "Zurich Airport"
            }
        ]
        
        results = []
        
        for variation in test_variations:
            try:
                test_data = {
                    "origin": variation["origin"],
                    "destination": variation["destination"]
                }
                
                headers = {"Content-Type": "application/json"}
                async with self.session.post(
                    f"{BACKEND_URL}/calculate-price",
                    json=test_data,
                    headers=headers
                ) as response:
                    
                    if response.status == 200:
                        data = await response.json()
                        
                        results.append({
                            "variation": variation["name"],
                            "origin_input": variation["origin"],
                            "destination_input": variation["destination"],
                            "distance_km": data['distance_km'],
                            "origin_resolved": data.get('origin'),
                            "destination_resolved": data.get('destination'),
                            "route_type": data.get('route_info', {}).get('route_type'),
                            "calculation_source": data.get('calculation_source')
                        })
                    else:
                        results.append({
                            "variation": variation["name"],
                            "error": f"API error {response.status}",
                            "distance_km": None
                        })
                        
            except Exception as e:
                results.append({
                    "variation": variation["name"],
                    "error": str(e),
                    "distance_km": None
                })
        
        # Analyze coordinate interpretation results
        valid_results = [r for r in results if r.get('distance_km') is not None]
        
        if valid_results:
            distances = [r['distance_km'] for r in valid_results]
            avg_distance = sum(distances) / len(distances)
            
            # Check if all variations give similar results
            max_variance = max(distances) - min(distances)
            consistent_interpretation = max_variance < 5  # Less than 5km variance
            reasonable_distance = 50 <= avg_distance <= 65
            
            success = consistent_interpretation and reasonable_distance
            
            self.log_result(
                "Coordinate Interpretation Test",
                success,
                f"{'✅' if success else '❌'} Tested {len(valid_results)} address variations - Avg: {avg_distance:.1f}km, Variance: {max_variance:.1f}km",
                {
                    "results": results,
                    "analysis": {
                        "average_distance": round(avg_distance, 2),
                        "max_variance": round(max_variance, 2),
                        "consistent_interpretation": consistent_interpretation,
                        "reasonable_distance": reasonable_distance
                    }
                }
            )
            return success
        else:
            self.log_result(
                "Coordinate Interpretation Test",
                False,
                "❌ No valid coordinate interpretations",
                {"results": results}
            )
            return False

    async def test_route_processing_logic(self):
        """Test if route processing logic is adding incorrect multipliers"""
        try:
            # Test the same route but examine the route processing details
            test_data = {
                "origin": "Ausserschwingerstrasse 2, 6418 Rothenthurm, Schweiz",
                "destination": "Zürich Flughafen"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/calculate-price",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Examine route processing details
                    route_info = data.get('route_info', {})
                    distance_km = data['distance_km']
                    route_type = route_info.get('route_type', 'unknown')
                    traffic_factor = route_info.get('traffic_factor', 1.0)
                    straight_line_km = route_info.get('straight_line_km', 0)
                    calculation_source = data.get('calculation_source', 'unknown')
                    
                    # Check for suspicious processing
                    suspicious_factors = []
                    
                    if traffic_factor > 1.5:
                        suspicious_factors.append(f"High traffic factor: {traffic_factor}")
                    
                    if straight_line_km > 0 and distance_km > straight_line_km * 2:
                        suspicious_factors.append(f"Distance much higher than straight line: {distance_km}km vs {straight_line_km}km straight")
                    
                    if route_type not in ['highway', 'inter_city'] and distance_km > 50:
                        suspicious_factors.append(f"Unexpected route type '{route_type}' for long distance")
                    
                    # Check if distance is reasonable
                    distance_reasonable = 50 <= distance_km <= 65
                    processing_clean = len(suspicious_factors) == 0
                    
                    success = distance_reasonable and processing_clean
                    
                    self.log_result(
                        "Route Processing Logic Test",
                        success,
                        f"{'✅' if success else '❌'} Route processing analysis - Distance: {distance_km}km, Issues: {len(suspicious_factors)}",
                        {
                            "distance_km": distance_km,
                            "route_info": route_info,
                            "calculation_source": calculation_source,
                            "suspicious_factors": suspicious_factors,
                            "distance_reasonable": distance_reasonable,
                            "processing_clean": processing_clean,
                            "full_response": data
                        }
                    )
                    return success
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Route Processing Logic Test",
                        False,
                        f"❌ API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Route Processing Logic Test",
                False,
                f"❌ Request failed: {str(e)}"
            )
            return False

    async def run_all_tests(self):
        """Run all distance issue tests"""
        print("🔍 DISTANCE CALCULATION ISSUE INVESTIGATION")
        print("=" * 60)
        print("Testing route: Rothenthurm → Zürich Flughafen")
        print("Expected: ~55 km, Currently showing: 85.35 km")
        print("=" * 60)
        
        tests = [
            self.test_problematic_route_rothenthurm_to_zurich_airport(),
            self.test_alternative_zurich_destinations(),
            self.test_google_maps_api_direct_comparison(),
            self.test_coordinate_interpretation(),
            self.test_route_processing_logic()
        ]
        
        results = await asyncio.gather(*tests, return_exceptions=True)
        
        # Summary
        print("\n" + "=" * 60)
        print("🎯 DISTANCE ISSUE TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in results if result is True)
        total = len(results)
        
        for i, result in enumerate(results):
            test_name = [
                "Problematic Route Test",
                "Alternative Destinations Test", 
                "Google Maps API Direct Test",
                "Coordinate Interpretation Test",
                "Route Processing Logic Test"
            ][i]
            
            if isinstance(result, Exception):
                print(f"❌ {test_name}: EXCEPTION - {str(result)}")
            elif result is True:
                print(f"✅ {test_name}: PASSED")
            else:
                print(f"❌ {test_name}: FAILED")
        
        print(f"\n📊 OVERALL RESULT: {passed}/{total} tests passed ({passed/total*100:.1f}%)")
        
        if passed == total:
            print("🎉 DISTANCE CALCULATION ISSUE RESOLVED!")
        elif passed > 0:
            print("⚠️  PARTIAL SUCCESS - Some issues remain")
        else:
            print("🚨 DISTANCE CALCULATION ISSUE PERSISTS")
        
        return passed, total

async def main():
    """Main test execution"""
    async with DistanceIssueTester() as tester:
        passed, total = await tester.run_all_tests()
        
        # Exit with appropriate code
        if passed == total:
            exit(0)  # All tests passed
        else:
            exit(1)  # Some tests failed

if __name__ == "__main__":
    asyncio.run(main())