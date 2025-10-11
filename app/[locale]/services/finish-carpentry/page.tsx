import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Star, Clock, Award } from "lucide-react"
import Link from "next/link"

export default function FinishCarpentryPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isSpanish = locale === 'es';

  const content = {
    en: {
      title: "Finish Carpentry & Custom Interiors",
      subtitle: "Precision Woodwork That Transforms Your Space",
      description: "Transform your home with expert finish carpentry that adds beauty, value, and character to every room. Our precision craftsmanship ensures flawless results that enhance your living spaces.",
      hero: {
        title: "Masterful Finish Work",
        description: "From crown molding to custom cabinetry, we create beautiful interior details that elevate your home's aesthetic and value. Every piece is handcrafted with precision and attention to detail.",
        cta: "Get a Free Quote",
        secondaryCta: "View Our Portfolio"
      },
      services: {
        title: "Our Finish Carpentry Services",
        items: [
          {
            title: "Crown Molding & Trim",
            description: "Elegant crown molding, baseboards, and decorative trim that adds architectural interest",
            features: [
              "Custom crown molding installation",
              "Baseboard and shoe molding",
              "Chair rail and picture molding",
              "Window and door casings",
              "Decorative corner blocks"
            ],
            image: "/crown-molding-installation.jpg"
          },
          {
            title: "Custom Cabinetry",
            description: "Beautiful custom cabinets and built-ins designed for your specific needs and style",
            features: [
              "Kitchen cabinet installation",
              "Bathroom vanity cabinets",
              "Built-in bookcases and shelving",
              "Entertainment centers",
              "Custom storage solutions"
            ],
            image: "/custom-cabinetry.jpg"
          },
          {
            title: "Wainscoting & Paneling",
            description: "Classic wainscoting and decorative wall paneling that adds sophistication",
            features: [
              "Raised panel wainscoting",
              "Beadboard paneling",
              "Board and batten walls",
              "Tongue and groove paneling",
              "Custom wall treatments"
            ],
            image: "/wainscoting-paneling.jpg"
          },
          {
            title: "Door & Window Trim",
            description: "Professional door and window trim that frames your openings beautifully",
            features: [
              "Interior door installation",
              "Window trim and casings",
              "French door trim",
              "Pocket door installation",
              "Custom door modifications"
            ],
            image: "/door-window-trim.jpg"
          },
          {
            title: "Staircase Work",
            description: "Custom staircase components and refinishing for beautiful, safe stairs",
            features: [
              "Newel posts and balusters",
              "Handrail installation",
              "Stair tread replacement",
              "Staircase refinishing",
              "Custom stair components"
            ],
            image: "/staircase-work.jpg"
          },
          {
            title: "Built-in Features",
            description: "Custom built-in features that maximize space and add character",
            features: [
              "Window seats and benches",
              "Built-in desks and workspaces",
              "Custom closets and organizers",
              "Fireplace mantels and surrounds",
              "Architectural niches"
            ],
            image: "/built-in-features.jpg"
          }
        ]
      },
      process: {
        title: "Our Process",
        steps: [
          {
            number: "1",
            title: "Consultation & Design",
            description: "We discuss your vision, take measurements, and create detailed plans"
          },
          {
            number: "2",
            title: "Material Selection",
            description: "Choose from premium woods, finishes, and hardware options"
          },
          {
            number: "3",
            title: "Precision Crafting",
            description: "Every piece is custom crafted with attention to detail"
          },
          {
            number: "4",
            title: "Professional Installation",
            description: "Expert installation with minimal disruption to your home"
          }
        ]
      },
      benefits: {
        title: "Benefits of Professional Finish Carpentry",
        items: [
          "Increased home value and market appeal",
          "Enhanced aesthetic beauty and character",
          "Custom solutions for your specific space",
          "Professional-grade materials and craftsmanship",
          "Seamless integration with existing architecture",
          "Long-lasting durability and performance"
        ]
      },
      testimonials: [
        {
          name: "Sarah M.",
          location: "Orlando, FL",
          rating: 5,
          text: "The crown molding and custom cabinetry transformed our living room. The craftsmanship is exceptional and it looks like it was always meant to be there."
        },
        {
          name: "Robert K.",
          location: "Tampa, FL",
          rating: 5,
          text: "Professional finish work throughout our home renovation. Every detail was perfect, from the baseboards to the custom built-ins."
        }
      ],
      cta: {
        title: "Ready to Transform Your Interiors?",
        subtitle: "Let's discuss your finish carpentry project and create something beautiful together",
        button: "Get a Free Quote",
        secondaryButton: "Book a Consultation"
      }
    },
    es: {
      title: "Carpintería de Acabado e Interiores Personalizados",
      subtitle: "Trabajo de Madera de Precisión Que Transforma Tu Espacio",
      description: "Transforma tu hogar con carpintería de acabado experta que agrega belleza, valor y carácter a cada habitación. Nuestra artesanía de precisión garantiza resultados impecables que mejoran tus espacios de vida.",
      hero: {
        title: "Trabajo de Acabado Magistral",
        description: "Desde cornisas hasta gabinetes personalizados, creamos hermosos detalles interiores que elevan la estética y el valor de tu hogar. Cada pieza está hecha a mano con precisión y atención al detalle.",
        cta: "Obtener Cotización Gratis",
        secondaryCta: "Ver Nuestro Portafolio"
      },
      services: {
        title: "Nuestros Servicios de Carpintería de Acabado",
        items: [
          {
            title: "Cornisas y Molduras",
            description: "Elegantes cornisas, zócalos y molduras decorativas que agregan interés arquitectónico",
            features: [
              "Instalación personalizada de cornisas",
              "Zócalos y molduras de zapatos",
              "Guardabarros y molduras de cuadros",
              "Marcos de ventanas y puertas",
              "Bloques de esquina decorativos"
            ],
            image: "/crown-molding-installation.jpg"
          },
          {
            title: "Gabinetes Personalizados",
            description: "Hermosos gabinetes personalizados y empotrados diseñados para tus necesidades y estilo específicos",
            features: [
              "Instalación de gabinetes de cocina",
              "Gabinetes de tocador de baño",
              "Estanterías y libreros empotrados",
              "Centros de entretenimiento",
              "Soluciones de almacenamiento personalizadas"
            ],
            image: "/custom-cabinetry.jpg"
          },
          {
            title: "Revestimiento y Paneles",
            description: "Revestimiento clásico y paneles de pared decorativos que agregan sofisticación",
            features: [
              "Revestimiento de paneles elevados",
              "Paneles de tablero de abertas",
              "Paredes de tablero y listón",
              "Paneles de lengua y ranura",
              "Tratamientos de pared personalizados"
            ],
            image: "/wainscoting-paneling.jpg"
          },
          {
            title: "Molduras de Puertas y Ventanas",
            description: "Molduras profesionales de puertas y ventanas que enmarcan tus aberturas hermosamente",
            features: [
              "Instalación de puertas interiores",
              "Molduras y marcos de ventanas",
              "Molduras de puertas francesas",
              "Instalación de puertas de bolsillo",
              "Modificaciones de puertas personalizadas"
            ],
            image: "/door-window-trim.jpg"
          },
          {
            title: "Trabajo de Escaleras",
            description: "Componentes de escaleras personalizados y refinamiento para escaleras hermosas y seguras",
            features: [
              "Postes y balaustres nuevos",
              "Instalación de pasamanos",
              "Reemplazo de contrahuellas",
              "Refinamiento de escaleras",
              "Componentes de escaleras personalizadas"
            ],
            image: "/staircase-work.jpg"
          },
          {
            title: "Características Empotradas",
            description: "Características empotradas personalizadas que maximizan el espacio y agregan carácter",
            features: [
              "Asientos y bancos de ventana",
              "Escritorios y espacios de trabajo empotrados",
              "Armarios y organizadores personalizados",
              "Mantos y alrededores de chimenea",
              "Nichos arquitectónicos"
            ],
            image: "/built-in-features.jpg"
          }
        ]
      },
      process: {
        title: "Nuestro Proceso",
        steps: [
          {
            number: "1",
            title: "Consulta y Diseño",
            description: "Discutimos tu visión, tomamos medidas y creamos planes detallados"
          },
          {
            number: "2",
            title: "Selección de Materiales",
            description: "Elige entre maderas premium, acabados y opciones de herrajes"
          },
          {
            number: "3",
            title: "Artesanía de Precisión",
            description: "Cada pieza está hecha a medida con atención al detalle"
          },
          {
            number: "4",
            title: "Instalación Profesional",
            description: "Instalación experta con mínima interrupción a tu hogar"
          }
        ]
      },
      benefits: {
        title: "Beneficios de la Carpintería de Acabado Profesional",
        items: [
          "Aumento del valor y atractivo del hogar",
          "Belleza estética y carácter mejorados",
          "Soluciones personalizadas para tu espacio específico",
          "Materiales y artesanía de grado profesional",
          "Integración perfecta con la arquitectura existente",
          "Durabilidad y rendimiento duraderos"
        ]
      },
      testimonials: [
        {
          name: "Sarah M.",
          location: "Orlando, FL",
          rating: 5,
          text: "Las cornisas y gabinetes personalizados transformaron nuestra sala de estar. La artesanía es excepcional y parece que siempre estuvo destinado a estar allí."
        },
        {
          name: "Robert K.",
          location: "Tampa, FL",
          rating: 5,
          text: "Trabajo de acabado profesional en toda nuestra renovación del hogar. Cada detalle fue perfecto, desde los zócalos hasta los muebles empotrados personalizados."
        }
      ],
      cta: {
        title: "¿Listo para Transformar Tus Interiores?",
        subtitle: "Discutamos tu proyecto de carpintería de acabado y creemos algo hermoso juntos",
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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty mb-8">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contact">
                  {t.hero.cta}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/portfolio">
                  {t.hero.secondaryCta}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t.services.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => (
              <div key={index} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t.process.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.process.steps.map((step, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                {t.benefits.title}
              </h2>
              <ul className="space-y-4">
                {t.benefits.items.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-8">
              <h3 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-3">
                <Star className="h-6 w-6 text-yellow-500" />
                Client Testimonials
              </h3>
              <div className="space-y-6">
                {t.testimonials.map((testimonial, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {testimonial.name} - {testimonial.location}
                      </span>
                    </div>
                    <p className="text-muted-foreground italic">
                      \"{testimonial.text}\"
                    </p>
                  </div>
                ))}
              </div>
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
                  <ArrowRight className="h-4 w-4 ml-2" />
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