import { Button } from "@/components/ui/button"
import { Phone, Menu, ArrowRight, Home, User, Wrench, FolderOpen, Star, Mail, Shield, Quote, ChevronDown, Hammer, Palette, TreePine, Zap, Building, Leaf } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { LanguageSwitcher } from './language-switcher'
import { ThemeToggle } from './theme-toggle'

interface HeaderProps {
  locale?: string;
}

export function Header({ locale = 'en' }: HeaderProps) {
  const isSpanish = locale === 'es';

  const translations = {
    home: isSpanish ? 'Inicio' : 'Home',
    about: isSpanish ? 'Acerca de' : 'About',
    services: isSpanish ? 'Servicios' : 'Services',
    portfolio: isSpanish ? 'Portafolio' : 'Portfolio',
    testimonials: isSpanish ? 'Testimonios' : 'Reviews',
    contact: isSpanish ? 'Contacto' : 'Contact',
    admin: isSpanish ? 'Admin' : 'Admin',
    getQuote: isSpanish ? 'Obtener Cotización' : 'Get Quote',
    callNow: isSpanish ? 'Llamar Ahora' : 'Call Now'
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
                 <img
                   src="/ORIGINAL OAK CARPENTRY - FULL-WEBSITE-LOGO.png"
                   alt="Original Oak Carpentry Logo"
                   className="h-16 w-auto object-contain"
                 />
          <Link href="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
            <span className="text-primary">Original Oak</span> Carpentry
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          {/* Main Navigation Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group h-auto p-2"
              >
                <Menu className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Navigation
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 max-h-96 overflow-y-auto z-50 bg-background border shadow-lg">
              {/* Home */}
              <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  {translations.home}
                </Link>
              </DropdownMenuItem>
              
              {/* About */}
              <DropdownMenuItem asChild>
                <Link href="/about" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {translations.about}
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              {/* Services Section */}
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                {translations.services}
              </div>
              <DropdownMenuItem asChild>
                <Link href="/services" className="flex items-center gap-2 ml-4">
                  <Wrench className="h-4 w-4" />
                  View All Services
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/custom-woodwork" className="flex items-center gap-2 ml-4">
                  <Hammer className="h-4 w-4" />
                  Custom Woodwork
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/finish-carpentry" className="flex items-center gap-2 ml-4">
                  <Palette className="h-4 w-4" />
                  Finish Carpentry
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/outdoor-living" className="flex items-center gap-2 ml-4">
                  <TreePine className="h-4 w-4" />
                  Outdoor Living
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/hurricane-resistant" className="flex items-center gap-2 ml-4">
                  <Zap className="h-4 w-4" />
                  Hurricane Resistant
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/repair-restoration" className="flex items-center gap-2 ml-4">
                  <Building className="h-4 w-4" />
                  Repair & Restoration
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/sustainable-crafting" className="flex items-center gap-2 ml-4">
                  <Leaf className="h-4 w-4" />
                  Sustainable Crafting
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/bespoke-commissions" className="flex items-center gap-2 ml-4">
                  <Wrench className="h-4 w-4" />
                  Bespoke Commissions
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/installation-service" className="flex items-center gap-2 ml-4">
                  <Building className="h-4 w-4" />
                  Installation & Service
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              {/* Portfolio Section */}
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                {translations.portfolio}
              </div>
              <DropdownMenuItem asChild>
                <Link href="/portfolio" className="flex items-center gap-2 ml-4">
                  <FolderOpen className="h-4 w-4" />
                  View All Projects
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/portfolio/luxury-kitchen-renovation" className="flex items-center gap-2 ml-4">
                  <Building className="h-4 w-4" />
                  Kitchen Renovations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/portfolio/waterfront-deck--pergola" className="flex items-center gap-2 ml-4">
                  <TreePine className="h-4 w-4" />
                  Outdoor Projects
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/portfolio/restaurant-build-out" className="flex items-center gap-2 ml-4">
                  <Building className="h-4 w-4" />
                  Commercial Work
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/portfolio/historic-home-restoration" className="flex items-center gap-2 ml-4">
                  <Hammer className="h-4 w-4" />
                  Restorations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/portfolio/custom-walk-in-closet" className="flex items-center gap-2 ml-4">
                  <Building className="h-4 w-4" />
                  Custom Closets
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/portfolio/poolside-cabana" className="flex items-center gap-2 ml-4">
                  <TreePine className="h-4 w-4" />
                  Outdoor Structures
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              {/* Smart AI Tools Section */}
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                Smart AI Tools
              </div>
              <DropdownMenuItem asChild>
                <Link href="/virtual-gallery" className="flex items-center gap-2 ml-4">
                  <Zap className="h-4 w-4" />
                  Virtual Gallery
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/client-portal" className="flex items-center gap-2 ml-4">
                  <User className="h-4 w-4" />
                  Client Portal
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/weather-alerts" className="flex items-center gap-2 ml-4">
                  <Zap className="h-4 w-4" />
                  Weather Alerts
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/videos" className="flex items-center gap-2 ml-4">
                  <FolderOpen className="h-4 w-4" />
                  Videos & Tutorials
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/certifications" className="flex items-center gap-2 ml-4">
                  <Star className="h-4 w-4" />
                  Certifications
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              {/* Other Pages */}
              <DropdownMenuItem asChild>
                <Link href="/testimonials" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  {translations.testimonials}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {translations.contact}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  {translations.admin}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageSwitcher />

          <Button asChild className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
            <Link href="/contact">
              <Quote className="h-4 w-4" />
              {translations.getQuote}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="sm" className="hidden md:flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="tel:+14075550123" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {translations.callNow}
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <ThemeToggle />
              </div>
              <nav className="flex flex-col gap-6 mt-8">
                <Link href="/" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors text-lg">
                  <Home className="h-5 w-5" />
                  {translations.home}
                </Link>
                <Link href="/about" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors text-lg">
                  <User className="h-5 w-5" />
                  {translations.about}
                </Link>
                
                {/* Services Section */}
                <div className="space-y-2">
                  <Link href="/services" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors text-lg font-medium">
                    <Wrench className="h-5 w-5" />
                    {translations.services}
                  </Link>
                  <div className="ml-8 space-y-2">
                    <Link href="/services/custom-woodwork" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Hammer className="h-4 w-4" />
                      Custom Woodwork
                    </Link>
                    <Link href="/services/finish-carpentry" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Palette className="h-4 w-4" />
                      Finish Carpentry
                    </Link>
                    <Link href="/services/outdoor-living" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <TreePine className="h-4 w-4" />
                      Outdoor Living
                    </Link>
                    <Link href="/services/sustainable-crafting" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Leaf className="h-4 w-4" />
                      Sustainable Crafting
                    </Link>
                  </div>
                </div>

                {/* Portfolio Section */}
                <div className="space-y-2">
                  <Link href="/portfolio" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors text-lg font-medium">
                    <FolderOpen className="h-5 w-5" />
                    {translations.portfolio}
                  </Link>
                  <div className="ml-8 space-y-2">
                    <Link href="/portfolio/luxury-kitchen-renovation" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Building className="h-4 w-4" />
                      Kitchen Renovations
                    </Link>
                    <Link href="/portfolio/waterfront-deck--pergola" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <TreePine className="h-4 w-4" />
                      Outdoor Projects
                    </Link>
                    <Link href="/portfolio/restaurant-build-out" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Building className="h-4 w-4" />
                      Commercial Work
                    </Link>
                  </div>
                </div>

                <Link href="/testimonials" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors text-lg">
                  <Star className="h-5 w-5" />
                  {translations.testimonials}
                </Link>
                <Link href="/contact" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors text-lg">
                  <Mail className="h-5 w-5" />
                  {translations.contact}
                </Link>
                <Link href="/admin" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors text-lg">
                  <Shield className="h-5 w-5" />
                  {translations.admin}
                </Link>
                <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                  <Link href="/contact" className="flex items-center gap-2">
                    <Quote className="h-4 w-4" />
                    {translations.getQuote}
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}