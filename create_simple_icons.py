#!/usr/bin/env python3
"""
Simple Taxi Türlihof PWA Icons - Basit ve Net
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_simple_taxi_icon(size):
    """Create very simple and clear taxi icon"""
    
    # Colors
    yellow = (255, 215, 0, 255)  # Bright yellow
    black = (0, 0, 0, 255)       # Pure black
    
    # Create square image
    img = Image.new('RGBA', (size, size), yellow)
    draw = ImageDraw.Draw(img)
    
    # Calculate areas
    split_y = int(size * 0.6)  # 60% yellow, 40% black
    
    # Create black bottom section
    draw.rectangle([0, split_y, size, size], fill=black)
    
    # Add border for definition
    border_width = max(1, size // 64)
    draw.rectangle([0, 0, size, size], outline=black, width=border_width)
    
    # Try to load system font or use default
    font = None
    try:
        # Try to find a font
        font_size = max(8, size // 8)  # Adaptive font size
        # Use default font
        font = ImageFont.load_default()
    except:
        font = None
    
    # Draw TAXI in yellow area
    taxi_text = "TAXI"
    if font:
        try:
            bbox = draw.textbbox((0, 0), taxi_text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
        except:
            text_width = len(taxi_text) * (size // 12)
            text_height = size // 12
    else:
        text_width = len(taxi_text) * (size // 12)
        text_height = size // 12
    
    taxi_x = (size - text_width) // 2
    taxi_y = (split_y - text_height) // 2 - (size // 20)
    
    if font:
        draw.text((taxi_x, taxi_y), taxi_text, fill=black, font=font)
    else:
        draw.text((taxi_x, taxi_y), taxi_text, fill=black)
    
    # Draw T in black area
    t_text = "T"
    if font:
        try:
            bbox = draw.textbbox((0, 0), t_text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
        except:
            text_width = size // 12
            text_height = size // 12
    else:
        text_width = size // 12
        text_height = size // 12
    
    t_x = (size - text_width) // 2
    t_y = split_y + ((size - split_y) - text_height) // 2
    
    if font:
        draw.text((t_x, t_y), t_text, fill=yellow, font=font)
    else:
        draw.text((t_x, t_y), t_text, fill=yellow)
    
    return img

def main():
    """Create simple icons"""
    
    # Ensure icons directory exists
    icons_dir = "/app/frontend/public/icons"
    os.makedirs(icons_dir, exist_ok=True)
    
    # PWA icon sizes
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    
    print("🚖 Creating SIMPLE Taxi Türlihof PWA icons...")
    
    for size in sizes:
        print(f"Creating {size}x{size} icon...")
        
        # Create simple icon
        icon = create_simple_taxi_icon(size)
        
        # Save icon
        icon_path = f"{icons_dir}/icon-{size}x{size}.png"
        icon.save(icon_path, "PNG", optimize=True)
        
        print(f"✅ Saved: {icon_path}")
    
    print("✅ All SIMPLE icons created successfully!")
    print("\n🔄 Please restart frontend and test on mobile:")
    print("sudo supervisorctl restart frontend")

if __name__ == "__main__":
    main()