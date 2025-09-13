# Taxi Türlihof WordPress Theme

Professional WordPress theme for Taxi Türlihof - a taxi service in Central Switzerland.

## Features

- **Responsive Design**: Works perfectly on all devices
- **Mercedes Fleet Gallery**: Showcase your vehicle fleet
- **Online Booking System**: Customers can book rides online
- **Price Calculator**: Integration with backend API for real-time pricing
- **Contact Forms**: Multiple contact options
- **SEO Optimized**: Schema markup and meta tags included
- **Multi-language Support**: German content with Swiss German elements
- **24/7 Service Highlighting**: Emphasizes round-the-clock availability

## Installation

1. Upload the theme files to `/wp-content/themes/taxi-turlihof/`
2. Activate the theme in WordPress Admin
3. Follow the setup instructions in **Appearance > Taxi Settings**
4. Configure company information in **Appearance > Customize**
5. Add fleet images in **Fleet Gallery** section
6. Set up navigation menu in **Appearance > Menus**

## Theme Structure

```
taxi-turlihof/
├── style.css                 # Main stylesheet with theme information
├── index.php                 # Homepage template
├── header.php                # Header template
├── footer.php                # Footer template
├── functions.php             # Theme functions and customizations
├── single.php                # Single post template
├── assets/
│   ├── js/
│   │   └── main.js          # Custom JavaScript
│   └── images/              # Theme images directory
├── page-*.php               # Custom page templates
├── README.md                # This file
└── KURULUM-REHBERI.md       # Turkish installation guide
```

## Custom Post Types

### Fleet Gallery (`fleet`)
Manage your vehicle fleet with images and details:
- Vehicle type (Standard/Premium/Van)
- Passenger capacity
- Description
- Featured image

### Bookings (`booking`)
View and manage customer bookings:
- Customer information
- Pickup/destination details
- Date and time
- Vehicle type
- Booking status

### Contact Messages (`contact`)
Store contact form submissions:
- Customer name and contact info
- Message content
- Timestamp

## Custom Pages

- **Homepage** (`index.php`): Company overview with services
- **Price Calculator** (`page-preisrechner.php`): Real-time fare calculation
- **Online Booking** (`page-buchen.php`): Booking form
- **Fleet Gallery** (`page-flotte.php`): Vehicle showcase
- **Airport Transfer** (`page-flughafentransfer.php`): Specialized service page
- **City Pages**: Dedicated pages for Luzern, Schwyz, and Zug
- **Blog** (`page-blog.php`): News and updates
- **FAQ** (`page-faq.php`): Frequently asked questions

## Backend Integration

The theme includes integration with a FastAPI backend for:
- Real-time price calculation using Google Maps API
- Booking management
- Email notifications

Configure the backend URL in **Appearance > Customize > Company Information**.

## Customization Options

### WordPress Customizer
- Company phone number
- Email address
- WhatsApp number
- Backend API URL

### Theme Settings
Access via **Appearance > Taxi Settings** for:
- Setup instructions
- Quick links to manage content
- Support information

## SEO Features

- **Schema Markup**: Local business and FAQ schemas
- **Meta Tags**: Open Graph and Twitter cards
- **Structured Data**: Service areas and business information
- **Canonical URLs**: Proper URL structure
- **Site Speed**: Optimized CSS and JavaScript

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Lightweight CSS framework
- Optimized images
- Minimal JavaScript
- WordPress best practices

## Security

- Nonce verification for AJAX calls
- Data sanitization
- XSS protection
- SQL injection prevention

## Maintenance

### Regular Updates
- Update WordPress core regularly
- Keep theme files backed up
- Monitor booking functionality
- Test contact forms

### Content Management
- Add new fleet images as needed
- Update pricing information
- Review and respond to bookings
- Monitor contact messages

## Support

For technical support:
1. Check the setup instructions in **Appearance > Taxi Settings**
2. Review the installation guide (`KURULUM-REHBERI.md`)
3. Contact your developer for customizations

## Development Notes

### File Structure
- All custom functions in `functions.php`
- AJAX handlers included
- Custom post types and meta boxes
- Theme customizer integration

### Code Standards
- WordPress coding standards
- Proper sanitization and validation
- Responsive design principles
- Accessibility considerations

## License

This theme is custom-built for Taxi Türlihof. All rights reserved.

## Changelog

### Version 1.0.0
- Initial release
- Complete WordPress theme conversion
- All features from React app integrated
- Admin panel functionality
- Mobile responsive design
- SEO optimization