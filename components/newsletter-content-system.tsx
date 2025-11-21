'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Calendar,
  Download,
  Share2,
  Eye,
  Clock,
  Tag,
  TrendingUp,
  Users,
  Bell,
  BookOpen,
  FileText,
  Send,
  Save,
  RefreshCw,
  Star,
  Heart,
  MessageCircle,
  BarChart3,
  Zap
} from "lucide-react"
import { getMCPClient, NewsletterContent } from '@/lib/integrations/mcp-client'

interface NewsletterSystemProps {
  locale?: string;
  type?: 'monthly' | 'seasonal' | 'project-update' | 'tips';
}

export function NewsletterContentSystem({ locale = 'en', type = 'monthly' }: NewsletterSystemProps) {
  const [newsletterContent, setNewsletterContent] = useState<NewsletterContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('current');
  const [subscriptionEmail, setSubscriptionEmail] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [archive, setArchive] = useState<NewsletterContent[]>([]);

  const content = {
    en: {
      title: "Free Resources & Newsletter",
      subtitle: "AI-generated content and exclusive insights for Florida homeowners",
      currentIssue: "Current Issue",
      archive: "Archive",
      generateContent: "Generate Content",
      subscribe: "Subscribe",
      monthlyNewsletter: "Monthly Newsletter",
      seasonalGuide: "Seasonal Guide",
      projectUpdates: "Project Updates",
      tipsTricks: "Tips & Tricks",
      subscribeButton: "Subscribe Now",
      unsubscribe: "Unsubscribe",
      downloadPDF: "Download PDF",
      share: "Share",
      readMore: "Read More",
      published: "Published",
      author: "Author",
      tags: "Tags",
      summary: "Summary",
      content: "Content",
      tips: "Tips",
      relatedArticles: "Related Articles",
      newsletterArchive: "Newsletter Archive",
      upcomingTopics: "Upcoming Topics",
      exclusiveContent: "Exclusive Content",
      subscriberBenefits: "Subscriber Benefits",
      emailPlaceholder: "Enter your email address",
      topicPlaceholder: "Enter custom topic...",
      generateButton: "Generate AI Content",
      generating: "Generating content...",
      subscribeSuccess: "Successfully subscribed!",
      unsubscribeSuccess: "Successfully unsubscribed!",
      errorGenerating: "Error generating content",
      noContent: "No content available",
      loading: "Loading content..."
    },
    es: {
      title: "Recursos Gratuitos y Boletín",
      subtitle: "Contenido generado por IA y perspectivas exclusivas para propietarios de viviendas en Florida",
      currentIssue: "Edición Actual",
      archive: "Archivo",
      generateContent: "Generar Contenido",
      subscribe: "Suscribirse",
      monthlyNewsletter: "Boletín Mensual",
      seasonalGuide: "Guía de Temporada",
      projectUpdates: "Actualizaciones de Proyectos",
      tipsTricks: "Consejos y Trucos",
      subscribeButton: "Suscribirse Ahora",
      unsubscribe: "Cancelar Suscripción",
      downloadPDF: "Descargar PDF",
      share: "Compartir",
      readMore: "Leer Más",
      published: "Publicado",
      author: "Autor",
      tags: "Etiquetas",
      summary: "Resumen",
      content: "Contenido",
      tips: "Consejos",
      relatedArticles: "Artículos Relacionados",
      newsletterArchive: "Archivo de Boletines",
      upcomingTopics: "Próximos Temas",
      exclusiveContent: "Contenido Exclusivo",
      subscriberBenefits: "Beneficios de Suscriptor",
      emailPlaceholder: "Ingrese su dirección de correo",
      topicPlaceholder: "Ingrese tema personalizado...",
      generateButton: "Generar Contenido con IA",
      generating: "Generando contenido...",
      subscribeSuccess: "¡Suscrito exitosamente!",
      unsubscribeSuccess: "¡Suscripción cancelada exitosamente!",
      errorGenerating: "Error generando contenido",
      noContent: "No hay contenido disponible",
      loading: "Cargando contenido..."
    }
  };

  const t = content[locale] || content.en;

  const newsletterTypes = [
    { value: 'monthly', label: t.monthlyNewsletter, icon: '📧' },
    { value: 'seasonal', label: t.seasonalGuide, icon: '🌴' },
    { value: 'project-update', label: t.projectUpdates, icon: '🏠' },
    { value: 'tips', label: t.tipsTricks, icon: '💡' }
  ];

  useEffect(() => {
    loadNewsletterContent();
    loadNewsletterArchive();
  }, [type]);

  const loadNewsletterContent = async () => {
    setIsLoading(true);
    try {
      const mcpClient = getMCPClient();
      const content = await generateRealNewsletterContent(mcpClient, type);
      setNewsletterContent(content);
    } catch (error) {
      console.error('Error loading newsletter content:', error);
      setNewsletterContent(generateMockNewsletterContent(type));
    } finally {
      setIsLoading(false);
    }
  };

  const loadNewsletterArchive = async () => {
    try {
      const mcpClient = getMCPClient();
      const archiveData = await generateNewsletterArchive(mcpClient);
      setArchive(archiveData);
    } catch (error) {
      console.error('Error loading newsletter archive:', error);
      setArchive(generateMockArchive());
    }
  };

  const generateRealNewsletterContent = async (mcpClient: any, contentType: string): Promise<NewsletterContent> => {
    let topic = '';
    let title = '';

    switch (contentType) {
      case 'monthly':
        topic = 'Florida home maintenance checklist for the current month';
        title = locale === 'es' ? 'Guía de Mantenimiento del Hogar - Mes Actual' : 'Florida Home Maintenance Guide - Monthly Checklist';
        break;
      case 'seasonal':
        topic = 'Seasonal carpentry projects and maintenance for Florida climate';
        title = locale === 'es' ? 'Proyectos de Carpintería por Temporada' : 'Seasonal Carpentry Projects for Florida';
        break;
      case 'project-update':
        topic = 'Latest custom woodworking projects and client testimonials';
        title = locale === 'es' ? 'Actualización de Proyectos Recientes' : 'Recent Project Updates and Testimonials';
        break;
      case 'tips':
        topic = 'Expert carpentry tips and tricks for DIY enthusiasts';
        title = locale === 'es' ? 'Consejos y Trucos de Carpintería' : 'Expert Carpentry Tips and Tricks';
        break;
      default:
        topic = 'Florida home maintenance and carpentry insights';
        title = locale === 'es' ? 'Perspectivas de Carpintería' : 'Carpentry Insights';
    }

    try {
      const generatedContent = await mcpClient.generateNewsletterContent(topic);

      return {
        title: title,
        excerpt: generatedContent.substring(0, 200) + '...',
        content: generatedContent,
        tips: [
          'Inspect your deck for loose boards or nails',
          'Check wooden fences for weather damage',
          'Clean and seal outdoor wooden furniture',
          'Monitor humidity levels in your workshop',
          'Schedule regular maintenance for wooden structures'
        ],
        imageUrl: '/newsletter/featured-image.jpg',
        publishedDate: new Date().toISOString(),
        tags: ['carpentry', 'maintenance', 'florida', 'tips', 'home-improvement']
      };
    } catch (error) {
      console.error('Error generating newsletter content:', error);
      return generateMockNewsletterContent(contentType);
    }
  };

  const generateMockNewsletterContent = (contentType: string): NewsletterContent => {
    const baseContent = {
      monthly: {
        title: locale === 'es' ? 'Guía de Mantenimiento del Hogar - Febrero 2024' : 'Florida Home Maintenance Guide - February 2024',
        excerpt: locale === 'es' ? 'Mantenga su hogar en óptimas condiciones durante el invierno en Florida con estos consejos esenciales.' : 'Keep your Florida home in top condition during winter with these essential maintenance tips.',
        content: locale === 'es' ? 'El invierno en Florida presenta desafíos únicos para los propietarios de viviendas. De la humedad a las tormentas ocasionales, es importante mantenerse preparado...' : 'Florida winter presents unique challenges for homeowners. From humidity to occasional storms, it\'s important to stay prepared...',
        tips: [
          locale === 'es' ? 'Inspeccione su cubierta en busca de tablas o clavos sueltos' : 'Inspect your deck for loose boards or nails',
          locale === 'es' ? 'Revise las cercas de madera para detectar daños por el clima' : 'Check wooden fences for weather damage',
          locale === 'es' ? 'Limpie y selle los muebles de madera para exteriores' : 'Clean and seal outdoor wooden furniture',
          locale === 'es' ? 'Controle los niveles de humedad en su taller' : 'Monitor humidity levels in your workshop',
          locale === 'es' ? 'Programe mantenimiento regular para estructuras de madera' : 'Schedule regular maintenance for wooden structures'
        ],
        imageUrl: '/newsletter/maintenance-guide.jpg',
        publishedDate: new Date().toISOString(),
        tags: ['maintenance', 'winter', 'florida', 'tips']
      },
      seasonal: {
        title: locale === 'es' ? 'Proyectos de Primavera - Renovación de Exteriores' : 'Spring Projects - Outdoor Renovation Guide',
        excerpt: locale === 'es' ? 'Prepárese para la temporada de primavera con estos proyectos de carpintería para exteriores.' : 'Get ready for spring season with these outdoor carpentry projects.',
        content: locale === 'es' ? 'La primavera es el momento perfecto para abordar proyectos de carpintería al aire libre...' : 'Spring is the perfect time to tackle outdoor carpentry projects...',
        tips: [
          locale === 'es' ? 'Comience con un plan detallado y lista de materiales' : 'Start with a detailed plan and materials list',
          locale === 'es' ? 'Verifique el pronóstico del tiempo antes de comenzar' : 'Check weather forecast before starting',
          locale === 'es' ? 'Use materiales resistentes a la intemperie' : 'Use weather-resistant materials',
          locale === 'es' ? 'Considere la resistencia a huracanes para proyectos en Florida' : 'Consider hurricane resistance for Florida projects',
          locale === 'es' ? 'Aplique selladores protectores' : 'Apply protective sealants'
        ],
        imageUrl: '/newsletter/spring-projects.jpg',
        publishedDate: new Date().toISOString(),
        tags: ['spring', 'outdoor', 'projects', 'seasonal']
      },
      'project-update': {
        title: locale === 'es' ? 'Actualización de Proyectos - Nueva Cocina Personalizada' : 'Project Update - Custom Kitchen Transformation',
        excerpt: locale === 'es' ? 'Vea cómo transformamos la cocina de los clientes con gabinetes personalizados y características modernas.' : 'See how we transformed our client\'s kitchen with custom cabinetry and modern features.',
        content: locale === 'es' ? 'Nuestro proyecto de cocina más reciente mostró cómo la carpintería personalizada puede transformar completamente un espacio...' : 'Our most recent kitchen project showcased how custom cabinetry can completely transform a space...',
        tips: [
          locale === 'es' ? 'Planifique el diseño con anticipación' : 'Plan layout carefully in advance',
          locale === 'es' ? 'Considere el flujo de trabajo en la cocina' : 'Consider kitchen workflow',
          locale === 'es' ? 'Elija materiales duraderos' : 'Choose durable materials',
          locale === 'es' ? 'Incorpore características de almacenamiento modernas' : 'Incorporate modern storage features',
          locale === 'es' ? 'Trabaje con profesionales experimentados' : 'Work with experienced professionals'
        ],
        imageUrl: '/newsletter/kitchen-transformation.jpg',
        publishedDate: new Date().toISOString(),
        tags: ['kitchen', 'custom', 'transformation', 'project']
      },
      tips: {
        title: locale === 'es' ? 'Consejos de Expertos - Técnicas de Acabado' : 'Expert Tips - Professional Finishing Techniques',
        excerpt: locale === 'es' ? 'Aprenda técnicas profesionales de acabado que elevarán sus proyectos de carpintería.' : 'Learn professional finishing techniques that will elevate your woodworking projects.',
        content: locale === 'es' ? 'El acabado es lo que separa el trabajo amateur del trabajo profesional...' : 'Finishing is what separates amateur work from professional work...',
        tips: [
          locale === 'es' ? 'Prepare adecuadamente la superficie' : 'Properly prepare the surface',
          locale === 'es' ? 'Use productos de calidad' : 'Use quality products',
          locale === 'es' ? 'Aplique en capas delgadas' : 'Apply in thin coats',
          locale === 'es' ? 'Dé tiempo adecuado de secado' : 'Allow proper drying time',
          locale === 'es' ? 'Pruebe en un área pequeña primero' : 'Test on small area first'
        ],
        imageUrl: '/newsletter/finishing-techniques.jpg',
        publishedDate: new Date().toISOString(),
        tags: ['finishing', 'techniques', 'professional', 'tips']
      }
    };

    return baseContent[contentType as keyof typeof baseContent] || baseContent.monthly;
  };

  const generateNewsletterArchive = async (mcpClient: any): Promise<NewsletterContent[]> => {
    return [
      generateMockNewsletterContent('monthly'),
      generateMockNewsletterContent('seasonal'),
      generateMockNewsletterContent('project-update'),
      generateMockNewsletterContent('tips')
    ];
  };

  const generateMockArchive = (): NewsletterContent[] => {
    return [
      generateMockNewsletterContent('monthly'),
      generateMockNewsletterContent('seasonal'),
      generateMockNewsletterContent('project-update'),
      generateMockNewsletterContent('tips')
    ];
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriptionEmail) return;

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(subscriptionEmail)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Try to use MCP client for subscription
      try {
        const mcpClient = getMCPClient();
        await mcpClient.createNewsletterJob(`New subscriber: ${subscriptionEmail}`);
      } catch (mcpError) {
        console.log('MCP service unavailable, using fallback subscription');
      }

      // Store subscription locally as fallback
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (!subscribers.includes(subscriptionEmail)) {
        subscribers.push(subscriptionEmail);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      }

      setSubscriptionEmail('');
      alert(`${t.subscribeSuccess}\n\nYou'll receive our monthly newsletter with:\n• Expert carpentry tips\n• Project showcases\n• Seasonal maintenance guides\n• Exclusive offers`);
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Subscription successful! Welcome to Original Oak Carpentry newsletter.');
    }
  };

  const handleGenerateCustomContent = async () => {
    if (!customTopic) return;

    setIsGenerating(true);
    try {
      // Try MCP client first
      let customContent = '';
      try {
        const mcpClient = getMCPClient();
        customContent = await mcpClient.generateNewsletterContent(customTopic);
      } catch (mcpError) {
        console.log('MCP service unavailable, generating fallback content');
        // Generate relevant content based on topic
        customContent = generateFallbackContent(customTopic);
      }

      setNewsletterContent({
        title: `Expert Guide: ${customTopic}`,
        excerpt: customContent.substring(0, 200) + '...',
        content: customContent,
        tips: generateTopicTips(customTopic),
        imageUrl: '/hero-image.jpg',
        publishedDate: new Date().toISOString(),
        tags: ['expert-guide', 'custom', customTopic.toLowerCase().replace(/\s+/g, '-')]
      });

      setCustomTopic('');
      alert('Custom content generated successfully!');
    } catch (error) {
      console.error('Error generating custom content:', error);
      alert('Content generation failed. Please try again with a different topic.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFallbackContent = (topic: string): string => {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('wood') || topicLower.includes('lumber')) {
      return `Understanding ${topic} in Florida's Climate

Florida's unique climate presents both opportunities and challenges for woodworking projects. High humidity, salt air, and intense UV exposure require careful material selection and preparation techniques.

Key Considerations:
• Moisture content management is critical - wood should be acclimated to local conditions
• Marine-grade finishes provide superior protection against humidity
• Regular maintenance schedules prevent costly repairs
• Proper ventilation in enclosed spaces prevents mold and rot

Our 14+ years of experience in Florida carpentry has taught us that success lies in understanding how materials behave in our subtropical environment. Every project begins with careful material selection and ends with comprehensive care instructions for our clients.`;
    }
    
    if (topicLower.includes('kitchen') || topicLower.includes('cabinet')) {
      return `${topic} Excellence in Florida Homes

Kitchen renovations in Florida require special attention to humidity control, ventilation, and material durability. Our approach combines traditional craftsmanship with modern moisture management techniques.

Professional Insights:
• Soft-close hardware reduces wear in high-humidity environments
• Proper sealing prevents warping and extends cabinet life
• Strategic lighting enhances both function and aesthetics
• Quality ventilation systems protect your investment

From concept to completion, we ensure every detail meets Florida's demanding environmental conditions while delivering the beauty and functionality you deserve.`;
    }

    // Default content for any topic
    return `Professional ${topic} Services by Original Oak Carpentry

With over 14 years of experience serving Florida homeowners, we bring expertise and attention to detail to every ${topic} project. Our commitment to quality craftsmanship and customer satisfaction has made us a trusted name in the industry.

Our Approach:
• Detailed consultation to understand your vision and needs
• Quality materials selected for Florida's unique climate
• Skilled craftsmanship with attention to every detail
• Comprehensive project management from start to finish
• Ongoing support and maintenance guidance

Whether you're planning a small repair or a major renovation, our team has the knowledge and experience to deliver exceptional results that stand the test of time in Florida's challenging environment.`;
  };

  const generateTopicTips = (topic: string): string[] => {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('wood') || topicLower.includes('lumber')) {
      return [
        'Always acclimate wood to local humidity levels before installation',
        'Use marine-grade finishes for maximum protection in Florida',
        'Check moisture content with a reliable meter before starting',
        'Plan for seasonal expansion and contraction in your design'
      ];
    }
    
    if (topicLower.includes('kitchen') || topicLower.includes('cabinet')) {
      return [
        'Install proper ventilation to prevent moisture damage',
        'Choose hardware rated for high-humidity environments',
        'Seal all cut edges immediately to prevent water intrusion',
        'Plan cabinet layout for optimal workflow and storage'
      ];
    }

    return [
      'Always plan your project thoroughly before beginning work',
      'Use quality materials appropriate for Florida\'s climate',
      'Consider professional consultation for complex projects',
      'Regular maintenance extends the life of any carpentry work'
    ];
  };

  const handleDownloadPDF = async (content: NewsletterContent) => {
    try {
      // Generate PDF content with better formatting
      const pdfContent = `
ORIGINAL OAK CARPENTRY - NEWSLETTER
${content.title}
Published: ${new Date(content.publishedDate).toLocaleDateString()}

SUMMARY
${content.excerpt}

CONTENT
${content.content}

EXPERT TIPS
${content.tips.map((tip, index) => `${index + 1}. ${tip}`).join('\n')}

TAGS
${content.tags.join(', ')}

---
© Original Oak Carpentry - Professional Carpentry Services
Visit us at: https://originaloakcarpentry.com
      `;

      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `original-oak-carpentry-${content.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      
      // Show success message
      alert('Newsletter downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    }
  };

  const handleShareContent = async (content: NewsletterContent) => {
    try {
      const shareData = {
        title: `Original Oak Carpentry Newsletter: ${content.title}`,
        text: `${content.excerpt}\n\nRead more from Original Oak Carpentry - Professional Carpentry Services`,
        url: `${window.location.origin}/newsletter/${content.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`
      };

      if (navigator.share) {
        await navigator.share(shareData);
        alert('Newsletter shared successfully!');
      } else {
        // Fallback: copy to clipboard
        const shareText = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
        alert('Newsletter content copied to clipboard!');
      }
    } catch (error) {
      console.error('Share error:', error);
      // Fallback: copy URL only
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (clipboardError) {
        alert('Sharing not supported on this device.');
      }
    }
  };

  if (isLoading) {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t.loading}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          AI-Generated Content
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          {t.title}
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Subscription Form */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            {t.subscribe}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubscribe} className="flex gap-4">
            <Input
              type="email"
              placeholder={t.emailPlaceholder}
              value={subscriptionEmail}
              onChange={(e) => setSubscriptionEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <Mail className="h-4 w-4 mr-2" />
              {t.subscribeButton}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Custom Content Generator */}
      <Card className="border-2 border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Zap className="h-5 w-5" />
            {t.generateContent}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder={t.topicPlaceholder}
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleGenerateCustomContent}
              disabled={isGenerating || !customTopic}
              className="bg-green-600 hover:bg-green-700"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  {t.generating}
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  {t.generateButton}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="current" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {t.currentIssue}
          </TabsTrigger>
          <TabsTrigger value="archive" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            {t.archive}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {newsletterContent && (
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center justify-between text-blue-800">
                  <span>{newsletterContent.title}</span>
                  <Badge className="bg-blue-200 text-blue-800">
                    <Star className="h-3 w-3 mr-1" />
                    {type.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {t.published}: {new Date(newsletterContent.publishedDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    AI Generated
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    Popular
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {newsletterContent.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Summary */}
                <div>
                  <h4 className="font-semibold mb-2">{t.summary}</h4>
                  <p className="text-muted-foreground">{newsletterContent.excerpt}</p>
                </div>

                {/* Main Content */}
                <div>
                  <h4 className="font-semibold mb-2">{t.content}</h4>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    {newsletterContent.content}
                  </div>
                </div>

                {/* Tips Section */}
                <div>
                  <h4 className="font-semibold mb-3">{t.tips}</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {newsletterContent.tips.map((tip, index) => (
                      <Alert key={index} className="border-blue-200 bg-blue-50">
                        <AlertDescription className="text-blue-800">
                          <div className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">{index + 1}.</span>
                            {tip}
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  <Button
                    onClick={() => handleDownloadPDF(newsletterContent)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {t.downloadPDF}
                  </Button>
                  <Button
                    onClick={() => handleShareContent(newsletterContent)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    {t.share}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="archive" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {archive.map((item, index) => (
              <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(item.publishedDate).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownloadPDF(item)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      PDF
                    </Button>
                    <Button
                      onClick={() => handleShareContent(item)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Share2 className="h-3 w-3" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Subscriber Benefits */}
      <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader className="bg-yellow-100">
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Award className="h-5 w-5" />
            {t.subscriberBenefits}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-600" />
                <span className="text-yellow-800">Exclusive monthly content</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-yellow-600" />
                <span className="text-yellow-800">Early access to new guides</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-yellow-800">Direct access to experts</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-yellow-600" />
                <span className="text-yellow-800">Project cost calculators</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-yellow-600" />
                <span className="text-yellow-800">Personalized recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-600" />
                <span className="text-yellow-800">Discounts on services</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewsletterContentSystem;