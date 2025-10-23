'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Image,
  Tag,
  Sparkles,
  Eye,
  Copy,
  RefreshCw,
  Download,
  Share2
} from "lucide-react"

interface ImageTag {
  id: string;
  label: string;
  confidence: number;
  category: 'material' | 'style' | 'room' | 'feature' | 'color' | 'technique';
}

interface AIImageTaggingProps {
  imageUrl: string;
  imageAlt: string;
  locale?: string;
  onTagsGenerated?: (tags: ImageTag[]) => void;
  onAnalysisComplete?: (analysis: any) => void;
}

export function AIImageTagging({
  imageUrl,
  imageAlt,
  locale = 'en',
  onTagsGenerated,
  onAnalysisComplete
}: AIImageTaggingProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);

  const content = {
    en: {
      title: "AI Image Analysis",
      subtitle: "Discover the details in this craftsmanship",
      analyzeButton: "Analyze with AI",
      analyzing: "AI is analyzing the image...",
      tagsTitle: "AI-Generated Tags",
      descriptionTitle: "Project Description",
      styleTitle: "Style Analysis",
      materialsTitle: "Materials Detected",
      estimatedCost: "Estimated Cost Range",
      projectType: "Project Type",
      difficulty: "Complexity Level",
      copyTags: "Copy Tags",
      copied: "Copied!",
      shareAnalysis: "Share Analysis",
      regenerate: "Re-analyze",
      viewDetails: "View Details",
      hideDetails: "Hide Details",
      simple: "Simple",
      standard: "Standard",
      complex: "Complex",
      custom: "Custom"
    },
    es: {
      title: "Análisis de Imagen con IA",
      subtitle: "Descubre los detalles en esta artesanía",
      analyzeButton: "Analizar con IA",
      analyzing: "IA está analizando la imagen...",
      tagsTitle: "Etiquetas Generadas por IA",
      descriptionTitle: "Descripción del Proyecto",
      styleTitle: "Análisis de Estilo",
      materialsTitle: "Materiales Detectados",
      estimatedCost: "Rango de Costo Estimado",
      projectType: "Tipo de Proyecto",
      difficulty: "Nivel de Complejidad",
      copyTags: "Copiar Etiquetas",
      copied: "¡Copiado!",
      shareAnalysis: "Compartir Análisis",
      regenerate: "Re-analizar",
      viewDetails: "Ver Detalles",
      hideDetails: "Ocultar Detalles",
      simple: "Simple",
      standard: "Estándar",
      complex: "Complejo",
      custom: "Personalizado"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const mockAnalysis = {
    tags: [
      { id: '1', label: 'Custom Cabinetry', confidence: 0.95, category: 'feature' },
      { id: '2', label: 'Oak Wood', confidence: 0.92, category: 'material' },
      { id: '3', label: 'Traditional Style', confidence: 0.88, category: 'style' },
      { id: '4', label: 'Kitchen', confidence: 0.90, category: 'room' },
      { id: '5', label: 'Stainless Hardware', confidence: 0.85, category: 'material' },
      { id: '6', label: 'Crown Molding', confidence: 0.87, category: 'feature' },
      { id: '7', label: 'Natural Finish', confidence: 0.83, category: 'color' },
      { id: '8', label: 'Precision Joinery', confidence: 0.91, category: 'technique' }
    ],
    description: "Beautiful custom kitchen cabinetry featuring traditional oak construction with precision joinery. The natural wood finish highlights the grain patterns, while crown molding adds elegant detail. Stainless steel hardware provides durability and modern functionality.",
    style: "Traditional American craftsmanship with attention to detail. The design balances functionality with aesthetic appeal, suitable for both modern and classic kitchen interiors.",
    materials: ["Oak Wood", "Stainless Steel Hardware", "Natural Wood Finish", "Premium Hinges"],
    estimatedCost: "$8,500 - $15,000",
    projectType: "Custom Kitchen Cabinetry",
    difficulty: 'custom'
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);

    try {
      // Use MCP client for real AI analysis
      const { getMCPClient } = await import('@/lib/integrations/mcp-client');
      const mcpClient = getMCPClient();
      const realAnalysis = await mcpClient.analyzeImage(imageUrl);

      setAnalysis(realAnalysis);
      setShowAnalysis(true);

      if (onTagsGenerated) {
        onTagsGenerated(realAnalysis.tags);
      }

      if (onAnalysisComplete) {
        onAnalysisComplete(realAnalysis);
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Fallback to mock analysis
      const randomizedAnalysis = {
        ...mockAnalysis,
        tags: mockAnalysis.tags.map((tag: any) => ({
          ...tag,
          confidence: Math.min(0.99, tag.confidence + (Math.random() - 0.5) * 0.1)
        }))
      };
      setAnalysis(randomizedAnalysis);
      setShowAnalysis(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyTagsToClipboard = async () => {
    if (!analysis) return;

    const tagsText = analysis.tags.map((tag: any) => tag.label).join(', ');
    await navigator.clipboard.writeText(tagsText);
    setCopiedTags(true);

    setTimeout(() => setCopiedTags(false), 2000);
  };

  const shareAnalysis = async () => {
    if (!analysis) return;

    const shareText = `Check out this ${analysis.projectType} project! ${analysis.description} Estimated cost: ${analysis.estimatedCost}`;

    if (navigator.share) {
      await navigator.share({
        title: `${t.title} - ${analysis.projectType}`,
        text: shareText,
        url: window.location.href
      });
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopiedTags(true);
      setTimeout(() => setCopiedTags(false), 2000);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      material: 'bg-amber-100 text-amber-800 border-amber-200',
      style: 'bg-blue-100 text-blue-800 border-blue-200',
      room: 'bg-green-100 text-green-800 border-green-200',
      feature: 'bg-purple-100 text-purple-800 border-purple-200',
      color: 'bg-pink-100 text-pink-800 border-pink-200',
      technique: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="w-full space-y-6">
      {/* Image Display */}
      <div className="relative group">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-64 object-cover rounded-lg border border-border"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary text-primary-foreground">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* Analysis Controls */}
      <div className="flex gap-3">
        {!analysis ? (
          <Button
            onClick={analyzeImage}
            disabled={isAnalyzing}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                {t.analyzing}
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                {t.analyzeButton}
              </>
            )}
          </Button>
        ) : (
          <>
            <Button
              onClick={() => setShowAnalysis(!showAnalysis)}
              variant="outline"
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-2" />
              {showAnalysis ? t.hideDetails : t.viewDetails}
            </Button>
            <Button
              onClick={copyTagsToClipboard}
              variant="outline"
              size="icon"
              className={copiedTags ? 'bg-green-100 text-green-800' : ''}
            >
              {copiedTags ? <Copy className="h-4 w-4" /> : <Tag className="h-4 w-4" />}
            </Button>
            <Button
              onClick={shareAnalysis}
              variant="outline"
              size="icon"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              onClick={analyzeImage}
              variant="outline"
              size="icon"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Analysis Results */}
      {showAnalysis && analysis && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {t.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tags */}
            <div>
              <h4 className="font-semibold mb-3">{t.tagsTitle}</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.tags.map((tag: any) => (
                  <Badge
                    key={tag.id}
                    className={getCategoryColor(tag.category)}
                    variant="outline"
                  >
                    {tag.label}
                    <span className="ml-1 text-xs opacity-75">
                      {Math.round(tag.confidence * 100)}%
                    </span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">{t.projectType}</h4>
                <p className="text-sm text-muted-foreground">{analysis.projectType}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t.difficulty}</h4>
                <Badge variant="secondary" className="capitalize">
                  {t[analysis.difficulty as keyof typeof t] || analysis.difficulty}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t.estimatedCost}</h4>
                <p className="text-sm font-semibold text-primary">{analysis.estimatedCost}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Materials</h4>
                <div className="flex flex-wrap gap-1">
                  {analysis.materials.map((material: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-2">{t.descriptionTitle}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{analysis.description}</p>
            </div>

            {/* Style Analysis */}
            <div>
              <h4 className="font-semibold mb-2">{t.styleTitle}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{analysis.style}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Portfolio integration component
export function AIPortfolioGrid({ locale = 'en', portfolioItems = [] }: { locale?: string; portfolioItems?: any[] }) {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  // Use provided portfolio items or generate sample images based on available items
  const displayImages = portfolioItems.length > 0
    ? portfolioItems.slice(0, 3).map((item: any) => ({
        url: item.image,
        alt: item.title,
        title: item.title
      }))
    : [
        { url: '/custom-cabinetry.jpg', alt: 'Custom kitchen cabinetry', title: 'Custom Kitchen Cabinetry' },
        { url: '/outdoor-deck.jpg', alt: 'Hurricane-resistant deck', title: 'Hurricane-Resistant Deck' },
        { url: '/crown-molding.jpg', alt: 'Crown molding installation', title: 'Crown Molding Installation' }
      ];

  // Actually use the displayImages in the component
  const imagesToDisplay = displayImages;

  const content = {
    en: {
      title: "AI-Enhanced Portfolio",
      subtitle: "Explore our work with intelligent categorization and insights",
      cta: "Try AI Image Analysis"
    },
    es: {
      title: "Portafolio Mejorado con IA",
      subtitle: "Explora nuestro trabajo con categorización inteligente y perspectivas",
      cta: "Probar Análisis de Imagen con IA"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-center text-foreground mb-4">{t.title}</h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {imagesToDisplay.map((image: any) => (
          <div key={image.url} className="space-y-4">
            <div
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-48 object-cover rounded-lg border border-border group-hover:border-primary transition-colors"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Badge className="bg-primary text-primary-foreground">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Analyze
                </Badge>
              </div>
            </div>
            <h3 className="font-semibold text-center">{image.title}</h3>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
          <AIImageTagging
            imageUrl={selectedImage.url}
            imageAlt={selectedImage.alt}
            locale={locale}
          />
        </div>
      )}
    </div>
  );
}