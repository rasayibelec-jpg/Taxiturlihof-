#!/usr/bin/env python3
"""
Generate PWA icons from NOVA TAXI logo
"""

from PIL import Image
import os

# Load the NOVA TAXI logo
logo_path = '/app/nova-taxi-logo.jpg'
logo = Image.open(logo_path)

# Convert to RGBA if needed
if logo.mode != 'RGBA':
    logo = logo.convert('RGBA')

# Icon sizes needed for PWA
sizes = [72, 96, 128, 144, 152, 192, 384, 512]

# Output directory
output_dir = '/app/frontend/public/icons'
os.makedirs(output_dir, exist_ok=True)

print("Generating NOVA TAXI PWA icons...")

for size in sizes:
    # Create a new image with transparent background
    icon = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    # Calculate padding (10% on each side)
    padding = int(size * 0.1)
    inner_size = size - (2 * padding)
    
    # Resize logo to fit with padding
    logo_resized = logo.copy()
    logo_resized.thumbnail((inner_size, inner_size), Image.Resampling.LANCZOS)
    
    # Calculate position to center the logo
    x = (size - logo_resized.width) // 2
    y = (size - logo_resized.height) // 2
    
    # Paste logo onto icon
    icon.paste(logo_resized, (x, y), logo_resized if logo_resized.mode == 'RGBA' else None)
    
    # Save as PNG
    output_path = f'{output_dir}/icon-{size}x{size}.png'
    icon.save(output_path, 'PNG', optimize=True)
    print(f'✓ Created {output_path} ({os.path.getsize(output_path)} bytes)')

print("\n✓ All NOVA TAXI PWA icons generated successfully!")
print(f"Icons saved to: {output_dir}")
