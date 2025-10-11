import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from "@/components/ui/button"
import { ArrowRight, Filter, Search, Star, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export default function PortfolioPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isSpanish = locale === 'es';

  const content = {
    en: {
      title: "Our Portfolio",
      subtitle: "Built Strong. Built Beautiful. Built for Florida.",
      description: "Explore our collection of custom carpentry projects showcasing craftsmanship that stands up to Florida's unique climate while enhancing homes across Central and South Florida.",
      filterBy: "Filter by Service",
      search: "Search projects...",
      viewProject: "View Project",
      viewAll: "View All Projects",
      categories: [
        "All Projects",
        "Finish Carpentry",
        "Outdoor Living",
        "Structural Framing",
        "Restoration",
        "Hurricane Construction",
        "Commercial"
      ],
      projects: [
        {
          id: 1,
          title: "Custom Kitchen Renovation",
          category: "Finish Carpentry",
          location: "Orlando, FL",
          description: "Complete kitchen transformation with custom oak cabinetry, crown molding, and premium finishes",
          image: "/modern-custom-kitchen-with-wooden-cabinets-and-gra.jpg",
          rating: 5,
          date: "2024-03-15",
          features: [
            "Custom oak cabinetry",
            "Crown molding installation",
            "Premium hardware",
            "Soft-close drawers",
            "Under-cabinet lighting"
          ],
          testimonial: "The custom cabinetry transformed our kitchen completely. The craftsmanship is exceptional!",
          client: "Sarah M."
        },
        {
          id: 2,
          title: "Hurricane-Resistant Deck & Pergola",
          category: "Outdoor Living",
          location: "Tampa, FL",
          description: "Hurricane-resistant deck with integrated pergola, built with pressure-treated lumber and reinforced connections",
          image: "/beautiful-wooden-deck-with-pergola-overlooking-wat.jpg",
          rating: 5,
          date: "2024-02-28",
          features: [
            "Pressure-treated lumber",
            "Reinforced connections",
            "Hurricane-resistant design",
            "Integrated lighting",
            "Custom pergola"
          ],
          testimonial: "Survived Hurricane Ian with no damage. Professional work that delivers on its promises.",
          client: "Michael R."
        },
        {
          id: 3,
          title: "Historic Home Restoration",
          category: "Restoration",
          location: "Miami, FL",
          description: "Complete restoration of historic trim work, window restoration, and structural repairs",
          image: "/homeowner-historic-house.jpg",
          rating: 5,
          date: "2024-01-20",
          features: [
            "Historic trim restoration",
            "Window repair and restoration",
            "Structural repairs",
            "Period-appropriate materials",
            "Heritage preservation"
          ],
          testimonial: "Meticulous restoration work that preserved our home's character while adding modern functionality.",
          client: "Robert & Lisa K."
        },
        {
          id: 4,
          title: "Custom Outdoor Kitchen",
          category: "Outdoor Living",
          location: "Naples, FL",
          description: "Complete outdoor kitchen with custom cabinetry, weather-resistant materials, and premium appliances",
          image: "/outdoor-kitchen-custom-cabinets.jpg",
          rating: 5,
          date: "2024-01-10",
          features: [
            "Weather-resistant cabinetry",
            "Premium appliances",
            "Granite countertops",
            "Custom lighting",
            "Hurricane-rated construction"
          ],
          testimonial: "Our outdoor kitchen is now the heart of our home. Exceptional quality and design!",
          client: "Jennifer & David L."
        },
        {
          id: 5,
          title: "Structural Framing Addition",
          category: "Structural Framing",
          location: "Fort Lauderdale, FL",
          description: "Room addition with hurricane-resistant framing meeting Florida building codes",
          image: "/structural-framing-addition.jpg",
          rating: 5,
          date: "2023-12-15",
          features: [
            "Hurricane-resistant framing",
            "Florida building code compliance",
            "Reinforced connections",
            "Pressure-treated materials",
            "Structural engineering"
          ],
          testimonial: "Professional framing work that passed inspection with flying colors. Highly recommended!",
          client: "Corporate Office Park"
        },
        {
          id: 6,
          title: "Custom Built-in Library",
          category: "Finish Carpentry",
          location: "Boca Raton, FL",
          description: "Floor-to-ceiling custom library with integrated lighting and rolling ladder",
          image: "/custom-built-in-library.jpg",
          rating: 5,
          date: "2023-11-30",
          features: [
            "Floor-to-ceiling design",
            "Integrated LED lighting",
            "Rolling library ladder",
            "Custom crown molding",
            "Premium wood selection"
          ],
          testimonial: "Our home library is absolutely stunning. The craftsmanship exceeded all expectations.",
          client: "Dr. Patricia W."
        }
      ],
      stats: {
        title: "Our Track Record",
        projects: "300+ Projects Completed",
        satisfaction: "98% Client Satisfaction",
        experience: "14+ Years Experience",
        counties: "5 Florida Counties Served"
      },
      cta: {
        title: "Ready to Start Your Project?",
        subtitle: "Let's create something beautiful together that will enhance your Florida home for years to come",
        button: "Get a Free Quote",
        secondaryButton: "Book a Consultation"
      }
    },
    es: {
      title: "Nuestro Portafolio",
      subtitle: "Construido Fuerte. Construido Hermoso. Construido para Florida.",
      description: "Explora nuestra colección de proyectos de carpintería personalizados que muestran artesanía que resiste el clima único de Florida mientras mejora hogares en el Centro y Sur de Florida.",
      filterBy: "Filtrar por Servicio",
      search: "Buscar proyectos...",
      viewProject: "Ver Proyecto",
      viewAll: "Ver Todos los Proyectos",
      categories: [
        "Todos los Proyectos",
        "Carpintería de Acabado",
        "Vida al Aire Libre",
        "Encuadre Estructural",
        "Restauración",
        "Construcción para Huracanes",
        "Comercial"
      ],
      projects: [
        {
          id: 1,
          title: "Renovación de Cocina Personalizada",
          category: "Carpintería de Acabado",
          location: "Orlando, FL",
          description: "Transformación completa de cocina con gabinetes de roble personalizados, cornisas y acabados premium",
          image: "/modern-custom-kitchen-with-wooden-cabinets-and-gra.jpg",
          rating: 5,
          date: "2024-03-15",
          features: [
            "Gabinetes de roble personalizados",
            "Instalación de cornisas",
            "Herrajes premium",
            "Cajones de cierre suave",
            "Iluminación debajo de gabinetes"
          ],
          testimonial: "Los gabinetes personalizados transformaron nuestra cocina por completo. ¡La artesanía es excepcional!",
          client: "Sarah M."
        },
        {
          id: 2,
          title: "Cuberta y Pérgola Resistentes a Huracanes",
          category: "Vida al Aire Libre",
          location: "Tampa, FL",
          description: "Cuberta resistente a huracanes con pérgola integrada, construida con madera tratada con presión y conexiones reforzadas",
          image: "/beautiful-wooden-deck-with-pergola-overlooking-wat.jpg",
          rating: 5,
          date: "2024-02-28",
          features: [
            "Madera tratada con presión",
            "Conexiones reforzadas",
            "Diseño resistente a huracanes",
            "Iluminación integrada",
            "Pérgola personalizada"
          ],
          testimonial: "Sobrevivió al Huracán Ian sin daños. Trabajo profesional que cumple sus promesas.",
          client: "Michael R."
        },
        {
          id: 3,
          title: "Restauración de Hogar Histórico",
          category: "Restauración",
          location: "Miami, FL",
          description: "Restauración completa de trabajo de molduras históricas, restauración de ventanas y reparaciones estructurales",
          image: "/homeowner-historic-house.jpg",
          rating: 5,
          date: "2024-01-20",
          features: [
            "Restauración de molduras históricas",
            "Reparación y restauración de ventanas",
            "Reparaciones estructurales",
            "Materiales apropiados para el período",
            "Preservación del patrimonio"
          ],
          testimonial: "Trabajo de restauración meticuloso que preservó el carácter de nuestro hogar mientras agregaba funcionalidad moderna.",
          client: "Robert y Lisa K."
        },
        {
          id: 4,
          title: "Cocina Exterior Personalizada",
          category: "Vida al Aire Libre",
          location: "Naples, FL",
          description: "Cocina exterior completa con gabinetes personalizados, materiales resistentes a la intemperie y electrodomésticos premium",
          image: "/outdoor-kitchen-custom-cabinets.jpg",
          rating: 5,
          date: "2024-01-10",
          features: [
            "Gabinetes resistentes a la intemperie",
            "Electrodomésticos premium",
            "Encimeras de granito",
            "Iluminación personalizada",
            "Construcción clasificada para huracanes"
          ],
          testimonial: "Nuestra cocina exterior es ahora el corazón de nuestro hogar. ¡Calidad y diseño excepcionales!",
          client: "Jennifer y David L."
        },
        {
          id: 5,
          title: "Adición de Encuadre Estructural",
          category: "Encuadre Estructural",
          location: "Fort Lauderdale, FL",
          description: "Adición de habitación con encuadre resistente a huracanes cumpliendo códigos de construcción de Florida",
          image: "/structural-framing-addition.jpg",
          rating: 5,
          date: "2023-12-15",
          features: [
            "Encuadre resistente a huracanes",
            "Cumplimiento de códigos de construcción de Florida",
            "Conexiones reforzadas",
            "Materiales tratados con presión",
            "Ingeniería estructural"
          ],
          testimonial: "Trabajo de encuadre profesional que pasó la inspección con flying colors. ¡Altamente recomendado!",
          client: "Parque de Oficinas Corporativo"
        },
        {
          id: 6,
          title: "Biblioteca Empotrada Personalizada",
          category: "Carpintería de Acabado",
          location: "Boca Raton, FL",
          description: "Biblioteca personalizada de piso a techo con iluminación integrada y escalera rodante",
          image: "/custom-built-in-library.jpg",
          rating: 5,
          date: "2023-11-30",
          features: [
            "Diseño de piso a techo",
            "Iluminación LED integrada",
            "Escalera de biblioteca rodante",
            "Moldura de cornisa personalizada",
            "Selección de madera premium"
          ],
          testimonial: "Nuestra biblioteca de hogar es absolutamente impresionante. La artesanía excedió todas las expectativas.",
          client: "Dra. Patricia W."
        }
      ],
      stats: {
        title: "Nuestro Historial",
        projects: "300+ Proyectos Completados",
        satisfaction: "98% Satisfacción del Cliente",
        experience: "14+ Años de Experiencia",
        counties: "5 Condados de Florida Servidos"
      },
      cta: {
        title: "¿Listo para Comenzar Tu Proyecto?",
        subtitle: "Creemos algo hermoso juntos que mejorará tu hogar en Florida por años venideros",
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

      {/* Filter Section */}
      <section className="py-12 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{t.filterBy}:</span>
              <select className="px-4 py-2 border border-border rounded-lg bg-background">
                {t.categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Search className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.search}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.projects.map((project) => (
              <div key={project.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1">
                    {[...Array(project.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <div className="flex items-center gap-2 text-sm opacity-90">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(project.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-card-foreground mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-muted rounded-lg p-4 mb-4">
                    <p className="text-muted-foreground italic mb-2">{project.testimonial}</p>
                    <p className="text-sm text-muted-foreground font-medium">- {project.client}</p>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/portfolio/${project.id}`}>
                      {t.viewProject}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t.stats.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">300+</div>
              <p className="opacity-90">{t.stats.projects}</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <p className="opacity-90">{t.stats.satisfaction}</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">14+</div>
              <p className="opacity-90">{t.stats.experience}</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5</div>
              <p className="opacity-90">{t.stats.counties}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.cta.title}</h2>
            <p className="text-xl text-muted-foreground mb-8">{t.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contact">
                  {t.cta.button}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
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