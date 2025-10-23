import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ContactSection } from '@/components/contact-section'
import { AboutSection } from '@/components/about-section'
import { AIChatbot } from '@/components/ai-chatbot'
import { AICostEstimatorWidget } from '@/components/ai-cost-estimator'
import { ServiceAreaMap } from '@/components/google-maps'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Bot, Calculator, TrendingUp } from 'lucide-react'

export default function HomePage({
  params: {locale}
}: {
  params: {locale: string}
}) {
  // Pass locale to components that need it for translations
  return (
    <div className="min-h-screen bg-white">
      <HeroSection locale={locale} />
      <ServicesSection locale={locale} />

      {/* AI Tools Section - Prominently Featured */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {locale === 'es' ? 'Herramientas de IA Inteligentes' : 'Smart AI Tools'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {locale === 'es'
                ? 'Aprovecha el poder de la inteligencia artificial para planificar tu proyecto con precisión'
                : 'Harness the power of artificial intelligence to plan your project with precision'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <AICostEstimatorWidget locale={locale} />

            <Card className="border-2 border-secondary shadow-lg">
              <CardHeader className="bg-secondary/5">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  {locale === 'es' ? 'Asistente de IA' : 'AI Assistant'}
                </CardTitle>
                <CardDescription>
                  {locale === 'es'
                    ? 'Chatea con nuestro asistente de IA para respuestas instantáneas'
                    : 'Chat with our AI assistant for instant answers'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {locale === 'es'
                    ? 'Obtén respuestas instantáneas sobre servicios, precios y disponibilidad'
                    : 'Get instant answers about services, pricing, and availability'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {locale === 'es'
                    ? '💡 Consejo: El asistente de IA aparece en la esquina inferior derecha de tu pantalla'
                    : '💡 Tip: The AI assistant appears in the bottom-right corner of your screen'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <PortfolioSection locale={locale} />
      <AboutSection locale={locale} />
      <TestimonialsSection locale={locale} />
      <ContactSection locale={locale} />
      <ServiceAreaMap />
      <AIChatbot locale={locale} />
    </div>
  )
}