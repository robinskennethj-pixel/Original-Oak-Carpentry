import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/wood-grain-pattern.svg')] opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/original-oak-logo.png"
                alt="Original Oak Carpentry Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold">
                <span className="text-accent">Original Oak</span> Carpentry
              </span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Master craftsmen specializing in exceptional carpentry work throughout Florida. From hurricane-resistant construction to custom cabinetry, we build with the strength and beauty of oak. No metal fabrication - pure woodworking excellence.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com/originaloakcarpentry" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity hover:text-accent" />
              </a>
              <a href="https://instagram.com/originaloakcarpentry" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity hover:text-accent" />
              </a>
              <a href="https://linkedin.com/company/originaloakcarpentry" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity hover:text-accent" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-accent">Our Craft</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li>
                <Link href="/services/finish-carpentry" className="hover:opacity-100 hover:text-accent transition-all duration-300">
                  Finish Carpentry & Custom Interiors
                </Link>
              </li>
              <li>
                <Link href="/services/outdoor-living" className="hover:opacity-100 hover:text-accent transition-all duration-300">
                  Outdoor Living Spaces
                </Link>
              </li>
              <li>
                <Link href="/services/restoration" className="hover:opacity-100 hover:text-accent transition-all duration-300">
                  Restoration & Repair
                </Link>
              </li>
              <li>
                <Link href="/services/structural-framing" className="hover:opacity-100 hover:text-accent transition-all duration-300">
                  Structural Framing
                </Link>
              </li>
              <li>
                <Link href="/services/hurricane-resistant" className="hover:opacity-100 hover:text-accent transition-all duration-300">
                  Hurricane-Resistant Construction
                </Link>
              </li>
              <li>
                <Link href="/services/sustainable-carpentry" className="hover:opacity-100 hover:text-accent transition-all duration-300">
                  Sustainable & Specialty Carpentry
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-accent">About Us</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li>
                <Link href="/about" className="hover:opacity-100 hover:text-accent transition-all duration-300">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:opacity-100 hover:text-accent transition-all duration-300">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:opacity-100 hover:text-accent transition-all duration-300">
                  Client Stories
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:opacity-100 hover:text-accent transition-all duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-100 hover:text-accent transition-all duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-accent">Get In Touch</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                info@originaloakcarpentry.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                Metropolitan Area
              </li>
              <li className="pt-2">
                <span className="text-accent font-medium">Licensed & Insured</span>
              </li>
              <li>
                <span className="text-accent font-medium">Free Consultations</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-60 text-center md:text-left">
              &copy; 2024 Original Oak Carpentry. All rights reserved. Master craftsmen licensed, bonded, and insured.
            </p>
            <div className="flex items-center gap-6 text-sm opacity-60">
              <Link href="/privacy" className="hover:opacity-100 hover:text-accent transition-all duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:opacity-100 hover:text-accent transition-all duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
