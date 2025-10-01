import googlemaps
import os
import logging
from datetime import datetime
from typing import Dict, List, Optional, Tuple
import asyncio
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

class GoogleMapsDistanceService:
    """
    Real Google Maps Distance Matrix API service for accurate Swiss distance calculations
    """
    
    def __init__(self):
        api_key = os.getenv('GOOGLE_MAPS_API_KEY')
        if not api_key:
            raise ValueError("Google Maps API key not found in environment variables")
        
        self.client = googlemaps.Client(key=api_key)
        self.executor = ThreadPoolExecutor(max_workers=10)
        
        logger.info("Google Maps Distance Service initialized successfully")
    
    def _sync_distance_calculation(self, origin: str, destination: str, departure_time: Optional[datetime] = None) -> Dict:
        """Synchronous Google Maps Distance Matrix API call"""
        try:
            # Configure request parameters
            params = {
                'origins': [origin],
                'destinations': [destination], 
                'mode': 'driving',
                'units': 'metric',
                'region': 'CH',  # Bias results toward Switzerland
                'language': 'de'  # German language for Swiss context
            }
            
            # Add departure time if provided (for traffic-aware routing)
            if departure_time:
                params['departure_time'] = departure_time
            
            # Make API request
            result = self.client.distance_matrix(**params)
            
            logger.info(f"Google Maps API call successful: {origin} → {destination}")
            return result
            
        except googlemaps.exceptions.ApiError as e:
            logger.error(f"Google Maps API error: {str(e)}")
            raise Exception(f"Google Maps API error: {str(e)}")
        except Exception as e:
            logger.error(f"Distance calculation error: {str(e)}")
            raise Exception(f"Distance calculation error: {str(e)}")
    
    async def calculate_real_distance(self, origin: str, destination: str, 
                                    departure_time: Optional[datetime] = None) -> Dict:
        """
        Calculate real Google Maps distance asynchronously
        Returns: {distance_km, duration_minutes, origin_address, destination_address, status, source}
        """
        try:
            # Execute Google Maps API call in thread pool to avoid blocking
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(
                self.executor, 
                self._sync_distance_calculation, 
                origin, 
                destination, 
                departure_time
            )
            
            # Process Google Maps response
            return self._process_google_maps_response(result, origin, destination)
            
        except Exception as e:
            logger.error(f"Failed to calculate distance {origin} → {destination}: {str(e)}")
            
            # Return fallback result with error status
            return {
                'distance_km': 0.0,
                'duration_minutes': 0,
                'duration_seconds': 0,
                'origin_address': origin,
                'destination_address': destination,
                'route_type': 'error',
                'traffic_factor': 1.0,
                'straight_line_km': 0.0,
                'status': 'ERROR',
                'source': 'google_maps_api',
                'error': str(e)
            }
    
    def _process_google_maps_response(self, response: Dict, origin: str, destination: str) -> Dict:
        """Process Google Maps Distance Matrix API response"""
        try:
            # Check overall response status
            if response.get('status') != 'OK':
                raise Exception(f"Google Maps API returned status: {response.get('status')}")
            
            # Get origin and destination addresses
            origin_addresses = response.get('origin_addresses', [])
            destination_addresses = response.get('destination_addresses', [])
            
            origin_address = origin_addresses[0] if origin_addresses else origin
            destination_address = destination_addresses[0] if destination_addresses else destination
            
            # Get distance matrix elements
            rows = response.get('rows', [])
            if not rows:
                raise Exception("No route data returned from Google Maps API")
            
            elements = rows[0].get('elements', [])
            if not elements:
                raise Exception("No distance data returned from Google Maps API")
            
            element = elements[0]
            element_status = element.get('status')
            
            if element_status == 'OK':
                # Extract distance and duration from Google Maps
                distance_data = element.get('distance', {})
                duration_data = element.get('duration', {})
                
                # Get traffic-aware duration if available
                duration_in_traffic = element.get('duration_in_traffic')
                if duration_in_traffic:
                    actual_duration = duration_in_traffic.get('value', duration_data.get('value', 0))
                    traffic_factor = actual_duration / max(duration_data.get('value', 1), 1)
                else:
                    actual_duration = duration_data.get('value', 0)
                    traffic_factor = 1.0
                
                distance_km = distance_data.get('value', 0) / 1000.0  # Convert meters to km
                duration_minutes = actual_duration // 60  # Convert seconds to minutes
                
                # Determine route type based on distance and addresses
                route_type = self._determine_route_type(origin_address, destination_address, distance_km)
                
                result = {
                    'distance_km': round(distance_km, 2),
                    'duration_minutes': int(duration_minutes),
                    'duration_seconds': int(actual_duration),
                    'origin_address': origin_address,
                    'destination_address': destination_address,
                    'route_type': route_type,
                    'traffic_factor': round(traffic_factor, 2),
                    'straight_line_km': round(distance_km * 0.8, 2),  # Approximate straight line
                    'status': 'OK',
                    'source': 'google_maps_api',
                    'distance_text': distance_data.get('text', f'{distance_km:.1f} km'),
                    'duration_text': duration_data.get('text', f'{duration_minutes} mins')
                }
                
                logger.info(f"Google Maps calculation: {origin} → {destination} = {distance_km:.2f}km")
                return result
                
            else:
                # Handle specific Google Maps error statuses
                error_message = self._get_error_message(element_status)
                raise Exception(f"Route calculation failed: {error_message}")
                
        except Exception as e:
            logger.error(f"Error processing Google Maps response: {str(e)}")
            raise e
    
    def _determine_route_type(self, origin_address: str, destination_address: str, distance_km: float) -> str:
        """Determine route type based on addresses and distance"""
        
        # Swiss city patterns
        major_cities = ['zürich', 'basel', 'bern', 'genève', 'lausanne']
        regional_cities = ['luzern', 'zug', 'schwyz', 'winterthur', 'st. gallen']
        
        origin_lower = origin_address.lower()
        dest_lower = destination_address.lower()
        
        # Check if route involves major cities
        origin_major = any(city in origin_lower for city in major_cities)
        dest_major = any(city in dest_lower for city in major_cities)
        origin_regional = any(city in origin_lower for city in regional_cities)
        dest_regional = any(city in dest_lower for city in regional_cities)
        
        # Classify route type
        if distance_km < 10:
            return 'inner_city'
        elif distance_km < 25:
            return 'suburban'  
        elif distance_km < 50:
            return 'inter_city'
        elif distance_km >= 50 and (origin_major or dest_major):
            return 'highway'
        else:
            return 'inter_city'
    
    def _get_error_message(self, status: str) -> str:
        """Get user-friendly error message for Google Maps status codes"""
        error_messages = {
            'NOT_FOUND': 'One or both locations could not be found',
            'ZERO_RESULTS': 'No route could be found between the locations',
            'MAX_WAYPOINTS_EXCEEDED': 'Too many waypoints in the request',
            'MAX_ROUTE_LENGTH_EXCEEDED': 'Route is too long to calculate',
            'INVALID_REQUEST': 'Invalid request parameters',
            'OVER_DAILY_LIMIT': 'API daily quota exceeded',
            'OVER_QUERY_LIMIT': 'API query limit exceeded',
            'REQUEST_DENIED': 'API request was denied',
            'UNKNOWN_ERROR': 'Unknown error occurred'
        }
        
        return error_messages.get(status, f'Google Maps API error: {status}')
    
    async def calculate_route_options(self, origin: str, destination: str, 
                                    departure_time: Optional[datetime] = None) -> Dict:
        """
        Calculate multiple route options: fastest and shortest
        Returns: {fastest_route, shortest_route, comparison}
        """
        try:
            # Calculate both route options in parallel
            loop = asyncio.get_event_loop()
            
            # Option 1: Fastest route (optimized for time)
            fastest_task = loop.run_in_executor(
                self.executor, 
                self._sync_route_calculation, 
                origin, 
                destination, 
                'fastest',
                departure_time
            )
            
            # Option 2: Shortest route (optimized for distance)
            shortest_task = loop.run_in_executor(
                self.executor, 
                self._sync_route_calculation, 
                origin, 
                destination, 
                'shortest',
                departure_time
            )
            
            # Wait for both calculations
            fastest_result, shortest_result = await asyncio.gather(fastest_task, shortest_task)
            
            # Process both results
            fastest_route = self._process_google_maps_response(fastest_result, origin, destination)
            shortest_route = self._process_google_maps_response(shortest_result, origin, destination)
            
            # Add route type identifiers
            fastest_route['route_option'] = 'fastest'
            shortest_route['route_option'] = 'shortest'
            
            # Calculate savings comparison
            time_difference = fastest_route['duration_minutes'] - shortest_route['duration_minutes']
            distance_difference = fastest_route['distance_km'] - shortest_route['distance_km']
            
            comparison = {
                'time_savings_minutes': abs(time_difference),
                'distance_savings_km': abs(distance_difference),
                'faster_option': 'fastest' if time_difference <= 0 else 'shortest',
                'shorter_option': 'shortest' if distance_difference <= 0 else 'fastest'
            }
            
            return {
                'fastest_route': fastest_route,
                'shortest_route': shortest_route,
                'comparison': comparison,
                'status': 'OK',
                'source': 'google_maps_multi_route'
            }
            
        except Exception as e:
            logger.error(f"Failed to calculate route options {origin} → {destination}: {str(e)}")
            
            # Fallback to single route calculation
            fallback_route = await self.calculate_real_distance(origin, destination, departure_time)
            
            return {
                'fastest_route': fallback_route,
                'shortest_route': fallback_route,
                'comparison': {
                    'time_savings_minutes': 0,
                    'distance_savings_km': 0,
                    'faster_option': 'same',
                    'shorter_option': 'same'
                },
                'status': 'FALLBACK',
                'source': 'google_maps_single_route',
                'error': str(e)
            }
    
    def _sync_route_calculation(self, origin: str, destination: str, option: str, departure_time: Optional[datetime] = None) -> Dict:
        """Synchronous route calculation with different optimization preferences"""
        try:
            # Configure request parameters based on route option
            params = {
                'origins': [origin],
                'destinations': [destination], 
                'mode': 'driving',
                'units': 'metric',
                'region': 'CH',
                'language': 'de'
            }
            
            # Add departure time for traffic-aware routing
            if departure_time:
                params['departure_time'] = departure_time
            
            # Configure optimization preference
            if option == 'fastest':
                params['traffic_model'] = 'optimistic'  # Optimistic traffic for fastest route
                # Don't avoid anything for speed - no avoid parameter
            elif option == 'shortest':
                params['traffic_model'] = 'pessimistic'  # More conservative for shortest route
                # Note: Distance Matrix API doesn't support avoid parameter effectively
                # We'll rely on traffic_model differences for route variation
            
            # Make API request
            result = self.client.distance_matrix(**params)
            
            logger.info(f"Google Maps {option} route calculated: {origin} → {destination}")
            return result
            
        except Exception as e:
            logger.error(f"Route calculation error ({option}): {str(e)}")
            raise e
    
    async def calculate_multiple_routes(self, route_pairs: List[Tuple[str, str]]) -> List[Dict]:
        """Calculate multiple routes in parallel for efficiency"""
        try:
            tasks = []
            for origin, destination in route_pairs:
                task = self.calculate_real_distance(origin, destination)
                tasks.append(task)
            
            results = await asyncio.gather(*tasks, return_exceptions=True)
            
            # Process results and handle exceptions
            processed_results = []
            for i, result in enumerate(results):
                if isinstance(result, Exception):
                    logger.error(f"Route calculation failed for pair {i}: {str(result)}")
                    # Add error result
                    processed_results.append({
                        'status': 'ERROR',
                        'error': str(result),
                        'origin': route_pairs[i][0],
                        'destination': route_pairs[i][1]
                    })
                else:
                    processed_results.append(result)
            
            return processed_results
            
        except Exception as e:
            logger.error(f"Multiple route calculation failed: {str(e)}")
            raise e
    
    def test_api_connection(self) -> bool:
        """Test Google Maps API connection"""
        try:
            # Simple test geocoding request
            result = self.client.geocode("Zürich, Switzerland")
            return len(result) > 0
        except Exception as e:
            logger.error(f"Google Maps API test failed: {str(e)}")
            return False

# Global Google Maps service instance
google_maps_service = GoogleMapsDistanceService()