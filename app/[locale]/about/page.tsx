import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from "@/components/ui/button"
import { Award, Users, MapPin, Shield, Clock, Star } from "lucide-react"
import { AIStorytelling } from '@/components/ai-storytelling'
import Link from "next/link"

export default function AboutPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isSpanish = locale === 'es';

  const content = {
    en: {
      title: "About Original Oak Carpentry",
      subtitle: "Florida's Trusted Carpentry Experts Since 2010",
      description: "At Original Oak Carpentry, we honor the timeless tradition of craftsmanship while embracing modern innovation. Our name reflects our commitment to building with the strength and durability of oak, creating pieces that stand the test of time with precision and purpose.",
      mission: {
        title: "Our Mission",
        text: "To deliver exceptional carpentry services that enhance Florida homes and businesses while maintaining the highest standards of craftsmanship, reliability, and customer satisfaction. We build relationships as strong as the structures we create."
      },
      values: {
        title: "Our Values",
        items: [
          {
            icon: Shield,
            title: "Hurricane-Ready Construction",
            text: "Every project is built to withstand Florida's unique climate challenges."
          },
          {
            icon: Award,
            title: "Master Craftsmanship",
            text: "Traditional techniques combined with modern precision and tools."
          },
          {
            icon: Users,
            title: "Customer First",
            text: "Clear communication, on-time completion, and professional service."
          },
          {
            icon: Clock,
            title: "14+ Years Experience",
            text: "Serving Florida communities with expertise and reliability."
          }
        ]
      },
      team: {
        title: "Our Team",
        description: "Led by master carpenter with decades of experience in Florida construction",
        members: [
          {
            name: "Master Carpenter",
            role: "Founder & Lead Carpenter",
            experience: "20+ years experience",
            specialty: "Finish Carpentry & Custom Work"
          }
        ]
      },
      credentials: {
        title: "Florida Credentials",
        items: [
          "Licensed & Insured in Florida",
          "Hurricane Construction Certified",
          "Better Business Bureau Accredited",
          "300+ Projects Completed",
          "98% Customer Satisfaction Rate"
        ]
      },
      serviceArea: {
        title: "Service Area",
        description: "Serving Central and South Florida with professional carpentry services",
        areas: [
          "Orlando & Central Florida",
          "Tampa Bay Area",
          "Miami-Dade County",
          "Broward County",
          "Palm Beach County"
        ]
      },
      cta: {
        title: "Ready to Start Your Project?",
        subtitle: "Let's discuss how we can bring your vision to life with expert craftsmanship",
        button: "Get a Free Quote",
        secondaryButton: "Book a Consultation"
      }
    },
    es: {
      title: "Acerca de Carpintería Oak Original",
      subtitle: "Expertos en Carpintería de Florida Desde 2010",
      description: "En Carpintería Oak Original, honramos la tradición eterna de la artesanía mientras abrazamos la innovación moderna. Nuestro nombre refleja nuestro compromiso de construir con la fuerza y durabilidad del roble, creando piezas que resisten la prueba del tiempo con precisión y propósito.",
      mission: {
        title: "Nuestra Misión",
        text: "Brindar servicios excepcionales de carpintería que mejoren los hogares y negocios de Florida mientras mantenemos los más altos estándares de artesanía, confiabilidad y satisfacción del cliente. Construimos relaciones tan fuertes como las estructuras que creamos."
      },
      values: {
        title: "Nuestros Valores",
        items: [
          {
            icon: Shield,
            title: "Construcción Resistente a Huracanes",
            text: "Cada proyecto está construido para resistir los desafíos climáticos únicos de Florida."
          },
          {
            icon: Award,
            title: "Artesanía Maestra",
            text: "Técnicas tradicionales combinadas con precisión y herramientas modernas."
          },
          {
            icon: Users,
            title: "Cliente Primero",
            text: "Comunicación clara, finalización a tiempo y servicio profesional."
          },
          {
            icon: Clock,
            title: "14+ Años de Experiencia",
            text: "Sirviendo a las comunidades de Florida con experiencia y confiabilidad."
          }
        ]
      },
      team: {
        title: "Nuestro Equipo",
        description: "Dirigido por carpintero maestro con décadas de experiencia en construcción en Florida",
        members: [
          {
            name: "Carpintero Maestro",
            role: "Fundador y Carpintero Principal",
            experience: "20+ años de experiencia",
            specialty: "Carpintería de Acabado y Trabajo Personalizado"
          }
        ]
      },
      credentials: {
        title: "Credenciales de Florida",
        items: [
          "Licenciado y Asegurado en Florida",
          "Certificado en Construcción para Huracanes",
          "Acreditado por Better Business Bureau",
          "300+ Proyectos Completados",
          "98% Tasa de Satisfacción del Cliente"
        ]
      },
      serviceArea: {
        title: "Área de Servicio",
        description: "Sirviendo el Centro y Sur de Florida con servicios profesionales de carpintería",
        areas: [
          "Orlando y Centro de Florida",
          "Área de Tampa Bay",
          "Condado de Miami-Dade",
          "Condado de Broward",
          "Condado de Palm Beach"
        ]
      },
      cta: {
        title: "¿Listo para Comenzar Tu Proyecto?",
        subtitle: "Discutamos cómo podemos hacer realidad tu visión con artesanía experta",
        button: "Obtener Cotización Gratis",
        secondaryButton: "Reservar Consulta"
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-muted/30 to-secondary/10 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/wood-grain-pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full translate-y-40 -translate-x-40"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              {t.subtitle}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t.mission.title}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.mission.text}
            </p>
          </div>
        </div>
      </section>

      {/* AI Storytelling Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <AIStorytelling locale={locale} />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t.values.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.items.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center p-6 bg-card rounded-xl border border-border">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Credentials & Service Area */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Credentials */}
            <div className="bg-card rounded-xl border border-border p-8">
              <h3 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-3">
                <Award className="h-6 w-6 text-primary" />
                {t.credentials.title}
              </h3>
              <ul className="space-y-3">
                {t.credentials.items.map((credential, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-muted-foreground">{credential}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Area */}
            <div className="bg-card rounded-xl border border-border p-8">
              <h3 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary" />
                {t.serviceArea.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t.serviceArea.description}
              </p>
              <ul className="space-y-2">
                {t.serviceArea.areas.map((area, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-muted-foreground">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/contact">
                  {t.cta.button}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/contact">
                  {t.cta.secondaryButton}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}