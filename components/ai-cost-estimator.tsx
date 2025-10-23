'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, TrendingUp, AlertCircle, CheckCircle, Calendar } from "lucide-react"

interface CostEstimate {
  projectType: string;
  size?: number;
  materials: string;
  complexity: string;
  location: string;
  basePrice: number;
  materialCost: number;
  laborCost: number;
  complexityMultiplier: number;
  locationMultiplier: number;
  totalEstimate: {
    min: number;
    max: number;
  };
  breakdown: {
    materials: number;
    labor: number;
    permits: number;
    contingency: number;
  };
  aiInsights: string[];
  timeline: string;
  recommendations: string[];
}

interface EstimatorProps {
  locale?: string;
  onEstimateGenerated?: (estimate: CostEstimate) => void;
}

export function AICostEstimator({ locale = 'en', onEstimateGenerated }: EstimatorProps) {
  const [formData, setFormData] = useState({
    projectType: '',
    size: '',
    sizeUnit: 'sqft',
    materials: '',
    complexity: 'standard',
    location: 'central-florida',
    hasPermits: false,
    needsDemo: false
  });

  const [estimate, setEstimate] = useState<CostEstimate | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const content = {
    en: {
      title: "AI Project Estimator",
      subtitle: "Get an instant cost estimate for your carpentry project",
      form: {
        projectType: "Project Type",
        projectTypes: [
          { value: "deck", label: "Deck Construction", basePrice: 25 },
          { value: "pergola", label: "Pergola Construction", basePrice: 35 },
          { value: "crown-molding", label: "Crown Molding Installation", basePrice: 12 },
          { value: "custom-cabinets", label: "Custom Cabinetry", basePrice: 450 },
          { value: "trim-work", label: "Interior Trim Work", basePrice: 15 },
          { value: "framing", label: "Structural Framing", basePrice: 18 },
          { value: "room-addition", label: "Room Addition", basePrice: 120 },
          { value: "hurricane-upgrade", label: "Hurricane-Resistant Upgrade", basePrice: 30 }
        ],
        size: "Project Size",
        sizeUnits: [
          { value: "sqft", label: "Square Feet" },
          { value: "linear", label: "Linear Feet" },
          { value: "units", label: "Units/Items" }
        ],
        materials: "Material Preference",
        materialsOptions: [
          { value: "pressure-treated", label: "Pressure-Treated Lumber", multiplier: 1.0 },
          { value: "cedar", label: "Cedar", multiplier: 1.4 },
          { value: "composite", label: "Composite Decking", multiplier: 2.2 },
          { value: "oak", label: "Oak Wood", multiplier: 1.6 },
          { value: "pine", label: "Pine", multiplier: 0.8 },
          { value: "premium", label: "Premium Materials", multiplier: 2.5 }
        ],
        complexity: "Project Complexity",
        complexities: [
          { value: "simple", label: "Simple Design", multiplier: 0.9 },
          { value: "standard", label: "Standard Complexity", multiplier: 1.0 },
          { value: "complex", label: "Complex Design", multiplier: 1.3 },
          { value: "custom", label: "Custom/Artisan", multiplier: 1.6 }
        ],
        location: "Location",
        locations: [
          { value: "central-florida", label: "Central Florida (Orlando area)", multiplier: 1.0 },
          { value: "tampa-bay", label: "Tampa Bay Area", multiplier: 1.05 },
          { value: "miami-dade", label: "Miami-Dade County", multiplier: 1.15 },
          { value: "broward", label: "Broward County", multiplier: 1.1 },
          { value: "palm-beach", label: "Palm Beach County", multiplier: 1.08 }
        ]
      },
      calculate: "Get Estimate",
      calculating: "AI is calculating...",
      results: {
        title: "Your AI-Generated Estimate",
        range: "Estimated Cost Range",
        breakdown: "Cost Breakdown",
        timeline: "Estimated Timeline",
        insights: "AI Insights",
        recommendations: "Recommendations",
        disclaimer: "This is an AI-generated estimate based on typical project parameters. Final pricing may vary based on site conditions, material availability, and specific project requirements.",
        bookConsultation: "Book Detailed Consultation",
        getQuote: "Get Detailed Quote"
      }
    },
    es: {
      title: "Estimador de Proyectos con IA",
      subtitle: "Obtén una estimación de costo instantánea para tu proyecto de carpintería",
      form: {
        projectType: "Tipo de Proyecto",
        projectTypes: [
          { value: "deck", label: "Construcción de Cubierta", basePrice: 25 },
          { value: "pergola", label: "Construcción de Pérgola", basePrice: 35 },
          { value: "crown-molding", label: "Instalación de Cornisas", basePrice: 12 },
          { value: "custom-cabinets", label: "Gabinetes Personalizados", basePrice: 450 },
          { value: "trim-work", label: "Trabajo de Molduras Interior", basePrice: 15 },
          { value: "framing", label: "Encuadre Estructural", basePrice: 18 },
          { value: "room-addition", label: "Adición de Habitación", basePrice: 120 },
          { value: "hurricane-upgrade", label: "Actualización Resistente a Huracanes", basePrice: 30 }
        ],
        size: "Tamaño del Proyecto",
        sizeUnits: [
          { value: "sqft", label: "Pies Cuadrados" },
          { value: "linear", label: "Pies Lineales" },
          { value: "units", label: "Unidades/Artículos" }
        ],
        materials: "Preferencia de Material",
        materialsOptions: [
          { value: "pressure-treated", label: "Madera Tratada con Presión", multiplier: 1.0 },
          { value: "cedar", label: "Cedro", multiplier: 1.4 },
          { value: "composite", label: "Cubiertas Compuestas", multiplier: 2.2 },
          { value: "oak", label: "Madera de Roble", multiplier: 1.6 },
          { value: "pine", label: "Pino", multiplier: 0.8 },
          { value: "premium", label: "Materiales Premium", multiplier: 2.5 }
        ],
        complexity: "Complejidad del Proyecto",
        complexities: [
          { value: "simple", label: "Diseño Simple", multiplier: 0.9 },
          { value: "standard", label: "Complejidad Estándar", multiplier: 1.0 },
          { value: "complex", label: "Diseño Complejo", multiplier: 1.3 },
          { value: "custom", label: "Personalizado/Artesanal", multiplier: 1.6 }
        ],
        location: "Ubicación",
        locations: [
          { value: "central-florida", label: "Centro de Florida (área de Orlando)", multiplier: 1.0 },
          { value: "tampa-bay", label: "Área de Tampa Bay", multiplier: 1.05 },
          { value: "miami-dade", label: "Condado de Miami-Dade", multiplier: 1.15 },
          { value: "broward", label: "Condado de Broward", multiplier: 1.1 },
          { value: "palm-beach", label: "Condado de Palm Beach", multiplier: 1.08 }
        ]
      },
      calculate: "Obtener Estimación",
      calculating: "IA está calculando...",
      results: {
        title: "Tu Estimación Generada por IA",
        range: "Rango de Costo Estimado",
        breakdown: "Desglose de Costos",
        timeline: "Cronograma Estimado",
        insights: "Perspectivas de IA",
        recommendations: "Recomendaciones",
        disclaimer: "Esta es una estimación generada por IA basada en parámetros típicos del proyecto. Los precios finales pueden variar según las condiciones del sitio, disponibilidad de materiales y requisitos específicos del proyecto.",
        bookConsultation: "Reservar Consulta Detallada",
        getQuote: "Obtener Cotización Detallada"
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const calculateEstimate = async () => {
    setIsCalculating(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const projectType = t.form.projectTypes.find(p => p.value === formData.projectType);
    const material = t.form.materialsOptions.find(m => m.value === formData.materials);
    const complexity = t.form.complexities.find(c => c.value === formData.complexity);
    const location = t.form.locations.find(l => l.value === formData.location);

    if (!projectType || !material || !complexity || !location) return;

    const size = parseFloat(formData.size) || 100;
    const baseCost = projectType.basePrice * size;
    const materialCost = baseCost * material.multiplier;
    const laborCost = baseCost * 0.6; // Labor is typically 60% of base
    const complexityCost = baseCost * (complexity.multiplier - 1);
    const locationCost = baseCost * (location.multiplier - 1);

    const subtotal = materialCost + laborCost + complexityCost + locationCost;
    const permits = formData.hasPermits ? subtotal * 0.05 : 0;
    const demo = formData.needsDemo ? subtotal * 0.1 : 0;
    const contingency = subtotal * 0.15;

    const total = subtotal + permits + demo + contingency;
    const minEstimate = total * 0.9;
    const maxEstimate = total * 1.2;

    // Generate AI insights
    const insights = [];
    if (formData.projectType === 'hurricane-upgrade') {
      insights.push("Hurricane-resistant construction adds value and protection to your Florida home");
    }
    if (formData.materials === 'composite') {
      insights.push("Composite materials offer excellent durability with minimal maintenance in Florida's climate");
    }
    if (formData.complexity === 'custom') {
      insights.push("Custom designs require additional planning and craftsmanship time");
    }
    if (location.multiplier > 1.1) {
      insights.push("South Florida locations may have higher material and labor costs");
    }

    const newEstimate: CostEstimate = {
      projectType: formData.projectType,
      size,
      materials: formData.materials,
      complexity: formData.complexity,
      location: formData.location,
      basePrice: projectType.basePrice,
      materialCost,
      laborCost,
      complexityMultiplier: complexity.multiplier,
      locationMultiplier: location.multiplier,
      totalEstimate: {
        min: Math.round(minEstimate),
        max: Math.round(maxEstimate)
      },
      breakdown: {
        materials: Math.round(materialCost),
        labor: Math.round(laborCost),
        permits: Math.round(permits),
        contingency: Math.round(contingency)
      },
      aiInsights: insights,
      timeline: getTimelineEstimate(formData.projectType, size, formData.complexity),
      recommendations: getRecommendations(formData)
    };

    setEstimate(newEstimate);
    setShowResults(true);
    setIsCalculating(false);

    if (onEstimateGenerated) {
      onEstimateGenerated(newEstimate);
    }
  };

  const getTimelineEstimate = (projectType: string, size: number, complexity: string) => {
    const baseDays = {
      'deck': Math.ceil(size / 50),
      'pergola': Math.ceil(size / 40),
      'crown-molding': Math.ceil(size / 200),
      'custom-cabinets': Math.ceil(size / 5),
      'trim-work': Math.ceil(size / 150),
      'framing': Math.ceil(size / 100),
      'room-addition': Math.ceil(size / 30),
      'hurricane-upgrade': Math.ceil(size / 80)
    }[projectType] || 5;

    const complexityMultiplier = {
      'simple': 0.8,
      'standard': 1.0,
      'complex': 1.4,
      'custom': 1.8
    }[complexity] || 1.0;

    const totalDays = Math.ceil(baseDays * complexityMultiplier);

    if (totalDays <= 3) return "1-3 days";
    if (totalDays <= 7) return "1 week";
    if (totalDays <= 14) return "1-2 weeks";
    if (totalDays <= 21) return "2-3 weeks";
    return `${Math.ceil(totalDays / 7)} weeks`;
  };

  const getRecommendations = (data: typeof formData) => {
    const recommendations = [];

    if (data.materials === 'pressure-treated' && data.projectType.includes('outdoor')) {
      recommendations.push("Consider sealing pressure-treated wood after 6 months for optimal protection");
    }

    if (data.location === 'miami-dade' || data.location === 'broward') {
      recommendations.push("South Florida projects benefit from hurricane-resistant construction techniques");
    }

    if (data.projectType === 'deck' && parseFloat(data.size) > 200) {
      recommendations.push("Larger decks may benefit from multiple access points and integrated lighting");
    }

    if (data.complexity === 'custom') {
      recommendations.push("Custom projects benefit from detailed design consultations and material samples");
    }

    return recommendations;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Estimator Form */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="projectType">{t.form.projectType}</Label>
              <select
                id="projectType"
                value={formData.projectType}
                onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="">Select project type...</option>
                {t.form.projectTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="size">{t.form.size}</Label>
              <div className="flex gap-2">
                <Input
                  id="size"
                  type="number"
                  placeholder="e.g., 200"
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  className="flex-1"
                />
                <select
                  value={formData.sizeUnit}
                  onChange={(e) => setFormData({...formData, sizeUnit: e.target.value})}
                  className="px-3 py-2 border border-border rounded-md bg-background w-32"
                >
                  {t.form.sizeUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>{unit.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="materials">{t.form.materials}</Label>
              <select
                id="materials"
                value={formData.materials}
                onChange={(e) => setFormData({...formData, materials: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="">Select material preference...</option>
                {t.form.materialsOptions.map((material) => (
                  <option key={material.value} value={material.value}>{material.label}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="complexity">{t.form.complexity}</Label>
              <select
                id="complexity"
                value={formData.complexity}
                onChange={(e) => setFormData({...formData, complexity: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="">Select complexity...</option>
                {t.form.complexities.map((complexity) => (
                  <option key={complexity.value} value={complexity.value}>{complexity.label}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="location">{t.form.location}</Label>
              <select
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="">Select location...</option>
                {t.form.locations.map((location) => (
                  <option key={location.value} value={location.value}>{location.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={calculateEstimate}
              disabled={isCalculating || !formData.projectType || !formData.size || !formData.materials}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isCalculating ? (
                <>
                  <TrendingUp className="h-4 w-4 mr-2 animate-spin" />
                  {t.calculating}
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  {t.calculate}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && estimate && (
        <Card className="border-border bg-gradient-to-br from-background to-muted/20">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              {t.results.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Cost Range */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t.results.range}
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  ${estimate.totalEstimate.min.toLocaleString()} - ${estimate.totalEstimate.max.toLocaleString()}
                </div>
                <p className="text-muted-foreground">{estimate.timeline}</p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.results.breakdown}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-card rounded-lg border">
                  <span className="text-muted-foreground">Materials</span>
                  <span className="font-semibold">${estimate.breakdown.materials.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-card rounded-lg border">
                  <span className="text-muted-foreground">Labor</span>
                  <span className="font-semibold">${estimate.breakdown.labor.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-card rounded-lg border">
                  <span className="text-muted-foreground">Permits & Fees</span>
                  <span className="font-semibold">${estimate.breakdown.permits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-card rounded-lg border">
                  <span className="text-muted-foreground">Contingency (15%)</span>
                  <span className="font-semibold">${estimate.breakdown.contingency.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            {estimate.aiInsights.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  {t.results.insights}
                </h3>
                <ul className="space-y-2">
                  {estimate.aiInsights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {estimate.recommendations.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">{t.results.recommendations}</h3>
                <ul className="space-y-2">
                  {estimate.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800">{t.results.disclaimer}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="bg-primary hover:bg-primary/90">
                <Calendar className="h-4 w-4 mr-2" />
                {t.results.bookConsultation}
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                {t.results.getQuote}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Helper component for embedding in pages
export function AICostEstimatorWidget({ locale = 'en' }: { locale?: string }) {
  const [showEstimator, setShowEstimator] = useState(false);

  const content = {
    en: {
      title: "Get an Instant AI Estimate",
      description: "Use our AI-powered estimator to get a cost range for your project in seconds",
      cta: "Try AI Estimator"
    },
    es: {
      title: "Obtén una Estimación IA Instantánea",
      description: "Usa nuestro estimador con IA para obtener un rango de costo para tu proyecto en segundos",
      cta: "Probar Estimador IA"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <Card className="border-2 border-primary shadow-lg">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-xl flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!showEstimator ? (
          <Button onClick={() => setShowEstimator(true)} className="w-full bg-primary hover:bg-primary/90">
            {t.cta}
          </Button>
        ) : (
          <AICostEstimator locale={locale} />
        )}
      </CardContent>
    </Card>
  );
}