import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ContactSection } from '@/components/contact-section'
import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'
import { AIChatbot } from '@/components/ai-chatbot'
import { AICostEstimatorWidget } from '@/components/ai-cost-estimator'
import { InteractiveProjectEstimator } from '@/components/interactive-project-estimator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Bot, Zap, Eye, Users, Cloud, Play, Filter, MessageCircle, Award, Leaf, BookOpen, Mail, BarChart3, Trophy, AlertCircle, Home } from 'lucide-react'

export default function SpanishHomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header locale="es" />
      <HeroSection locale="es" />

      {/* Estimador de Proyectos Interactivo - Destacado */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Obtén una Estimación Instantánea con IA
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Usa nuestro estimador potenciado por IA para obtener un rango de costo preciso para tu proyecto en segundos
            </p>
          </div>
          <InteractiveProjectEstimator locale="es" />
        </div>
      </section>

      <ServicesSection locale="es" />

      {/* Sección de Herramientas de IA Inteligentes */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Herramientas de IA Inteligentes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Aprovecha el poder de la inteligencia artificial para planificar tu proyecto con precisión
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            <AICostEstimatorWidget locale="es" />

            <Card className="border-2 border-secondary shadow-lg">
              <CardHeader className="bg-secondary/5">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Asistente de IA
                </CardTitle>
                <CardDescription>
                  Chatea con nuestro asistente de IA para respuestas instantáneas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Obtén respuestas instantáneas sobre servicios, precios y disponibilidad
                </p>
                <p className="text-sm text-muted-foreground">
                  💡 Consejo: El asistente de IA aparece en la esquina inferior derecha de tu pantalla
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Cuadrícula de Características de IA Adicionales */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Visualización de Proyectos Virtuales */}
            <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  Visualización de Proyectos Virtuales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Ve comparaciones antes/después y vistas 3D de tu proyecto
                </p>
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  Ver Visualizaciones
                </Button>
              </CardContent>
            </Card>

            {/* Portal del Cliente */}
            <Card className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Portal del Cliente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Rastrea el estado del proyecto, descarga facturas y administra tu cuenta
                </p>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  Acceder al Portal
                </Button>
              </CardContent>
            </Card>

            {/* Alertas de Clima y Tormentas */}
            <Card className="border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-orange-600" />
                  Alertas de Clima y Tormentas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Alertas de huracanes en tiempo real y consejos de preparación
                </p>
                <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                  Ver Alertas de Clima
                </Button>
              </CardContent>
            </Card>

            {/* Portafolio Interactivo */}
            <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-purple-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5 text-purple-600" />
                  Portafolio Interactivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Filtra proyectos por tipo con categorización potenciada por IA
                </p>
                <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                  Explorar Portafolio
                </Button>
              </CardContent>
            </Card>

            {/* Video y Tutoriales */}
            <Card className="border-2 border-red-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-red-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Play className="h-5 w-5 text-red-600" />
                  Video y Tutoriales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Mira demostraciones de artesanía y consejos de mantenimiento
                </p>
                <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                  Ver Videos
                </Button>
              </CardContent>
            </Card>

            {/* Enfoque de Sostenibilidad */}
            <Card className="border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-emerald-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-600" />
                  Sostenibilidad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Materiales ecológicos y prácticas sostenibles
                </p>
                <Button variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                  Saber Más
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visualización de Proyectos Virtuales */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Visualización de Proyectos Virtuales
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Mira tu proyecto cobrar vida antes de que incluso comencemos a construir
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Galería Antes y Después</h3>
              <p className="text-muted-foreground mb-6">
                Explora nuestros proyectos completados con comparaciones interactivas antes/después.
                Observa la transformación y calidad de nuestra artesanía.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <span>Controladores deslizantes interactivos antes/después</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span>Vistas previas en 3D</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-blue-600" />
                  <span>Visualización RA para dispositivos móviles</span>
                </div>
              </div>
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                Ver Galería Virtual
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-blue-200">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Eye className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-600">Visualización Interactiva</p>
                    <p className="text-sm text-gray-500">Haz clic y arrastra para comparar antes/después</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Muestra: Cubierta Resistente a Huracanes</h4>
                  <p className="text-sm text-muted-foreground">
                    Observa cómo transformamos este espacio exterior con materiales premium y construcción resistente a tormentas.
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Antes: Madera desgastada</span>
                    <span className="text-blue-600">Después: Compuesto premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal del Cliente y Programa de Lealtad */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Portal del Cliente y Programa de Lealtad
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Gestión profesional de proyectos y recompensas para nuestros valiosos clientes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Portal del Cliente */}
            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Portal del Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Rastrea el estado del proyecto en tiempo real</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Descarga facturas y recibos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Aprueba diseños y envía retroalimentación</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Accede a fotos y actualizaciones del proyecto</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Acceder al Portal del Cliente
                </Button>
              </CardContent>
            </Card>

            {/* Programa de Lealtad */}
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-blue-600" />
                  Programa de Lealtad y Referidos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Gana puntos por cada proyecto</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Obtén descuentos por referidos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Programación prioritaria para miembros</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Beneficios exclusivos para miembros</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Unirse al Programa de Lealtad
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Alertas de Clima y Tormentas */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Alertas de Clima y Tormentas
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Alertas de huracanes en tiempo real y preparación para tormentas para propietarios de Florida
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Estado del Clima Actual</h3>
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Cloud className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Centro de Florida</p>
                      <p className="text-2xl font-bold">Parcialmente Nublado</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">24°C</p>
                    <p className="text-sm text-muted-foreground">Humedad: 65%</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold text-orange-800">Alerta de Temporada de Huracanes</span>
                  </div>
                  <p className="text-sm text-orange-700">
                    La temporada de huracanes está activa. Considera actualizaciones resistentes a tormentas para tu hogar.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Consejos de Preparación para Tormentas</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
                  <h4 className="font-semibold mb-2">Cubierta a Prueba de Huracanes</h4>
                  <p className="text-sm text-muted-foreground">
                    Actualiza a materiales compuestos y encuadre reforzado para máxima protección contra tormentas.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                  <h4 className="font-semibold mb-2">Protección de Ventanas y Puertas</h4>
                  <p className="text-sm text-muted-foreground">
                    Instala contraventanas para huracanes o ventanas y puertas resistentes a impactos.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                  <h4 className="font-semibold mb-2">Mantenimiento Regular</h4>
                  <p className="text-sm text-muted-foreground">
                    Programa inspecciones anuales para asegurar que tu hogar esté listo para tormentas.
                  </p>
                </div>
              </div>

              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Programar Inspección a Prueba de Tormentas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portafolio Interactivo y Contenido de Video */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Portafolio Interactivo y Contenido de Video
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explora nuestra artesanía a través de galerías interactivas y videos educativos
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Portafolio Interactivo */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Filter className="h-6 w-6 text-purple-600" />
                Portafolio Interactivo
              </h3>
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-purple-200">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button variant="outline" size="sm" className="border-purple-600 text-purple-600">
                      Todos los Proyectos
                    </Button>
                    <Button variant="outline" size="sm">
                      Cubiertas
                    </Button>
                    <Button variant="outline" size="sm">
                      Gabinetes
                    </Button>
                    <Button variant="outline" size="sm">
                      Molduras
                    </Button>
                    <Button variant="outline" size="sm">
                      Resistente a Huracanes
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Filter className="h-8 w-8 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium">Cubierta Personalizada</p>
                      <p className="text-xs text-muted-foreground">Orlando, FL</p>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Home className="h-8 w-8 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium">Gabinetes de Cocina</p>
                      <p className="text-xs text-muted-foreground">Tampa, FL</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                  Ver Portafolio Completo
                </Button>
              </div>
            </div>

            {/* Contenido de Video y Tutoriales */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Play className="h-6 w-6 text-pink-600" />
                Contenido de Video y Tutoriales
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-pink-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Play className="h-5 w-5 text-pink-600" />
                    <h4 className="font-semibold">Cómo Hacemos una Cubierta a Prueba de Huracanes</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Aprende sobre nuestras técnicas especializadas para crear espacios exteriores resistentes a tormentas.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>12 min</span>
                    <span>•</span>
                    <span>2.3k vistas</span>
                    <span>•</span>
                    <span>Preparación para Huracanes</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-pink-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Play className="h-5 w-5 text-pink-600" />
                    <h4 className="font-semibold">Manteniendo Gabinetes de Madera en la Humedad de Florida</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Consejos expertos para mantener tus gabinetes de madera hermosos en el clima húmedo de Florida.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>8 min</span>
                    <span>•</span>
                    <span>1.8k vistas</span>
                    <span>•</span>
                    <span>Mantenimiento</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-pink-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Play className="h-5 w-5 text-pink-600" />
                    <h4 className="font-semibold">Consejos de Instalación de Cornisas</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Técnicas profesionales para la instalación perfecta de cornisas.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>15 min</span>
                    <span>•</span>
                    <span>3.1k vistas</span>
                    <span>•</span>
                    <span>Instalación</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4 bg-pink-600 hover:bg-pink-700">
                Ver Todos los Videos
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection locale="es" />

      {/* Sostenibilidad y Reconocimientos */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Sostenibilidad y Reconocimiento
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprometidos con la excelencia y responsabilidad ambiental
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Enfoque de Sostenibilidad */}
            <Card className="border-2 border-emerald-200 shadow-lg">
              <CardHeader className="bg-emerald-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-600" />
                  Artesanía Sostenible
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Proyectos con madera recuperada</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Acabados y selladores ecológicos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Prácticas de abastecimiento sostenibles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Reducción de residuos y reciclaje</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Estamos comprometidos con prácticas de carpintería ambientalmente responsables que protegen la belleza natural de Florida.
                </p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Aprender Sobre Nuestras Prácticas Verdes
                </Button>
              </CardContent>
            </Card>

            {/* Premios y Certificaciones */}
            <Card className="border-2 border-yellow-200 shadow-lg">
              <CardHeader className="bg-yellow-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Premios y Certificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Licencia de Florida</p>
                    <p className="text-xs text-muted-foreground">Contratista #CBC123456</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Calificación A+ BBB</p>
                    <p className="text-xs text-muted-foreground">Negocio Acreditado</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <BarChart3 className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">98% Satisfacción</p>
                    <p className="text-xs text-muted-foreground">Reseñas de Clientes</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Mejor de Orlando</p>
                    <p className="text-xs text-muted-foreground">Ganador 2023</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Reconocidos por la excelencia en artesanía y servicio al cliente en todo el Centro de Florida.
                </p>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  Ver Todas las Certificaciones
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog y Centro Educativo */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Blog y Centro Educativo
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Perspectivas expertas y consejos para propietarios de Florida
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Top 5 Materiales de Cubierta para el Clima de Florida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Aprende qué materiales funcionan mejor en el clima húmedo de Florida y condiciones de huracán.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Contenido Generado por IA</span>
                  <span>5 min lectura</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Cómo Proteger Tu Hogar del Daño de Tormentas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Consejos esenciales para propietarios de Florida para prepararse para la temporada de huracanes.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Guía Experta</span>
                  <span>8 min lectura</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Manteniendo Gabinetes de Madera en la Humedad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Consejos profesionales para mantener tus gabinetes de madera hermosos en el clima húmedo de Florida.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Guía de Mantenimiento</span>
                  <span>6 min lectura</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <BookOpen className="mr-2 h-4 w-4" />
              Visitar Nuestro Blog
            </Button>
          </div>
        </div>
      </section>

      {/* Herramienta de Comparación de Costos/Materiales */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Herramienta de Comparación de Costos y Materiales
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compara materiales lado a lado para tomar decisiones informadas
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-gray-200">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Selección de Materiales */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Seleccionar Materiales</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Pino Tratado con Presión', cost: 1.0, durability: 7, maintenance: 8 },
                    { name: 'Cedro', cost: 1.4, durability: 8, maintenance: 6 },
                    { name: 'Compuesto', cost: 2.2, durability: 9, maintenance: 2 },
                    { name: 'Madera Dura Premium', cost: 2.8, durability: 10, maintenance: 4 }
                  ].map((material, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{material.name}</span>
                        <span className="text-sm text-muted-foreground">{(material.cost * 100).toFixed(0)}% del costo base</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Durabilidad:</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${material.durability * 10}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Mantenimiento:</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(10 - material.maintenance) * 10}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Valor:</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${material.durability * 10}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gráfico de Comparación */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Comparación de Materiales</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Gráfico de Comparación Interactivo</p>
                    <p className="text-sm text-gray-500">Comparación visual de costo vs. longevidad vs. mantenimiento</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Selecciona materiales arriba para ver comparación detallada
                  </p>
                </div>
              </div>

              {/* Calculadora de Costos */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Calculadora de Costos</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Tamaño del Proyecto (pies cuadrados)</Label>
                    <Input type="number" placeholder="Ingresar tamaño" className="mt-1" />
                  </div>
                  <div>
                    <Label>Nivel de Complejidad</Label>
                    <select className="w-full mt-1 px-3 py-2 border rounded-md">
                      <option>Simple</option>
                      <option>Estándar</option>
                      <option>Complejo</option>
                      <option>Personalizado</option>
                    </select>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Rango de Costo Estimado</h4>
                    <div className="text-2xl font-bold text-blue-600">$2,500 - $4,200</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Basado en materiales seleccionados y parámetros del proyecto
                    </p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Obtener Cotización Detallada
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PortfolioSection locale="es" />
      <AboutSection locale="es" />
      <ContactSection locale="es" />
      <Footer />
      <AIChatbot locale="es" />
    </div>
  )
}