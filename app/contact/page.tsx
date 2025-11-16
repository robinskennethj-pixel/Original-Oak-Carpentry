import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import Link from "next/link"
import VoiceChat from "@/components/VoiceChat"

export default function ContactPage() {
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
            <Link href="/contact" className="text-primary font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Ready to start your carpentry project? Get in touch for a free consultation and estimate.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get Free Estimate</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="outdoor">Outdoor Living</SelectItem>
                      <SelectItem value="hurricane">Hurricane Protection</SelectItem>
                      <SelectItem value="restoration">Restoration</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Desired Timeline</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="When do you want to start?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">As soon as possible</SelectItem>
                      <SelectItem value="1month">Within 1 month</SelectItem>
                      <SelectItem value="3months">Within 3 months</SelectItem>
                      <SelectItem value="6months">Within 6 months</SelectItem>
                      <SelectItem value="planning">Just planning ahead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project, including size, materials, and any specific requirements..."
                    rows={4}
                  />
                </div>
                <Button className="w-full" size="lg">
                  Send Message
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  We'll respond within 24 hours with a detailed estimate.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">(555) 123-4567</p>
                  <p className="text-muted-foreground">Available 7 days a week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">info@floridacarpentry.com</p>
                  <p className="text-muted-foreground">We respond within 24 hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    Service Area
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">Throughout Florida</p>
                  <p className="text-muted-foreground">Serving all major cities and counties across the state</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium">Monday - Friday:</span> 7:00 AM - 6:00 PM
                    </p>
                    <p>
                      <span className="font-medium">Saturday:</span> 8:00 AM - 4:00 PM
                    </p>
                    <p>
                      <span className="font-medium">Sunday:</span> Emergency calls only
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    24/7 emergency service available for storm damage
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Chat Section */}
      <section className="py-20 bg-gradient-to-br from-accent/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Talk to Our AI Assistant
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get instant answers about your project using voice commands. Simply click and speak!
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-accent shadow-lg">
              <CardHeader className="bg-accent/5 text-center">
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Voice Chat Assistant
                </CardTitle>
                <p className="text-muted-foreground">
                  Ask about pricing, timelines, materials, or any carpentry questions
                </p>
              </CardHeader>
              <CardContent className="flex justify-center py-8">
                <VoiceChat agent="support" />
              </CardContent>
            </Card>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Try asking:</strong>
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="bg-white/50 p-3 rounded-lg">
                  "How much does a deck cost?"
                </div>
                <div className="bg-white/50 p-3 rounded-lg">
                  "What materials do you recommend?"
                </div>
                <div className="bg-white/50 p-3 rounded-lg">
                  "How long does installation take?"
                </div>
                <div className="bg-white/50 p-3 rounded-lg">
                  "Do you handle hurricane-resistant work?"
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Service */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Emergency Service Available</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Storm damage? Structural emergency? We provide 24/7 emergency carpentry services throughout Florida.
          </p>
          <Button size="lg" variant="destructive">
            Call Emergency Line: (555) 911-HELP
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you provide free estimates?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we provide free, detailed estimates for all projects. We'll visit your location to assess the
                  work and provide a comprehensive quote.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are you licensed and insured?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely. We are fully licensed, bonded, and insured in the state of Florida. We can provide proof
                  of insurance upon request.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long do projects typically take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Project timelines vary based on scope and complexity. Small projects may take 1-3 days, while larger
                  renovations can take several weeks. We'll provide a detailed timeline with your estimate.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you handle permits?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we handle all necessary permits and inspections for your project. We're familiar with local
                  building codes throughout Florida.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Original Oak Carpentry</h3>
              <p className="text-primary-foreground/80">Built Strong. Built Beautiful. Built for Florida.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Finish Carpentry</li>
                <li>Outdoor Living</li>
                <li>Hurricane-Proof Construction</li>
                <li>Commercial Build-Outs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-primary-foreground/80">
                (555) 123-4567
                <br />
                info@floridacarpentry.com
              </p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Original Oak Carpentry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
