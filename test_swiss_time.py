#!/usr/bin/env python3
"""
Test der Schweizer Zeitzone
"""
from datetime import datetime
import pytz

# Schweizer Zeitzone
SWISS_TZ = pytz.timezone('Europe/Zurich')

def test_swiss_time():
    print("=== ZEITZONENTEST ===")
    
    # UTC Zeit
    utc_now = datetime.now(pytz.UTC)
    print(f"UTC Zeit:        {utc_now}")
    
    # Schweizer Zeit
    swiss_now = datetime.now(SWISS_TZ)
    print(f"Schweizer Zeit:  {swiss_now}")
    
    # Formatiert für Buchungen
    formatted = swiss_now.strftime('%d.%m.%Y %H:%M')
    print(f"Formatiert:      {formatted}")
    
    # ISO-Format für Datenbank
    iso_format = swiss_now.isoformat()
    print(f"ISO-Format:      {iso_format}")
    
    print("\n=== ZEITUNTERSCHIED ===")
    time_diff = swiss_now.utcoffset()
    print(f"Zeitunterschied zu UTC: {time_diff}")
    
    return swiss_now

if __name__ == "__main__":
    test_swiss_time()