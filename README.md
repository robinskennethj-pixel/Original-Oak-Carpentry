# Ogun Carpentry - Master Craftsmen of Wood & Metal

A modern, full-stack Next.js application for Ogun Carpentry, showcasing traditional craftsmanship combined with contemporary web design. Built with the strength and spirit of Ogun, the Yoruba deity of iron, metalwork, and craftsmanship.

## 🎨 Design Philosophy

### Color Palette
- **Forest Green (#1E3A2F)** - Primary color representing wood, growth, stability, and nature
- **Charcoal (#2E2E2E)** - Secondary color representing metal, tools, strength, and professionalism
- **Rust (#B85C38)** - Accent color representing fire, forge, energy, and craftsmanship
- **Warm Wood (#A67C52)** - Supporting color representing natural wood, carpentry, and texture
- **Off-White (#F5F3F0)** - Clean background for content areas
- **Light Gray (#D9D9D9)** - Borders, separators, and subtle backgrounds

### Brand Identity
Ogun Carpentry represents the perfect fusion of traditional African craftsmanship with modern precision and innovation. Every piece carries the strength, durability, and artistic excellence that Ogun represents.

## 🚀 Current Features

### ✅ Implemented
- **Modern Design System** - Built with Tailwind CSS and shadcn/ui components
- **Responsive Layout** - Fully responsive design optimized for all devices
- **Interactive Components** - Smooth animations and hover effects
- **SEO Optimized** - Comprehensive meta tags and structured data
- **Accessibility** - WCAG compliant with proper ARIA labels
- **Color Scheme** - Authentic Ogun Carpentry brand colors applied
- **Functional Buttons** - All navigation and action buttons work properly
- **Contact Form** - Fully functional with API integration
- **Service Pages** - Individual service detail pages
- **Portfolio System** - Project showcase with detail pages

### 🏗️ Pages & Sections
- **Homepage** - Hero section, services overview, portfolio highlights, testimonials
- **About** - Company story, values, expertise, and team information
- **Services** - Detailed service offerings with custom woodwork and metal fabrication
- **Portfolio** - Showcase of completed projects and masterpieces
- **Testimonials** - Client reviews and success stories
- **Contact** - Contact form and business information
- **FAQ** - Frequently asked questions
- **Thank You** - Post-contact form submission page

### 🔧 Technical Implementation
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icon library
- **Vercel Analytics** - Web analytics
- **Geist Fonts** - Modern typography

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library (planned)

### Backend (Planned)
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **Nodemailer** - Email service integration
- **Cloudinary** - Image management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript** - Static type checking

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone [YOUR_PRIVATE_REPO_URL]
   cd ogun-carpentry
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update the environment variables with your configuration.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
ogun-carpentry/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   ├── portfolio/         # Portfolio pages
│   ├── services/          # Services pages
│   ├── testimonials/      # Testimonials page
│   ├── thank-you/         # Thank you page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── contact-section.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── hero-section.tsx
│   ├── portfolio-section.tsx
│   ├── services-section.tsx
│   └── testimonials-section.tsx
├── lib/                  # Utility functions
│   └── utils.ts
├── public/               # Static assets
│   └── images/          # Image assets
├── styles/              # Additional styles
├── .github/             # GitHub templates and workflows
└── README.md
```

## 🎯 Key Features Implementation

### ✅ Color System
- CSS custom properties for consistent theming
- Dark mode support (planned)
- Accessible color contrasts
- Brand-consistent color usage throughout

### ✅ Component Architecture
- **Modular Design** - Reusable components with clear responsibilities
- **Type Safety** - Full TypeScript implementation
- **Accessibility** - ARIA labels and keyboard navigation
- **Performance** - Optimized images and lazy loading

### ✅ Responsive Design
- **Mobile-First** - Designed for mobile devices first
- **Breakpoints** - Tailwind CSS responsive breakpoints
- **Touch-Friendly** - Optimized for touch interactions
- **Cross-Browser** - Compatible with all modern browsers

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Conventional Commits** - Commit message format
- **Husky** - Pre-commit hooks

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Environment Variables
Create a `.env.local` file with:
```
# Email Configuration
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=
EMAIL_TO=

# Analytics
VERCEL_ANALYTICS_ID=

# Database (when implemented)
DATABASE_URL=
```

## 📈 Performance Optimization

- **Image Optimization** - Next.js Image component with lazy loading
- **Code Splitting** - Automatic code splitting with Next.js
- **Bundle Analysis** - Webpack bundle analyzer
- **Caching** - Static generation and ISR
- **CDN** - Global content delivery

## 🤝 Contributing

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Contact Information

**Ogun Carpentry**
- Website: [https://oguncarpentry.com](https://oguncarpentry.com)
- Email: info@oguncarpentry.com
- Phone: (555) 123-4567
- Workshop: Metropolitan Area

---

*Forged by Tradition, Driven by Passion* - Ogun Carpentry

## 🔄 Repository Status

- ✅ **Active Development** - Regular updates and improvements
- ✅ **Functional Components** - All main features implemented
- ✅ **Responsive Design** - Mobile-first approach completed
- ✅ **Brand Consistency** - Ogun Carpentry colors and identity applied
- ✅ **Button Functionality** - All navigation and actions working
- 🔄 **Content Population** - Ready for client content integration
- 🔄 **Backend Integration** - API routes prepared for database connection
