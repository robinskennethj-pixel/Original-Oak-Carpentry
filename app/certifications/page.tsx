"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Shield, CheckCircle, ArrowLeft, Trophy, FileText } from "lucide-react"
import Link from "next/link"

export default function CertificationsPage() {
  const certifications = [
    {
      title: "Florida Licensed Contractor",
      number: "CBC123456",
      issuer: "Florida Department of Business & Professional Regulation",
      status: "Active",
      color: "blue"
    },
    {
      title: "BBB A+ Rating",
      number: "Accredited Business",
      issuer: "Better Business Bureau",
      status: "Verified",
      color: "green"
    },
    {
      title: "OSHA Safety Certified",
      number: "OSHA-30",
      issuer: "Occupational Safety & Health Administration",
      status: "Current",
      color: "orange"
    },
    {
      title: "Hurricane Mitigation Specialist",
      number: "HMS-2024",
      issuer: "Florida Building Commission",
      status: "Certified",
      color: "red"
    },
    {
      title: "Sustainable Building Practices",
      number: "SBP-001",
      issuer: "Green Building Council",
      status: "Certified",
      color: "emerald"
    },
    {
      title: "Master Craftsman Certification",
      number: "MC-FL-2023",
      issuer: "Florida Carpentry Guild",
      status: "Master Level",
      color: "yellow"
    }
  ]

  const awards = [
    {
      year: "2023",
      title: "Best of Orlando - Carpentry Services",
      organization: "Orlando Business Journal"
    },
    {
      year: "2023", 
      title: "Excellence in Hurricane-Resistant Construction",
      organization: "Florida Contractors Association"
    },
    {
      year: "2022",
      title: "Customer Service Excellence Award",
      organization: "Central Florida Chamber of Commerce"
    },
    {
      year: "2022",
      title: "Sustainable Building Practices Recognition",
      organization: "Florida Green Building Coalition"
    }
  ]

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
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Button asChild variant="outline" className="mb-6">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Awards & Certifications</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Recognized for excellence in craftsmanship, safety, and customer service throughout Central Florida.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Professional Certifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team maintains the highest professional standards through continuous education and certification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {certifications.map((cert, index) => (
              <Card key={index} className={`border-2 border-${cert.color}-200 hover:shadow-lg transition-shadow`}>
                <CardHeader className={`bg-${cert.color}-50`}>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className={`h-5 w-5 text-${cert.color}-600`} />
                    {cert.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Certificate Number</p>
                      <p className="font-semibold">{cert.number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Issued By</p>
                      <p className="font-medium">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <div className="flex items-center gap-1">
                        <CheckCircle className={`h-4 w-4 text-${cert.color}-600`} />
                        <span className={`text-sm font-medium text-${cert.color}-700`}>{cert.status}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">0</div>
                <p className="text-sm text-muted-foreground">Safety Incidents</p>
              </CardContent>
            </Card>
          </div>

          {/* Awards Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Awards & Recognition</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're proud to be recognized by industry organizations and our local community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className="border-2 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Trophy className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">{award.year}</span>
                      </div>
                      <h3 className="font-semibold mb-1">{award.title}</h3>
                      <p className="text-sm text-muted-foreground">{award.organization}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance & Bonding */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Insurance & Bonding</h2>
              <p className="text-muted-foreground">
                Your protection is our priority. We maintain comprehensive coverage for your peace of mind.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    General Liability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600 mb-2">$2M</p>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive general liability coverage protecting your property and our work.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Bonded & Licensed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600 mb-2">$100K</p>
                  <p className="text-sm text-muted-foreground">
                    Fully bonded and licensed contractor with the State of Florida.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    Workers' Comp
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-purple-600 mb-2">Full</p>
                  <p className="text-sm text-muted-foreground">
                    Complete workers' compensation coverage for all team members.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Work with Certified Professionals</h2>
          <p className="text-xl mb-8 opacity-90">
            Choose Original Oak Carpentry for licensed, insured, and award-winning craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-yellow-600">
              <Link href="/portfolio">View Our Work</Link>
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