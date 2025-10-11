'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Camera,
  Tag,
  Sparkles,
  Eye,
  Settings,
  Download,
  Upload,
  Image as ImageIcon,
  Search,
  Filter,
  TrendingUp,
  Palette,
  Ruler,
  Clock,
  Star
} from "lucide-react"

interface AIImageTag {
  tag: string;
  confidence: number;
  category: 'style' | 'material' | 'feature' | 'color' | 'technique' | 'season';
}

interface AIImageAnalysis {
  tags: AIImageTag[];
  description: string;
  style: string;
  materials: string[];
  techniques: string[];
  colors: string[];
  estimatedCost: {
    range: string;
    confidence: number;
  };
  projectType: string;
  difficulty: 'basic' | 'intermediate' | 'advanced' | 'master';
  timeEstimate: string;
  season: string;
}

interface AIImageTaggingProps {
  locale?: string;
  imageUrl?: string;
  onTagsGenerated?: (tags: AIImageTag[], analysis: AIImageAnalysis) => void;
}

interface PortfolioGridProps {
  locale?: string;
  images?: Array<{
    id: string;
    url: string;
    title: string;
    category: string;
    aiAnalysis?: AIImageAnalysis;
  }>;
}

export function AIImageTagging({ locale = 'en', imageUrl, onTagsGenerated }: AIImageTaggingProps) {
  const [image, setImage] = useState<string | null>(imageUrl || null);
  const [analysis, setAnalysis] = useState<AIImageAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const content = {
    en: {
      title: "AI Image Analysis",
      subtitle: "Automatically tag and analyze portfolio images",
      upload: "Upload Image",
      analyze: "Analyze with AI",
      reanalyze: "Reanalyze",
      analyzing: "AI is analyzing image...",
      advancedSettings: "Advanced Settings",
      customPrompt: "Custom Analysis Prompt",
      tags: "Generated Tags",
      description: "AI Description",
      materials: "Materials Detected",
      techniques: "Techniques Identified",
      colors: "Color Palette",
      costEstimate: "Cost Estimate",
      projectType: "Project Type",
      difficulty: "Difficulty Level",
      timeEstimate: "Time Estimate",
      season: "Best Season",
      confidence: "Confidence",
      downloadTags: "Download Tags",
      copyDescription: "Copy Description",
      generateCaseStudy: "Generate Case Study",
      seoSuggestions: "SEO Suggestions",
      categories: {
        style: 'Style',
        material: 'Material',
        feature: 'Feature',
        color: 'Color',
        technique: 'Technique',
        season: 'Season'
      },
      difficulties: {
        basic: 'Basic',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        master: 'Master'
      }
    },
    es: {
      title: "Análisis de Imagen con IA",
      subtitle: "Etiqueta y analiza automáticamente imágenes de portafolio",
      upload: "Cargar Imagen",
      analyze: "Analizar con IA",
      reanalyze: "Reanalizar",
      analyzing: "IA está analizando imagen...",
      advancedSettings: "Configuración Avanzada",
      customPrompt: "Indicación de Análisis Personalizada",
      tags: "Etiquetas Generadas",
      description: "Descripción de IA",
      materials: "Materiales Detectados",
      techniques: "Técnicas Identificadas",
      colors: "Paleta de Colores",
      costEstimate: "Estimación de Costo",
      projectType: "Tipo de Proyecto",
      difficulty: "Nivel de Dificultad",
      timeEstimate: "Tiempo Estimado",
      season: "Mejor Temporada",
      confidence: "Confianza",
      downloadTags: "Descargar Etiquetas",
      copyDescription: "Copiar Descripción",
      generateCaseStudy: "Generar Estudio de Caso",
      seoSuggestions: "Sugerencias SEO",
      categories: {
        style: 'Estilo',
        material: 'Material',
        feature: 'Característica',
        color: 'Color',
        technique: 'Técnica',
        season: 'Temporada'
      },
      difficulties: {
        basic: 'Básico',
        intermediate: 'Intermedio',
        advanced: 'Avanzado',
        master: 'Maestro'
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;

    setIsAnalyzing(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate AI analysis (in production, this would call an actual AI vision API)
    const mockAnalysis: AIImageAnalysis = {
      tags: [
        { tag: 'custom deck', confidence: 95, category: 'feature' },
        { tag: 'pressure treated lumber', confidence: 92, category: 'material' },
        { tag: 'modern design', confidence: 88, category: 'style' },
        { tag: 'outdoor living', confidence: 90, category: 'feature' },
        { tag: 'stainless steel hardware', confidence: 85, category: 'material' },
        { tag: 'hurricane resistant', confidence: 93, category: 'feature' },
        { tag: 'natural wood finish', confidence: 87, category: 'technique' },
        { tag: 'central florida', confidence: 89, category: 'style' },
        { tag: 'summer project', confidence: 82, category: 'season' },
        { tag: 'brown tones', confidence: 91, category: 'color' }
      ],
      description: "A beautifully crafted custom deck featuring pressure-treated lumber with a natural finish. The modern design incorporates hurricane-resistant construction techniques suitable for Florida's climate. Stainless steel hardware ensures longevity in outdoor conditions.",
      style: 'Modern Coastal',
      materials: ['Pressure Treated Lumber', 'Stainless Steel Hardware', 'Protective Sealant'],
      techniques: ['Precision Cutting', 'Hurricane-Resistant Framing', 'Natural Finishing'],
      colors: ['Natural Wood Brown', 'Steel Gray', 'Weathered Gray'],
      estimatedCost: {
        range: '$12,000 - $18,000',
        confidence: 87
      },
      projectType: 'Custom Deck Construction',
      difficulty: 'advanced',
      timeEstimate: '2-3 weeks',
      season: 'Spring/Summer'
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);

    if (onTagsGenerated) {
      onTagsGenerated(mockAnalysis.tags, mockAnalysis);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      style: 'bg-purple-100 text-purple-800 border-purple-200',
      material: 'bg-blue-100 text-blue-800 border-blue-200',
      feature: 'bg-green-100 text-green-800 border-green-200',
      color: 'bg-pink-100 text-pink-800 border-pink-200',
      technique: 'bg-orange-100 text-orange-800 border-orange-200',
      season: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadTags = () => {
    if (!analysis) return;

    const tagsData = {
      tags: analysis.tags,
      description: analysis.description,
      materials: analysis.materials,
      techniques: analysis.techniques,
      colors: analysis.colors,
      projectType: analysis.projectType,
      difficulty: analysis.difficulty,
      timeEstimate: analysis.timeEstimate,
      estimatedCost: analysis.estimatedCost
    };

    const dataStr = JSON.stringify(tagsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ai-image-analysis.json';
    link.click();
  };

  return (
    <Card className="w-full max-w-6xl mx-auto border-border bg-card">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Camera className="h-6 w-6 text-primary" />
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
              <Settings className="h-4 w-4" />
              {t.advancedSettings}
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Upload and Preview */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {image ? (
                <div className="space-y-4">
                  <img
                    src={image}
                    alt="Uploaded project"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  <div className="flex gap-2 justify-center">
                    <Button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      {isAnalyzing ? t.analyzing : (analysis ? t.reanalyze : t.analyze)}
                    </Button>
                    <Label htmlFor="reupload" className="cursor-pointer">
                      <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload New
                      </Button>
                      <Input
                        id="reupload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </Label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto" />
                  <div>
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <Button className="gap-2">
                        <Upload className="h-4 w-4" />
                        {t.upload}
                      </Button>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload a project image to get AI-powered analysis and tags
                  </p>
                </div>
              )}
            </div>

            {/* Advanced Settings */}
            {showAdvanced && (
              <div className="space-y-4 p-4 bg-muted rounded-lg">
                <div>
                  <Label htmlFor="custom-prompt">{t.customPrompt}</Label>
                  <Textarea
                    id="custom-prompt"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Focus on hurricane-resistant features, outdoor living spaces, or specific materials..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysis ? (
              <>
                {/* Project Overview */}
                <div className="space-y-3">
                  <div>
                    <Label>{t.projectType}</Label>
                    <p className="font-medium">{analysis.projectType}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{t.difficulty}</Label>
                      <Badge className="capitalize">{t.difficulties[analysis.difficulty as keyof typeof t.difficulties]}</Badge>
                    </div>
                    <div>
                      <Label>{t.timeEstimate}</Label>
                      <p className="font-medium">{analysis.timeEstimate}</p>
                    </div>
                  </div>
                </div>

                {/* Cost Estimate */}
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {t.costEstimate}
                    </Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {t.confidence}: {analysis.estimatedCost.confidence}%
                      </Badge>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {analysis.estimatedCost.range}
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <Label>{t.tags}</Label>
                  <div className="flex flex-wrap gap-2">
                    {analysis.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className={getCategoryColor(tag.category)}
                        title={`${tag.tag} (${tag.confidence}% confidence)`}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag.tag}
                        <span className="ml-1 text-xs opacity-75">{tag.confidence}%</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>{t.description}</Label>
                    <Button
                      onClick={() => copyToClipboard(analysis.description)}
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                    >
                      <Sparkles className="h-3 w-3" />
                      {t.copyDescription}
                    </Button>
                  </div>
                  <Textarea
                    value={analysis.description}
                    readOnly
                    className="min-h-[100px] bg-muted"
                  />
                </div>

                {/* Materials, Techniques, Colors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      {t.materials}
                    </Label>
                    <ul className="text-sm space-y-1">
                      {analysis.materials.map((material, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      {t.techniques}
                    </Label>
                    <ul className="text-sm space-y-1">
                      {analysis.techniques.map((technique, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{technique}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      {t.colors}
                    </Label>
                    <ul className="text-sm space-y-1">
                      {analysis.colors.map((color, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: color.toLowerCase().includes('brown') ? '#8B4513' :
                                    color.toLowerCase().includes('gray') ? '#808080' :
                                    color.toLowerCase().includes('red') ? '#DC143C' : '#D2691E' }}
                          />
                          <span>{color}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button onClick={downloadTags} className="gap-2">
                    <Download className="h-4 w-4" />
                    {t.downloadTags}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Star className="h-4 w-4" />
                    {t.generateCaseStudy}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Search className="h-4 w-4" />
                    {t.seoSuggestions}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                <Camera className="h-12 w-12 mb-4" />
                <h3 className="font-medium">Ready for Analysis</h3>
                <p className="text-sm">Upload an image to get AI-powered insights and tags</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AIPortfolioGrid({ locale = 'en', images = [] }: PortfolioGridProps) {
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const content = {
    en: {
      title: "AI-Enhanced Portfolio",
      subtitle: "Explore our work with intelligent categorization and insights",
      search: "Search projects...",
      categories: {
        all: 'All Projects',
        deck: 'Decks',
        pergola: 'Pergolas',
        cabinetry: 'Cabinetry',
        trim: 'Trim Work',
        outdoor: 'Outdoor Living',
        hurricane: 'Hurricane Protection'
      },
      sort: {
        newest: 'Newest First',
        oldest: 'Oldest First',
        complexity: 'By Complexity',
        cost: 'By Cost Range'
      },
      viewProject: "View Project",
      aiInsights: "AI Insights",
      estimatedCost: "Est. Cost",
      difficulty: "Difficulty",
      projectDetails: "Project Details"
    },
    es: {
      title: "Portafolio Mejorado con IA",
      subtitle: "Explora nuestro trabajo con categorización inteligente y perspectivas",
      search: "Buscar proyectos...",
      categories: {
        all: 'Todos los Proyectos',
        deck: 'Cubiertas',
        pergola: 'Pérgolas',
        cabinetry: 'Gabinetes',
        trim: 'Trabajo de Molduras',
        outdoor: 'Vida Exterior',
        hurricane: 'Protección contra Huracanes'
      },
      sort: {
        newest: 'Más Nuevos Primero',
        oldest: 'Más Antiguos Primero',
        complexity: 'Por Complejidad',
        cost: 'Por Rango de Costo'
      },
      viewProject: "Ver Proyecto",
      aiInsights: "Perspectivas de IA",
      estimatedCost: "Costo Est.",
      difficulty: "Dificultad",
      projectDetails: "Detalles del Proyecto"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  // Mock portfolio data with AI analysis
  const portfolioImages = images.length > 0 ? images : [
    {
      id: '1',
      url: '/api/placeholder/400/300',
      title: 'Custom Hurricane-Resistant Deck',
      category: 'deck',
      aiAnalysis: {
        tags: [
          { tag: 'custom deck', confidence: 95, category: 'feature' },
          { tag: 'hurricane resistant', confidence: 93, category: 'feature' },
          { tag: 'pressure treated lumber', confidence: 92, category: 'material' }
        ],
        description: "Custom deck built with hurricane-resistant construction techniques.",
        style: 'Modern Coastal',
        materials: ['Pressure Treated Lumber', 'Stainless Steel Hardware'],
        techniques: ['Hurricane-Resistant Framing'],
        colors: ['Natural Wood', 'Steel Gray'],
        estimatedCost: { range: '$15,000 - $22,000', confidence: 89 },
        projectType: 'Custom Deck Construction',
        difficulty: 'advanced',
        timeEstimate: '3-4 weeks',
        season: 'Spring/Summer'
      }
    },
    {
      id: '2',
      url: '/api/placeholder/400/300',
      title: 'Outdoor Kitchen Pergola',
      category: 'pergola',
      aiAnalysis: {
        tags: [
          { tag: 'outdoor kitchen', confidence: 94, category: 'feature' },
          { tag: 'pergola', confidence: 96, category: 'feature' },
          { tag: 'cedar construction', confidence: 88, category: 'material' }
        ],
        description: "Beautiful cedar pergola with integrated outdoor kitchen space.",
        style: 'Rustic Elegance',
        materials: ['Western Red Cedar', 'Stainless Steel'],
        techniques: ['Traditional Joinery', 'Weather Sealing'],
        colors: ['Cedar Red', 'Natural Wood'],
        estimatedCost: { range: '$8,000 - $12,000', confidence: 85 },
        projectType: 'Pergola with Outdoor Kitchen',
        difficulty: 'intermediate',
        timeEstimate: '2-3 weeks',
        season: 'Spring/Fall'
      }
    }
  ];

  const filteredImages = portfolioImages.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.aiAnalysis?.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.aiAnalysis?.tags.some(tag => tag.tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{t.title}</h2>
        <p className="text-lg text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(t.categories).map(([key, value]) => (
              <SelectItem key={key} value={key}>{value}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(t.sort).map(([key, value]) => (
              <SelectItem key={key} value={key}>{value}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Portfolio Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
003e
            <div className="aspect-video relative overflow-hidden"
003e
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
003e
                <Button
                  onClick={() => setSelectedImage(image)}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  {t.viewProject}
                </Button>
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{image.title}</h3>
                <Badge variant="secondary" className="capitalize">{image.category}</Badge>
              </div>

              {image.aiAnalysis && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t.estimatedCost}</span>
                    <span className="font-medium">{image.aiAnalysis.estimatedCost.range}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t.difficulty}</span>
                    <Badge size="sm" className="capitalize">
                      {t.difficulties[image.aiAnalysis.difficulty as keyof typeof t.difficulties]}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {image.aiAnalysis.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs"
003e
                        {tag.tag}
                      </Badge>
                    ))}
                    {image.aiAnalysis.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs"
003e
                        +{image.aiAnalysis.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Detail Modal */}
      {selectedImage && selectedImage.aiAnalysis && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
003e
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
003e
            <CardHeader className="flex flex-row items-center justify-between"
003e
              <div>
                <CardTitle>{selectedImage.title}</CardTitle>
                <Badge variant="secondary" className="capitalize">{selectedImage.category}</Badge>
              </div>
              <Button
                onClick={() => setSelectedImage(null)}
                variant="ghost"
                size="icon"
              >
                ×
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{t.aiInsights}</h4>
                    <p className="text-muted-foreground">{selectedImage.aiAnalysis.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.estimatedCost}</h4>
                    <p className="text-lg font-medium text-primary">{selectedImage.aiAnalysis.estimatedCost.range}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.aiAnalysis.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs"
003e
                          {tag.tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">{t.difficulty}</h4>
                      <Badge className="capitalize">
                        {t.difficulties[selectedImage.aiAnalysis.difficulty as keyof typeof t.difficulties]}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold">{t.timeEstimate}</h4>
                      <p>{selectedImage.aiAnalysis.timeEstimate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}