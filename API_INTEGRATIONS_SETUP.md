# Original Oak Carpentry - Third-Party API Integrations Setup Guide

This guide provides step-by-step instructions for setting up all third-party API integrations for the Original Oak Carpentry website.

## 🗺️ **Google Maps & Places API**

### Setup Steps:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Directions API
4. Create credentials (API Key)
5. Restrict the API key to your domain

### Environment Variables:
```env
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_PLACES_API_KEY=your_google_places_api_key
```

### Usage in Website:
- **Homepage**: Service area map in footer section
- **Contact Page**: Location map with directions
- **About Page**: Workshop location visualization

### Features Implemented:
- Business location display
- Service area coverage map
- Interactive maps with custom styling
- Business hours and contact information

---

## ⭐ **Google Reviews API**

### Setup Steps:
1. Same Google Cloud Console project as Maps API
2. Enable Google My Business API
3. Verify your business on Google My Business
4. Get Place ID for your business location

### Environment Variables:
```env
GOOGLE_PLACES_API_KEY=your_google_places_api_key
GOOGLE_BUSINESS_PLACE_ID=your_business_place_id
```

### Usage in Website:
- **Homepage**: Featured reviews carousel
- **Testimonials Page**: Full review display
- **About Page**: Customer testimonials section

### Features Implemented:
- Real-time Google reviews display
- Star ratings and review text
- Review filtering by rating
- Recent reviews highlighting
- Review statistics and trends

---

## 📅 **Calendly API**

### Setup Steps:
1. Go to [Calendly](https://calendly.com/) and create account
2. Set up your event types (consultation, estimate, etc.)
3. Go to Integrations > API & Webhooks
4. Generate Personal Access Token
5. Get your Organization URI (for webhooks)

### Environment Variables:
```env
CALENDLY_ACCESS_TOKEN=your_calendly_access_token
CALENDLY_ORGANIZATION_URI=your_organization_uri
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
```

### Usage in Website:
- **Contact Page**: Embedded booking calendar
- **Services Pages**: Booking buttons for consultations
- **Footer**: Quick booking link

### Features Implemented:
- Embedded booking calendar
- Multiple event types (consultation, estimate, follow-up)
- Real-time availability checking
- Automatic booking confirmations
- Rescheduling and cancellation
- Webhook integration for notifications

---

## 💳 **Stripe Payment API**

### Setup Steps:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create account and complete verification
3. Get your API keys (Publishable and Secret)
4. Configure webhook endpoint
5. Set up products/prices for services

### Environment Variables:
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### Usage in Website:
- **Contact Page**: Deposit payment for consultations
- **Services Pages**: Payment buttons for deposits
- **Booking Confirmation**: Payment integration

### Features Implemented:
- Payment intents for custom amounts
- Checkout sessions for predefined services
- Multiple payment methods (cards, digital wallets)
- Automatic payment confirmations
- Refund processing
- Payment method saving for repeat customers
- Webhook handling for payment events

**Payment Types Supported:**
- Consultation fees ($50)
- Project deposits ($250, $500, $1000)
- Custom payment amounts
- Subscription payments (for maintenance plans)

---

## ☁️ **Cloudinary API**

### Setup Steps:
1. Go to [Cloudinary](https://cloudinary.com/) and create account
2. Get your Cloud Name, API Key, and API Secret
3. Create upload preset for automatic optimization
4. Configure transformations and optimizations

### Environment Variables:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Usage in Website:
- **Portfolio**: High-quality project images with optimization
- **Services Pages**: Service category images
- **Hero Sections**: Large banner images
- **Team Photos**: Optimized team member photos
- **Blog**: Article featured images

### Features Implemented:
- Automatic image optimization
- Responsive image delivery
- Multiple format support (WebP, AVIF, JPEG)
- Progressive loading
- Image transformations (resize, crop, effects)
- SEO-optimized images with proper alt text
- Batch image processing
- Performance monitoring

**Image Presets Available:**
- HERO: 1920x1080, best quality for hero sections
- PORTFOLIO: 1200x800, good quality for galleries
- THUMBNAIL: 400x300, fast loading for previews
- SERVICE_CARD: 600x400, consistent service images
- TEAM_PHOTO: 500x500, face-focused team photos
- BLOG: 800x600, optimized for blog posts
- SOCIAL: 1200x630, perfect for social sharing

---

## 📸 **Instagram Basic Display API**

### Setup Steps:
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create new app and add Instagram Basic Display product
3. Add Instagram tester (your Instagram account)
4. Accept tester invite in Instagram app
5. Get Access Token through OAuth flow

### Environment Variables:
```env
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
INSTAGRAM_USER_ID=your_instagram_user_id
INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_app_secret
```

### Usage in Website:
- **Homepage**: Latest Instagram posts feed
- **Footer**: Instagram photo preview
- **About Page**: Social media integration
- **Portfolio**: Instagram work showcase

### Features Implemented:
- Latest Instagram posts display
- Automatic feed updates
- Image and video support
- Like and comment counts
- Hashtag filtering
- Responsive Instagram embeds
- Instagram stories integration (optional)
- Instagram Graph API for business accounts

---

## 📊 **Google Analytics 4**

### Setup Steps:
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create GA4 property for your website
3. Get Measurement ID (G-XXXXXXXXXX)
4. Configure data streams
5. Set up conversion events

### Environment Variables:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GOOGLE_ANALYTICS_API_SECRET=your_analytics_api_secret
GOOGLE_ANALYTICS_CREDENTIALS=your_service_account_credentials
```

### Usage in Website:
- **Global**: Page view tracking
- **Contact Forms**: Form submission tracking
- **Service Inquiries**: Service type tracking
- **Bookings**: Appointment booking tracking
- **Payments**: Payment completion tracking
- **Social Shares**: Social media interaction tracking

### Features Implemented:
- Page view tracking with custom parameters
- Event tracking (contact forms, bookings, payments)
- Ecommerce tracking for payments
- User engagement metrics
- Custom dimensions and metrics
- Conversion goal tracking
- Audience segmentation
- Real-time analytics dashboard
- Custom event categories
- Enhanced ecommerce tracking

**Tracked Events:**
- Page views with custom parameters
- Contact form submissions
- Service inquiries by type
- Booking confirmations
- Payment completions
- Newsletter signups
- Social media shares
- Video plays (if applicable)
- Downloads (PDFs, brochures)

---

## 🔧 **Environment Configuration**

### Complete `.env.local` file:
```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=Original Oak Carpentry <info@originaloakcarpentry.com>
EMAIL_TO=info@originaloakcarpentry.com

# Google APIs
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_PLACES_API_KEY=your_google_places_api_key
GOOGLE_BUSINESS_PLACE_ID=your_business_place_id
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GOOGLE_ANALYTICS_API_SECRET=your_analytics_api_secret
GOOGLE_ANALYTICS_CREDENTIALS=your_service_account_credentials

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Calendly
CALENDLY_ACCESS_TOKEN=your_calendly_access_token
CALENDLY_ORGANIZATION_URI=your_organization_uri
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username

# Instagram
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
INSTAGRAM_USER_ID=your_instagram_user_id
INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_app_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://originaloakcarpentry.com
NEXT_PUBLIC_COMPANY_NAME=Original Oak Carpentry
NEXT_PUBLIC_COMPANY_PHONE=(555) 123-4567
NEXT_PUBLIC_COMPANY_EMAIL=info@originaloakcarpentry.com

# Security
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://originaloakcarpentry.com
```

---

## 🚀 **API Integration Features**

### **Enhanced User Experience:**
- Interactive maps showing service areas
- Real customer reviews and testimonials
- Easy online booking and scheduling
- Secure payment processing
- High-quality, fast-loading images
- Live Instagram feed integration
- Comprehensive analytics tracking

### **Business Benefits:**
- Professional online presence
- Streamlined customer booking process
- Secure payment collection
- Automatic review showcasing
- Performance analytics and insights
- Social media integration
- SEO optimization through structured data

### **Technical Benefits:**
- Modular API architecture
- Error handling and fallback systems
- Performance optimization
- Security best practices
- Scalable infrastructure
- Comprehensive documentation

---

## ⚙️ **Implementation Status**

### ✅ **Completed Integrations:**
- Google Maps API (business location and directions)
- Google Reviews API (customer testimonials)
- Stripe API (payment processing)
- Cloudinary API (image optimization)
- Calendly API (appointment booking)
- Instagram API (social media feed)
- Google Analytics API (website analytics)

### 🔄 **Ready for Configuration:**
- All API integrations are implemented and ready
- Environment variables properly documented
- Mock data available for development
- Production-ready with real API keys

### 📋 **Next Steps:**
1. Set up accounts for each service
2. Obtain API keys and credentials
3. Configure environment variables
4. Test each integration
5. Deploy to production
6. Monitor performance and usage

---

## 🔍 **Testing & Validation**

### **Development Testing:**
```bash
# Test contact form
npm run dev
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","phone":"5551234567","projectType":"custom-woodwork","projectDetails":"Test project"}'

# Test newsletter signup
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test analytics
npm run build
npm start
```

### **Production Validation:**
- Verify all API keys are working
- Test payment processing with small amounts
- Confirm email notifications are sending
- Validate booking system functionality
- Check image optimization and loading
- Monitor Google Analytics data collection

---

## 📞 **Support & Troubleshooting**

### **Common Issues:**
1. **API Key Restrictions**: Ensure API keys are properly restricted to your domain
2. **CORS Issues**: Configure CORS settings for each API
3. **Rate Limiting**: Monitor API usage and implement rate limiting
4. **Webhook Configuration**: Verify webhook endpoints are accessible
5. **Environment Variables**: Double-check all environment variable names

### **Getting Help:**
- Check each service's documentation
- Review API error logs
- Test with mock data first
- Use development/sandbox environments
- Contact API support for complex issues

---

**🎯 Status: All API integrations are implemented and ready for production deployment!**