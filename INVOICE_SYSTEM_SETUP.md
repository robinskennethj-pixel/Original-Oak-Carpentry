# 🧾 AI-Powered Dynamic Invoicing System - Setup Guide

## 🎯 Overview

The Original Oak Carpentry website now features a comprehensive AI-powered dynamic invoicing system that automatically generates branded invoices with AI assistance for both online and offline projects.

## ✨ Key Features

### 🤖 AI-Powered Invoice Generation
- **Automatic project descriptions** using OpenAI GPT-4
- **Personalized client messages** and payment instructions
- **Warranty and maintenance notes** based on project type
- **Suggested add-on services** for upselling opportunities

### 🎨 Branded Invoice Design
- **Original Oak Carpentry branding** with logo, colors, and fonts
- **Professional PDF generation** with custom templates
- **Responsive email templates** with branded styling
- **Custom footer** with business information and license

### 📊 Comprehensive Management
- **Admin dashboard** for manual offline project entry
- **Invoice analytics** with revenue tracking and categorization
- **Automated delivery** via email and SMS
- **Webhook automation** for payment status updates

### 💳 Payment Integration
- **Stripe Invoicing API** for secure payment processing
- **Multiple payment methods** (credit card, ACH, check)
- **Automatic payment confirmations** and receipts
- **Overdue invoice tracking** with reminder system

## 🔧 Environment Variables

Add these variables to your `.env.local` file:

```bash
# Stripe Configuration (Required)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# OpenAI Configuration (Optional - provides AI features)
OPENAI_API_KEY=sk-your-openai-api-key

# Email Configuration (Optional - enables email delivery)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=Original Oak Carpentry <info@ogun-carpentry.com>
EMAIL_TO=info@ogun-carpentry.com

# SMS Configuration (Optional - enables SMS reminders)
TWILIO_ACCOUNT_SID=AC_your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Admin Configuration (Optional - for notifications)
ADMIN_EMAIL=admin@ogun-carpentry.com
```

## 📁 File Structure

```
lib/integrations/
├── stripe-invoicing.ts          # Stripe invoice creation and management
├── ai-invoice-generator.ts      # OpenAI-powered content generation
├── invoice-pdf-generator.ts     # Branded PDF generation

app/api/invoices/
├── create/route.ts              # Create new invoices
├── ai-generate/route.ts         # Generate AI content
├── webhooks/route.ts           # Stripe webhook handlers
├── analytics/                  # Analytics endpoints
│   ├── route.ts
│   ├── categories/route.ts
│   ├── monthly/route.ts
│   └── top-clients/route.ts
├── list/route.ts               # List all invoices
└── recent/route.ts             # Get recent invoices

app/admin/invoices/
├── page.tsx                    # Create invoice dashboard
├── list/page.tsx               # Invoice management list
└── analytics/page.tsx          # Analytics dashboard
```

## 🚀 Getting Started

### 1. Set Up Stripe Account
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Configure webhook endpoints in Stripe settings
4. Add your webhook URL: `https://your-domain.com/api/invoices/webhooks`

### 2. Configure OpenAI (Optional)
1. Create an OpenAI account at [openai.com](https://openai.com)
2. Generate an API key from your account settings
3. Add the API key to your environment variables

### 3. Set Up Email (Optional)
1. Configure your email provider (Gmail, SendGrid, etc.)
2. Create an app-specific password if using Gmail
3. Add email credentials to environment variables

### 4. Configure SMS (Optional)
1. Create a Twilio account at [twilio.com](https://twilio.com)
2. Get your Account SID and Auth Token
3. Purchase a phone number for SMS
4. Add Twilio credentials to environment variables

## 📋 Usage Instructions

### Creating Invoices (Online Projects)
1. **Client submits project** through website contact form
2. **AI generates content** automatically based on project details
3. **Invoice is created** with branded template
4. **Email sent** to client with payment link
5. **Webhook updates** status when payment is received

### Creating Invoices (Offline Projects)
1. **Access admin dashboard** at `/admin/invoices`
2. **Fill project details** manually or upload from spreadsheet
3. **Generate AI content** with one click
4. **Review and customize** invoice content
5. **Send invoice** to client via email/SMS

### Managing Invoices
1. **View all invoices** at `/admin/invoices/list`
2. **Filter and search** by client, status, or project type
3. **Download PDFs** for printing or record keeping
4. **Send reminders** for overdue invoices
5. **Track analytics** and revenue trends

### Analytics Dashboard
1. **Monitor key metrics** including total revenue and conversion rates
2. **Track project categories** to understand popular services
3. **Analyze monthly trends** for business planning
4. **Identify top clients** for relationship management
5. **Export data** for accounting and reporting

## 🎨 Customization Options

### Branding
- **Logo**: Upload your business logo to Stripe dashboard
- **Colors**: Modify `OGUN_CARPENTRY_BRANDING` object in `stripe-invoicing.ts`
- **Fonts**: Change font family in PDF generation
- **Business Info**: Update contact details and license number

### AI Content
- **Prompts**: Customize AI prompts in `ai-invoice-generator.ts`
- **Categories**: Add or modify project categories
- **Templates**: Adjust email and message templates
- **Languages**: Support multiple languages for diverse clients

### Invoice Layout
- **PDF Design**: Modify PDF generation in `invoice-pdf-generator.ts`
- **Email Templates**: Customize email HTML in `email.ts`
- **Additional Fields**: Add custom fields for specific business needs
- **Terms & Conditions**: Include your business terms and policies

## 📊 Analytics Features

### Revenue Tracking
- **Total revenue** across all time periods
- **Monthly trends** with visual charts
- **Category breakdown** by project type
- **Client lifetime value** calculations

### Performance Metrics
- **Conversion rates** from invoice to payment
- **Average invoice values** for pricing optimization
- **Payment timing** analysis for cash flow
- **Overdue invoice** tracking and management

### Business Intelligence
- **Popular services** identification
- **Seasonal trends** analysis
- **Client segmentation** and targeting
- **Revenue forecasting** capabilities

## 🔒 Security Features

### Data Protection
- **Environment variables** for sensitive credentials
- **Input validation** with Zod schemas
- **Webhook signature verification** for Stripe events
- **Rate limiting** on API endpoints

### Payment Security
- **PCI compliance** through Stripe
- **Secure payment links** with expiration
- **Customer data protection** with encryption
- **Audit logging** for all transactions

## 🛠 Troubleshooting

### Common Issues
1. **Invoice creation fails**: Check Stripe API key configuration
2. **AI content not generating**: Verify OpenAI API key and credits
3. **Emails not sending**: Confirm SMTP settings and credentials
4. **Webhooks not working**: Verify webhook secret and endpoint URL

### Development Mode
- **Mock data** is used when APIs are not configured
- **Console logging** for debugging and monitoring
- **Error messages** provide detailed troubleshooting information
- **Fallback options** ensure system continues to function

## 📞 Support

For technical support or questions about the invoice system:
1. Check the troubleshooting section above
2. Review the API documentation in `API_DOCUMENTATION.md`
3. Examine error logs in your application
4. Contact your development team for assistance

## 🎯 Next Steps

1. **Test the system** with sample invoices
2. **Train your team** on the new invoice workflow
3. **Set up monitoring** for payment status and analytics
4. **Customize branding** to match your business identity
5. **Integrate with accounting software** for seamless bookkeeping

---

**🎉 Your AI-powered invoicing system is ready to streamline your billing process and improve cash flow management!**