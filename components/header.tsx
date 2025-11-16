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
                   className="h-12 w-auto object-contain"
                 />
          <Link href="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
            <span className="text-primary">Original Oak</span> Carpentry
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
            <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
            {translations.home}
          </Link>
          <Link href="/about" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
            <User className="h-4 w-4 group-hover:scale-110 transition-transform" />
            {translations.about}
          </Link>
          
          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
              <Wrench className="h-4 w-4 group-hover:scale-110 transition-transform" />
              {translations.services}
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/services/custom-woodwork" className="flex items-center gap-2">
                  <Hammer className="h-4 w-4" />
                  Custom Woodwork
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/finish-carpentry" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Finish Carpentry
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/outdoor-living" className="flex items-center gap-2">
                  <TreePine className="h-4 w-4" />
                  Outdoor Living
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/hurricane-resistant" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Hurricane Resistant
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/repair-restoration" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Repair & Restoration
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/sustainable-crafting" className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Sustainable Crafting
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/services" className="font-medium">
                  View All Services
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Portfolio Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
              <FolderOpen className="h-4 w-4 group-hover:scale-110 transition-transform" />
              {translations.portfolio}
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/portfolio/luxury-kitchen-renovation" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Kitchen Renovations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/portfolio/waterfront-deck--pergola" className="flex items-center gap-2">
                  <TreePine className="h-4 w-4" />
                  Outdoor Projects
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/portfolio/restaurant-build-out" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Commercial Work
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/portfolio/historic-home-restoration" className="flex items-center gap-2">
                  <Hammer className="h-4 w-4" />
                  Restorations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/portfolio" className="font-medium">
                  View All Projects
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/testimonials" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
            <Star className="h-4 w-4 group-hover:scale-110 transition-transform" />
            {translations.testimonials}
          </Link>
          <Link href="/contact" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
            <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
            {translations.contact}
          </Link>
          <Link href="/admin" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
            <Shield className="h-4 w-4 group-hover:scale-110 transition-transform" />
            {translations.admin}
          </Link>
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