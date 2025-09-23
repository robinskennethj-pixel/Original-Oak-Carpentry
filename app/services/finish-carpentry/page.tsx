import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FinishCarpentryPage() {
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
                  Finish Carpentry & Custom Interiors
                </h1>
                <p className="text-xl text-muted-foreground mb-8 text-pretty">
                  Transform your Florida home with precision finish carpentry. From custom trim work to built-in
                  cabinetry, we create beautiful interiors that reflect your style and withstand our climate.
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
                  src="/luxury-kitchen-with-custom-cabinets-and-granite-co.jpg"
                  alt="Custom kitchen cabinets and finish carpentry work"
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
              <h2 className="text-3xl font-bold text-center mb-12">Our Finish Carpentry Services</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Custom Trim & Molding</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Crown molding and baseboards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Window and door casings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Wainscoting and chair rails</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Custom millwork design</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Built-in Cabinetry</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Kitchen cabinet installation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Bathroom vanities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Entertainment centers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Custom closet systems</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Doors & Windows</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Interior door installation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Window trim and sills</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Pocket door systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>French door installation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Specialty Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Coffered ceilings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Built-in bookshelves</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Fireplace mantels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Custom staircases</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Why Choose Us */}
              <div className="bg-muted/50 rounded-lg p-8 mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Why Choose Our Finish Carpentry?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Precision Craftsmanship</h4>
                    <p className="text-sm text-muted-foreground">
                      Meticulous attention to detail in every joint, cut, and finish
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Climate-Resistant Materials</h4>
                    <p className="text-sm text-muted-foreground">
                      Materials selected for Florida's humidity and temperature changes
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Custom Design</h4>
                    <p className="text-sm text-muted-foreground">
                      Tailored solutions that match your home's architecture and style
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Interior?</h3>
                <p className="text-muted-foreground mb-6">
                  Get a free consultation and quote for your finish carpentry project.
                </p>
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Start Your Project
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
