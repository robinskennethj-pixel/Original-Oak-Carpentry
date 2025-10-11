# Development Guide - Original Oak Carpentry

## 🚀 Quick Start

This guide will help you set up the development environment for the Original Oak Carpentry website.

## 📋 Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **Package Manager**: npm, yarn, or pnpm
- **Git**: For version control
- **Code Editor**: VS Code recommended

## 🔧 Environment Setup

### 1. Clone the Repository
```bash
git clone [YOUR_PRIVATE_REPO_URL]
cd original-oak-carpentry
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your specific configuration:
```env
# Required for contact form functionality
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=Original Oak Carpentry <info@originaloakcarpentry.com>
EMAIL_TO=info@originaloakcarpentry.com

# Optional - for analytics
VERCEL_ANALYTICS_ID=your-analytics-id
```

### 4. Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

## 🏗️ Development Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Development branch
- `feature/feature-name` - Feature branches
- `bugfix/issue-description` - Bug fixes

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: Add new feature description"

# Push to remote
git push origin feature/new-feature

# Create pull request
```

## 🧪 Testing

### Local Testing
```bash
# Run linter
npm run lint

# Type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm run start
```

### Browser Testing
Test on multiple browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

### Device Testing
- Desktop (1920x1080, 1366x768)
- Tablet (768x1024)
- Mobile (375x667, 414x896)

## 🎨 Design Guidelines

### Color Usage
```css
/* Primary - Forest Green */
--primary: #1E3A2F;

/* Secondary - Charcoal */
--foreground: #2E2E2E;

/* Accent - Rust (use sparingly) */
--accent: #B85C38;

/* Supporting - Warm Wood */
--secondary: #A67C52;

/* Neutrals */
--background: #F5F3F0;
--muted: #D9D9D9;
```

### Typography
- Headings: Geist Sans, font-weight: 700
- Body text: Geist Sans, font-weight: 400
- Monospace: Geist Mono

### Component Patterns
```tsx
// Button pattern
<Button asChild className="bg-primary hover:bg-primary/90">
  <Link href="/contact">
    Get Free Estimate
  </Link>
</Button>

// Card pattern
<Card className="bg-card border-border hover:shadow-lg">
  <CardHeader>
    <CardTitle className="text-card-foreground">Title</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

## 📁 File Organization

### Components
- Place reusable components in `/components`
- UI components in `/components/ui`
- Use PascalCase for component files
- Include TypeScript interfaces

### Pages
- App Router structure in `/app`
- Use `page.tsx` for page components
- Use `layout.tsx` for shared layouts
- Include metadata for SEO

### API Routes
- Place in `/app/api`
- Use HTTP methods (GET, POST, etc.)
- Implement proper error handling
- Include request validation

## 🔍 Code Quality

### TypeScript Guidelines
```tsx
// Define interfaces
interface ServiceProps {
  title: string;
  description: string;
  features: string[];
  slug: string;
}

// Use proper types
const services: ServiceProps[] = [
  // Service data
];
```

### Component Structure
```tsx
import { FC } from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
}

export const HeroSection: FC<HeroSectionProps> = ({
  title,
  subtitle
}) => {
  return (
    <section>
      {/* Component JSX */}
    </section>
  );
};
```

## 🚨 Common Issues

### Build Failures
1. Check for TypeScript errors
2. Verify all imports are correct
3. Ensure no missing dependencies
4. Check for unused variables

### Styling Issues
1. Verify Tailwind classes are correct
2. Check CSS custom properties
3. Ensure proper responsive classes
4. Verify color contrast ratios

### API Issues
1. Check environment variables
2. Verify API route handlers
3. Test with proper request bodies
4. Check CORS settings

## 📊 Performance Monitoring

### Lighthouse Scores
Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

### Bundle Size
Monitor bundle size with:
```bash
npm run build
```
Check the build output for size warnings.

## 🔄 Deployment Process

### Staging Deployment
1. Push to `develop` branch
2. Automatic deployment to staging
3. Test all functionality
4. Review with stakeholders

### Production Deployment
1. Merge `develop` to `main`
2. Automatic deployment to production
3. Monitor for issues
4. Verify all features work

## 📞 Getting Help

### Internal Resources
- Check existing components for patterns
- Review the style guide
- Test in similar browsers/devices

### Contact
- Technical issues: [developer contact]
- Design questions: [designer contact]
- Content updates: [content manager contact]

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

---

**Happy coding!** 🚀