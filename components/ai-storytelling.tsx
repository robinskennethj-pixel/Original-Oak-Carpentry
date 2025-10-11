'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Clock,
  Users,
  Award,
  MapPin,
  ChevronRight,
  Sparkles,
  Play,
  Pause,
  SkipForward
} from "lucide-react"

interface StoryNode {
  id: string;
  title: string;
  content: string;
  duration: number;
  type: 'origin' | 'mission' | 'values' | 'team' | 'achievements' | 'future';
  icon: any;
}

interface AIStorytellingProps {
  locale?: string;
}

export function AIStorytelling({ locale = 'en' }: AIStorytellingProps) {
  const [currentStory, setCurrentStory] = useState<StoryNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [userName, setUserName] = useState('');
  const [showPersonalization, setShowPersonalization] = useState(true);
  const router = useRouter();

  const content = {
    en: {
      title: "Discover Our Story",
      subtitle: "An interactive journey through Original Oak Carpentry's heritage",
      personalization: "Personalize your experience",
      enterName: "Enter your name (optional)",
      startButton: "Begin Story",
      nextButton: "Continue",
      pauseButton: "Pause",
      playButton: "Resume",
      skipButton: "Skip",
      ctaButton: "Ready to Start Your Project?",
      ctaSubtitle: "Let's discuss how we can bring your vision to life with expert craftsmanship",
    },
    es: {
      title: "Descubre Nuestra Historia",
      subtitle: "Un viaje interactivo a través de la herencia de Carpintería Oak Original",
      personalization: "Personaliza tu experiencia",
      enterName: "Ingresa tu nombre (opcional)",
      startButton: "Comenzar Historia",
      nextButton: "Continuar",
      pauseButton: "Pausar",
      playButton: "Reanudar",
      skipButton: "Saltar",
      ctaButton: "¿Listo para Comenzar Tu Proyecto?",
      ctaSubtitle: "Discutamos cómo podemos hacer realidad tu visión con artesanía experta",
      stories: [
        {
          id: 'origin',
          title: "Our Roots",
          content: "Original Oak Carpentry was born from a simple philosophy: build with the strength and character of oak, creating structures that stand the test of time. Our founder, inspired by Florida's rich architectural heritage, established our company in 2010 with a commitment to craftsmanship that honors both tradition and innovation.",
          duration: 8000,
          type: 'origin',
          icon: BookOpen
        },
        {
          id: 'mission',
          title: "Crafting Excellence",
          content: "Every project we undertake reflects our dedication to precision and quality. From hurricane-resistant outdoor structures to intricate interior finish work, we approach each task with the same meticulous attention to detail. Our mission extends beyond construction – we build relationships as strong as the structures we create.",
          duration: 9000,
          type: 'mission',
          icon: Award
        },
        {
          id: 'values',
          title: "Built on Values",
          content: "Integrity guides every decision we make. We believe in transparent communication, honest pricing, and delivering on our promises. Our hurricane-ready construction methods ensure your investment is protected against Florida's challenging climate, while our master craftsmanship ensures lasting beauty and functionality.",
          duration: 8500,
          type: 'values',
          icon: Users
        },
        {
          id: 'team',
          title: "Master Craftsmen",
          content: "Our team is led by a master carpenter with over 20 years of experience in Florida construction. This expertise, combined with our dedication to ongoing education and training, ensures that every project benefits from the latest techniques while honoring time-tested traditions of woodworking excellence.",
          duration: 8000,
          type: 'team',
          icon: Users
        },
        {
          id: 'achievements',
          title: "Proven Results",
          content: "With over 300 projects completed and a 98% customer satisfaction rate, our track record speaks for itself. We're proud to be licensed and insured in Florida, hurricane construction certified, and Better Business Bureau accredited. Each project adds to our legacy of excellence.",
          duration: 7500,
          type: 'achievements',
          icon: Award
        },
        {
          id: 'future',
          title: "Looking Forward",
          content: "As we continue to serve Central and South Florida communities, we remain committed to innovation in sustainable building practices, advanced weather-resistant techniques, and customer-focused service. Your project becomes part of our ongoing story of building Florida's future on foundations of excellence.",
          duration: 9000,
          type: 'future',
          icon: MapPin
        }
      ]
    },
    es: {
      title: "Descubre Nuestra Historia",
      subtitle: "Un viaje interactivo a través de la herencia de Carpintería Oak Original",
      startButton: "Comenzar Historia",
      nextButton: "Continuar",
      pauseButton: "Pausar",
      playButton: "Reanudar",
      skipButton: "Saltar",
      stories: [
        {
          id: 'origin',
          title: "Nuestras Raíces",
          content: "Carpintería Oak Original nació de una filosofía simple: construir con la fuerza y carácter del roble, creando estructuras que resisten la prueba del tiempo. Nuestro fundador, inspirado por la rica herencia arquitectónica de Florida, estableció nuestra compañía en 2010 con un compromiso con la artesanía que honra tanto la tradición como la innovación.",
          duration: 8000,
          type: 'origin',
          icon: BookOpen
        },
        {
          id: 'mission',
          title: "Creando Excelencia",
          content: "Cada proyecto que emprendemos refleja nuestra dedicación a la precisión y calidad. Desde estructuras exteriores resistentes a huracanes hasta trabajos de acabado interior intrincados, abordamos cada tarea con la misma atención meticulosa al detalle. Nuestra misión se extiende más allá de la construcción: construimos relaciones tan fuertes como las estructuras que creamos.",
          duration: 9000,
          type: 'mission',
          icon: Award
        },
        {
          id: 'values',
          title: "Construidos sobre Valores",
          content: "La integridad guía cada decisión que tomamos. Creemos en la comunicación transparente, precios honestos y cumplir nuestras promesas. Nuestros métodos de construcción resistentes a huracanes aseguran que tu inversión esté protegida contra el clima desafiante de Florida, mientras que nuestra artesanía maestra asegura belleza y funcionalidad duraderas.",
          duration: 8500,
          type: 'values',
          icon: Users
        },
        {
          id: 'team',
          title: "Artesanos Maestros",
          content: "Nuestro equipo está dirigido por un carpintero maestro con más de 20 años de experiencia en construcción en Florida. Esta experiencia, combinada con nuestra dedicación a la educación continua y capacitación, asegura que cada proyecto se beneficie de las últimas técnicas mientras honra las tradiciones comprobadas de excelencia en carpintería.",
          duration: 8000,
          type: 'team',
          icon: Users
        },
        {
          id: 'achievements',
          title: "Resultados Comprobados",
          content: "Con más de 300 proyectos completados y una tasa de satisfacción del cliente del 98%, nuestro historial habla por sí mismo. Estamos orgullosos de estar licenciados y asegurados en Florida, certificados en construcción para huracanes, y acreditados por Better Business Bureau. Cada proyecto añade a nuestro legado de excelencia.",
          duration: 7500,
          type: 'achievements',
          icon: Award
        },
        {
          id: 'future',
          title: "Mirando al Futuro",
          content: "Mientras continuamos sirviendo a las comunidades del Centro y Sur de Florida, permanecemos comprometidos con la innovación en prácticas de construcción sostenibles, técnicas avanzadas resistentes al clima, y servicio enfocado en el cliente. Tu proyecto se convierte en parte de nuestra historia continua de construir el futuro de Florida sobre cimientos de excelencia.",
          duration: 9000,
          type: 'future',
          icon: MapPin
        }
      ]
    }
  };

  const t = content[locale as keyof typeof content] || content.en;
  const stories = t.stories;

  useEffect(() => {
    if (isPlaying && currentStory) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (autoAdvance && currentIndex < stories.length - 1) {
              handleNext();
            } else {
              setIsPlaying(false);
            }
            return 0;
          }
          return prev + (100 / (currentStory.duration / 100));
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentStory, currentIndex, autoAdvance, stories.length]);

  const handleStart = () => {
    setCurrentStory(stories[0]);
    setCurrentIndex(0);
    setIsPlaying(true);
    setProgress(0);
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentStory(stories[nextIndex]);
      setCurrentIndex(nextIndex);
      setProgress(0);
      setIsPlaying(true);
    } else {
      // Story complete
      setCurrentStory(null);
      setIsPlaying(false);
      setCurrentIndex(0);
      setProgress(0);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleSkip = () => {
    handleNext();
  };

  const getTypeColor = (type: string) => {
    const colors = {
      origin: 'bg-amber-100 text-amber-800 border-amber-200',
      mission: 'bg-blue-100 text-blue-800 border-blue-200',
      values: 'bg-green-100 text-green-800 border-green-200',
      team: 'bg-purple-100 text-purple-800 border-purple-200',
      achievements: 'bg-orange-100 text-orange-800 border-orange-200',
      future: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (!currentStory) {
    return (
      <Card className="w-full max-w-4xl mx-auto border-border bg-card">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl lg:text-3xl">{t.title}</CardTitle>
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground text-lg">{t.subtitle}</p>
        </CardHeader>
        <CardContent className="text-center">
          {/* Personalization Section */}
          {showPersonalization && (
            <div className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="text-lg font-semibold mb-4 text-primary">{t.personalization}</h3>
              <div className="max-w-sm mx-auto">
                <input
                  type="text"
                  placeholder={t.enterName}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {stories.map((story, index) => {
              const IconComponent = story.icon;
              return (
                <div key={story.id} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted hover:bg-primary/10 transition-colors cursor-pointer" onClick={() => {
                  setCurrentStory(story);
                  setCurrentIndex(index);
                  setIsPlaying(true);
                  setProgress(0);
                }}>
                  <IconComponent className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-center">{story.title}</span>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <Button onClick={handleStart} size="lg" className="gap-2">
              <Play className="h-5 w-5" />
              {t.startButton}
            </Button>

            {/* CTA Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
              <h3 className="text-xl font-semibold mb-2">{t.ctaButton}</h3>
              <p className="text-muted-foreground mb-4">{t.ctaSubtitle}</p>
              <Button
                onClick={() => router.push('/contact')}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Get Free Consultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const IconComponent = currentStory.icon;

  return (
    <Card className="w-full max-w-4xl mx-auto border-border bg-card">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <IconComponent className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{currentStory.title}</CardTitle>
            <Badge className={getTypeColor(currentStory.type)}>
              {currentStory.type.charAt(0).toUpperCase() + currentStory.type.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {stories.length}
            </span>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed mb-8">
          <p>{currentStory.content}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isPlaying ? (
              <Button onClick={handlePause} variant="outline" size="sm" className="gap-2">
                <Pause className="h-4 w-4" />
                {t.pauseButton}
              </Button>
            ) : (
              <Button onClick={handlePlay} variant="outline" size="sm" className="gap-2">
                <Play className="h-4 w-4" />
                {t.playButton}
              </Button>
            )}
            <Button onClick={handleSkip} variant="ghost" size="sm" className="gap-2">
              <SkipForward className="h-4 w-4" />
              {t.skipButton}
            </Button>
          </div>

          <Button onClick={handleNext} className="gap-2">
            {currentIndex < stories.length - 1 ? t.nextButton : 'Complete Story'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}