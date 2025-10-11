import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Shield, Clock, Users, Star } from "lucide-react"
import Link from "next/link"
import { AICostEstimator } from '@/components/ai-cost-estimator'

export default function ServicesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isSpanish = locale === 'es';

  const content = {
    en: {
      title: "Our Carpentry Services",
      subtitle: "Expert Craftsmanship for Every Project",
      description: "From custom interiors to hurricane-resilient outdoor living, we deliver exceptional carpentry services that enhance your Florida home and withstand our unique climate challenges.",
      services: [
        {
          title: "Finish Carpentry & Custom Interiors",
          description: "Precision finish work that transforms spaces with beautiful wood details, trim, and custom cabinetry.",
          features: [
            "Door & Window Trim Installation",
            "Crown Molding & Baseboards",
            "Custom Cabinetry & Built-ins",
            "Wainscoting & Paneling",
            "Staircase Refinishing"
          ],
          image: "/finish-carpentry-work.jpg",
          href: "/services/finish-carpentry",
          cta: "Learn More"
        },
        {
          title: "Outdoor Living Spaces",
          description: "Hurricane-resilient outdoor living that extends your home and stands up to Florida's climate.",
          features: [
            "Custom Decks & Pergolas",
            "Hurricane-Resistant Structures",
            "Outdoor Kitchens & Bars",
            "Screened Porches & Patios",
            "Pool Houses & Cabanas"
          ],
          image: "/outdoor-living-deck.jpg",
          href: "/services/outdoor-living",
          cta: "Learn More"
        },
        {
          title: "Framing & Structural Carpentry",
          description: "Structural framing that meets Florida building codes and withstands storms and hurricanes.",
          features: [
            "New Construction Framing",
            "Hurricane-Resistant Framing",
            "Structural Repairs & Reinforcement",
            "Room Additions & Extensions",
            "Load-Bearing Wall Modifications"
          ],
          image: "/structural-framing.jpg",
          href: "/services/structural-framing",
          cta: "Learn More"
        },
        {
          title: "Repair & Restoration",
          description: "Expert repair and restoration services that preserve your home's character and value.",
          features: [
            "Historic Home Restoration",
            "Wood Rot Repair & Replacement",
            "Window & Door Restoration",
            "Trim & Molding Repair",
            "Structural Damage Repair"
          ],
          image: "/restoration-work.jpg",
          href: "/services/restoration",
          cta: "Learn More"
        },
        {
          title: "Hurricane-Resilient Construction",
          description: "Specialized construction techniques and materials designed to withstand Florida's hurricane season.",
          features: [
            "Impact-Resistant Installations",
            "Reinforced Connections",
            "Pressure-Treated Materials",
            "Storm Shutters & Protection",
            "Post-Storm Repairs"
          ],
          image: "/hurricane-construction.jpg",
          href: "/services/hurricane-construction",
          cta: "Learn More"
        },
        {
          title: "Sustainable & Specialty Carpentry",
          description: "Eco-friendly options and specialty woodworking for unique projects and sustainable homes.",
          features: [
            "Reclaimed Wood Projects",
            "Sustainable Material Sourcing",
            "Custom Furniture Building",
            "Green Building Practices",
            "Specialty Woodworking"
          ],
          image: "/sustainable-carpentry.jpg",
          href: "/services/sustainable-carpentry",
          cta: "Learn More"
        }
      ],
      whyChoose: {
        title: "Why Choose Original Oak Carpentry?",
        items: [
          {
            icon: Shield,
            title: "Hurricane-Ready Construction",
            text: "Built to withstand Florida's storms"
          },
          {
            icon: Award,
            title: "Master Craftsmanship",
            text: "Traditional skills with modern precision"
          },
          {
            icon: Clock,
            title: "14+ Years Experience",
            text: "Serving Florida communities"
          },
          {
            icon: Users,
            title: "98% Satisfaction Rate",
            text: "Proven track record of excellence"
          }
        ]
      },
      cta: {
        title: "Ready to Transform Your Space?",
        subtitle: "Contact us for a free consultation and quote on your carpentry project",
        button: "Get a Free Quote",
        secondaryButton: "Book a Consultation"
      }
    },
    es: {
      title: "Nuestros Servicios de Carpintería",
      subtitle: "Artesanía Experta para Cada Proyecto",
      description: "Desde interiores personalizados hasta espacios exteriores resistentes a huracanes, brindamos servicios excepcionales de carpintería que mejoran tu hogar en Florida y resisten los desafíos climáticos únicos.",
      services: [
        {
          title: "Carpintería de Acabado e Interiores Personalizados",
          description: "Trabajo de acabado de precisión que transforma espacios con hermosos detalles de madera, molduras y gabinetes personalizados.",
          features: [
            "Instalación de Molduras de Puertas y Ventanas",
            "Cornisas y Zócalos",
            "Gabinetes y Muebles Empotrados Personalizados",
            "Revestimiento de Paredes y Paneles",
            "Refinamiento de Escaleras"
          ],
          image: "/finish-carpentry-work.jpg",
          href: "/es/services/finish-carpentry",
          cta: "Aprender Más"
        },
        {
          title: "Espacios de Vida al Aire Libre",
          description: "Vida exterior resistente a huracanes que extiende tu hogar y resiste el clima de Florida.",
          features: [
            "Cubiertas y Pérgolas Personalizadas",
            "Estructuras Resistentes a Huracanes",
            "Cocinas y Bares Exteriores",
            "Porches y Patios con Pantalla",
            "Casas de Piscina y Cabañas"
          ],
          image: "/outdoor-living-deck.jpg",
          href: "/es/services/outdoor-living",
          cta: "Aprender Más"
        },
        {
          title: "Encuadre y Carpintería Estructural",
          description: "Encuadre estructural que cumple con los códigos de construcción de Florida y resiste tormentas y huracanes.",
          features: [
            "Encuadre de Nueva Construcción",
            "Encuadre Resistente a Huracanes",
            "Reparaciones y Refuerzo Estructural",
            "Adiciones y Extensiones de Habitaciones",
            "Modificaciones de Paredes de Carga"
          ],
          image: "/structural-framing.jpg",
          href: "/es/services/structural-framing",
          cta: "Aprender Más"
        },
        {
          title: "Reparación y Restauración",
          description: "Servicios expertos de reparación y restauración que preservan el carácter y valor de tu hogar.",
          features: [
            "Restauración de Hogares Históricos",
            "Reparación y Reemplazo de Madera Podrida",
            "Restauración de Ventanas y Puertas",
            "Reparación de Molduras y Zócalos",
            "Reparación de Daños Estructurales"
          ],
          image: "/restoration-work.jpg",
          href: "/es/services/restoration",
          cta: "Aprender Más"
        },
        {
          title: "Construcción Resistente a Huracanes",
          description: "Técnicas y materiales de construcción especializados diseñados para resistir la temporada de huracanes de Florida.",
          features: [
            "Instalaciones Resistentes a Impactos",
            "Conexiones Reforzadas",
            "Materiales Tratados con Presión",
            "Contraventanas y Protección",
            "Reparaciones Post-Tormenta"
          ],
          image: "/hurricane-construction.jpg",
          href: "/es/services/hurricane-construction",
          cta: "Aprender Más"
        },
        {
          title: "Carpintería Sostenible y Especializada",
          description: "Opciones ecológicas y carpintería especializada para proyectos únicos y hogares sostenibles.",
          features: [
            "Proyectos con Madera Recuperada",
            "Abastecimiento de Materiales Sostenibles",
            "Construcción de Muebles Personalizados",
            "Prácticas de Construcción Verde",
            "Carpintería Especializada"
          ],
          image: "/sustainable-carpentry.jpg",
          href: "/es/services/sustainable-carpentry",
          cta: "Aprender Más"
        }
      ],
      whyChoose: {
        title: "¿Por Qué Elegir Carpintería Oak Original?",
        items: [
          {
            icon: Shield,
            title: "Construcción Resistente a Huracanes",
            text: "Construido para resistir las tormentas de Florida"
          },
          {
            icon: Award,
            title: "Artesanía Maestra",
            text: "Habilidades tradicionales con precisión moderna"
          },
          {
            icon: Clock,
            title: "14+ Años de Experiencia",
            text: "Sirviendo a comunidades de Florida"
          },
          {
            icon: Users,
            title: "98% Tasa de Satisfacción",
            text: "Historial comprobado de excelencia"
          }
        ]
      },
      cta: {
        title: "¿Listo para Transformar Tu Espacio?",
        subtitle: "Contáctanos para una consulta y cotización gratuita en tu proyecto de carpintería",
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

      {/* AI Cost Estimator Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {isSpanish ? 'Obtén una Estimación IA Instantánea' : 'Get an Instant AI Estimate'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {isSpanish
                ? 'Usa nuestra herramienta de IA para obtener un rango de costo preciso para tu proyecto de carpintería'
                : 'Use our AI tool to get an accurate cost range for your carpentry project'}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <AICostEstimator locale={locale} />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.map((service, index) => (
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
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link href={service.href}>
                      {service.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t.whyChoose.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whyChoose.items.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center p-6 bg-card rounded-xl border border-border">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              );
            })}
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