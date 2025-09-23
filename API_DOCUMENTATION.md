# Ogun Carpentry API Documentation

## 🚀 Overview

This document describes the RESTful API endpoints for the Ogun Carpentry website. All APIs are built with Next.js 14 App Router and TypeScript.

## 📋 Base URL

```
http://localhost:3000/api
```

## 🔑 Authentication

Currently, all endpoints are public. Authentication will be added in future versions for admin functionality.

## 📊 Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ] // Optional validation errors
}
```

## 🎯 API Endpoints

### Contact Form API

#### POST /api/contact
Submit a new contact form inquiry.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "5551234567",
  "projectType": "custom-woodwork",
  "projectDetails": "I would like to commission a custom dining table..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you within 24 hours."
}
```

**Response (400):**
```json
{
  "success": false,
  "message": "Please check your form data and try again.",
  "errors": [
    {
      "code": "too_small",
      "minimum": 2,
      "type": "string",
      "inclusive": true,
      "exact": false,
      "message": "First name must be at least 2 characters",
      "path": ["firstName"]
    }
  ]
}
```

**Response (500):**
```json
{
  "success": false,
  "message": "Something went wrong. Please try again later."
}
```

#### GET /api/contact
Health check endpoint.

**Response (200):**
```json
{
  "message": "Contact API endpoint is working"
}
```

### Testimonials API

#### GET /api/testimonials
Retrieve all testimonials.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Marcus Williams",
      "role": "Antique Collector",
      "content": "Ogun Carpentry restored my great-grandfather's armoire to perfection...",
      "rating": 5,
      "image": "/satisfied-homeowner.jpg",
      "project": "Antique Armoire Restoration",
      "completedAt": "2024-01-15",
      "featured": true
    }
  ],
  "total": 6,
  "averageRating": 5,
  "totalReviews": 6
}
```

### Services API

#### GET /api/services
Retrieve all services offered.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Custom Woodwork",
      "description": "Handcrafted furniture and millwork forged with traditional techniques...",
      "features": ["Custom Furniture", "Architectural Millwork", "Handcrafted Details", "Unique Installations"],
      "icon": "Home",
      "category": "Woodworking",
      "pricing": "Custom Quote",
      "duration": "2-8 weeks",
      "featured": true,
      "images": ["/modern-custom-kitchen-with-wooden-cabinets-and-gra.jpg"],
      "materials": ["Solid Hardwoods", "Reclaimed Wood", "Custom Hardware", "Eco-friendly Finishes"],
      "techniques": ["Traditional Joinery", "Hand-carving", "Custom Design", "Precision Crafting"]
    }
  ],
  "total": 6,
  "categories": ["Woodworking", "Metalwork", "Restoration", "Sustainability", "Custom", "Service"]
}
```

### Portfolio API

#### GET /api/portfolio
Retrieve all portfolio items.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Handcrafted Oak Dining Table",
      "category": "Custom Furniture",
      "description": "Solid oak dining table with traditional joinery and custom metal hardware",
      "image": "/modern-custom-kitchen-with-wooden-cabinets-and-gra.jpg",
      "featured": true,
      "completedAt": "2024-01-15",
      "client": "Marcus Williams",
      "location": "Downtown Residence",
      "materials": ["Solid Oak", "Custom Metal Hardware", "Traditional Joinery"],
      "techniques": ["Hand-carved Details", "Mortise and Tenon", "Custom Metalwork"]
    }
  ],
  "total": 6,
  "categories": ["Custom Furniture", "Metal Fabrication", "Workshop Design", "Restoration", "Architectural Metalwork", "Sustainable Design"]
}
```

### Newsletter API

#### POST /api/newsletter
Subscribe to the newsletter.

**Request Body:**
```json
{
  "email": "subscriber@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!"
}
```

**Response (400):**
```json
{
  "success": false,
  "message": "Email already subscribed"
}
```

#### GET /api/newsletter
Health check endpoint.

**Response (200):**
```json
{
  "message": "Newsletter API endpoint is working"
}
```

### Analytics API

#### GET /api/analytics
Retrieve analytics data for dashboard.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "contactForms": {
      "totalContactForms": 15,
      "contactFormsByStatus": {
        "new": 8,
        "contacted": 4,
        "quoted": 2,
        "completed": 1
      },
      "contactFormsByMonth": {
        "2024-09": 5,
        "2024-08": 10
      },
      "recentContactForms": [
        {
          "id": 15,
          "firstName": "John",
          "lastName": "Doe",
          "email": "john@example.com",
          "phone": "5551234567",
          "projectType": "custom-woodwork",
          "projectDetails": "Custom dining table project",
          "createdAt": "2024-09-22T10:30:00.000Z",
          "status": "new"
        }
      ]
    },
    "stats": {
      "totalContactForms": 15,
      "totalNewsletterSubscribers": 42,
      "contactFormsThisMonth": 5,
      "recentActivity": {
        "lastContactForm": { ... },
        "lastNewsletterSignup": { ... }
      }
    },
    "timestamp": "2024-09-22T12:00:00.000Z"
  }
}
```

## 🛠️ Error Handling

All endpoints implement proper error handling:

- **400 Bad Request**: Invalid request data or validation errors
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

## 🔒 Security Features

- Input validation using Zod schemas
- Email validation and sanitization
- Rate limiting ready (implement as needed)
- CORS configuration
- Environment variable protection

## 📧 Email Integration

The contact form API includes email functionality:
- Sends notification to business owner
- Sends confirmation to client
- Uses nodemailer for email delivery
- Configurable SMTP settings

## 📊 Mock Data vs Real Data

Currently using mock data for:
- Testimonials
- Services
- Portfolio items
- Analytics (until real data is collected)

Real functionality:
- Contact form submissions
- Newsletter signups
- Email notifications

## 🚀 Future Enhancements

Planned API additions:
- Admin authentication
- File upload endpoints
- Database integration
- Real-time notifications
- Customer portal APIs
- Payment processing
- Advanced analytics

## 🔧 Configuration

### Environment Variables
```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=Ogun Carpentry <info@oguncarpentry.com>
EMAIL_TO=info@oguncarpentry.com

# Analytics
VERCEL_ANALYTICS_ID=your-analytics-id

# Database (when implemented)
DATABASE_URL=postgresql://username:password@localhost:5432/ogun_carpentry
```

## 🧪 Testing

### Manual Testing
Use curl commands to test endpoints:

```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","phone":"5551234567","projectType":"custom-woodwork","projectDetails":"Test project"}'

# Test newsletter signup
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Automated Testing
- Unit tests for API handlers
- Integration tests for email functionality
- End-to-end tests for form submissions

## 📞 Support

For API-related questions or issues:
- Check the development server logs
- Verify environment variables
- Test with curl commands
- Review error messages in responses

---

**Last Updated**: September 2024
**API Version**: 1.0.0
**Backend Status**: ✅ Ready for Production