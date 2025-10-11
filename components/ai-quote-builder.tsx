'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Calculator,
  CheckCircle,
  DollarSign,
  Ruler,
  Clock,
  MapPin,
  Users,
  Zap,
  Download,
  Send,
  Plus,
  Minus,
  ArrowRight,
  Star,
  TrendingUp,
  FileText
} from "lucide-react"

interface ServiceItem {
  id: string;
  category: string;
  name: string;
  description: string;
  basePrice: number;
  unit: 'sqft' | 'linear' | 'unit' | 'project';
  options?: {
    id: string;
    name: string;
    price: number;
    description?: string;
  }[];
}

interface SelectedService {
  serviceId: string;
  quantity: number;
  selectedOptions: string[];
  notes: string;
}

interface QuoteRequest {
  services: SelectedService[];
  projectSize: number;
  complexity: 'basic' | 'standard' | 'premium' | 'luxury';
  location: string;
  timeline: 'flexible' | 'standard' | 'urgent';
  materials: 'standard' | 'premium' | 'composite' | 'custom';
  notes: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

interface AIQuoteBuilderProps {
  locale?: string;
  onQuoteGenerated?: (quote: any) => void;
}

interface AIPriceOptimizerProps {
  locale?: string;
  services?: SelectedService[];
  projectDetails?: {
    size: number;
    complexity: string;
    location: string;
    timeline: string;
    materials: string;
  };
  onPriceOptimized?: (optimization: any) => void;
}

export function AIQuoteBuilder({ locale = 'en', onQuoteGenerated }: AIQuoteBuilderProps) {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [projectSize, setProjectSize] = useState(200);
  const [complexity, setComplexity] = useState<'standard' | 'premium' | 'luxury' | 'basic'>('standard');
  const [location, setLocation] = useState('central-florida');
  const [timeline, setTimeline] = useState<'standard' | 'urgent' | 'flexible'>('standard');
  const [materials, setMaterials] = useState<'standard' | 'premium' | 'composite' | 'custom'>('standard');
  const [notes, setNotes] = useState('');
  const [quoteGenerated, setQuoteGenerated] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const content = {
    en: {
      title: "AI Quote Builder",
      subtitle: "Build your custom quote with intelligent pricing",
      selectServices: "Select Services",
      projectDetails: "Project Details",
      contactInfo: "Contact Information",
      generateQuote: "Generate AI Quote",
      regenerating: "AI is calculating your quote...",
      services: {
        title: "Choose Your Services",
        description: "Select the carpentry services you need for your project"
      },
      projectSize: "Project Size (sq ft)",
      complexity: "Project Complexity",
      location: "Service Location",
      timeline: "Project Timeline",
      materials: "Material Grade",
      notes: "Additional Notes",
      notesPlaceholder: "Tell us more about your project requirements...",
      totalEstimate: "Total Estimate",
      basePrice: "Base Price",
      complexityMultiplier: "Complexity Factor",
      locationMultiplier: "Location Factor",
      timelineMultiplier: "Timeline Factor",
      materialMultiplier: "Material Factor",
      aiRecommendations: "AI Recommendations",
      confidence: "AI Confidence",
      downloadQuote: "Download Quote",
      sendQuote: "Send Quote",
      bookConsultation: "Book Consultation",
      disclaimer: "This is an AI-generated estimate. Final pricing may vary based on site inspection and specific requirements.",
      categories: {
        'outdoor': 'Outdoor Living',
        'interior': 'Interior Carpentry',
        'structural': 'Structural Work',
        'finishing': 'Finishing & Trim',
        'hurricane': 'Hurricane Protection'
      },
      complexities: {
        basic: 'Basic Design',
        standard: 'Standard Design',
        premium: 'Premium Design',
        luxury: 'Luxury/Custom'
      },
      locations: {
        'central-florida': 'Central Florida',
        'tampa-bay': 'Tampa Bay Area',
        'south-florida': 'South Florida',
        'miami-dade': 'Miami-Dade County',
        'broward': 'Broward County',
        'palm-beach': 'Palm Beach County'
      },
      timelines: {
        flexible: 'Flexible (8+ weeks)',
        standard: 'Standard (4-6 weeks)',
        urgent: 'Urgent (2-3 weeks)'
      },
      materials: {
        standard: 'Standard Grade',
        premium: 'Premium Grade',
        composite: 'Composite Materials',
        custom: 'Custom/Exotic'
      }
    },
    es: {
      title: "Constructor de Cotizaciones con IA",
      subtitle: "Construye tu cotización personalizada con precios inteligentes",
      selectServices: "Seleccionar Servicios",
      projectDetails: "Detalles del Proyecto",
      contactInfo: "Información de Contacto",
      generateQuote: "Generar Cotización con IA",
      regenerating: "IA está calculando tu cotización...",
      services: {
        title: "Elige Tus Servicios",
        description: "Selecciona los servicios de carpintería que necesitas para tu proyecto"
      },
      projectSize: "Tamaño del Proyecto (pie²)",
      complexity: "Complejidad del Proyecto",
      location: "Ubicación del Servicio",
      timeline: "Cronograma del Proyecto",
      materials: "Grado de Material",
      notes: "Notas Adicionales",
      notesPlaceholder: "Cuéntanos más sobre los requisitos de tu proyecto...",
      totalEstimate: "Estimación Total",
      basePrice: "Precio Base",
      complexityMultiplier: "Factor de Complejidad",
      locationMultiplier: "Factor de Ubicación",
      timelineMultiplier: "Factor de Cronograma",
      materialMultiplier: "Factor de Material",
      aiRecommendations: "Recomendaciones de IA",
      confidence: "Confianza de IA",
      downloadQuote: "Descargar Cotización",
      sendQuote: "Enviar Cotización",
      bookConsultation: "Reservar Consulta",
      disclaimer: "Esta es una estimación generada por IA. Los precios finales pueden variar según la inspección del sitio y requisitos específicos.",
      categories: {
        'outdoor': 'Vida Exterior',
        'interior': 'Carpintería Interior',
        'structural': 'Trabajo Estructural',
        'finishing': 'Acabado y Molduras',
        'hurricane': 'Protección contra Huracanes'
      },
      complexities: {
        basic: 'Diseño Básico',
        standard: 'Diseño Estándar',
        premium: 'Diseño Premium',
        luxury: 'Lujo/Personalizado'
      },
      locations: {
        'central-florida': 'Centro de Florida',
        'tampa-bay': 'Área de Tampa Bay',
        'south-florida': 'Sur de Florida',
        'miami-dade': 'Condado de Miami-Dade',
        'broward': 'Condado de Broward',
        'palm-beach': 'Condado de Palm Beach'
      },
      timelines: {
        flexible: 'Flexible (8+ semanas)',
        standard: 'Estándar (4-6 semanas)',
        urgent: 'Urgente (2-3 semanas)'
      },
      materials: {
        standard: 'Grado Estándar',
        premium: 'Grado Premium',
        composite: 'Materiales Compuestos',
        custom: 'Personalizado/Exótico'
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  // Service catalog with AI-optimized pricing
  const services: ServiceItem[] = [
    // Outdoor Living
    {
      id: 'deck-standard',
      category: 'outdoor',
      name: 'Standard Deck Construction',
      description: 'Pressure-treated lumber deck with basic railing system',
      basePrice: 25,
      unit: 'sqft',
      options: [
        { id: 'basic-railing', name: 'Basic Wood Railing', price: 15, unit: 'linear' },
        { id: 'composite-decking', name: 'Composite Decking Upgrade', price: 15, unit: 'sqft' },
        { id: 'built-in-seating', name: 'Built-in Seating', price: 45, unit: 'linear' }
      ]
    },
    {
      id: 'deck-premium',
      category: 'outdoor',
      name: 'Premium Deck Construction',
      description: 'High-end materials with custom features and finishes',
      basePrice: 45,
      unit: 'sqft',
      options: [
        { id: 'premium-railing', name: 'Premium Railing System', price: 85, unit: 'linear' },
        { id: 'ipe-decking', name: 'Ipe Hardwood Decking', price: 25, unit: 'sqft' },
        { id: 'integrated-lighting', name: 'Integrated Lighting', price: 35, unit: 'unit' }
      ]
    },
    {
      id: 'pergola-standard',
      category: 'outdoor',
      name: 'Standard Pergola',
      description: 'Cedar pergola with traditional design',
      basePrice: 35,
      unit: 'sqft',
      options: [
        { id: 'retractable-canopy', name: 'Retractable Canopy', price: 25, unit: 'sqft' },
        { id: 'decorative-posts', name: 'Decorative Post Wraps', price: 150, unit: 'unit' }
      ]
    },
    // Interior Carpentry
    {
      id: 'crown-molding',
      category: 'interior',
      name: 'Crown Molding Installation',
      description: 'Professional crown molding installation with precise cuts',
      basePrice: 12,
      unit: 'linear',
      options: [
        { id: 'complex-profiles', name: 'Complex Profiles', price: 8, unit: 'linear' },
        { id: 'paint-grade', name: 'Paint-Grade Finish', price: 5, unit: 'linear' }
      ]
    },
    {
      id: 'custom-cabinets',
      category: 'interior',
      name: 'Custom Cabinetry',
      description: 'Hand-crafted custom cabinets for kitchen, bathroom, or storage',
      basePrice: 450,
      unit: 'linear',
      options: [
        { id: 'soft-close-hinges', name: 'Soft-Close Hinges', price: 25, unit: 'unit' },
        { id: 'pull-out-shelves', name: 'Pull-Out Shelves', price: 85, unit: 'unit' },
        { id: 'premium-hardware', name: 'Premium Hardware', price: 150, unit: 'project' }
      ]
    },
    // Hurricane Protection
    {
      id: 'hurricane-shutters',
      category: 'hurricane',
      name: 'Hurricane Shutters',
      description: 'Code-compliant hurricane protection for windows and doors',
      basePrice: 45,
      unit: 'sqft',
      options: [
        { id: 'accordion-style', name: 'Accordion Style', price: 15, unit: 'sqft' },
        { id: 'roll-down', name: 'Roll-Down Style', price: 35, unit: 'sqft' },
        { id: 'storm-panels', name: 'Storm Panels', price: 8, unit: 'sqft' }
      ]
    }
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => {
      const existing = prev.find(s => s.serviceId === serviceId);
      if (existing) {
        return prev.filter(s => s.serviceId !== serviceId);
      } else {
        return [...prev, {
          serviceId,
          quantity: 100, // Default 100 sq ft
          selectedOptions: [],
          notes: ''
        }];
      }
    });
  };

  const updateServiceOption = (serviceId: string, optionId: string, checked: boolean) => {
    setSelectedServices(prev => prev.map(service => {
      if (service.serviceId === serviceId) {
        const options = checked
          ? [...service.selectedOptions, optionId]
          : service.selectedOptions.filter(id => id !== optionId);
        return { ...service, selectedOptions: options };
      }
      return service;
    }));
  };

  const updateServiceQuantity = (serviceId: string, quantity: number) => {
    setSelectedServices(prev => prev.map(service => {
      if (service.serviceId === serviceId) {
        return { ...service, quantity };
      }
      return service;
    }));
  };

  const generateQuote = async () => {
    if (selectedServices.length === 0) return;

    setIsGenerating(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Calculate base price
    let baseTotal = 0;
    selectedServices.forEach(selectedService => {
      const service = services.find(s => s.id === selectedService.serviceId);
      if (service) {
        let serviceTotal = service.basePrice * selectedService.quantity;

        // Add option costs
        selectedService.selectedOptions.forEach(optionId => {
          const option = service.options?.find(o => o.id === optionId);
          if (option) {
            const optionQuantity = option.unit === 'unit' ? 1 : selectedService.quantity;
            serviceTotal += option.price * optionQuantity;
          }
        });

        baseTotal += serviceTotal;
      }
    });

    // Apply multipliers
    const complexityMultiplier = {
      basic: 0.9,
      standard: 1.0,
      premium: 1.3,
      luxury: 1.8
    }[complexity];

    const locationMultiplier = {
      'central-florida': 1.0,
      'tampa-bay': 1.05,
      'south-florida': 1.15,
      'miami-dade': 1.2,
      'broward': 1.1,
      'palm-beach': 1.25
    }[location];

    const timelineMultiplier = {
      flexible: 0.85,
      standard: 1.0,
      urgent: 1.3
    }[timeline];

    const materialMultiplier = {
      standard: 1.0,
      premium: 1.4,
      composite: 1.8,
      custom: 2.2
    }[materials];

    const finalEstimate = baseTotal * complexityMultiplier * locationMultiplier * timelineMultiplier * materialMultiplier;

    // Generate AI recommendations
    const aiRecommendations = [
      complexity === 'premium' ? 'Premium materials will enhance durability and appearance' : '',
      location.includes('south-florida') ? 'Consider hurricane-resistant upgrades for South Florida' : '',
      timeline === 'urgent' ? 'Rush timeline may require premium pricing - consider flexible scheduling for better rates' : '',
      materials === 'composite' ? 'Composite materials offer excellent ROI with minimal maintenance' : '',
      selectedServices.length > 2 ? 'Bundling multiple services can provide cost savings' : ''
    ].filter(Boolean);

    const quote = {
      services: selectedServices,
      projectSize,
      complexity,
      location,
      timeline,
      materials,
      basePrice: baseTotal,
      finalEstimate,
      breakdown: {
        basePrice,
        complexityMultiplier,
        locationMultiplier,
        timelineMultiplier,
        materialMultiplier
      },
      aiRecommendations,
      confidence: 85 + Math.random() * 10,
      estimatedTimeline: getTimelineEstimate(selectedServices, complexity),
      nextSteps: [
        'Schedule a site visit for accurate measurements',
        'Review material samples and finish options',
        'Finalize design details and specifications',
        'Obtain necessary permits if required'
      ]
    };

    setQuoteGenerated(quote);
    setIsGenerating(false);

    if (onQuoteGenerated) {
      onQuoteGenerated(quote);
    }
  };

  const getTimelineEstimate = (services: SelectedService[], complexity: string) => {
    const baseDays = services.length * 7;
    const complexityMultiplier = {
      basic: 0.8,
      standard: 1.0,
      premium: 1.4,
      luxury: 1.8
    }[complexity] || 1.0;

    const totalDays = Math.ceil(baseDays * complexityMultiplier);

    if (totalDays <= 7) return "1 week";
    if (totalDays <= 14) return "1-2 weeks";
    if (totalDays <= 21) return "2-3 weeks";
    return `${Math.ceil(totalDays / 7)} weeks`;
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, selectedService) => {
      const service = services.find(s => s.id === selectedService.serviceId);
      if (service) {
        let serviceTotal = service.basePrice * selectedService.quantity;
        selectedService.selectedOptions.forEach(optionId => {
          const option = service.options?.find(o => o.id === optionId);
          if (option) {
            const optionQuantity = option.unit === 'unit' ? 1 : selectedService.quantity;
            serviceTotal += option.price * optionQuantity;
          }
        });
        return total + serviceTotal;
      }
      return total;
    }, 0);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto border-border bg-card">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{t.title}</CardTitle>
            <Badge variant="secondary" className="ml-2">
              <Zap className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
          <div className="flex items-center gap-2"
003e
            <Button
              onClick={generateQuote}
              disabled={selectedServices.length === 0 || isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Zap className="h-4 w-4 animate-spin" />
                  {t.regenerating}
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4" />
                  {t.generateQuote}
                </>
              )}
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services Selection */}
          <div className="lg:col-span-2 space-y-6"
003e
            <div className="space-y-6"
003e
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2"
003e
                  <CheckCircle className="h-5 w-5 text-primary" />
                  {t.services.title}
                </h3>
                <p className="text-muted-foreground">{t.services.description}</p>
              </div>

              {/* Services by Category */}
              {Object.entries(content.en.categories).map(([categoryKey, categoryName]) => {
                const categoryServices = services.filter(s => s.category === categoryKey);
                if (categoryServices.length === 0) return null;

                return (
                  <div key={categoryKey} className="space-y-4"
003e
                    <h4 className="font-medium text-lg border-b border-border pb-2"
003e{categoryName}</h4>
                    <div className="space-y-4"
003e
                      {categoryServices.map((service) => {
                        const isSelected = selectedServices.some(s => s.serviceId === service.id);
                        const selectedService = selectedServices.find(s => s.serviceId === service.id);

                        return (
                          <Card key={service.id} className={`border-2 ${isSelected ? 'border-primary' : 'border-border'}`}
003e
                            <CardContent className="p-4"
003e
                              <div className="space-y-4"
003e
                                <div className="flex items-start gap-3"
003e
                                  <Checkbox
                                    checked={isSelected}
                                    onCheckedChange={() => toggleService(service.id)}
                                  />
                                  <div className="flex-1 space-y-2"
003e
                                    <div className="flex items-center justify-between"
003e
                                      <h5 className="font-semibold">{service.name}</h5>
                                      <div className="text-right"
003e
                                        <div className="font-bold text-primary">${service.basePrice}/{service.unit}</div>
                                        <div className="text-sm text-muted-foreground">Base price</div>
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{service.description}</p>
                                  </div>
                                </div>

                                {isSelected && (
                                  <div className="space-y-4 pl-8"
003e
                                    <div className="flex items-center gap-4"
003e
                                      <Label className="text-sm font-medium">Quantity ({service.unit}):</Label>
                                      <div className="flex items-center gap-2"
003e
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => updateServiceQuantity(service.id, Math.max(1, (selectedService?.quantity || 100) - 25))}
                                          className="h-8 w-8 p-0"
                                        >
                                          -
                                        </Button>
                                        <Input
                                          type="number"
                                          value={selectedService?.quantity || 100}
                                          onChange={(e) => updateServiceQuantity(service.id, Math.max(1, parseInt(e.target.value) || 1))}
                                          className="w-20 text-center"
                                        />
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => updateServiceQuantity(service.id, (selectedService?.quantity || 100) + 25)}
                                          className="h-8 w-8 p-0"
                                        >
                                          +
                                        </Button>
                                      </div>
                                    </div>

                                    {service.options && service.options.length > 0 && (
                                      <div className="space-y-2"
003e
                                        <Label className="text-sm font-medium">Optional Add-ons:</Label>
                                        <div className="space-y-2"
003e
                                          {service.options.map((option) => (
                                            <div key={option.id} className="flex items-center justify-between p-2 rounded-lg bg-muted"
003e
                                              <div className="flex items-center gap-2"
003e
                                                <Checkbox
                                                  checked={selectedService?.selectedOptions.includes(option.id)}
                                                  onCheckedChange={(checked) => updateServiceOption(service.id, option.id, checked as boolean)}
                                                />
                                                <div>
                                                  <div className="font-medium">{option.name}</div>
                                                  {option.description && (
                                                    <div className="text-sm text-muted-foreground">{option.description}</div>
                                                  )}
                                                </div>
                                              </div>
                                              <div className="text-right"
003e
                                                <div className="font-bold text-primary"
003e+${option.price}/{option.unit}</div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Project Details */}
            <div className="space-y-6"
003e
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2"
003e
                  <Settings className="h-5 w-5 text-primary" />
                  {t.projectDetails}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6"
003e
                <div className="space-y-4"
003e
                  <div>
                    <Label>{t.projectSize}</Label>
                    <div className="flex items-center gap-4"
003e
                      <Slider
                        value={[projectSize]}
                        onValueChange={(value) => setProjectSize(value[0])}
                        min={50}
                        max={1000}
                        step={25}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-16 text-right"
003e{projectSize} sq ft</span>
                    </div>
                  </div>

                  <div>
                    <Label>{t.complexity}</Label>
                    <Select value={complexity} onValueChange={setComplexity}>
                      <SelectContent>
                        {Object.entries(t.complexities).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{t.location}</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectContent>
                        {Object.entries(t.locations).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4"
003e
                  <div>
                    <Label>{t.timeline}</Label>
                    <Select value={timeline} onValueChange={setTimeline}>
                      <SelectContent>
                        {Object.entries(t.timelines).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{t.materials}</Label>
                    <Select value={materials} onValueChange={setMaterials}>
                      <SelectContent>
                        {Object.entries(t.materials).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <Label>{t.notes}</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {/* Quote Results */}
          <div className="space-y-6"
003e
            {quoteGenerated ? (
              <div className="space-y-6"
003e
                <Card className="border-primary border-2 bg-primary/5"
003e
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between"
003e
                      <span className="flex items-center gap-2"
003e
                        <Calculator className="h-5 w-5 text-primary" />
                        {t.totalEstimate}
                      </span>
                      <Badge variant="secondary" className="gap-2"
003e
                        <TrendingUp className="h-4 w-4" />
                        {t.confidence}: {quoteGenerated.confidence.toFixed(0)}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4"
003e
                    <div className="text-center py-4"
003e
                      <div className="text-4xl font-bold text-primary mb-2"
003e
                        ${quoteGenerated.finalEstimate.toLocaleString()}
                      </div>
                      <div className="text-muted-foreground"
003e
                        Estimated timeline: {quoteGenerated.estimatedTimeline}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3 text-sm"
003e
                      <div className="flex justify-between"
003e
                        <span>{t.basePrice}:</span>
                        <span className="font-medium">${quoteGenerated.basePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between"
003e
                        <span>{t.complexityMultiplier}:</span>
                        <span className="font-medium">{quoteGenerated.breakdown.complexityMultiplier}x</span>
                      </div>
                      <div className="flex justify-between"
003e
                        <span>{t.locationMultiplier}:</span>
                        <span className="font-medium">{quoteGenerated.breakdown.locationMultiplier}x</span>
                      </div>
                      <div className="flex justify-between"
003e
                        <span>{t.timelineMultiplier}:</span>
                        <span className="font-medium">{quoteGenerated.breakdown.timelineMultiplier}x</span>
                      </div>
                      <div className="flex justify-between"
003e
                        <span>{t.materialMultiplier}:</span>
                        <span className="font-medium">{quoteGenerated.breakdown.materialMultiplier}x</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {quoteGenerated.aiRecommendations.length > 0 && (
                  <Card className="border-border"
003e
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"
003e
                        <Zap className="h-5 w-5 text-primary" />
                        {t.aiRecommendations}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2"
003e
                        {quoteGenerated.aiRecommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2"
003e
                            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <div className="flex flex-wrap gap-2"
003e
                  <Button className="gap-2"
003e
                    <Download className="h-4 w-4" />
                    {t.downloadQuote}
                  </Button>
                  <Button className="gap-2"
003e
                    <Send className="h-4 w-4" />
                    {t.sendQuote}
                  </Button>
                  <Button className="gap-2 ml-auto"
003e
                    <Calendar className="h-4 w-4" />
                    {t.bookConsultation}
                  </Button>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg"
003e
                  <div className="flex items-start gap-2"
003e
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800">{t.disclaimer}</p>
                  </div>
                </div>
              </div>
            ) : (
              <Card className="border-border"
003e
                <CardContent className="p-6"
003e
                  <div className="text-center text-muted-foreground"
003e
                    <Calculator className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="font-medium text-lg">Ready to Build Your Quote</h3>
                    <p className="text-sm">Select services and configure your project details to get an AI-powered estimate</p>
                    <div className="mt-4 text-2xl font-bold text-primary"
003e
                      Selected: {selectedServices.length} services
                    </div>
                    {selectedServices.length > 0 && (
                      <div className="mt-2 text-lg font-medium"
003e
                        Subtotal: ${getTotalPrice().toLocaleString()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AIPriceOptimizer({ locale = 'en', services = [], projectDetails, onPriceOptimized }: AIPriceOptimizerProps) {
  const [optimization, setOptimization] = useState<any>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const content = {
    en: {
      title: "AI Price Optimizer",
      subtitle: "Smart recommendations to optimize your project cost",
      analyze: "Analyze for Savings",
      analyzing: "AI is finding optimization opportunities...",
      savings: "Potential Savings",
      recommendations: "Cost Optimization Tips",
      bundleDiscount: "Bundle Discount Available",
      seasonalPromotion: "Seasonal Promotion",
      materialAlternative: "Material Alternative",
      scheduleOptimization: "Schedule Optimization",
      applyRecommendation: "Apply Recommendation"
    },
    es: {
      title: "Optimizador de Precios con IA",
      subtitle: "Recomendaciones inteligentes para optimizar el costo de tu proyecto",
      analyze: "Analizar para Ahorros",
      analyzing: "IA está encontrando oportunidades de optimización...",
      savings: "Ahorros Potenciales",
      recommendations: "Consejos de Optimización de Costos",
      bundleDiscount: "Descuento por Paquete Disponible",
      seasonalPromotion: "Promoción Estacional",
      materialAlternative: "Alternativa de Material",
      scheduleOptimization: "Optimización de Cronograma",
      applyRecommendation: "Aplicar Recomendación"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const analyzeForOptimization = async () => {
    if (!services.length || !projectDetails) return;

    setIsOptimizing(true);

    // Simulate AI optimization analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockOptimization = {
      totalSavings: 2850,
      recommendations: [
        {
          type: 'bundle-discount',
          title: 'Bundle Multiple Services',
          description: 'Save 15% by bundling deck and pergola construction together',
          savings: 1800,
          confidence: 92
        },
        {
          type: 'seasonal-promotion',
          title: 'Spring Construction Special',
          description: 'Book during our spring promotion for additional 10% savings',
          savings: 750,
          confidence: 88
        },
        {
          type: 'material-alternative',
          title: 'Premium Composite Alternative',
          description: 'Consider alternative composite brand with similar quality but 20% cost savings',
          savings: 400,
          confidence: 85
        },
        {
          type: 'schedule-optimization',
          title: 'Flexible Timeline Discount',
          description: 'Extend timeline by 2 weeks for additional 5% cost savings',
          savings: 600,
          confidence: 78
        }
      ],
      bestCombination: {
        services: services.map(s => s.serviceId),
        materialAlternative: 'composite-alt',
        timelineExtension: 2,
        totalSavings: 3200
      }
    };

    setOptimization(mockOptimization);
    setIsOptimizing(false);

    if (onPriceOptimized) {
      onPriceOptimized(mockOptimization);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-border bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{t.title}</CardTitle>
            <Badge variant="secondary" className="ml-2">
              <Zap className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
          <Button
            onClick={analyzeForOptimization}
            disabled={isOptimizing || !services.length}
            className="gap-2"
          >
            {isOptimizing ? (
              <>
                <Zap className="h-4 w-4 animate-spin" />
                {t.analyzing}
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4" />
                {t.analyze}
              </>
            )}
          </Button>
        </div>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </CardHeader>

      <CardContent className="pt-6">
        {optimization ? (
          <div className="space-y-6"
003e
            {/* Total Savings */}
            <Card className="border-primary border-2 bg-primary/5"
003e
              <CardContent className="p-6 text-center"
003e
                <div className="text-4xl font-bold text-primary mb-2"
003e
                  ${optimization.totalSavings.toLocaleString()}
                </div>
                <div className="text-lg font-medium"
003e
                  {t.savings}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <div className="space-y-4"
003e
              <h4 className="font-semibold flex items-center gap-2"
003e
                <Star className="h-5 w-5 text-primary" />
                {t.recommendations}
              </h4>
              <div className="space-y-3"
003e
                {optimization.recommendations.map((rec, index) => (
                  <Card key={index} className="border-border"
003e
                    <CardContent className="p-4"
003e
                      <div className="flex items-start justify-between gap-4"
003e
                        <div className="flex-1 space-y-2"
003e
                          <div className="flex items-center gap-2"
003e
                            <Badge variant="secondary" className="capitalize"
003e
                              {rec.type.replace('-', ' ')}
                            </Badge>
                            <Badge className="bg-green-100 text-green-800"
003e
                              {rec.confidence}% confidence
                            </Badge>
                          </div>
                          <h5 className="font-medium"
003e{rec.title}</h5>
                          <p className="text-sm text-muted-foreground"
003e{rec.description}</p>
                        </div>
                        <div className="text-right"
003e
                          <div className="text-2xl font-bold text-green-600"
003e
                            ${rec.savings.toLocaleString()}
                          </div>
                          <Button size="sm" className="mt-2 gap-2"
003e
                            <ArrowRight className="h-3 w-3" />
                            {t.applyRecommendation}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12"
003e
            <TrendingUp className="h-16 w-16 mx-auto mb-4" />
            <h3 className="font-medium text-lg">Ready to Optimize</h3>
            <p className="text-sm max-w-md">Let AI analyze your quote for potential savings and optimization opportunities</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}