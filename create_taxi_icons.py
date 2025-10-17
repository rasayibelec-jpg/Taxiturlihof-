#!/usr/bin/env python3
"""
Taxi Türlihof PWA Icon Creator
Creates professional taxi icons in different sizes for PWA app
"""

import requests
from PIL import Image, ImageDraw, ImageFont
import os
from io import BytesIO

def create_taxi_icon(size):
    """Create a professional taxi icon with Taxi Türlihof branding"""
    
    # Create base image with yellow background (Taxi colors)
    img = Image.new('RGBA', (size, size), (234, 179, 8, 255))  # Yellow #EAB308
    draw = ImageDraw.Draw(img)
    
    # Add rounded corners for modern look
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    corner_radius = size // 8
    mask_draw.rounded_rectangle([0, 0, size, size], corner_radius, fill=255)
    
    # Apply mask
    img.putalpha(mask)
    
    # Draw taxi car silhouette
    car_width = int(size * 0.6)
    car_height = int(size * 0.35)
    car_x = (size - car_width) // 2
    car_y = int(size * 0.35)
    
    # Car body (dark blue/black)
    car_color = (31, 41, 55, 255)  # Dark gray #1f2937
    draw.rectangle([car_x, car_y, car_x + car_width, car_y + car_height], fill=car_color)
    
    # Taxi roof sign
    sign_width = int(car_width * 0.4)
    sign_height = int(car_height * 0.3)
    sign_x = car_x + (car_width - sign_width) // 2
    sign_y = car_y - sign_height + 2
    
    draw.rounded_rectangle([sign_x, sign_y, sign_x + sign_width, sign_y + sign_height], 
                          corner_radius=2, fill=(255, 255, 255, 255))
    
    # Add wheels
    wheel_radius = int(size * 0.04)
    wheel_y = car_y + car_height - wheel_radius // 2
    
    # Left wheel
    wheel1_x = car_x + int(car_width * 0.25)
    draw.ellipse([wheel1_x - wheel_radius, wheel_y - wheel_radius, 
                  wheel1_x + wheel_radius, wheel_y + wheel_radius], 
                 fill=car_color)
    
    # Right wheel  
    wheel2_x = car_x + int(car_width * 0.75)
    draw.ellipse([wheel2_x - wheel_radius, wheel_y - wheel_radius, 
                  wheel2_x + wheel_radius, wheel_y + wheel_radius], 
                 fill=car_color)
    
    # Add "T" for Türlihof in the taxi sign
    if size >= 128:  # Only add text for larger icons
        try:
            # Try to use a bold font
            font_size = max(8, sign_height - 4)
            
            # Draw "T" in the taxi sign
            text = "T"
            # Get text dimensions
            bbox = draw.textbbox((0, 0), text)
            text_width = bbox[2] - bbox[0] 
            text_height = bbox[3] - bbox[1]
            
            text_x = sign_x + (sign_width - text_width) // 2
            text_y = sign_y + (sign_height - text_height) // 2 - 1
            
            draw.text((text_x, text_y), text, fill=car_color)
            
        except:
            # Fallback: simple text
            draw.text((sign_x + 2, sign_y + 1), "T", fill=car_color)
    
    return img

def main():
    """Create all PWA icon sizes"""
    
    # Ensure icons directory exists
    icons_dir = "/app/frontend/public/icons"
    os.makedirs(icons_dir, exist_ok=True)
    
    # PWA icon sizes needed
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    
    print("🚖 Creating Taxi Türlihof PWA icons...")
    
    for size in sizes:
        print(f"Creating {size}x{size} icon...")
        
        # Create icon
        icon = create_taxi_icon(size)
        
        # Save icon
        icon_path = f"{icons_dir}/icon-{size}x{size}.png"
        icon.save(icon_path, "PNG", optimize=True)
        
        print(f"✅ Saved: {icon_path}")
    
    # Create additional icons for shortcuts
    print("\n📱 Creating shortcut icons...")
    
    # Calculator icon
    calc_icon = create_taxi_icon(96)
    calc_icon.save(f"{icons_dir}/calculator-icon.png", "PNG", optimize=True)
    
    # Booking icon  
    booking_icon = create_taxi_icon(96)
    booking_icon.save(f"{icons_dir}/booking-icon.png", "PNG", optimize=True)
    
    # Phone icon
    phone_icon = create_taxi_icon(96)
    phone_icon.save(f"{icons_dir}/phone-icon.png", "PNG", optimize=True)
    
    print("✅ All Taxi Türlihof PWA icons created successfully!")
    print("\n🔄 Please restart frontend to see changes:")
    print("sudo supervisorctl restart frontend")

if __name__ == "__main__":
    main()