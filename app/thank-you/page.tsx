import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Thank You for Your Message
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            We've received your project inquiry and will respond within 24 hours.
          </p>
          <p className="text-muted-foreground">
            We look forward to discussing your vision and bringing it to life with the strength and spirit of Ogun.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full bg-primary hover:bg-primary/90">
            <Link href="/">
              Return to Homepage
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/portfolio">
              View Our Portfolio
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Need immediate assistance? Call us at <span className="text-primary font-medium">(555) 123-4567</span>
          </p>
        </div>
      </div>
    </div>
  )
}