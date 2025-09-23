import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Sarah & Mike Johnson",
      location: "Naples, FL",
      project: "Custom Kitchen Renovation",
      rating: 5,
      text: "Exceptional craftsmanship! Our kitchen renovation exceeded all expectations. The team was professional, punctual, and delivered exactly what they promised. The custom cabinets are absolutely beautiful and built to last.",
      image: "/happy-homeowner-couple.png",
    },
    {
      name: "Robert Chen",
      location: "Fort Lauderdale, FL",
      project: "Hurricane-Resistant Deck",
      rating: 5,
      text: "After Hurricane Ian, we needed a deck that could withstand Florida's storms. The team built us a gorgeous composite deck that's both beautiful and incredibly strong. It survived the last storm season without a scratch!",
      image: "/satisfied-homeowner.jpg",
    },
    {
      name: "Maria Rodriguez",
      location: "Miami, FL",
      project: "Outdoor Living Space",
      rating: 5,
      text: "Our backyard transformation is amazing! The pergola and outdoor kitchen have become the heart of our home. Friends and family love gathering here. The quality and attention to detail are outstanding.",
      image: "/happy-homeowner-woman.jpg",
    },
    {
      name: "David & Lisa Thompson",
      location: "Tampa, FL",
      project: "Whole Home Trim Work",
      rating: 5,
      text: "The finish carpentry work throughout our home is flawless. Crown molding, baseboards, and custom built-ins - everything was installed with precision. Our home feels like a luxury showcase now.",
      image: "/satisfied-couple-homeowners.jpg",
    },
    {
      name: "James Wilson",
      location: "Orlando, FL",
      project: "Commercial Restaurant Build-out",
      rating: 5,
      text: "As a restaurant owner, I needed quality work done quickly. The team delivered on time and on budget. The custom millwork and bar area are stunning - our customers constantly compliment the craftsmanship.",
      image: "/business-owner.png",
    },
    {
      name: "Jennifer Martinez",
      location: "St. Petersburg, FL",
      project: "Historic Home Restoration",
      rating: 5,
      text: "Restoring our 1920s home required special expertise. The team matched original millwork perfectly and used period-appropriate techniques. They preserved the character while making it hurricane-ready.",
      image: "/homeowner-historic-house.jpg",
    },
  ]

  const contractorTestimonials = [
    {
      name: "Anderson Construction",
      location: "Southwest Florida",
      text: "We've partnered with this carpentry team on dozens of projects. Their reliability and quality are unmatched. They always deliver on time and exceed client expectations.",
      rating: 5,
    },
    {
      name: "Coastal Builders Group",
      location: "Miami-Dade County",
      text: "The best finish carpenters we've worked with. Their attention to detail and problem-solving skills make every project smoother. Highly recommend for any custom work.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">What Our Clients Say</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Don't just take our word for it. See what homeowners, contractors, and business owners across Florida say
              about our craftsmanship and service.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg font-semibold">4.9/5 Average Rating</span>
              <span className="text-muted-foreground">(127+ Reviews)</span>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Homeowner Reviews</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        <p className="text-sm text-primary font-medium">{testimonial.project}</p>
                      </div>
                    </div>

                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <div className="flex-1">
                      <Quote className="w-6 h-6 text-primary/20 mb-2" />
                      <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contractor Testimonials */}
            <div className="bg-muted/50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Contractor & Builder Reviews</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {contractorTestimonials.map((testimonial, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                        <div className="flex ml-auto">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Emergency Service</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Happy Clients</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the same quality craftsmanship and exceptional service that our clients rave about.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Get Your Free Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
