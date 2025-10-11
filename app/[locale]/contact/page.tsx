import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  MessageCircle,
  Star
} from "lucide-react"
import Link from "next/link"

export default function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isSpanish = locale === 'es';

  const content = {
    en: {
      title: "Contact Original Oak Carpentry",
      subtitle: "Let's Discuss Your Project",
      description: "Ready to transform your space? Get in touch with Florida's trusted carpentry experts for a free consultation and quote.",
      getInTouch: "Get in Touch",
      businessHours: "Business Hours",
      schedule: "Schedule a Consultation",
      form: {
        title: "Send us a Message",
        subtitle: "Fill out the form below and we'll get back to you within 24 hours",
        fields: {
          name: "Full Name",
          email: "Email Address",
          phone: "Phone Number",
          projectType: "Project Type",
          location: "Location (City/County)",
          budget: "Budget Range",
          timeline: "Timeline",
          message: "Project Details",
          messagePlaceholder: "Tell us about your project, specific requirements, or any questions you have..."
        },
        projectTypes: [
          "Finish Carpentry & Trim Work",
          "Custom Cabinetry",
          "Outdoor Living Spaces",
          "Deck & Pergola Construction",
          "Structural Framing",
          "Room Additions",
          "Historic Restoration",
          "Hurricane-Resistant Construction",
          "General Carpentry",
          "Other"
        ],
        budgetRanges: [
          "Under $5,000",
          "$5,000 - $10,000",
          "$10,000 - $25,000",
          "$25,000 - $50,000",
          "$50,000 - $100,000",
          "Over $100,000",
          "Prefer not to say"
        ],
        timelines: [
          "As soon as possible",
          "Within 1 month",
          "Within 3 months",
          "Within 6 months",
          "Planning ahead (6+ months)",
          "Flexible"
        ],
        submit: "Send Message",
        processing: "Sending..."
      },
      contactInfo: {
        title: "Contact Information",
        phone: {
          title: "Phone",
          number: "(407) 555-0123",
          hours: "Mon-Fri 8AM-6PM, Sat 9AM-2PM"
        },
        email: {
          title: "Email",
          address: "info@originaloakcarpentry.com",
          response: "Usually responds within 2 hours"
        },
        address: {
          title: "Service Area",
          line1: "Based in Orlando, FL",
          line2: "Serving Central & South Florida"
        },
        serviceArea: [
          "Orange County",
          "Osceola County",
          "Seminole County",
          "Hillsborough County",
          "Pinellas County",
          "Miami-Dade County",
          "Broward County",
          "Palm Beach County"
        ]
      },
      consultation: {
        title: "Free Consultation",
        subtitle: "Book a no-obligation consultation to discuss your project",
        benefits: [
          "Free on-site assessment",
          "Detailed project quote",
          "Material recommendations",
          "Timeline planning",
          "Permit guidance"
        ],
        button: "Book Consultation",
        secondaryButton: "Request Call Back"
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            question: "Do you offer free estimates?",
            answer: "Yes, we provide free estimates and consultations for all projects. We'll visit your property, assess the work needed, and provide a detailed quote."
          },
          {
            question: "Are you licensed and insured?",
            answer: "Absolutely. We are fully licensed and insured in Florida, with all necessary certifications for structural and finish carpentry work."
          },
          {
            question: "How long does a typical project take?",
            answer: "Project timelines vary based on scope and complexity. Finish carpentry typically takes 1-3 days, while larger projects like decks or room additions may take 1-3 weeks. We'll provide a detailed timeline during your consultation."
          },
          {
            question: "Do you handle permits?",
            answer: "Yes, we handle all necessary permits for structural work, room additions, and major renovations. We ensure all work meets Florida building codes and hurricane requirements."
          }
        ]
      },
      cta: {
        title: "Ready to Get Started?",
        subtitle: "Transform your Florida home with expert craftsmanship that lasts",
        button: "Get Your Free Quote Today"
      }
    },
    es: {
      title: "Contactar Carpintería Oak Original",
      subtitle: "Discutamos Tu Proyecto",
      description: "¿Listo para transformar tu espacio? Ponte en contacto con los expertos en carpintería de Florida para una consulta y cotización gratuitas.",
      getInTouch: "Ponte en Contacto",
      businessHours: "Horario de Negocios",
      schedule: "Programar una Consulta",
      form: {
        title: "Envíanos un Mensaje",
        subtitle: "Completa el formulario a continuación y te responderemos dentro de 24 horas",
        fields: {
          name: "Nombre Completo",
          email: "Correo Electrónico",
          phone: "Número de Teléfono",
          projectType: "Tipo de Proyecto",
          location: "Ubicación (Ciudad/Condado)",
          budget: "Rango de Presupuesto",
          timeline: "Cronograma",
          message: "Detalles del Proyecto",
          messagePlaceholder: "Cuéntanos sobre tu proyecto, requisitos específicos o cualquier pregunta que tengas..."
        },
        projectTypes: [
          "Carpintería de Acabado y Molduras",
          "Gabinetes Personalizados",
          "Espacios de Vida al Aire Libre",
          "Construcción de Cubiertas y Pérgolas",
          "Encuadre Estructural",
          "Adiciones de Habitaciones",
          "Restauración Histórica",
          "Construcción Resistente a Huracanes",
          "Carpintería General",
          "Otro"
        ],
        budgetRanges: [
          "Menos de $5,000",
          "$5,000 - $10,000",
          "$10,000 - $25,000",
          "$25,000 - $50,000",
          "$50,000 - $100,000",
          "Más de $100,000",
          "Prefiero no decir"
        ],
        timelines: [
          "Lo antes posible",
          "Dentro de 1 mes",
          "Dentro de 3 meses",
          "Dentro de 6 meses",
          "Planeando con anticipación (6+ meses)",
          "Flexible"
        ],
        submit: "Enviar Mensaje",
        processing: "Enviando..."
      },
      contactInfo: {
        title: "Información de Contacto",
        phone: {
          title: "Teléfono",
          number: "(407) 555-0123",
          hours: "Lun-Vie 8AM-6PM, Sáb 9AM-2PM"
        },
        email: {
          title: "Correo Electrónico",
          address: "info@originaloakcarpentry.com",
          response: "Generalmente responde dentro de 2 horas"
        },
        address: {
          title: "Área de Servicio",
          line1: "Con sede en Orlando, FL",
          line2: "Sirviendo el Centro y Sur de Florida"
        },
        serviceArea: [
          "Condado de Orange",
          "Condado de Osceola",
          "Condado de Seminole",
          "Condado de Hillsborough",
          "Condado de Pinellas",
          "Condado de Miami-Dade",
          "Condado de Broward",
          "Condado de Palm Beach"
        ]
      },
      consultation: {
        title: "Consulta Gratis",
        subtitle: "Reserva una consulta sin compromiso para discutir tu proyecto",
        benefits: [
          "Evaluación gratuita en el sitio",
          "Cotización detallada del proyecto",
          "Recomendaciones de materiales",
          "Planificación de cronograma",
          "Guía de permisos"
        ],
        button: "Reservar Consulta",
        secondaryButton: "Solicitar Devolución de Llamada"
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          {
            question: "¿Ofrecen estimaciones gratuitas?",
            answer: "Sí, proporcionamos estimaciones y consultas gratuitas para todos los proyectos. Visitaremos tu propiedad, evaluaremos el trabajo necesario y proporcionaremos una cotización detallada."
          },
          {
            question: "¿Están licenciados y asegurados?",
            answer: "Absolutamente. Estamos completamente licenciados y asegurados en Florida, con todas las certificaciones necesarias para trabajo de carpintería estructural y de acabado."
          },
          {
            question: "¿Cuánto tiempo toma un proyecto típico?",
            answer: "Los cronogramas de proyectos varían según el alcance y complejidad. La carpintería de acabado típicamente toma 1-3 días, mientras que proyectos más grandes como cubiertas o adiciones de habitaciones pueden tomar 1-3 semanas. Proporcionaremos un cronograma detallado durante tu consulta."
          },
          {
            question: "¿Manejan permisos?",
            answer: "Sí, manejamos todos los permisos necesarios para trabajo estructural, adiciones de habitaciones y renovaciones mayores. Nos aseguramos de que todo el trabajo cumpla con los códigos de construcción de Florida y requisitos de huracanes."
          }
        ]
      },
      cta: {
        title: "¿Listo para Comenzar?",
        subtitle: "Transforma tu hogar en Florida con arteanería experta que perdura",
        button: "Obtén Tu Cotización Gratis Hoy"
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
              <MessageCircle className="h-4 w-4" />
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

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">{t.form.title}</CardTitle>
                  <CardDescription>{t.form.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t.form.fields.name}</Label>
                        <Input id="name" name="name" required />
                      </div>
                      <div>
                        <Label htmlFor="email">{t.form.fields.email}</Label>
                        <Input id="email" name="email" type="email" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">{t.form.fields.phone}</Label>
                        <Input id="phone" name="phone" type="tel" />
                      </div>
                      <div>
                        <Label htmlFor="projectType">{t.form.fields.projectType}</Label>
                        <select id="projectType" name="projectType" className="w-full px-3 py-2 border border-border rounded-md bg-background">
                          <option value="">Select project type...</option>
                          {t.form.projectTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">{t.form.fields.location}</Label>
                        <Input id="location" name="location" placeholder="e.g., Orlando, Orange County" />
                      </div>
                      <div>
                        <Label htmlFor="budget">{t.form.fields.budget}</Label>
                        <select id="budget" name="budget" className="w-full px-3 py-2 border border-border rounded-md bg-background">
                          <option value="">Select budget range...</option>
                          {t.form.budgetRanges.map((range, index) => (
                            <option key={index} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="timeline">{t.form.fields.timeline}</Label>
                      <select id="timeline" name="timeline" className="w-full px-3 py-2 border border-border rounded-md bg-background">
                        <option value="">Select timeline...</option>
                        {t.form.timelines.map((timeline, index) => (
                          <option key={index} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message">{t.form.fields.message}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t.form.fields.messagePlaceholder}
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      {t.form.submit}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Consultation */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>{t.contactInfo.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{t.contactInfo.phone.title}</p>
                      <p className="text-lg font-medium text-primary">{t.contactInfo.phone.number}</p>
                      <p className="text-sm text-muted-foreground">{t.contactInfo.phone.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{t.contactInfo.email.title}</p>
                      <p className="text-lg font-medium text-primary">{t.contactInfo.email.address}</p>
                      <p className="text-sm text-muted-foreground">{t.contactInfo.email.response}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{t.contactInfo.address.title}</p>
                      <p className="text-muted-foreground">{t.contactInfo.address.line1}</p>
                      <p className="text-muted-foreground">{t.contactInfo.address.line2}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{t.businessHours}</p>
                      <p className="text-muted-foreground">{t.contactInfo.phone.hours}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold mb-2">Service Areas:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {t.contactInfo.serviceArea.map((area, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          <span className="text-muted-foreground">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Consultation Booking */}
              <Card className="border-border bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {t.consultation.title}
                  </CardTitle>
                  <CardDescription className="text-primary-foreground/80">{t.consultation.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {t.consultation.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Star className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-primary-foreground/20">
                    <Button
                      className="bg-white text-primary hover:bg-gray-100"
                      onClick={() => {
                        // Open Calendly booking widget
                        if (typeof window !== 'undefined' && (window as any).Calendly) {
                          (window as any).Calendly.initPopupWidget({
                            url: 'https://calendly.com/originaloakcarpentry/consultation'
                          });
                        }
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      {t.consultation.button}
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                      {t.consultation.secondaryButton}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.faq.title}</h2>
            </div>
            <div className="space-y-6">
              {t.faq.items.map((item, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
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
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/contact">
                {t.cta.button}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Calendly Widget Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(C,a,l,e,n,d,l,y){
              C[l]=C[l]||function(){(C[l].q=C[l].q||[]).push(arguments)};
              C[l].l=+new Date;
              n=a.createElement(e);
              d=a.getElementsByTagName(e)[0];
              n.async=1;
              n.src="https://calendly.com/assets/external/widget.js";
              d.parentNode.insertBefore(n,d);
            })(window,document,"Calendly","script");
          `
        }}
      />

      <Footer />
    </div>
  )
}