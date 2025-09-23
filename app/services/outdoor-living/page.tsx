import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Phone, Sun, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function OutdoorLivingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                  Outdoor Living Spaces
                </h1>
                <p className="text-xl text-muted-foreground mb-8 text-pretty">
                  Create your perfect Florida outdoor oasis. From hurricane-resistant decks to custom pergolas, we build
                  outdoor spaces designed for year-round enjoyment and storm resilience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Get Free Quote</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="tel:+1234567890">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/waterfront-deck-with-pergola-overlooking-florida-c.jpg"
                  alt="Waterfront deck with pergola overlooking Florida coast"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Outdoor Living Solutions</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Sun className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">Decks & Patios</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Composite and hardwood decking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Multi-level deck designs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Waterfront and pool decks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Hurricane-rated construction</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">Pergolas & Gazebos</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Custom pergola designs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Screened gazebos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Retractable shade systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Wind-resistant engineering</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Outdoor Kitchens</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Custom cabinetry and counters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Grill stations and bars</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Weather-resistant materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Integrated storage solutions</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Specialty Structures</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Pool houses and cabanas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Outdoor storage sheds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Boat docks and piers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Custom privacy screens</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Florida-Specific Benefits */}
              <div className="bg-muted/50 rounded-lg p-8 mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Built for Florida Living</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Hurricane Resistant</h4>
                    <p className="text-sm text-muted-foreground">
                      Engineered to withstand high winds and severe weather
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sun className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">UV & Moisture Resistant</h4>
                    <p className="text-sm text-muted-foreground">
                      Materials chosen for Florida's intense sun and humidity
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Year-Round Enjoyment</h4>
                    <p className="text-sm text-muted-foreground">
                      Designed for comfortable outdoor living in all seasons
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Create Your Dream Outdoor Space</h3>
                <p className="text-muted-foreground mb-6">
                  Let's design and build the perfect outdoor living area for your Florida lifestyle.
                </p>
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get Started Today
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
