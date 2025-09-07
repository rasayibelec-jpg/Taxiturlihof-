import math
from typing import Dict, List, Tuple, Optional
from datetime import datetime, time
import re
import logging

logger = logging.getLogger(__name__)

class SwissDistanceService:
    """
    Intelligente Distanzschätzung für die Schweiz
    Basierend auf geografischen Daten und historischen Durchschnittswerten
    """
    
    def __init__(self):
        # Schweizer Städte und ihre Koordinaten
        self.swiss_locations = {
            # Luzern Region
            "luzern": {"lat": 47.0502, "lng": 8.3093, "region": "luzern", "type": "city"},
            "lucerne": {"lat": 47.0502, "lng": 8.3093, "region": "luzern", "type": "city"},
            "kriens": {"lat": 47.0357, "lng": 8.2785, "region": "luzern", "type": "town"},
            "emmen": {"lat": 47.0806, "lng": 8.3006, "region": "luzern", "type": "town"},
            "horw": {"lat": 47.0173, "lng": 8.3089, "region": "luzern", "type": "town"},
            "ebikon": {"lat": 47.0807, "lng": 8.3408, "region": "luzern", "type": "town"},
            "adligenswil": {"lat": 47.0906, "lng": 8.3319, "region": "luzern", "type": "town"},
            "meggen": {"lat": 47.0464, "lng": 8.3761, "region": "luzern", "type": "town"},
            "weggis": {"lat": 47.0343, "lng": 8.4351, "region": "luzern", "type": "town"},
            "vitznau": {"lat": 47.0062, "lng": 8.4851, "region": "luzern", "type": "town"},
            
            # Schwyz Region
            "schwyz": {"lat": 47.0207, "lng": 8.6533, "region": "schwyz", "type": "city"},
            "arth": {"lat": 47.0619, "lng": 8.5219, "region": "schwyz", "type": "town"},
            "goldau": {"lat": 47.0474, "lng": 8.5499, "region": "schwyz", "type": "town"},
            "brunnen": {"lat": 46.9958, "lng": 8.6063, "region": "schwyz", "type": "town"},
            "einsiedeln": {"lat": 47.1286, "lng": 8.7578, "region": "schwyz", "type": "town"},
            "freienbach": {"lat": 47.2051, "lng": 8.7584, "region": "schwyz", "type": "town"},
            "pfäffikon sz": {"lat": 47.2000, "lng": 8.7833, "region": "schwyz", "type": "town"},
            "küssnacht": {"lat": 47.0851, "lng": 8.4417, "region": "schwyz", "type": "town"},
            
            # Zug Region
            "zug": {"lat": 47.1667, "lng": 8.5167, "region": "zug", "type": "city"},
            "baar": {"lat": 47.1962, "lng": 8.5291, "region": "zug", "type": "town"},
            "cham": {"lat": 47.1825, "lng": 8.4644, "region": "zug", "type": "town"},
            "steinhausen": {"lat": 47.2167, "lng": 8.4833, "region": "zug", "type": "town"},
            "hünenberg": {"lat": 47.1833, "lng": 8.4333, "region": "zug", "type": "town"},
            "oberägeri": {"lat": 47.1333, "lng": 8.6167, "region": "zug", "type": "town"},
            "unterägeri": {"lat": 47.1167, "lng": 8.5833, "region": "zug", "type": "town"},
            "neuheim": {"lat": 47.2167, "lng": 8.5167, "region": "zug", "type": "town"},
            "menzingen": {"lat": 47.1833, "lng": 8.5833, "region": "zug", "type": "town"},
            "walchwil": {"lat": 47.1000, "lng": 8.5167, "region": "zug", "type": "town"},
            
            # Wichtige externe Ziele
            "zürich": {"lat": 47.3769, "lng": 8.5417, "region": "external", "type": "city"},
            "basel": {"lat": 47.5596, "lng": 7.5886, "region": "external", "type": "city"},
            "bern": {"lat": 46.9481, "lng": 7.4474, "region": "external", "type": "city"},
            "geneva": {"lat": 46.2044, "lng": 6.1432, "region": "external", "type": "city"},
            "zürich flughafen": {"lat": 47.4647, "lng": 8.5492, "region": "external", "type": "airport"},
            "basel flughafen": {"lat": 47.6005, "lng": 7.5297, "region": "external", "type": "airport"},
        }
        
        # Route-Faktoren basierend auf Straßentypen (Luftlinie * Faktor = geschätzte Straßendistanz)
        self.route_factors = {
            "inner_city": 1.3,       # Stadtverkehr mit vielen Kurven
            "suburban": 1.25,        # Vororte mit mäßigem Routing
            "inter_city": 1.4,       # Zwischen Städten
            "highway": 1.15,         # Autobahn-dominierte Routen
            "mountain": 1.6,         # Bergige Gebiete mit Kurven
            "lakeside": 1.45         # Seeufer-Routen mit Umwegen
        }
        
        # Durchschnittsgeschwindigkeiten (km/h) basierend auf Tageszeit
        self.average_speeds = {
            "inner_city": {"normal": 25, "peak": 15, "night": 35},
            "suburban": {"normal": 40, "peak": 25, "night": 50},
            "inter_city": {"normal": 60, "peak": 45, "night": 75},
            "highway": {"normal": 90, "peak": 70, "night": 110},
            "mountain": {"normal": 35, "peak": 30, "night": 45},
            "lakeside": {"normal": 45, "peak": 35, "night": 55}
        }

    def find_location_coordinates(self, location_string: str) -> Optional[Tuple[float, float, str]]:
        """
        Finde Koordinaten für eine Schweizer Adresse/Stadt
        Returnt: (lat, lng, matched_location) oder None
        """
        # Normalisiere den Input
        location_clean = re.sub(r'[^\w\s]', '', location_string.lower())
        location_clean = re.sub(r'\s+', ' ', location_clean).strip()
        
        # Entferne häufige Wörter
        common_words = ['schweiz', 'switzerland', 'ch', 'strasse', 'str', 'platz', 'weg']
        location_parts = [word for word in location_clean.split() if word not in common_words]
        
        # Suche exakte Übereinstimmungen
        for location_key, data in self.swiss_locations.items():
            if location_key in location_clean:
                return data["lat"], data["lng"], location_key.title()
        
        # Suche Teilübereinstimmungen
        for location_key, data in self.swiss_locations.items():
            for part in location_parts:
                if part in location_key or location_key in part:
                    return data["lat"], data["lng"], location_key.title()
        
        # Spezielle Behandlung für Flughäfen
        if any(word in location_clean for word in ['flughafen', 'airport']):
            if any(word in location_clean for word in ['zürich', 'zurich']):
                data = self.swiss_locations["zürich flughafen"]
                return data["lat"], data["lng"], "Zürich Flughafen"
            elif any(word in location_clean for word in ['basel']):
                data = self.swiss_locations["basel flughafen"]
                return data["lat"], data["lng"], "Basel Flughafen"
        
        logger.warning(f"Location nicht gefunden: {location_string}")
        return None

    def calculate_haversine_distance(self, lat1: float, lng1: float, lat2: float, lng2: float) -> float:
        """
        Berechne Luftlinie-Distanz zwischen zwei Punkten mit Haversine-Formel
        Returnt: Distanz in Kilometern
        """
        R = 6371  # Erdradius in km
        
        # Konvertiere zu Radianten
        lat1_rad = math.radians(lat1)
        lng1_rad = math.radians(lng1)
        lat2_rad = math.radians(lat2)
        lng2_rad = math.radians(lng2)
        
        # Haversine-Formel
        dlat = lat2_rad - lat1_rad
        dlng = lng2_rad - lng1_rad
        
        a = (math.sin(dlat/2)**2 + 
             math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlng/2)**2)
        c = 2 * math.asin(math.sqrt(a))
        
        return R * c

    def determine_route_type(self, origin_coords: Tuple[float, float], dest_coords: Tuple[float, float],
                           origin_name: str, dest_name: str) -> str:
        """
        Bestimme den Routen-Typ basierend auf Start und Ziel
        """
        origin_lat, origin_lng = origin_coords
        dest_lat, dest_lng = dest_coords
        
        # Finde die entsprechenden Locations
        origin_data = None
        dest_data = None
        
        for location_key, data in self.swiss_locations.items():
            if location_key in origin_name.lower():
                origin_data = data
            if location_key in dest_name.lower():
                dest_data = data
        
        # Bestimme Route-Typ basierend auf Locations
        if origin_data and dest_data:
            # Beide in derselben Stadt/Region
            if origin_data["region"] == dest_data["region"]:
                if origin_data["type"] == "city" and dest_data["type"] == "city":
                    return "inner_city"
                else:
                    return "suburban"
            
            # Zwischen verschiedenen Regionen
            elif origin_data["region"] in ["luzern", "schwyz", "zug"] and dest_data["region"] in ["luzern", "schwyz", "zug"]:
                return "inter_city"
            
            # Eine Location ist extern (Zürich, Basel, etc.)
            elif origin_data["region"] == "external" or dest_data["region"] == "external":
                return "highway"
        
        # Basierend auf Distanz schätzen
        distance = self.calculate_haversine_distance(origin_lat, origin_lng, dest_lat, dest_lng)
        
        if distance < 5:
            return "inner_city"
        elif distance < 15:
            return "suburban"
        elif distance < 50:
            return "inter_city"
        else:
            return "highway"

    def get_traffic_multiplier(self, departure_time: Optional[datetime] = None) -> float:
        """
        Berechne Verkehrsmultiplikator basierend auf Tageszeit
        """
        if departure_time is None:
            departure_time = datetime.now()
        
        hour = departure_time.hour
        is_weekday = departure_time.weekday() < 5
        
        # Nachtzeit (22:00 - 06:00) - weniger Verkehr
        if hour >= 22 or hour <= 6:
            return 0.8
        
        # Wochenende - normaler Verkehr
        if not is_weekday:
            return 1.0
        
        # Spitzenzeiten an Werktagen
        if 7 <= hour <= 9 or 17 <= hour <= 19:
            return 1.4  # 40% länger durch Verkehr
        
        # Normale Zeiten
        return 1.0

    def calculate_intelligent_distance(self, origin: str, destination: str, 
                                     departure_time: Optional[datetime] = None) -> Dict:
        """
        Hauptfunktion für intelligente Distanzberechnung
        """
        try:
            # Finde Koordinaten für beide Locations
            origin_coords = self.find_location_coordinates(origin)
            dest_coords = self.find_location_coordinates(destination)
            
            if not origin_coords or not dest_coords:
                # Fallback für unbekannte Locations
                return self._fallback_calculation(origin, destination)
            
            origin_lat, origin_lng, origin_clean = origin_coords
            dest_lat, dest_lng, dest_clean = dest_coords
            
            # Berechne Luftlinie
            straight_distance = self.calculate_haversine_distance(
                origin_lat, origin_lng, dest_lat, dest_lng
            )
            
            # Bestimme Route-Typ
            route_type = self.determine_route_type(
                (origin_lat, origin_lng), (dest_lat, dest_lng),
                origin_clean, dest_clean
            )
            
            # Berechne geschätzte Straßendistanz
            route_factor = self.route_factors[route_type]
            estimated_distance = straight_distance * route_factor
            
            # Berechne Fahrtzeit
            traffic_multiplier = self.get_traffic_multiplier(departure_time)
            speed_category = "peak" if traffic_multiplier > 1.2 else "normal"
            
            base_speed = self.average_speeds[route_type][speed_category]
            actual_speed = base_speed * (1 / traffic_multiplier)
            
            estimated_duration_hours = estimated_distance / actual_speed
            estimated_duration_minutes = int(estimated_duration_hours * 60)
            
            return {
                'distance_km': round(estimated_distance, 2),
                'duration_minutes': estimated_duration_minutes,
                'duration_seconds': estimated_duration_minutes * 60,
                'origin_address': f"{origin_clean}, Switzerland",
                'destination_address': f"{dest_clean}, Switzerland",
                'route_type': route_type,
                'traffic_factor': traffic_multiplier,
                'straight_line_km': round(straight_distance, 2),
                'status': 'ESTIMATED',
                'source': 'swiss_intelligent_estimation'
            }
            
        except Exception as e:
            logger.error(f"Fehler bei Distanzberechnung: {str(e)}")
            return self._fallback_calculation(origin, destination)

    def _fallback_calculation(self, origin: str, destination: str) -> Dict:
        """
        Fallback-Berechnung für unbekannte Locations
        """
        # Sehr grundlegende Schätzung basierend auf Ortsnamen
        estimated_distance = 15.0  # Default 15km
        estimated_duration = 25    # Default 25 Minuten
        
        # Einfache Heuristik basierend auf bekannten Keywords
        origin_lower = origin.lower()
        dest_lower = destination.lower()
        
        # Flughafen-Routen sind länger
        if any(word in origin_lower + dest_lower for word in ['flughafen', 'airport', 'zürich', 'basel']):
            estimated_distance = 45.0
            estimated_duration = 50
        
        # Sehr kurze Strecken in derselben Stadt
        elif any(city in origin_lower and city in dest_lower 
                for city in ['luzern', 'schwyz', 'zug']):
            estimated_distance = 8.0
            estimated_duration = 15
        
        return {
            'distance_km': estimated_distance,
            'duration_minutes': estimated_duration,
            'duration_seconds': estimated_duration * 60,
            'origin_address': origin,
            'destination_address': destination,
            'route_type': 'unknown',
            'traffic_factor': 1.0,
            'straight_line_km': estimated_distance * 0.8,
            'status': 'FALLBACK',
            'source': 'basic_estimation'
        }

    def get_popular_destinations_from_location(self, origin: str) -> List[Dict]:
        """
        Gebe beliebte Ziele von einem bestimmten Ort zurück
        """
        origin_coords = self.find_location_coordinates(origin)
        if not origin_coords:
            return []
        
        origin_lat, origin_lng, origin_clean = origin_coords
        
        # Finde nahegelegene und beliebte Ziele
        destinations = []
        
        for location_key, data in self.swiss_locations.items():
            if location_key == origin_clean.lower():
                continue  # Skip same location
            
            distance = self.calculate_haversine_distance(
                origin_lat, origin_lng, data["lat"], data["lng"]
            )
            
            # Füge Ziele in sinnvoller Entfernung hinzu
            if 2 < distance < 100:  # Zwischen 2 und 100 km
                calc_result = self.calculate_intelligent_distance(
                    origin, location_key.title()
                )
                
                destinations.append({
                    'name': location_key.title(),
                    'distance_km': calc_result['distance_km'],
                    'duration_minutes': calc_result['duration_minutes'],
                    'route_type': calc_result.get('route_type', 'unknown')
                })
        
        # Sortiere nach Entfernung und gebe die ersten 8 zurück
        destinations.sort(key=lambda x: x['distance_km'])
        return destinations[:8]

# Globaler Service Instance
swiss_distance_service = SwissDistanceService()