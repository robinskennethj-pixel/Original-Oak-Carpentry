'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Sparkles,
  Edit3,
  Calendar,
  Tag,
  Search,
  TrendingUp,
  Clock,
  Globe,
  Copy,
  Download,
  RefreshCw,
  BookOpen,
  Zap,
  Lightbulb,
  Target
} from "lucide-react"

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
  seoTitle: string;
  seoDescription: string;
  estimatedReadingTime: number;
  keywords: string[];
  tone: string;
  targetAudience: string;
}

interface AIBlogGeneratorProps {
  locale?: string;
  onBlogGenerated?: (blog: BlogPost) => void;
}

interface AIBlogSEOAssistantProps {
  locale?: string;
  blogContent?: string;
  onSEOOptimized?: (seoData: { title: string; description: string; keywords: string[] }) => void;
}

export function AIBlogGenerator({ locale = 'en', onBlogGenerated }: AIBlogGeneratorProps) {
  const [blogTopic, setBlogTopic] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('carpentry-tips');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [targetAudience, setTargetAudience] = useState('homeowners');
  const [blogLength, setBlogLength] = useState('medium');
  const [includeSEO, setIncludeSEO] = useState(true);
  const [generatedBlog, setGeneratedBlog] = useState<BlogPost | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const content = {
    en: {
      title: "AI Blog Generator",
      subtitle: "Create engaging blog content with AI assistance",
      topic: "Blog Topic",
      topicPlaceholder: "Enter your blog topic...",
      category: "Category",
      tone: "Writing Tone",
      audience: "Target Audience",
      length: "Content Length",
      seo: "Include SEO Optimization",
      generate: "Generate Blog Post",
      regenerating: "AI is creating content...",
      advancedSettings: "Advanced Settings",
      customPrompt: "Custom Instructions",
      customPromptPlaceholder: "Add specific instructions for the AI...",
      generatedContent: "Generated Content",
      title: "Title",
      excerpt: "Excerpt",
      content: "Content",
      tags: "Tags",
      seoTitle: "SEO Title",
      seoDescription: "SEO Description",
      keywords: "Keywords",
      readingTime: "Reading Time",
      copyContent: "Copy Content",
      downloadContent: "Download Content",
      regenerate: "Regenerate",
      editContent: "Edit Content",
      publish: "Publish Blog",
      categories: {
        'carpentry-tips': 'Carpentry Tips',
        'hurricane-prep': 'Hurricane Preparation',
        'outdoor-living': 'Outdoor Living',
        'materials-guide': 'Materials Guide',
        'project-showcase': 'Project Showcase',
        'seasonal-maintenance': 'Seasonal Maintenance',
        'diy-vs-professional': 'DIY vs Professional'
      },
      tones: {
        professional: 'Professional',
        friendly: 'Friendly',
        educational: 'Educational',
        conversational: 'Conversational',
        technical: 'Technical'
      },
      audiences: {
        homeowners: 'Homeowners',
        contractors: 'Contractors',
        diy: 'DIY Enthusiasts',
        commercial: 'Commercial Property Owners',
        first-time: 'First-Time Homeowners'
      },
      lengths: {
        short: 'Short (500-700 words)',
        medium: 'Medium (800-1200 words)',
        long: 'Long (1300-1800 words)',
        comprehensive: 'Comprehensive (2000+ words)'
      }
    },
    es: {
      title: "Generador de Blogs con IA",
      subtitle: "Crea contenido de blog atractivo con asistencia de IA",
      topic: "Tema del Blog",
      topicPlaceholder: "Ingresa el tema de tu blog...",
      category: "Categoría",
      tone: "Tono de Escritura",
      audience: "Audiencia Objetivo",
      length: "Longitud del Contenido",
      seo: "Incluir Optimización SEO",
      generate: "Generar Publicación de Blog",
      regenerating: "IA está creando contenido...",
      advancedSettings: "Configuración Avanzada",
      customPrompt: "Instrucciones Personalizadas",
      customPromptPlaceholder: "Agrega instrucciones específicas para la IA...",
      generatedContent: "Contenido Generado",
      title: "Título",
      excerpt: "Extracto",
      content: "Contenido",
      tags: "Etiquetas",
      seoTitle: "Título SEO",
      seoDescription: "Descripción SEO",
      keywords: "Palabras Clave",
      readingTime: "Tiempo de Lectura",
      copyContent: "Copiar Contenido",
      downloadContent: "Descargar Contenido",
      regenerate: "Regenerar",
      editContent: "Editar Contenido",
      publish: "Publicar Blog",
      categories: {
        'carpentry-tips': 'Consejos de Carpintería',
        'hurricane-prep': 'Preparación para Huracanes',
        'outdoor-living': 'Vida Exterior',
        'materials-guide': 'Guía de Materiales',
        'project-showcase': 'Exhibición de Proyectos',
        'seasonal-maintenance': 'Mantenimiento Estacional',
        'diy-vs-professional': 'DIY vs Profesional'
      },
      tones: {
        professional: 'Profesional',
        friendly: 'Amistoso',
        educational: 'Educativo',
        conversational: 'Conversacional',
        technical: 'Técnico'
      },
      audiences: {
        homeowners: 'Propietarios de Viviendas',
        contractors: 'Contratistas',
        diy: 'Entusiastas de DIY',
        commercial: 'Propietarios Comerciales',
        'first-time': 'Propietarios por Primera Vez'
      },
      lengths: {
        short: 'Corto (500-700 palabras)',
        medium: 'Medio (800-1200 palabras)',
        long: 'Largo (1300-1800 palabras)',
        comprehensive: 'Integral (2000+ palabras)'
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const generateBlogPost = async () => {
    if (!blogTopic.trim()) return;

    setIsGenerating(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock blog generation (in production, this would call an actual AI API)
    const mockBlog: BlogPost = {
      title: `${blogTopic}: A Complete Guide for Florida Homeowners`,
      slug: blogTopic.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      excerpt: `Learn everything you need to know about ${blogTopic.toLowerCase()} for your Florida home. This comprehensive guide covers materials, costs, timelines, and expert tips from Original Oak Carpentry.`,
      content: `# ${blogTopic}: A Complete Guide for Florida Homeowners

When it comes to ${blogTopic.toLowerCase()} in Florida, homeowners face unique challenges due to our subtropical climate, hurricane seasons, and specific building codes. At Original Oak Carpentry, we've been helping Florida homeowners make informed decisions about their carpentry projects since 2010.

## Understanding Florida's Unique Requirements

Florida's climate presents specific challenges for ${blogTopic.toLowerCase()}. The combination of high humidity, intense UV exposure, salt air (in coastal areas), and hurricane seasons means that materials and construction techniques must be carefully selected.

### Hurricane-Resistant Construction

All outdoor construction in Florida must meet strict hurricane resistance standards. This includes:

- **Proper fastening systems** that can withstand high winds
- **Pressure-treated lumber** rated for ground contact in humid environments
- **Stainless steel hardware** to prevent corrosion
- **Code-compliant construction** that meets local building requirements

### Material Selection for Florida Climate

Choosing the right materials is crucial for longevity and performance:

**Pressure-Treated Lumber**: Ideal for outdoor projects, treated to resist moisture, insects, and decay. Perfect for decks, pergolas, and outdoor structures.

**Cedar**: Naturally resistant to moisture and insects, with beautiful grain patterns. Excellent for pergolas and decorative elements.

**Composite Materials**: Low-maintenance option that resists fading, staining, and weathering. Great for busy homeowners.

## Cost Considerations

The cost of ${blogTopic.toLowerCase()} varies based on several factors:

- **Project size and complexity**
- **Material selection**
- **Location within Florida**
- **Timeline requirements**
- **Permit and inspection fees**

For a typical project, homeowners can expect to invest between $15,000-$25,000, depending on specifications.

## Timeline and Process

Most ${blogTopic.toLowerCase()} projects follow this timeline:

1. **Consultation and Design** (1-2 weeks)
2. **Permit Acquisition** (2-4 weeks, varies by municipality)
3. **Material Procurement** (1-2 weeks)
4. **Construction** (2-6 weeks, depending on scope)
5. **Final Inspection and Cleanup** (1 week)

## Why Choose Original Oak Carpentry?

With over 14 years of experience in Florida, we understand the unique challenges and requirements of carpentry projects in our state. Our team is:

- **Licensed and insured** in Florida
- **Hurricane construction certified**
- **Experienced** with local building codes
- **Committed to quality** craftsmanship
- **Focused on customer satisfaction**

## Get Started Today

Ready to transform your outdoor space? Contact Original Oak Carpentry for a free consultation and estimate. We'll help you design and build ${blogTopic.toLowerCase()} that enhances your home's value and your family's enjoyment for years to come.

---

*Original Oak Carpentry has been serving Central and South Florida since 2010, specializing in hurricane-resistant outdoor construction and custom carpentry projects.*`,
      tags: ['carpentry', 'florida', 'outdoor living', 'hurricane resistant', 'home improvement'],
      category: selectedCategory,
      seoTitle: `${blogTopic} | Florida Carpentry Guide | Original Oak Carpentry`,
      seoDescription: `Complete guide to ${blogTopic.toLowerCase()} in Florida. Learn about materials, costs, timelines, and hurricane-resistant construction from Original Oak Carpentry experts.`,
      keywords: ['florida carpentry', 'hurricane resistant construction', 'outdoor living', 'custom carpentry', blogTopic.toLowerCase()],
      estimatedReadingTime: 8,
      tone: selectedTone,
      targetAudience: targetAudience
    };

    setGeneratedBlog(mockBlog);
    setIsGenerating(false);

    if (onBlogGenerated) {
      onBlogGenerated(mockBlog);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadContent = () => {
    if (!generatedBlog) return;

    const content = JSON.stringify(generatedBlog, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${generatedBlog.slug}.json`;
    link.click();
  };

  return (
    <Card className="w-full max-w-6xl mx-auto border-border bg-card">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{t.title}</CardTitle>
            <Badge variant="secondary" className="ml-2">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowAdvanced(!showAdvanced)}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Edit3 className="h-4 w-4" />
              {t.advancedSettings}
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4"
              >
              <div>
                <Label htmlFor="topic">{t.topic}</Label>
                <Input
                  id="topic"
                  value={blogTopic}
                  onChange={(e) => setBlogTopic(e.target.value)}
                  placeholder={t.topicPlaceholder}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="category">{t.category}</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(t.categories).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tone">{t.tone}</Label>
                <Select value={selectedTone} onValueChange={setSelectedTone}>
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(t.tones).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="audience">{t.audience}</Label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger id="audience">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(t.audiences).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="length">{t.length}</Label>
                <Select value={blogLength} onValueChange={setBlogLength}>
                  <SelectTrigger id="length">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(t.lengths).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {showAdvanced && (
                <>
                  <div>
                    <Label htmlFor="custom-prompt">{t.customPrompt}</Label>
                    <Textarea
                      id="custom-prompt"
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder={t.customPromptPlaceholder}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="seo" className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      {t.seo}
                    </Label>
                    <input
                      id="seo"
                      type="checkbox"
                      checked={includeSEO}
                      onChange={(e) => setIncludeSEO(e.target.checked)}
                      className="rounded"
                    />
                  </div>
                </>
              )}

              <Button
                onClick={generateBlogPost}
                disabled={isGenerating || !blogTopic.trim()}
                className="w-full gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    {t.regenerating}
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    {t.generate}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Generated Content */}
          <div className="lg:col-span-2 space-y-6">
            {generatedBlog ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {t.generatedContent}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="gap-2">
                      <Clock className="h-3 w-3" />
                      {generatedBlog.estimatedReadingTime} min read
                    </Badge>
                    <Badge variant="secondary" className="capitalize">
                      {t.categories[generatedBlog.category as keyof typeof t.categories]}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <div>
                    <Label>{t.title}</Label>
                    <Input value={generatedBlog.title} readOnly className="bg-background" />
                  </div>

                  <div>
                    <Label>{t.excerpt}</Label>
                    <Textarea value={generatedBlog.excerpt} readOnly className="min-h-[80px] bg-background" />
                  </div>

                  {includeSEO && (
                    <>
                      <div>
                        <Label>{t.seoTitle}</Label>
                        <Input value={generatedBlog.seoTitle} readOnly className="bg-background" />
                      </div>
                      <div>
                        <Label>{t.seoDescription}</Label>
                        <Textarea value={generatedBlog.seoDescription} readOnly className="min-h-[60px] bg-background" />
                      </div>
                    </>
                  )}

                  <div>
                    <Label>{t.content}</Label>
                    <Textarea
                      value={generatedBlog.content}
                      readOnly
                      className="min-h-[400px] font-mono text-sm bg-background"
                    />
                  </div>

                  <div>
                    <Label>{t.tags}</Label>
                    <div className="flex flex-wrap gap-2">
                      {generatedBlog.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {includeSEO && (
                    <div>
                      <Label>{t.keywords}</Label>
                      <div className="flex flex-wrap gap-2">
                        {generatedBlog.keywords.map((keyword, index) => (
                          <Badge key={index} variant="outline">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => copyToClipboard(generatedBlog.content)} className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {t.copyContent}
                  </Button>
                  <Button onClick={downloadContent} variant="outline" className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {t.downloadContent}
                  </Button>
                  <Button variant="outline" className="gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    {t.editContent}
                  </Button>
                  <Button variant="outline" className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {t.regenerate}
                  </Button>
                  <Button className="gap-2 ml-auto"
                  >
                    <Globe className="h-4 w-4" />
                    {t.publish}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[600px] text-center text-muted-foreground"
              >
                <BookOpen className="h-16 w-16 mb-4" />
                <h3 className="font-medium text-lg">Ready to Create Content</h3>
                <p className="text-sm max-w-md">Enter a topic and configure your preferences to generate AI-powered blog content</p>
                <div className="flex items-center gap-2 mt-4"
                >
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="text-sm">Try topics like "hurricane deck preparation" or "outdoor kitchen design"</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AIBlogSEOAssistant({ locale = 'en', blogContent, onSEOOptimized }: AIBlogSEOAssistantProps) {
  const [seoAnalysis, setSeoAnalysis] = useState<{
    title: string;
    description: string;
    keywords: string[];
    score: number;
    suggestions: string[];
  }> | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const content = {
    en: {
      title: "AI SEO Assistant",
      subtitle: "Optimize your content for search engines",
      analyze: "Analyze SEO",
      reanalyze: "Reanalyze",
      analyzing: "AI is analyzing SEO...",
      seoScore: "SEO Score",
      title: "SEO Title",
      description: "Meta Description",
      keywords: "Keywords",
      suggestions: "Improvement Suggestions",
      apply: "Apply Recommendations",
      copy: "Copy SEO Data"
    },
    es: {
      title: "Asistente SEO de IA",
      subtitle: "Optimiza tu contenido para motores de búsqueda",
      analyze: "Analizar SEO",
      reanalyze: "Reanalizar",
      analyzing: "IA está analizando SEO...",
      seoScore: "Puntuación SEO",
      title: "Título SEO",
      description: "Descripción Meta",
      keywords: "Palabras Clave",
      suggestions: "Sugerencias de Mejora",
      apply: "Aplicar Recomendaciones",
      copy: "Copiar Datos SEO"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const analyzeSEO = async () => {
    if (!blogContent) return;

    setIsAnalyzing(true);

    // Simulate AI SEO analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockAnalysis = {
      title: "Hurricane Deck Preparation Guide | Original Oak Carpentry Florida",
      description: "Complete guide to hurricane deck preparation in Florida. Learn how to protect your outdoor structures with expert tips from Original Oak Carpentry.",
      keywords: ['hurricane deck preparation', 'florida deck protection', 'hurricane resistant deck', 'outdoor structure protection', 'florida carpentry'],
      score: 87,
      suggestions: [
        'Include more location-specific keywords like "Central Florida" or "South Florida"',
        'Add internal links to related services pages',
        'Include customer testimonials for social proof',
        'Optimize images with descriptive alt text',
        'Consider adding a FAQ section for voice search optimization'
      ]
    };

    setSeoAnalysis(mockAnalysis);
    setIsAnalyzing(false);

    if (onSEOOptimized) {
      onSEOOptimized(mockAnalysis);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Improvement';
    return 'Poor';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-border">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{t.title}</CardTitle>
          </div>
          <Button
            onClick={analyzeSEO}
            disabled={isAnalyzing || !blogContent}
            className="gap-2"
          >
            {isAnalyzing ? (
              <>
                <TrendingUp className="h-4 w-4 animate-spin" />
                {t.analyzing}
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                {seoAnalysis ? t.reanalyze : t.analyze}
              </>
            )}
          </Button>
        </div>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </CardHeader>

      <CardContent className="pt-6">
        {seoAnalysis ? (
          <div className="space-y-6">
            {/* SEO Score */}
            <div className="text-center p-6 bg-primary/5 rounded-lg">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(seoAnalysis.score)}`}>
                {seoAnalysis.score}/100
              </div>
              <div className={`text-lg font-medium ${getScoreColor(seoAnalysis.score)}`}>
                {getScoreLabel(seoAnalysis.score)}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{t.seoScore}</p>
            </div>

            {/* SEO Data */}
            <div className="space-y-4"
003e
              <div>
                <Label>{t.title}</Label>
                <Input value={seoAnalysis.title} readOnly className="bg-background" />
              </div>
              <div>
                <Label>{t.description}</Label>
                <Textarea value={seoAnalysis.description} readOnly className="min-h-[80px] bg-background" />
              </div>
              <div>
                <Label>{t.keywords}</Label>
                <div className="flex flex-wrap gap-2"
003e
                  {seoAnalysis.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary"
003e
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="space-y-3"
003e
              <Label className="flex items-center gap-2"
003e
                <Lightbulb className="h-4 w-4 text-primary" />
                {t.suggestions}
              </Label>
              <ul className="space-y-2"
003e
                {seoAnalysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm"
003e
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2"
003e
              <Button onClick={() => copyToClipboard(JSON.stringify(seoAnalysis, null, 2))} className="gap-2"
003e
                <Copy className="h-4 w-4" />
                {t.copy}
              </Button>
              <Button className="gap-2"
003e
                {t.apply}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground"
003e
            <Search className="h-12 w-12 mb-4" />
            <h3 className="font-medium text-lg">Ready to Optimize</h3>
            <p className="text-sm max-w-md">Analyze your blog content for SEO improvements and keyword optimization</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}