import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, Clock } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background via-muted/20 to-secondary/20 py-20 lg:py-32 overflow-hidden border-b-4 border-primary">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/wood-grain-pattern.svg')] opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full translate-y-40 -translate-x-40"></div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Master Craftsmen Since 2010
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Built Strong. Built Beautiful.<br/>
                Built for Florida.
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                Professional carpentry services combining traditional craftsmanship with modern precision.
                From custom interiors to hurricane-resilient outdoor living, we create lasting beauty that
                stands up to Florida's unique climate and lifestyle.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contact">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/contact">
                  Book a Consultation
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">14+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">300+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <Clock className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/modern-custom-kitchen-with-wooden-cabinets-and-gra-hero section image.jpg"
                alt="Custom carpentry work by Original Oak Carpentry"
                className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl border-2 border-accent/20">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm font-medium">Satisfaction Guaranteed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServicesOverview() {
  return (
    <section id="services-overview" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Our Services
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            Expert Carpentry for Every Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From custom interiors to hurricane-resilient outdoor living, we deliver exceptional craftsmanship
            that enhances your home and withstands Florida's unique challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Finish Carpentry */}
          <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l7-3 7 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Finish Carpentry & Custom Interiors</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Precision finish work that transforms spaces with beautiful wood details and trim.
            </p>
            <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Door & Window Trim
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Crown Molding
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Baseboards & Wainscoting
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/services/finish-carpentry">Learn More</Link>
            </Button>
          </div>

          {/* Outdoor Living */}
          <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Outdoor Living Spaces</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Hurricane-resilient outdoor living that stands up to Florida's climate.
            </p>
            <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Decks & Pergolas
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Hurricane-Resistant Structures
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Outdoor Kitchens
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/services/outdoor-living">Learn More</Link>
            </Button>
          </div>

          {/* Structural Carpentry */}
          <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l7-3 7 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Framing & Structural Carpentry</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Structural framing that meets Florida building codes and withstands storms.
            </p>
            <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                New Construction Framing
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Hurricane-Resistant Framing
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Structural Repairs
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/services/structural-framing">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FeaturedProjects() {
  return (
    <section id="portfolio" className="py-20 bg-muted relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Our Work
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            Built for Florida. Built to Last.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Each project showcases our commitment to quality craftsmanship and Florida's unique building requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">          {/* Project 1 - Custom Kitchen */}
          <div className="bg-card rounded-xl border border-border overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="relative overflow-hidden">
              <img
                src="/modern-custom-kitchen-with-wooden-cabinets-and-gra.jpg"
                alt="Custom kitchen by Original Oak Carpentry"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm font-medium text-accent mb-1">Custom Interiors</div>
                <div className="text-lg font-bold mb-2">Custom Kitchen Renovation</div>
                <div className="text-sm opacity-90">Solid oak cabinetry with precision finish work</div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">
                Complete kitchen transformation with custom oak cabinetry, crown molding, and precision finish work.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/portfolio/custom-kitchen-renovation">View Details</Link>
              </Button>
            </div>
          </div>

          {/* Project 2 - Hurricane-Resistant Deck */}
          <div className="bg-card rounded-xl border border-border overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="relative overflow-hidden">
              <img
                src="/beautiful-wooden-deck-with-pergola-overlooking-wat.jpg"
                alt="Hurricane-resistant deck by Original Oak Carpentry"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm font-medium text-accent mb-1">Outdoor Living</div>
                <div className="text-lg font-bold mb-2">Hurricane-Resistant Deck & Pergola</div>
                <div className="text-sm opacity-90">Built to withstand Florida storms</div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">
                Hurricane-resistant deck with integrated pergola, built with pressure-treated lumber and
                reinforced connections for maximum durability.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/portfolio/hurricane-resistant-deck">View Details</Link>
              </Button>
            </div>
          </div>

          {/* Project 3 - Historic Restoration */}
          <div className="bg-card rounded-xl border border-border overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="relative overflow-hidden">
              <img
                src="/homeowner-historic-house.jpg"
                alt="Historic restoration by Original Oak Carpentry"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm font-medium text-accent mb-1">Restoration</div>
                <div className="text-lg font-bold mb-2">Historic Home Restoration</div>
                <div className="text-sm opacity-90">Preserving Florida's architectural heritage</div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">
                Complete restoration of historic trim work, window restoration, and structural repairs
                while preserving the home's original character.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/portfolio/historic-restoration">View Details</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/portfolio">
              View All Projects
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-36 -translate-y-36"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-48 translate-y-48"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Why Choose Us
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            Florida's Trusted Carpentry Experts
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">          {/* Hurricane-Ready */}
          <div className="text-center p-8 bg-card rounded-xl border border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Hurricane-Ready Construction</h3>
            <p className="text-muted-foreground">
              Built to withstand Florida's storms with reinforced connections and pressure-treated materials.
            </p>
          </div>

          {/* Custom Craftsmanship */}
          <div className="text-center p-8 bg-card rounded-xl border border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Custom Craftsmanship</h3>
            <p className="text-muted-foreground">
              Every piece is handcrafted with attention to detail, using traditional techniques and modern precision.
            </p>
          </div>

          {/* Outdoor Lifestyle */}
          <div className="text-center p-8 bg-card rounded-xl border border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Outdoor Lifestyle</h3>
            <p className="text-muted-foreground">
              Designed for Florida living with decks, pergolas, and outdoor kitchens that extend your living space.
            </p>
          </div>

          {/* Reliable Service */}
          <div className="text-center p-8 bg-card rounded-xl border border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Reliable Service</h3>
            <p className="text-muted-foreground">
              On-time completion, clear communication, and professional service from consultation to completion.
            </p>
          </div>

          {/* Florida Experience */}
          <div className="text-center p-8 bg-card rounded-xl border border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Florida Experience</h3>
            <p className="text-muted-foreground">
              14+ years serving Florida communities with deep understanding of local building codes and climate challenges.
            </p>
          </div>

          {/* Sustainable Practices */}
          <div className="text-center p-8 bg-card rounded-xl border border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Sustainable Practices</h3>
            <p className="text-muted-foreground">
              Eco-friendly materials and reclaimed wood options for environmentally conscious homeowners.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TestimonialSnippet() {
  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Client Testimonials
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-card rounded-xl border border-border p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary font-semibold">JS</span>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground">Jennifer S.</h4>
                <p className="text-sm text-muted-foreground">Orlando, FL</p>
              </div>
            </div>
            <div className="mb-4 flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-muted-foreground italic">
              "Original Oak Carpentry transformed our outdoor space with a beautiful deck that has
              survived multiple hurricanes. Their attention to detail and craftsmanship is exceptional."
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-card rounded-xl border border-border p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary font-semibold">MR</span>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground">Michael R.</h4>
                <p className="text-sm text-muted-foreground">Tampa, FL</p>
              </div>
            </div>
            <div className="mb-4 flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20-20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-muted-foreground italic">
              "The finish carpentry work on our kitchen remodel exceeded our expectations.
              Professional, reliable, and beautiful results."
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-card rounded-xl border border-border p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary font-semibold">SB</span>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground">Sarah B.</h4>
                <p className="text-sm text-muted-foreground">Miami, FL</p>
              </div>
            </div>
            <div className="mb-4 flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-muted-foreground italic">
              "Their restoration work on our historic home was meticulous and respectful.
              They truly understand how to preserve character while adding modern functionality."
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/testimonials">
              Read More Reviews
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60"></div>
      <div className="container mx-auto px-4 relative text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-balance">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your project and create something beautiful together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Link href="/contact">
                Book a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}