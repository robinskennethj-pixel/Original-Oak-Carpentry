"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Send, Hammer } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function ContactSection() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    projectDetails: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Redirect to thank you page or show success message
        router.push('/thank-you')
      } else {
        alert('There was an error submitting your form. Please try again.')
      }
    } catch (error) {
      alert('There was an error submitting your form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <section id="contact" className="py-20 bg-muted relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full translate-y-40 -translate-x-40"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Let's Create Together
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            Forge Your <span className="text-primary">Vision</span>,<br />
            Craft Your <span className="text-accent">Dream</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Ready to bring your vision to life? Contact us for a free consultation and detailed estimate. 
            Let's discuss how we can forge something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="bg-card border-border hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Hammer className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-card-foreground">Start Your Project</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">First Name *</label>
                  <Input
                  placeholder="John"
                  className="bg-input border-border focus:border-primary"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">Last Name *</label>
                  <Input
                  placeholder="Doe"
                  className="bg-input border-border focus:border-primary"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">Email *</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-input border-border focus:border-primary"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">Phone *</label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="bg-input border-border focus:border-primary"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">Project Type *</label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => handleInputChange('projectType', value)}
                  required
                >
                  <SelectTrigger className="bg-input border-border focus:border-primary">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom-furniture">Custom Furniture</SelectItem>
                    <SelectItem value="weather-proofing">Weather Proofing</SelectItem>
                    <SelectItem value="hurricane-resistant">Hurricane-Resistant Construction</SelectItem>
                    <SelectItem value="outdoor-carpentry">Outdoor Carpentry</SelectItem>
                    <SelectItem value="restoration">Restoration & Repair</SelectItem>
                    <SelectItem value="bespoke-commission">Bespoke Commission</SelectItem>
                    <SelectItem value="architectural-millwork">Architectural Millwork</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">Project Details *</label>
                <Textarea
                  placeholder="Tell us about your vision, timeline, budget, and any specific requirements..."
                  className="bg-input min-h-32 border-border focus:border-primary"
                  value={formData.projectDetails}
                  onChange={(e) => handleInputChange('projectDetails', e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground text-lg">(555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Call for immediate consultation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground text-lg">info@originaloakcarpentry.com</p>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-1">Service Area</h3>
                    <p className="text-muted-foreground text-lg">Metropolitan Area</p>
                    <p className="text-sm text-muted-foreground">50-mile radius from our workshop</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-1">Workshop Hours</h3>
                    <p className="text-muted-foreground">Mon-Fri: 7:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Sat: 8:00 AM - 4:00 PM</p>
                    <p className="text-sm text-muted-foreground">By appointment on weekends</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
