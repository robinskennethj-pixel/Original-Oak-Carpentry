import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const faqs = [
    {
      question: "Do you offer free estimates?",
      answer:
        "Yes! We provide free, detailed estimates for all projects. Our team will visit your property, assess your needs, and provide a comprehensive quote with no obligation. We believe in transparent pricing and will explain every aspect of your project costs.",
    },
    {
      question: "How long does a typical deck installation take?",
      answer:
        "Deck installation timelines vary based on size and complexity. A standard 12x16 deck typically takes 3-5 days, while larger or multi-level decks may take 1-2 weeks. We'll provide a detailed timeline during your consultation and keep you updated throughout the project.",
    },
    {
      question: "What hurricane-resilient upgrades do you offer?",
      answer:
        "We specialize in hurricane-resistant construction including impact-rated windows and doors, reinforced framing, hurricane straps and clips, storm shutters, and elevated construction for flood-prone areas. All work meets or exceeds Florida Building Code requirements.",
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "Absolutely. We are fully licensed, bonded, and insured in Florida. Our team carries comprehensive liability insurance and workers' compensation. We're happy to provide proof of insurance and licensing upon request.",
    },
    {
      question: "What types of wood do you recommend for Florida's climate?",
      answer:
        "For Florida's humid climate, we recommend pressure-treated lumber, cedar, mahogany, or composite materials for outdoor projects. For interior work, we use kiln-dried hardwoods and engineered materials that resist humidity and temperature changes.",
    },
    {
      question: "Do you handle permits and inspections?",
      answer:
        "Yes, we handle all necessary permits and coordinate inspections with local authorities. We're familiar with building codes across Florida and ensure all work meets regulatory requirements. Permit costs are included in our project estimates.",
    },
    {
      question: "Can you work with my architect or designer?",
      answer:
        "We frequently collaborate with architects, designers, and contractors. We can work from your existing plans or help develop custom solutions. Our team is experienced in translating design concepts into quality craftsmanship.",
    },
    {
      question: "What's your warranty policy?",
      answer:
        "We stand behind our work with comprehensive warranties. Structural work carries a 5-year warranty, finish carpentry has a 2-year warranty, and we offer a 1-year warranty on all other work. We also honor manufacturer warranties on materials used.",
    },
    {
      question: "Do you offer emergency repair services?",
      answer:
        "Yes, we provide 24/7 emergency services for storm damage, structural issues, and urgent repairs. Our emergency response team can secure your property and begin repairs quickly to prevent further damage.",
    },
    {
      question: "How do you handle project changes or additions?",
      answer:
        "We understand that projects sometimes evolve. Any changes are documented with written change orders that detail the scope, timeline, and cost adjustments. We'll discuss all options before proceeding with modifications.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, checks, and major credit cards. For larger projects, we offer flexible payment schedules tied to project milestones. We never require full payment upfront and maintain transparent billing throughout your project.",
    },
    {
      question: "Can you match existing woodwork in older homes?",
      answer:
        "Yes! We specialize in historic restoration and can match existing millwork, trim profiles, and architectural details. Our craftsmen have experience with period-appropriate techniques and can source or mill custom pieces to match original work.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Get answers to common questions about our carpentry services, processes, and what to expect when working
              with us.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Still Have Questions Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our team is here to help with any questions about your carpentry
              project.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-center gap-3 p-4 bg-background rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-semibold">Call Us</div>
                  <div className="text-muted-foreground">(555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-background rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-semibold">Email Us</div>
                  <div className="text-muted-foreground">info@floridacarpentry.com</div>
                </div>
              </div>
            </div>

            <Button size="lg" asChild>
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
