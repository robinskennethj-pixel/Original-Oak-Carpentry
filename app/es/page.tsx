import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ContactSection } from '@/components/contact-section'
import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'

export default function SpanishHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header locale="es" />
      <HeroSection locale="es" />
      <ServicesSection locale="es" />
      <PortfolioSection locale="es" />
      <AboutSection locale="es" />
      <TestimonialsSection locale="es" />
      <ContactSection locale="es" />
      <Footer />
    </div>
  )
}