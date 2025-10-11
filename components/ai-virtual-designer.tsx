'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Image as ImageIcon,
  Palette,
  Ruler,
  Zap,
  Download,
  RotateCcw,
  Eye,
  EyeOff,
  Layers,
  Settings,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Camera,
  Save,
  Share2
} from "lucide-react"

interface DesignOverlay {
  id: string;
  type: 'deck' | 'pergola' | 'outdoor-kitchen' | 'railing' | 'stairs';
  name: string;
  svg: string;
  color: string;
  opacity: number;
  scale: number;
  rotation: number;
  x: number;
  y: number;
  visible: boolean;
}

interface DesignProject {
  id: string;
  name: string;
  originalImage: string;
  overlays: DesignOverlay[];
  measurements: {
    width: number;
    height: number;
    area: number;
  };
  createdAt: Date;
  aiSuggestions: string[];
}

interface AIVirtualDesignerProps {
  locale?: string;
  onDesignSaved?: (project: DesignProject) => void;
}

interface AIDesignGalleryProps {
  locale?: string;
  projects?: DesignProject[];
}

export function AIVirtualDesigner({ locale = 'en', onDesignSaved }: AIVirtualDesignerProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<'residential' | 'commercial' | 'outdoor'>('outdoor');
  const [selectedProject, setSelectedProject] = useState<'deck' | 'pergola' | 'outdoor-kitchen' | 'railing' | 'stairs'>('deck');
  const [overlays, setOverlays] = useState<DesignOverlay[]>([]);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [measurements, setMeasurements] = useState({ width: 0, height: 0, area: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const content = {
    en: {
      title: "AI Virtual Designer",
      subtitle: "Visualize your project before we build it",
      uploadPhoto: "Upload Your Space Photo",
      selectSpace: "Select Space Type",
      selectProject: "Choose Project Type",
      designOptions: "Design Options",
      aiRecommendations: "AI Recommendations",
      customizeDesign: "Customize Design",
      saveDesign: "Save Design",
      shareDesign: "Share Design",
      downloadImage: "Download Image",
      resetDesign: "Reset Design",
      spaces: {
        residential: 'Residential',
        commercial: 'Commercial',
        outdoor: 'Outdoor Living'
      },
      projects: {
        deck: 'Custom Deck',
        pergola: 'Pergola/Gazebo',
        'outdoor-kitchen': 'Outdoor Kitchen',
        railing: 'Custom Railing',
        stairs: 'Staircase'
      },
      analyzing: "AI is analyzing your space...",
      suggestions: "AI Suggestions",
      measurements: "Measurements",
      width: "Width",
      height: "Height",
      area: "Area",
      opacity: "Opacity",
      scale: "Scale",
      rotation: "Rotation",
      color: "Color",
      position: "Position",
      visibility: "Visibility",
      overlay: "Overlay",
      noImage: "No image uploaded yet",
      uploadPrompt: "Upload a photo of your space to get started with AI-powered design visualization"
    },
    es: {
      title: "Diseñador Virtual con IA",
      subtitle: "Visualiza tu proyecto antes de que lo construyamos",
      uploadPhoto: "Cargar Foto de tu Espacio",
      selectSpace: "Seleccionar Tipo de Espacio",
      selectProject: "Elegir Tipo de Proyecto",
      designOptions: "Opciones de Diseño",
      aiRecommendations: "Recomendaciones de IA",
      customizeDesign: "Personalizar Diseño",
      saveDesign: "Guardar Diseño",
      shareDesign: "Compartir Diseño",
      downloadImage: "Descargar Imagen",
      resetDesign: "Restablecer Diseño",
      spaces: {
        residential: 'Residencial',
        commercial: 'Comercial',
        outdoor: 'Vida Exterior'
      },
      projects: {
        deck: 'Cubierta Personalizada',
        pergola: 'Pérgola/Gazebo',
        'outdoor-kitchen': 'Cocina Exterior',
        railing: 'Barandilla Personalizada',
        stairs: 'Escalera'
      },
      analyzing: "IA está analizando tu espacio...",
      suggestions: "Sugerencias de IA",
      measurements: "Mediciones",
      width: "Ancho",
      height: "Altura",
      area: "Área",
      opacity: "Opacidad",
      scale: "Escala",
      rotation: "Rotación",
      color: "Color",
      position: "Posición",
      visibility: "Visibilidad",
      overlay: "Superposición",
      noImage: "Aún no se ha cargado imagen",
      uploadPrompt: "Carga una foto de tu espacio para comenzar con visualización de diseño potenciada por IA"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        analyzeImageWithAI();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImageWithAI = async () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate AI suggestions based on image analysis
    const suggestions = [
      'Based on your space layout, a custom deck would enhance your outdoor living area',
      'Consider adding built-in seating for functionality',
      'Hurricane-resistant materials are recommended for Florida climate',
      'The existing foundation appears suitable for deck construction',
      'Optimal deck placement would maximize both sun and shade areas'
    ];

    setAiSuggestions(suggestions);
    setIsAnalyzing(false);
  };

  const addOverlay = () => {
    const newOverlay: DesignOverlay = {
      id: Date.now().toString(),
      type: selectedProject,
      name: t.projects[selectedProject],
      svg: getProjectSVG(selectedProject),
      color: getDefaultColor(selectedProject),
      opacity: 0.8,
      scale: 1.0,
      rotation: 0,
      x: 50,
      y: 50,
      visible: true
    };

    setOverlays(prev => [...prev, newOverlay]);
    setActiveOverlay(newOverlay.id);
  };

  const getProjectSVG = (project: string) => {
    const svgs = {
      deck: `<svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="180" height="120" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="2"/>
        <line x1="10" y1="20" x2="10" y2="140" stroke="currentColor" stroke-width="3"/>
        <line x1="190" y1="20" x2="190" y2="140" stroke="currentColor" stroke-width="3"/>
        <line x1="10" y1="140" x2="190" y2="140" stroke="currentColor" stroke-width="3"/>
      </svg>`,
      pergola: `<svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="30" width="160" height="90" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="20" y1="30" x2="20" y2="120" stroke="currentColor" stroke-width="2"/>
        <line x1="180" y1="30" x2="180" y2="120" stroke="currentColor" stroke-width="2"/>
        <line x1="20" y1="30" x2="180" y2="30" stroke="currentColor" stroke-width="2"/>
        <line x1="20" y1="120" x2="180" y2="120" stroke="currentColor" stroke-width="2"/>
      </svg>`,
      'outdoor-kitchen': `<svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="80" width="140" height="60" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="2"/>
        <rect x="50" y="60" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1"/>
        <rect x="80" y="60" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1"/>
        <rect x="110" y="60" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1"/>
      </svg>`
    };
    return svgs[project as keyof typeof svgs] || '';
  };

  const getDefaultColor = (project: string) => {
    const colors = {
      deck: '#8B4513',
      pergola: '#A67B5B',
      'outdoor-kitchen': '#D2691E',
      railing: '#696969',
      stairs: '#8B4513'
    };
    return colors[project as keyof typeof colors] || '#8B4513';
  };

  const updateOverlay = (id: string, updates: Partial<DesignOverlay>) => {
    setOverlays(prev => prev.map(overlay =>
      overlay.id === id ? { ...overlay, ...updates } : overlay
    ));
  };

  const removeOverlay = (id: string) => {
    setOverlays(prev => prev.filter(overlay => overlay.id !== id));
    if (activeOverlay === id) {
      setActiveOverlay(null);
    }
  };

  const saveDesign = () => {
    if (!uploadedImage) return;

    const project: DesignProject = {
      id: Date.now().toString(),
      name: `${t.projects[selectedProject]} Design`,
      originalImage: uploadedImage,
      overlays: overlays,
      measurements: measurements,
      createdAt: new Date(),
      aiSuggestions: aiSuggestions
    };

    if (onDesignSaved) {
      onDesignSaved(project);
    }
  };

  const downloadDesign = () => {
    if (!uploadedImage || overlays.length === 0) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Add overlays
      overlays.forEach(overlay => {
        if (!overlay.visible) return;

        ctx.globalAlpha = overlay.opacity;
        ctx.save();
        ctx.translate(overlay.x * canvas.width / 100, overlay.y * canvas.height / 100);
        ctx.rotate((overlay.rotation * Math.PI) / 180);
        ctx.scale(overlay.scale, overlay.scale);

        // Simple rectangle for demo - in real implementation, you'd parse and render SVG
        ctx.fillStyle = overlay.color + '40';
        ctx.strokeStyle = overlay.color;
        ctx.lineWidth = 2;
        ctx.fillRect(-50, -50, 100, 100);
        ctx.strokeRect(-50, -50, 100, 100);

        ctx.restore();
      });

      // Download
      const link = document.createElement('a');
      link.download = 'ai-design.png';
      link.href = canvas.toDataURL();
      link.click();
    };
    img.src = uploadedImage;
  };

  return (
    <Card className="w-full max-w-7xl mx-auto border-border bg-card">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Palette className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{t.title}</CardTitle>
            <Badge variant="secondary" className="ml-2">
              <Zap className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
          <div className="flex items-center gap-2"
003e
            <Button onClick={saveDesign} disabled={!uploadedImage || overlays.length === 0} className="gap-2"
003e
              <Save className="h-4 w-4" />
              {t.saveDesign}
            </Button>
            <Button onClick={downloadDesign} disabled={!uploadedImage || overlays.length === 0} variant="outline" className="gap-2"
003e
              <Download className="h-4 w-4" />
              {t.downloadImage}
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Upload */}
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center"
003e
              {uploadedImage ? (
                <div className="space-y-3"
003e
                  <img
                    src={uploadedImage}
                    alt="Uploaded space"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="gap-2 w-full"
                  >
                    <Upload className="h-4 w-4" />
                    Change Photo
                  </Button>
                </div>
              ) : (
                <div className="space-y-3"
003e
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto" />
                  <Label htmlFor="photo-upload" className="cursor-pointer"
003e
                    <Button className="gap-2"
003e
                      <Upload className="h-4 w-4" />
                      {t.uploadPhoto}
                    </Button>
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      ref={fileInputRef}
                    />
                  </Label>
                  <p className="text-sm text-muted-foreground">{t.uploadPrompt}</p>
                </div>
              )}
            </div>

            {/* Space and Project Selection */}
            <div className="space-y-4"
003e
              <div>
                <Label>{t.selectSpace}</Label>
                <Select value={selectedSpace} onValueChange={setSelectedSpace}>
                  <SelectContent>
                    {Object.entries(t.spaces).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{t.selectProject}</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectContent>
                    {Object.entries(t.projects).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={addOverlay}
                disabled={!uploadedImage}
                className="w-full gap-2"
              >
                <Layers className="h-4 w-4" />
                Add {t.projects[selectedProject]}
              </Button>
            </div>

            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="space-y-3"
003e
                <h4 className="font-medium flex items-center gap-2"
003e
                  <Sparkles className="h-4 w-4 text-primary" />
                  {t.aiRecommendations}
                </h4>
                <ul className="space-y-2 text-sm"
003e
                  {aiSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2"
003e
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex items-center gap-2 text-muted-foreground"
003e
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>{t.analyzing}</span>
              </div>
            )}
          </div>

          {/* Main Canvas */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border-2 border-border rounded-lg p-4 bg-muted min-h-[400px] flex items-center justify-center"
003e
              {uploadedImage ? (
                <div className="relative w-full h-full"
003e
                  <img
                    src={uploadedImage}
                    alt="Design space"
                    className="w-full h-full object-contain rounded-lg"
                  />

                  {/* Overlays */}
                  {overlays.map((overlay) => (
                    overlay.visible && (
                      <div
                        key={overlay.id}
                        className="absolute cursor-pointer"
                        style={{
                          left: `${overlay.x}%`,
                          top: `${overlay.y}%`,
                          transform: `translate(-50%, -50%) rotate(${overlay.rotation}deg) scale(${overlay.scale})`,
                          opacity: overlay.opacity
                        }}
                        onClick={() => setActiveOverlay(overlay.id)}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: overlay.svg }}
                          style={{ color: overlay.color }}
                          className={activeOverlay === overlay.id ? 'ring-2 ring-primary' : ''}
                        />
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground"
003e
                  <ImageIcon className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="font-medium">{t.noImage}</h3>
                  <p className="text-sm">{t.uploadPrompt}</p>
                </div>
              )}
            </div>
          </div>

          {/* Overlay Controls */}
          <div className="lg:col-span-1 space-y-6"
003e
            <Tabs value={activeOverlay || 'none'} className="w-full"
003e
              <TabsList className="grid w-full grid-cols-2"
003e
                <TabsTrigger value="none" disabled={!activeOverlay}>Overview</TabsTrigger>
                <TabsTrigger value={activeOverlay || 'none'} disabled={!activeOverlay}>{t.customizeDesign}</TabsTrigger>
              </TabsList>

              <TabsContent value="none" className="space-y-4"
003e
                <div className="space-y-3"
003e
                  <h4 className="font-medium">{t.designOptions}</h4>
                  {overlays.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No overlays added yet</p>
                  ) : (
                    <div className="space-y-2"
003e
                      {overlays.map((overlay) => (
                        <div
                          key={overlay.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-card border cursor-pointer hover:bg-accent"
                          onClick={() => setActiveOverlay(overlay.id)}
                        >
                          <div className="flex items-center gap-2"
003e
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: overlay.color }}
                            />
                            <span className="text-sm font-medium">{overlay.name}</span>
                          </div>
                          <div className="flex items-center gap-1"
003e
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateOverlay(overlay.id, { visible: !overlay.visible });
                              }}
                              className="h-6 w-6 p-0"
                            >
                              {overlay.visible ? (
                                <Eye className="h-3 w-3" />
                              ) : (
                                <EyeOff className="h-3 w-3" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeOverlay(overlay.id);
                              }}
                              className="h-6 w-6 p-0 text-red-500"
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value={activeOverlay || 'none'} className="space-y-4"
003e
                {activeOverlay && (() => {
                  const overlay = overlays.find(o => o.id === activeOverlay);
                  if (!overlay) return null;

                  return (
                    <div className="space-y-4"
003e
                      <div>
                        <Label>{t.color}</Label>
                        <Input
                          type="color"
                          value={overlay.color}
                          onChange={(e) => updateOverlay(overlay.id, { color: e.target.value })}
                          className="w-full h-10"
                        />
                      </div>

                      <div>
                        <Label>{t.opacity} ({Math.round(overlay.opacity * 100)}%)</Label>
                        <Slider
                          value={[overlay.opacity]}
                          onValueChange={(value) => updateOverlay(overlay.id, { opacity: value[0] })}
                          min={0.1}
                          max={1}
                          step={0.1}
                        />
                      </div>

                      <div>
                        <Label>{t.scale} ({overlay.scale.toFixed(1)}x)</Label>
                        <Slider
                          value={[overlay.scale]}
                          onValueChange={(value) => updateOverlay(overlay.id, { scale: value[0] })}
                          min={0.5}
                          max={2}
                          step={0.1}
                        />
                      </div>

                      <div>
                        <Label>{t.rotation} ({overlay.rotation}°)</Label>
                        <Slider
                          value={[overlay.rotation]}
                          onValueChange={(value) => updateOverlay(overlay.id, { rotation: value[0] })}
                          min={-180}
                          max={180}
                          step={15}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2"
003e
                        <Button
                          onClick={() => updateOverlay(overlay.id, { x: overlay.x - 5 })}
                          variant="outline"
                          className="text-xs"
                        >
                          ← Left
                        </Button>
                        <Button
                          onClick={() => updateOverlay(overlay.id, { x: overlay.x + 5 })}
                          variant="outline"
                          className="text-xs"
                        >
                          Right →
                        </Button>
                        <Button
                          onClick={() => updateOverlay(overlay.id, { y: overlay.y - 5 })}
                          variant="outline"
                          className="text-xs"
                        >
                          ↑ Up
                        </Button>
                        <Button
                          onClick={() => updateOverlay(overlay.id, { y: overlay.y + 5 })}
                          variant="outline"
                          className="text-xs"
                        >
                          Down ↓
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AIDesignGallery({ locale = 'en', projects = [] }: AIDesignGalleryProps) {
  const content = {
    en: {
      title: "AI Design Gallery",
      subtitle: "See how AI has helped visualize projects for our clients",
      viewProject: "View Project",
      aiFeatures: "AI Features Used",
      beforeAfter: "Before & After",
      measurements: "Measurements",
      suggestions: "AI Suggestions"
    },
    es: {
      title: "Galería de Diseños con IA",
      subtitle: "Mira cómo IA ha ayudado a visualizar proyectos para nuestros clientes",
      viewProject: "Ver Proyecto",
      aiFeatures: "Características de IA Usadas",
      beforeAfter: "Antes y Después",
      measurements: "Mediciones",
      suggestions: "Sugerencias de IA"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  // Mock projects for demo
  const mockProjects: DesignProject[] = [
    {
      id: '1',
      name: 'Custom Deck Design',
      originalImage: '/api/placeholder/400/300',
      overlays: [],
      measurements: { width: 16, height: 12, area: 192 },
      createdAt: new Date(),
      aiSuggestions: ['Optimal deck placement identified', 'Hurricane-resistant materials recommended', 'Built-in seating suggested']
    },
    {
      id: '2',
      name: 'Outdoor Kitchen Layout',
      originalImage: '/api/placeholder/400/300',
      overlays: [],
      measurements: { width: 12, height: 8, area: 96 },
      createdAt: new Date(),
      aiSuggestions: ['Perfect space for outdoor kitchen', 'Consider weather protection', 'Utility connections nearby']
    }
  ];

  const displayProjects = projects.length > 0 ? projects : mockProjects;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">{t.title}</h2>
        <p className="text-lg text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
003e
        {displayProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden"
003e
            <div className="aspect-video relative"
003e
              <img
                src={project.originalImage}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2"
003e
                <Badge className="bg-primary text-primary-foreground"
003e
                  <Zap className="h-3 w-3 mr-1" />
                  AI Designed
                </Badge>
              </div>
            </div>
            <CardContent className="p-4 space-y-3"
003e
              <h3 className="font-semibold text-lg">{project.name}</h3>

              <div className="grid grid-cols-3 gap-2 text-sm"
003e
                <div className="text-center"
003e
                  <div className="font-medium">{project.measurements.width}ft</div>
                  <div className="text-muted-foreground">Width</div>
                </div>
                <div className="text-center"
003e
                  <div className="font-medium">{project.measurements.height}ft</div>
                  <div className="text-muted-foreground">Height</div>
                </div>
                <div className="text-center"
003e
                  <div className="font-medium">{project.measurements.area}sq ft</div>
                  <div className="text-muted-foreground">Area</div>
                </div>
              </div>

              <div className="space-y-2"
003e
                <h4 className="font-medium text-sm">{t.aiFeatures}</h4>
                <ul className="space-y-1"
003e
                  {project.aiSuggestions.slice(0, 3).map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground"
003e
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full gap-2"
003e
                {t.viewProject}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}