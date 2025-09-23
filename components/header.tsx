import { Button } from "@/components/ui/button"
import { Hammer, Phone, ChevronDown, Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from './language-switcher'

export function Header() {
  const t = useTranslations('header')
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Hammer className="h-8 w-8 text-primary" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
          </div>
          <Link href="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
            <span className="text-primary">Ogun</span> Carpentry
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            {t('home')}
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">
            {t('about')}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
              {t('services')}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/services">All Services</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/finish-carpentry">Finish Carpentry</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/outdoor-living">Outdoor Living</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/hurricane-resistant">Hurricane Protection</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/repair-restoration">Repair & Restoration</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/portfolio" className="text-foreground hover:text-primary transition-colors">
            {t('portfolio')}
          </Link>
          <Link href="/testimonials" className="text-foreground hover:text-primary transition-colors">
            {t('reviews')}
          </Link>
          <Link href="/faq" className="text-foreground hover:text-primary transition-colors">
            {t('faq')}
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
            {t('contact')}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary/90" asChild>
            <Link href="/contact">
              <Phone className="h-4 w-4" />
              {t('getQuote')}
            </Link>
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  {t('home')}
                </Link>
                <Link href="/about" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  {t('about')}
                </Link>
                <div className="space-y-2">
                  <div className="text-lg font-medium text-foreground">{t('services')}</div>
                  <div className="ml-4 space-y-2">
                    <Link href="/services" className="block text-muted-foreground hover:text-primary transition-colors">
                      All Services
                    </Link>
                    <Link href="/services/finish-carpentry" className="block text-muted-foreground hover:text-primary transition-colors">
                      Finish Carpentry
                    </Link>
                    <Link href="/services/outdoor-living" className="block text-muted-foreground hover:text-primary transition-colors">
                      Outdoor Living
                    </Link>
                    <Link href="/services/hurricane-resistant" className="block text-muted-foreground hover:text-primary transition-colors">
                      Hurricane Protection
                    </Link>
                    <Link href="/services/repair-restoration" className="block text-muted-foreground hover:text-primary transition-colors">
                      Repair & Restoration
                    </Link>
                  </div>
                </div>
                <Link href="/portfolio" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  {t('portfolio')}
                </Link>
                <Link href="/testimonials" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  {t('reviews')}
                </Link>
                <Link href="/faq" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  {t('faq')}
                </Link>
                <Link href="/contact" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  {t('contact')}
                </Link>
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90" asChild>
                  <Link href="/contact">
                    <Phone className="h-4 w-4 mr-2" />
                    {t('getQuote')}
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
