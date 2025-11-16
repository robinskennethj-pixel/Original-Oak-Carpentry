import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, AlertTriangle, Shield, ArrowLeft, Thermometer, Wind, Droplets } from "lucide-react"
import Link from "next/link"

export default function WeatherAlertsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            <span className="text-primary">Original Oak</span> Carpentry
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
              Portfolio
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Button asChild variant="outline" className="mb-6">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Weather & Storm Alerts</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Stay informed with real-time weather updates and hurricane preparedness information for Central Florida.
            </p>
          </div>
        </div>
      </section>

      {/* Current Weather */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-orange-200 shadow-xl mb-12">
              <CardHeader className="bg-orange-50">
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-orange-600" />
                  Current Weather - Central Florida
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-4xl font-bold">75°F</p>
                        <p className="text-lg text-muted-foreground">Partly Cloudy</p>
                      </div>
                      <Cloud className="h-16 w-16 text-orange-400" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-red-500" />
                          <span className="text-sm">Feels Like</span>
                        </div>
                        <span className="font-medium">78°F</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Humidity</span>
                        </div>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Wind className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">Wind</span>
                        </div>
                        <span className="font-medium">8 mph E</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <span className="font-semibold text-orange-800">Hurricane Season Alert</span>
                    </div>
                    <p className="text-sm text-orange-700 mb-4">
                      Hurricane season is active (June 1 - November 30). Now is the perfect time to prepare your home with storm-resistant upgrades.
                    </p>
                    <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700">
                      <Link href="/services/hurricane-resistant">Get Storm Protection</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Storm Preparation Tips */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Storm Preparation Checklist</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Hurricane-Resistant Decking",
                    description: "Upgrade to composite materials and reinforced framing for maximum storm protection.",
                    icon: Shield,
                    color: "orange"
                  },
                  {
                    title: "Window & Door Protection", 
                    description: "Install hurricane shutters or impact-resistant windows and doors.",
                    icon: Shield,
                    color: "blue"
                  },
                  {
                    title: "Regular Maintenance",
                    description: "Schedule annual inspections to ensure your home is storm-ready.",
                    icon: Shield,
                    color: "green"
                  },
                  {
                    title: "Emergency Repairs",
                    description: "24/7 emergency repair services for post-storm damage assessment.",
                    icon: AlertTriangle,
                    color: "red"
                  },
                  {
                    title: "Structural Reinforcement",
                    description: "Strengthen your home's structure with hurricane-rated materials.",
                    icon: Shield,
                    color: "purple"
                  },
                  {
                    title: "Insurance Documentation",
                    description: "Proper documentation and certified work for insurance claims.",
                    icon: Shield,
                    color: "indigo"
                  }
                ].map((tip, index) => (
                  <Card key={index} className={`border-l-4 border-l-${tip.color}-500 hover:shadow-lg transition-shadow`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <tip.icon className={`h-5 w-5 text-${tip.color}-600`} />
                        <h3 className="font-semibold">{tip.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <Card className="border-2 border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Storm Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 mb-4">
                  When disaster strikes, time is critical. Our emergency response team is available 24/7 to secure your property and begin immediate repairs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-red-600 hover:bg-red-700">
                    <Link href="tel:+14075550123">Emergency Line: (407) 555-0123</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                    <Link href="/contact">Schedule Inspection</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Wait for the Storm</h2>
          <p className="text-xl mb-8 opacity-90">
            Protect your home and family with professional hurricane-resistant upgrades and maintenance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/services/hurricane-resistant">Get Storm Protection</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              <Link href="/contact">Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/portfolio" className="hover:text-foreground">Portfolio</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
