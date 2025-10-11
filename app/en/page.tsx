import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ContactSection } from '@/components/contact-section'
import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'

export default function EnglishHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header locale="en" />
      <HeroSection locale="en" />
      <ServicesSection locale="en" />
      <PortfolioSection locale="en" />
      <AboutSection locale="en" />
      <TestimonialsSection locale="en" />
      <ContactSection locale="en" />
      <Footer />
    </div>
  )
}