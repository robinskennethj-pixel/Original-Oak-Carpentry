import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, Clock } from "lucide-react"
import Link from "next/link"
import { useTranslations } from 'next-intl'

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative bg-gradient-to-br from-background via-muted/30 to-secondary/10 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/wood-grain-pattern.svg')] opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full translate-y-40 -translate-x-40"></div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                {t('since')}
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Forged by <span className="text-primary">Ogun</span>,<br />
                Crafted with <span className="text-accent">Passion</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                {t('subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contact">
                  {t('cta')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/portfolio">
                  {t('learnMore')}
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">14+</div>
                <div className="text-sm text-muted-foreground">{t('yearsExperience')}</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">300+</div>
                <div className="text-sm text-muted-foreground">{t('projectsCompleted')}</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <Clock className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">{t('happyClients')}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/professional-carpenter-working-on-custom-wooden-fu.jpg"
                alt="Master craftsman at Original Oak Carpentry working on custom woodwork"
                className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl border-2 border-accent/20">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm font-medium">Satisfaction Guaranteed</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground p-4 rounded-full shadow-lg">
              <div className="text-lg font-bold">★</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
