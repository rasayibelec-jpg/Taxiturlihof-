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
    """Create Taxi Türlihof icon based on original logo"""
    
    # Create base image with yellow background (matching original logo)
    yellow_color = (255, 215, 0, 255)  # Bright yellow like original logo
    black_color = (0, 0, 0, 255)      # Pure black
    
    img = Image.new('RGBA', (size, size), yellow_color)
    draw = ImageDraw.Draw(img)
    
    # Add rounded corners for modern PWA look
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    corner_radius = size // 12  # Subtle rounded corners
    mask_draw.ellipse([corner_radius, corner_radius, size-corner_radius, size-corner_radius], fill=255)
    mask_draw.rectangle([corner_radius, 0, size-corner_radius, size], fill=255)
    mask_draw.rectangle([0, corner_radius, size, size-corner_radius], fill=255)
    
    # Apply mask for rounded corners
    img.putalpha(mask)
    
    # Calculate text areas (similar to original logo layout)
    top_area_height = int(size * 0.45)   # For "TAXI"
    bottom_area_height = int(size * 0.35) # For "TÜRLIHOF"
    
    # Create black bottom section for "TÜRLIHOF"
    bottom_y = size - bottom_area_height
    draw.rectangle([0, bottom_y, size, size], fill=black_color)
    
    # Draw "TAXI" text in top yellow area
    if size >= 72:
        try:
            # Calculate font size for TAXI
            taxi_font_size = max(int(size * 0.15), 8)
            
            taxi_text = "TAXI"
            # Simple text positioning
            bbox = draw.textbbox((0, 0), taxi_text)
            text_width = bbox[2] - bbox[0] if bbox else len(taxi_text) * taxi_font_size * 0.6
            text_height = bbox[3] - bbox[1] if bbox else taxi_font_size
            
            taxi_x = (size - text_width) // 2
            taxi_y = (top_area_height - text_height) // 2 - int(size * 0.05)
            
            draw.text((taxi_x, taxi_y), taxi_text, fill=black_color)
            
        except:
            # Fallback for smaller sizes
            draw.text((int(size * 0.1), int(size * 0.1)), "TAXI", fill=black_color)
    
    # Draw "TÜRLIHOF" text in bottom black area  
    if size >= 96:
        try:
            # Calculate font size for TÜRLIHOF
            turli_font_size = max(int(size * 0.08), 6)
            
            turli_text = "TÜRLIHOF"
            # Simple text positioning
            bbox = draw.textbbox((0, 0), turli_text)
            text_width = bbox[2] - bbox[0] if bbox else len(turli_text) * turli_font_size * 0.6
            text_height = bbox[3] - bbox[1] if bbox else turli_font_size
            
            turli_x = (size - text_width) // 2
            turli_y = bottom_y + (bottom_area_height - text_height) // 2
            
            draw.text((turli_x, turli_y), turli_text, fill=yellow_color)
            
        except:
            # Fallback
            draw.text((int(size * 0.05), bottom_y + int(size * 0.05)), "TÜRLIHOF", fill=yellow_color)
    
    elif size >= 72:
        # For medium sizes, just show "T"
        try:
            t_font_size = max(int(size * 0.12), 8)
            t_text = "T"
            bbox = draw.textbbox((0, 0), t_text)
            text_width = bbox[2] - bbox[0] if bbox else t_font_size * 0.6
            text_height = bbox[3] - bbox[1] if bbox else t_font_size
            
            t_x = (size - text_width) // 2
            t_y = bottom_y + (bottom_area_height - text_height) // 2
            
            draw.text((t_x, t_y), t_text, fill=yellow_color)
        except:
            draw.text((int(size * 0.4), bottom_y + int(size * 0.1)), "T", fill=yellow_color)
    
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