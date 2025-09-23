import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Phone, Shield, AlertTriangle, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HurricaneResistantPage() {
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
                  Hurricane-Resistant Construction
                </h1>
                <p className="text-xl text-muted-foreground mb-8 text-pretty">
                  Protect your Florida home with storm-resistant construction and upgrades. Our hurricane-proof
                  solutions meet and exceed Florida Building Code requirements for maximum safety and peace of mind.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Get Storm Assessment</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="tel:+1234567890">
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Service
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/hurricane-shutters-installed-on-florida-home-windo.jpg"
                  alt="Hurricane shutters installed on Florida home windows"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Hurricane Protection Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Storm Protection Solutions</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">Hurricane Shutters</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Impact-rated storm shutters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Roll-down and accordion systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Colonial and Bahama shutters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Custom-fit installations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Home className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">Structural Reinforcement</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Hurricane straps and clips</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Reinforced roof connections</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Impact-resistant doors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Wind-resistant framing</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Safe Rooms & Storm Shelters</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>FEMA-compliant safe rooms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Reinforced concrete construction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Underground storm shelters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Multi-purpose room designs</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Flood-Resistant Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Elevated construction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Flood vents and openings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Water-resistant materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Breakaway wall systems</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Florida Building Code Compliance */}
              <div className="bg-muted/50 rounded-lg p-8 mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Florida Building Code Compliance</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Wind Load Requirements</h4>
                    <p className="text-sm text-muted-foreground">Meets 150+ mph wind resistance standards</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Impact Resistance</h4>
                    <p className="text-sm text-muted-foreground">Large and small missile impact protection</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Certified Installation</h4>
                    <p className="text-sm text-muted-foreground">Licensed contractors with code expertise</p>
                  </div>
                </div>
              </div>

              {/* Emergency Services */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-semibold text-red-800">24/7 Emergency Storm Services</h3>
                </div>
                <p className="text-red-700 mb-4">
                  When storms hit, we're here to help. Our emergency response team provides immediate storm damage
                  assessment, temporary repairs, and emergency boarding services.
                </p>
                <Button variant="destructive" asChild>
                  <Link href="tel:+1234567890">Call Emergency Line: (555) 123-4567</Link>
                </Button>
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Protect Your Home Before the Next Storm</h3>
                <p className="text-muted-foreground mb-6">
                  Don't wait for hurricane season. Get a free storm assessment and quote for hurricane-resistant
                  upgrades.
                </p>
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Schedule Assessment
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
