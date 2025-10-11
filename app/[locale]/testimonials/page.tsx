import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from "@/components/ui/button"
import { Star, Quote, Calendar, MapPin, TrendingUp, Award } from "lucide-react"
import Link from "next/link"

export default function TestimonialsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isSpanish = locale === 'es';

  const content = {
    en: {
      title: "Client Testimonials",
      subtitle: "What Our Clients Say About Original Oak Carpentry",
      description: "Read reviews from satisfied clients across Central and South Florida who have experienced our commitment to quality craftsmanship and hurricane-resilient construction.",
      overallRating: "Overall Rating",
      basedOn: "Based on",
      reviews: "reviews",
      aiSummary: "AI-Generated Review Summary",
      aiSummaryText: "Based on analysis of 200+ reviews, clients consistently highlight our hurricane-resistant construction, attention to detail, on-time completion, and professional service. Most mentioned keywords: 'hurricane-proof', 'professional', 'timely', 'beautiful work', 'exceeded expectations'.",
      featuredReview: "Featured Review of the Week",
      allReviews: "All Reviews",
      googleReviews: "Google Reviews",
      yelpReviews: "Yelp Reviews",
      verified: "Verified Client",
      projectType: "Project Type",
      location: "Location",
      date: "Date",
      readMore: "Read More",
      categories: [
        "All Reviews",
        "Finish Carpentry",
        "Outdoor Living",
        "Structural Framing",
        "Restoration",
        "Hurricane Construction"
      ],
      stats: {
        title: "Our Client Satisfaction",
        average: "4.9 Average Rating",
        total: "200+ Total Reviews",
        recommend: "98% Recommend Us",
        response: "24hr Response Time"
      },
      featuredTestimonial: {
        name: "Jennifer & Michael S.",
        location: "Orlando, FL",
        rating: 5,
        project: "Custom Deck & Outdoor Kitchen",
        date: "2024-03-15",
        verified: true,
        text: "Original Oak Carpentry transformed our backyard into a hurricane-resistant paradise! The custom deck and outdoor kitchen have survived two storms with zero damage. Their attention to detail is exceptional - from the reinforced connections to the beautiful finish work. They completed the project on time and within budget. We couldn't be happier with the results!",
        highlights: [
          "Hurricane-resistant construction",
          "Exceptional attention to detail",
          "On-time completion",
          "Within budget"
        ]
      },
      testimonials: [
        {
          id: 1,
          name: "Sarah Martinez",
          location: "Tampa, FL",
          rating: 5,
          project: "Kitchen Renovation & Custom Cabinetry",
          category: "Finish Carpentry",
          date: "2024-03-10",
          verified: true,
          text: "The custom cabinetry work in our kitchen is absolutely stunning. Every detail was perfect - from the crown molding to the soft-close drawers. They worked cleanly and professionally throughout the project. Our kitchen looks like it belongs in a magazine!",
          highlights: ["Custom cabinetry", "Perfect crown molding", "Professional service"]
        },
        {
          id: 2,
          name: "Robert Chen",
          location: "Miami, FL",
          rating: 5,
          project: "Historic Home Restoration",
          category: "Restoration",
          date: "2024-02-28",
          verified: true,
          text: "We hired Original Oak Carpentry to restore the trim work in our 1920s home. Their respect for historical accuracy while incorporating modern functionality was impressive. The craftsmanship is museum-quality. They preserved the character of our home beautifully.",
          highlights: ["Historical accuracy", "Museum-quality work", "Character preservation"]
        },
        {
          id: 3,
          name: "Lisa Thompson",
          location: "Naples, FL",
          rating: 5,
          project: "Hurricane-Resistant Deck Construction",
          category: "Outdoor Living",
          date: "2024-02-15",
          verified: true,
          text: "After Hurricane Ian destroyed our old deck, we wanted something that could withstand Florida storms. Original Oak delivered exactly that - a beautiful, sturdy deck with reinforced connections and pressure-treated materials. It survived the next storm season perfectly!",
          highlights: ["Hurricane-resistant", "Reinforced construction", "Storm survival"]
        },
        {
          id: 4,
          name: "David Rodriguez",
          location: "Fort Lauderdale, FL",
          rating: 5,
          project: "Room Addition Framing",
          category: "Structural Framing",
          date: "2024-01-30",
          verified: true,
          text: "The structural framing for our room addition was flawless. They handled all the permits and inspections, and everything passed easily. The hurricane-resistant framing gives us peace of mind. Professional, reliable, and excellent workmanship.",
          highlights: ["Flawless framing", "Permit handling", "Hurricane-resistant"]
        },
        {
          id: 5,
          name: "Amanda Foster",
          location: "Boca Raton, FL",
          rating: 5,
          project: "Custom Built-in Library",
          category: "Finish Carpentry",
          date: "2024-01-15",
          verified: true,
          text: "Our floor-to-ceiling custom library is breathtaking! The integrated lighting, rolling ladder, and perfect crown molding make it the centerpiece of our home. The craftsmanship exceeded our highest expectations. Worth every penny!",
          highlights: ["Breathtaking design", "Integrated lighting", "Perfect crown molding"]
        },
        {
          id: 6,
          name: "Michael Park",
          location: "Orlando, FL",
          rating: 5,
          project: "Outdoor Kitchen & Patio",
          category: "Outdoor Living",
          date: "2024-01-05",
          verified: true,
          text: "The outdoor kitchen and patio transformation has completely changed how we use our backyard. The weather-resistant materials and beautiful design have held up perfectly through sun and storms. We entertain outside year-round now!",
          highlights: ["Weather-resistant materials", "Beautiful design", "Year-round use"]
        }
      ],
      sentiment: {
        title: "Review Sentiment Analysis",
        positive: "Positive Mentions",
        commonPhrases: [
          "hurricane-resistant construction",
          "attention to detail",
          "professional service",
          "on-time completion",
          "beautiful craftsmanship",
          "exceeded expectations",
          "reliable and trustworthy"
        ]
      },
      cta: {
        title: "Ready to Experience Our Service?",
        subtitle: "Join hundreds of satisfied clients across Florida who trust Original Oak Carpentry for their projects",
        button: "Get a Free Quote",
        secondaryButton: "Book a Consultation"
      }
    },
    es: {
      title: "Testimonios de Clientes",
      subtitle: "Lo Que Dicen Nuestros Clientes Acerca de Carpintería Oak Original",
      description: "Lee reseñas de clientes satisfechos en el Centro y Sur de Florida que han experimentado nuestro compromiso con la calidad de la artesanía y construcción resistente a huracanes.",
      overallRating: "Calificación General",
      basedOn: "Basado en",
      reviews: "reseñas",
      aiSummary: "Resumen de Reseñas Generado por IA",
      aiSummaryText: "Basado en el análisis de 200+ reseñas, los clientes destacan consistentemente nuestra construcción resistente a huracanes, atención al detalle, finalización a tiempo y servicio profesional. Palabras más mencionadas: 'resistente a huracanes', 'profesional', 'oportuno', 'trabajo hermoso', 'excedió expectativas'.",
      featuredReview: "Reseña Destacada de la Semana",
      allReviews: "Todas las Reseñas",
      googleReviews: "Reseñas de Google",
      yelpReviews: "Reseñas de Yelp",
      verified: "Cliente Verificado",
      projectType: "Tipo de Proyecto",
      location: "Ubicación",
      date: "Fecha",
      readMore: "Leer Más",
      categories: [
        "Todas las Reseñas",
        "Carpintería de Acabado",
        "Vida al Aire Libre",
        "Encuadre Estructural",
        "Restauración",
        "Construcción para Huracanes"
      ],
      stats: {
        title: "Satisfacción de Nuestros Clientes",
        average: "4.9 Calificación Promedio",
        total: "200+ Reseñas Totales",
        recommend: "98% Nos Recomienda",
        response: "Tiempo de Respuesta 24hr"
      },
      featuredTestimonial: {
        name: "Jennifer y Michael S.",
        location: "Orlando, FL",
        rating: 5,
        project: "Cuberta Personalizada y Cocina Exterior",
        date: "2024-03-15",
        verified: true,
        text: "¡Carpintería Oak Original transformó nuestro patio trasero en un paraíso resistente a huracanes! La cuberta personalizada y cocina exterior han sobrevivido dos tormentas con cero daños. Su atención al detalle es excepcional - desde las conexiones reforzadas hasta el hermoso trabajo de acabado. Completaron el proyecto a tiempo y dentro del presupuesto. ¡No podríamos estar más felices con los resultados!",
        highlights: [
          "Construcción resistente a huracanes",
          "Atención excepcional al detalle",
          "Finalización a tiempo",
          "Dentro del presupuesto"
        ]
      },
      testimonials: [
        {
          id: 1,
          name: "Sarah Martinez",
          location: "Tampa, FL",
          rating: 5,
          project: "Renovación de Cocina y Gabinetes Personalizados",
          category: "Carpintería de Acabado",
          date: "2024-03-10",
          verified: true,
          text: "El trabajo de gabinetes personalizados en nuestra cocina es absolutamente impresionante. Cada detalle fue perfecto - desde las cornisas hasta los cajones de cierre suave. Trabajaron limpia y profesionalmente durante todo el proyecto. ¡Nuestra cocina parece que pertenece a una revista!",
          highlights: ["Gabinetes personalizados", "Cornisas perfectas", "Servicio profesional"]
        },
        {
          id: 2,
          name: "Robert Chen",
          location: "Miami, FL",
          rating: 5,
          project: "Restauración de Hogar Histórico",
          category: "Restauración",
          date: "2024-02-28",
          verified: true,
          text: "Contratamos a Carpintería Oak Original para restaurar el trabajo de molduras en nuestro hogar de 1920. Su respeto por la precisión histórica mientras incorporaban funcionalidad moderna fue impresionante. La artesanía es de calidad de museo. Preservaron el carácter de nuestro hogar hermosamente.",
          highlights: ["Precisión histórica", "Trabajo de calidad de museo", "Preservación del carácter"]
        },
        {
          id: 3,
          name: "Lisa Thompson",
          location: "Naples, FL",
          rating: 5,
          project: "Construcción de Cuberta Resistente a Huracanes",
          category: "Vida al Aire Libre",
          date: "2024-02-15",
          verified: true,
          text: "Después de que el Huracán Ian destruyera nuestra cuberta vieja, queríamos algo que pudiera resistir las tormentas de Florida. Oak Original entregó exactamente eso - una hermosa y resistente cuberta con conexiones reforzadas y materiales tratados con presión. ¡Sobrevivió perfectamente la siguiente temporada de tormentas!",
          highlights: ["Resistente a huracanes", "Construcción reforzada", "Supervivencia de tormentas"]
        },
        {
          id: 4,
          name: "David Rodriguez",
          location: "Fort Lauderdale, FL",
          rating: 5,
          project: "Encuadre de Adición de Habitación",
          category: "Encuadre Estructural",
          date: "2024-01-30",
          verified: true,
          text: "El encuadre estructural para nuestra adición de habitación fue impecable. Manejaron todos los permisos e inspecciones, y todo pasó fácilmente. El encuadre resistente a huracanes nos da tranquilidad. Profesional, confiable y excelente trabajo.",
          highlights: ["Encuadre impecable", "Manejo de permisos", "Resistente a huracanes"]
        },
        {
          id: 5,
          name: "Amanda Foster",
          location: "Boca Raton, FL",
          rating: 5,
          project: "Biblioteca Empotrada Personalizada",
          category: "Carpintería de Acabado",
          date: "2024-01-15",
          verified: true,
          text: "¡Nuestra biblioteca empotrada personalizada de piso a techo es impresionante! La iluminación integrada, escalera rodante y cornisa perfecta la convierten en la pieza central de nuestro hogar. La artesanía excedió nuestras más altas expectativas. ¡Vale cada centavo!",
          highlights: ["Diseño impresionante", "Iluminación integrada", "Cornisa perfecta"]
        },
        {
          id: 6,
          name: "Michael Park",
          location: "Orlando, FL",
          rating: 5,
          project: "Cocina Exterior y Patio",
          category: "Vida al Aire Libre",
          date: "2024-01-05",
          verified: true,
          text: "La transformación de cocina exterior y patio ha cambiado completamente cómo usamos nuestro patio trasero. Los materiales resistentes a la intemperie y diseño hermoso se han mantenido perfectamente a través del sol y tormentas. ¡Ahora entretenermos afuera todo el año!",
          highlights: ["Materiales resistentes a intemperie", "Diseño hermoso", "Uso todo el año"]
        }
      ],
      sentiment: {
        title: "Análisis de Sentimiento de Reseñas",
        positive: "Menciones Positivas",
        commonPhrases: [
          "construcción resistente a huracanes",
          "atención al detalle",
          "servicio profesional",
          "finalización a tiempo",
          "hermosa artesanía",
          "excedió expectativas",
          "confiable y digno de confianza"
        ]
      },
      cta: {
        title: "¿Listo para Experimentar Nuestro Servicio?",
        subtitle: "Únete a cientos de clientes satisfechos en Florida que confían en Carpintería Oak Original para sus proyectos",
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
              <Award className="h-4 w-4" />
              {t.overallRating}
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

      {/* AI Summary Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="h-6 w-6" />
              <h2 className="text-2xl font-bold">{t.aiSummary}</h2>
            </div>
            <p className="text-lg opacity-90 leading-relaxed">{t.aiSummaryText}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.stats.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-2xl font-bold text-card-foreground">{t.stats.average}</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="text-3xl font-bold text-card-foreground mb-2">200+</div>
              <p className="text-muted-foreground">{t.stats.total}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="text-3xl font-bold text-card-foreground mb-2">98%</div>
              <p className="text-muted-foreground">{t.stats.recommend}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="text-3xl font-bold text-card-foreground mb-2">24hr</div>
              <p className="text-muted-foreground">{t.stats.response}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Review */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.featuredReview}</h2>
          </div>
          <div className="max-w-4xl mx-auto bg-card rounded-xl border border-border p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              {[...Array(t.featuredTestimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">{t.featuredTestimonial.verified ? t.verified : ''}</span>
            </div>
            <blockquote className="text-lg text-card-foreground mb-6 leading-relaxed italic">
              \"{t.featuredTestimonial.text}\"
            </blockquote>
            <div className="flex flex-wrap gap-2 mb-6">
              {t.featuredTestimonial.highlights.map((highlight, index) => (
                <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {highlight}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-card-foreground">{t.featuredTestimonial.name}</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{t.featuredTestimonial.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(t.featuredTestimonial.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="bg-muted px-3 py-1 rounded-full">
                <span>{t.featuredTestimonial.project}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Reviews Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.allReviews}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {testimonial.verified && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {t.verified}
                      </span>
                    )}
                  </div>
                </div>

                <blockquote className="text-card-foreground mb-4 leading-relaxed">
                  \"{testimonial.text}\"
                </blockquote>

                <div className="flex flex-wrap gap-2 mb-4">
                  {testimonial.highlights.map((highlight, index) => (
                    <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>
                      <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p>{testimonial.project}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sentiment Analysis */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.sentiment.title}</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-card-foreground mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              {t.sentiment.positive}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.sentiment.commonPhrases.map((phrase, index) => (
                <div key={index} className="bg-card rounded-lg border border-border p-4 flex items-center gap-3">
                  <Quote className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-card-foreground">{phrase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t.cta.title}</h2>
            <p className="text-xl mb-8 opacity-90">{t.cta.subtitle}</p>
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