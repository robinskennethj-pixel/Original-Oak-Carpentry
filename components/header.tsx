import { Button } from "@/components/ui/button"
import { Hammer, Phone, ChevronDown, Menu, ArrowRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { LanguageSwitcher } from './language-switcher'

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
            src="/original-oak-logo.png"
            alt="Original Oak Carpentry Logo"
            className="h-24 w-24 object-contain bg-transparent rounded-lg"
          />
          <Link href="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
            <span className="text-primary">Original Oak</span> Carpentry
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            {translations.home}
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">
            {translations.about}
          </Link>
          <Link href="/services" className="text-foreground hover:text-primary transition-colors">
            {translations.services}
          </Link>
          <Link href="/portfolio" className="text-foreground hover:text-primary transition-colors">
            {translations.portfolio}
          </Link>
          <Link href="/testimonials" className="text-foreground hover:text-primary transition-colors">
            {translations.testimonials}
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
            {translations.contact}
          </Link>
          <Link href="/admin" className="text-foreground hover:text-primary transition-colors">
            {translations.admin}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          <Button asChild className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">
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
              <nav className="flex flex-col gap-6 mt-8">
                <Link href="/" className="text-foreground hover:text-primary transition-colors text-lg">
                  {translations.home}
                </Link>
                <Link href="/about" className="text-foreground hover:text-primary transition-colors text-lg">
                  {translations.about}
                </Link>
                <Link href="/services" className="text-foreground hover:text-primary transition-colors text-lg">
                  {translations.services}
                </Link>
                <Link href="/portfolio" className="text-foreground hover:text-primary transition-colors text-lg">
                  {translations.portfolio}
                </Link>
                <Link href="/testimonials" className="text-foreground hover:text-primary transition-colors text-lg">
                  {translations.testimonials}
                </Link>
                <Link href="/contact" className="text-foreground hover:text-primary transition-colors text-lg">
                  {translations.contact}
                </Link>
                <Link href="/admin" className="text-foreground hover:text-primary transition-colors text-lg">
                  {translations.admin}
                </Link>
                <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/contact">
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