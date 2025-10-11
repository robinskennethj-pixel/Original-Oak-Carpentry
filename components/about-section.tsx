import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AboutSectionProps {
  locale?: string;
}

export function AboutSection({ locale = 'en' }: AboutSectionProps) {
  const isSpanish = locale === 'es';

  const translations = {
    title: isSpanish ? 'Acerca de Carpintería Oak Original' : 'About Original Oak Carpentry',
    subtitle: isSpanish
      ? 'Combinando artesanía tradicional con técnicas modernas'
      : 'Combining traditional craftsmanship with modern techniques',
    mission: isSpanish ? 'Nuestra Misión' : 'Our Mission',
    missionText: isSpanish
      ? 'Brindar servicios excepcionales de carpintería que combinan artesanía tradicional con diseño contemporáneo, creando valor duradero para nuestros clientes y comunidad.'
      : 'To deliver exceptional carpentry services that blend traditional craftsmanship with contemporary design, creating lasting value for our clients and community.',
    values: isSpanish ? 'Nuestros Valores' : 'Our Values',
    craftsmanship: isSpanish ? 'Artesanía' : 'Craftsmanship',
    craftsmanshipText: isSpanish
      ? 'Cada proyecto refleja nuestra dedicación a la precisión y calidad.'
      : 'Every project reflects our dedication to precision and quality.',
    innovation: isSpanish ? 'Innovación' : 'Innovation',
    innovationText: isSpanish
      ? 'Combinamos técnicas tradicionales con herramientas y métodos modernos.'
      : 'We combine traditional techniques with modern tools and methods.',
    integrity: isSpanish ? 'Integridad' : 'Integrity',
    integrityText: isSpanish
      ? 'Comunicación honesta y precios transparentes en todas nuestras operaciones.'
      : 'Honest communication and transparent pricing in all our dealings.'
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{translations.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{translations.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{translations.mission}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{translations.missionText}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{translations.values}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary">{translations.craftsmanship}</h4>
                  <p className="text-sm text-muted-foreground">{translations.craftsmanshipText}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{translations.innovation}</h4>
                  <p className="text-sm text-muted-foreground">{translations.innovationText}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{translations.integrity}</h4>
                  <p className="text-sm text-muted-foreground">{translations.integrityText}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}