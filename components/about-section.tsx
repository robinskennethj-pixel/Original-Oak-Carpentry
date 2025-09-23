import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AboutSection() {
  const t = useTranslations('about')

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{t('mission')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('missionText')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('values')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary">{t('craftsmanship')}</h4>
                  <p className="text-sm text-muted-foreground">{t('craftsmanshipText')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{t('innovation')}</h4>
                  <p className="text-sm text-muted-foreground">{t('innovationText')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{t('integrity')}</h4>
                  <p className="text-sm text-muted-foreground">{t('integrityText')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}