import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Phone, Wrench, AlertTriangle, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RepairRestorationPage() {
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
                  Repair & Restoration Services
                </h1>
                <p className="text-xl text-muted-foreground mb-8 text-pretty">
                  Expert repair and restoration services for storm damage, aging structures, and historic properties. We
                  restore your home's beauty and structural integrity with precision craftsmanship.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Get Repair Quote</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="tel:+1234567890">
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Repairs
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/restored-historic-florida-home-with-original-archi.jpg"
                  alt="Restored historic Florida home with original architecture"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Repair Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Repair Services</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertTriangle className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">Storm Damage Repair</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Hurricane and wind damage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Water damage restoration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Fallen tree damage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Emergency board-up services</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Wrench className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">Structural Repairs</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Foundation and framing issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Sagging floors and ceilings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Load-bearing wall repairs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Joist and beam replacement</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Wood Rot & Termite Damage</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Wood rot assessment and removal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Termite damage restoration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Moisture barrier installation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Preventive treatments</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Historic Restoration</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Period-appropriate materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Original millwork reproduction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Heritage building compliance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Architectural detail restoration</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Emergency Services */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-semibold text-red-800">24/7 Emergency Repair Services</h3>
                </div>
                <p className="text-red-700 mb-4">
                  When disaster strikes, time is critical. Our emergency response team is available around the clock to
                  secure your property and begin immediate repairs to prevent further damage.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Immediate Response Services:</h4>
                    <ul className="text-red-700 space-y-1">
                      <li>• Emergency board-up and tarping</li>
                      <li>• Water extraction and drying</li>
                      <li>• Structural stabilization</li>
                      <li>• Damage assessment and documentation</li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button variant="destructive" size="lg" asChild>
                      <Link href="tel:+1234567890">Emergency Line: (555) 123-4567</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Restoration Process */}
              <div className="bg-muted/50 rounded-lg p-8 mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Our Restoration Process</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      1
                    </div>
                    <h4 className="font-semibold mb-2">Assessment</h4>
                    <p className="text-sm text-muted-foreground">Thorough damage evaluation and documentation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      2
                    </div>
                    <h4 className="font-semibold mb-2">Planning</h4>
                    <p className="text-sm text-muted-foreground">Detailed restoration plan and timeline</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      3
                    </div>
                    <h4 className="font-semibold mb-2">Restoration</h4>
                    <p className="text-sm text-muted-foreground">Expert craftsmanship and quality materials</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      4
                    </div>
                    <h4 className="font-semibold mb-2">Completion</h4>
                    <p className="text-sm text-muted-foreground">Final inspection and warranty coverage</p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Restore Your Home's Beauty and Value</h3>
                <p className="text-muted-foreground mb-6">
                  Whether it's storm damage or aging structures, we'll restore your property to its former glory and
                  beyond.
                </p>
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get Restoration Quote
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
