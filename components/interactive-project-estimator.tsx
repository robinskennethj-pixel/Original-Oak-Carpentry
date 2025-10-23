'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap,
  Calendar
} from "lucide-react";

interface ProjectEstimate {
  projectType: string;
  size: number;
  sizeUnit: string;
  material: string;
  complexity: string;
  location: string;
  baseCost: number;
  materialMultiplier: number;
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
  timeline: string;
  hurricaneResistant: boolean;
  aiRecommendation: string;
  nextSteps: string[];
}

interface ProjectEstimatorProps {
  locale?: string;
  onEstimateGenerated?: (estimate: ProjectEstimate) => void;
}

export function InteractiveProjectEstimator({ locale = 'en', onEstimateGenerated }: ProjectEstimatorProps) {
  const [formData, setFormData] = useState({
    projectType: '',
    size: '',
    sizeUnit: 'sqft',
    material: '',
    complexity: 'standard',
    location: 'central-florida',
    hurricaneResistant: false
  });

  const [estimate, setEstimate] = useState<ProjectEstimate | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Content based on locale
  const getContent = () => {
    if (locale === 'es') {
      return {
        title: "Estimador de Proyectos Interactivo (IA)",
        subtitle: "Obtén una estimación instantánea para tu proyecto de carpintería con inteligencia artificial",
        form: {
          projectType: "Tipo de Proyecto",
          size: "Tamaño del Proyecto",
          material: "Preferencia de Material",
          complexity: "Complejidad del Proyecto",
          location: "Ubicación",
          hurricaneResistant: "Construcción Resistente a Huracanes",
          calculate: "Obtener Estimación IA",
          calculating: "IA está analizando tu proyecto..."
        },
        results: {
          title: "Tu Estimación de Proyecto con IA",
          subtitle: "Basado en datos actuales del mercado y nuestra experiencia",
          costBreakdown: "Desglose de Costos",
          baseCost: "Costo Base del Proyecto",
          materialCost: "Ajuste de Costo de Material",
          complexityCost: "Ajuste de Complejidad",
          locationCost: "Ajuste de Ubicación",
          hurricaneCost: "Premium Resistente a Huracanes",
          totalEstimate: "Rango de Estimación Total",
          timeline: "Cronograma Estimado",
          aiRecommendation: "Recomendación de IA",
          nextSteps: "Próximos Pasos",
          bookConsultation: "Reservar Consulta Gratis",
          getDetailedQuote: "Obtener Cotización Detallada"
        }
      };
    }

    // English content as default
    return {
      title: "Interactive Project Estimator (AI-Powered)",
      subtitle: "Get an instant cost estimate for your carpentry project with AI-powered insights",
      form: {
        projectType: "Project Type",
        size: "Project Size",
        material: "Material Preference",
        complexity: "Project Complexity",
        location: "Location",
        hurricaneResistant: "Hurricane-Resistant Construction",
        calculate: "Get AI Estimate",
        calculating: "AI is analyzing your project..."
      },
      results: {
        title: "Your AI-Powered Project Estimate",
        subtitle: "Based on current market data and our expertise",
        costBreakdown: "Cost Breakdown",
        baseCost: "Base Project Cost",
        materialCost: "Material Cost Adjustment",
        complexityCost: "Complexity Adjustment",
        locationCost: "Location Adjustment",
        hurricaneCost: "Hurricane-Resistant Premium",
        totalEstimate: "Total Estimate Range",
        timeline: "Estimated Timeline",
        aiRecommendation: "AI Recommendation",
        nextSteps: "Next Steps",
        bookConsultation: "Book Free Consultation",
        getDetailedQuote: "Get Detailed Quote"
      }
    };
  };

  const content = getContent();

  // Project types data based on locale
  const getProjectData = () => {
    if (locale === 'es') {
      return {
        projectTypes: [
          { value: "deck", label: "Construcción de Cubierta", basePrice: 25, description: "Cubierta personalizada con materiales premium" },
          { value: "pergola", label: "Construcción de Pérgola", basePrice: 35, description: "Hermosa estructura de pérgola exterior" },
          { value: "crown-molding", label: "Instalación de Cornisas", basePrice: 12, description: "Elegantes cornisas interiores" },
          { value: "custom-cabinets", label: "Gabinetes Personalizados", basePrice: 450, description: "Gabinetes personalizados hechos a mano" },
          { value: "trim-work", label: "Trabajo de Molduras Interior", basePrice: 15, description: "Instalación profesional de molduras interiores" },
          { value: "framing", label: "Encuadre Estructural", basePrice: 18, description: "Encuadre estructural para nueva construcción" },
          { value: "room-addition", label: "Adición de Habitación", basePrice: 120, description: "Adición completa de habitación con encuadre" },
          { value: "hurricane-upgrade", label: "Actualización Resistente a Huracanes", basePrice: 30, description: "Actualizaciones estructurales resistentes a tormentas" }
        ],
        sizeUnits: [
          { value: "sqft", label: "Pies Cuadrados" },
          { value: "linear", label: "Pies Lineales" },
          { value: "units", label: "Unidades/Artículos" }
        ],
        materials: [
          { value: "pressure-treated", label: "Madera Tratada con Presión", multiplier: 1.0, description: "Económico, resistente a la intemperie" },
          { value: "cedar", label: "Cedro", multiplier: 1.4, description: "Belleza natural, resistente a insectos" },
          { value: "composite", label: "Cubiertas Compuestas", multiplier: 2.2, description: "Bajo mantenimiento, duradero" },
          { value: "oak", label: "Madera de Roble", multiplier: 1.6, description: "Madera dura premium, durable" },
          { value: "pine", label: "Pino", multiplier: 0.8, description: "Opción asequible, pintable" },
          { value: "premium", label: "Materiales Premium", multiplier: 2.5, description: "Materiales de primera categoría para proyectos de lujo" }
        ],
        complexities: [
          { value: "simple", label: "Diseño Simple", multiplier: 0.9, description: "Diseño básico con detalles mínimos" },
          { value: "standard", label: "Complejidad Estándar", multiplier: 1.0, description: "Proyecto típico con detalles estándar" },
          { value: "complex", label: "Diseño Complejo", multiplier: 1.3, description: "Diseño intrincado con detalles personalizados" },
          { value: "custom", label: "Personalizado/Artesanal", multiplier: 1.6, description: "Artesanía personalizada con detalles únicos" }
        ],
        locations: [
          { value: "central-florida", label: "Centro de Florida (área de Orlando)", multiplier: 1.0, description: "Precio estándar para Centro de FL" },
          { value: "tampa-bay", label: "Área de Tampa Bay", multiplier: 1.05, description: "Ligeramente más alto para Tampa Bay" },
          { value: "miami-dade", label: "Condado de Miami-Dade", multiplier: 1.15, description: "Precio premium para el área de Miami" },
          { value: "broward", label: "Condado de Broward", multiplier: 1.1, description: "Precio ajustado para Broward" },
          { value: "palm-beach", label: "Condado de Palm Beach", multiplier: 1.2, description: "Precio premium para Palm Beach" },
          { value: "space-coast", label: "Space Coast", multiplier: 1.08, description: "Precio de área costera" },
          { value: "treasure-coast", label: "Treasure Coast", multiplier: 1.12, description: "Premium de Treasure Coast" }
        ]
      };
    }

    // English content as default
    return {
      projectTypes: [
        { value: "deck", label: "Deck Construction", basePrice: 25, description: "Custom deck with premium materials" },
        { value: "pergola", label: "Pergola Construction", basePrice: 35, description: "Beautiful outdoor pergola structure" },
        { value: "crown-molding", label: "Crown Molding Installation", basePrice: 12, description: "Elegant interior crown molding" },
        { value: "custom-cabinets", label: "Custom Cabinetry", basePrice: 450, description: "Handcrafted custom cabinets" },
        { value: "trim-work", label: "Interior Trim Work", basePrice: 15, description: "Professional interior trim installation" },
        { value: "framing", label: "Structural Framing", basePrice: 18, description: "New construction structural framing" },
        { value: "room-addition", label: "Room Addition", basePrice: 120, description: "Complete room addition with framing" },
        { value: "hurricane-upgrade", label: "Hurricane-Resistant Upgrade", basePrice: 30, description: "Storm-resistant structural upgrades" }
      ],
      sizeUnits: [
        { value: "sqft", label: "Square Feet" },
        { value: "linear", label: "Linear Feet" },
        { value: "units", label: "Units/Items" }
      ],
      materials: [
        { value: "pressure-treated", label: "Pressure-Treated Lumber", multiplier: 1.0, description: "Budget-friendly, weather-resistant" },
        { value: "cedar", label: "Cedar", multiplier: 1.4, description: "Natural beauty, insect-resistant" },
        { value: "composite", label: "Composite Decking", multiplier: 2.2, description: "Low maintenance, long-lasting" },
        { value: "oak", label: "Oak Wood", multiplier: 1.6, description: "Premium hardwood, durable" },
        { value: "pine", label: "Pine", multiplier: 0.8, description: "Affordable, paintable option" },
        { value: "premium", label: "Premium Materials", multiplier: 2.5, description: "Top-tier materials for luxury projects" }
      ],
      complexities: [
        { value: "simple", label: "Simple Design", multiplier: 0.9, description: "Basic design with minimal details" },
        { value: "standard", label: "Standard Complexity", multiplier: 1.0, description: "Typical project with standard details" },
        { value: "complex", label: "Complex Design", multiplier: 1.3, description: "Intricate design with custom details" },
        { value: "custom", label: "Custom/Artisan", multiplier: 1.6, description: "Bespoke craftsmanship with unique details" }
      ],
      locations: [
        { value: "central-florida", label: "Central Florida (Orlando area)", multiplier: 1.0, description: "Standard pricing for Central FL" },
        { value: "tampa-bay", label: "Tampa Bay Area", multiplier: 1.05, description: "Slightly higher for Tampa Bay" },
        { value: "miami-dade", label: "Miami-Dade County", multiplier: 1.15, description: "Premium pricing for Miami area" },
        { value: "broward", label: "Broward County", multiplier: 1.1, description: "Adjusted pricing for Broward" },
        { value: "palm-beach", label: "Palm Beach County", multiplier: 1.2, description: "Premium pricing for Palm Beach" },
        { value: "space-coast", label: "Space Coast", multiplier: 1.08, description: "Coastal area pricing" },
        { value: "treasure-coast", label: "Treasure Coast", multiplier: 1.12, description: "Treasure Coast premium" }
      ]
    };
  };

  const { projectTypes, sizeUnits, materials, complexities, locations } = getProjectData();

  const calculateEstimate = async () => {
    if (!formData.projectType || !formData.size || !formData.material || !formData.location) {
      return;
    }

    setIsCalculating(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const projectType = projectTypes.find(p => p.value === formData.projectType);
    const material = materials.find(m => m.value === formData.material);
    const complexity = complexities.find(c => c.value === formData.complexity);
    const location = locations.find(l => l.value === formData.location);

    if (!projectType || !material || !complexity || !location) return;

    const size = parseFloat(formData.size);
    const baseCost = projectType.basePrice * size;
    const materialCost = baseCost * material.multiplier;
    const complexityCost = baseCost * complexity.multiplier;
    const locationCost = baseCost * location.multiplier;
    const hurricaneCost = formData.hurricaneResistant ? baseCost * 0.2 : 0;

    const subtotal = baseCost + materialCost + complexityCost + locationCost + hurricaneCost;
    const contingency = subtotal * 0.1;
    const permits = subtotal * 0.05;
    const totalEstimate = subtotal + contingency + permits;

    const estimate: ProjectEstimate = {
      projectType: formData.projectType,
      size: size,
      sizeUnit: formData.sizeUnit,
      material: formData.material,
      complexity: formData.complexity,
      location: formData.location,
      baseCost: baseCost,
      materialMultiplier: material.multiplier,
      complexityMultiplier: complexity.multiplier,
      locationMultiplier: location.multiplier,
      totalEstimate: {
        min: Math.round(totalEstimate * 0.9),
        max: Math.round(totalEstimate * 1.1)
      },
      breakdown: {
        materials: Math.round(materialCost),
        labor: Math.round(baseCost * 0.6),
        permits: Math.round(permits),
        contingency: Math.round(contingency)
      },
      timeline: formData.complexity === 'simple' ? (locale === 'es' ? '1-2 semanas' : '1-2 weeks') :
                formData.complexity === 'standard' ? (locale === 'es' ? '2-4 semanas' : '2-4 weeks') :
                formData.complexity === 'complex' ? (locale === 'es' ? '4-6 semanas' : '4-6 weeks') : (locale === 'es' ? '6-8 semanas' : '6-8 weeks'),
      hurricaneResistant: formData.hurricaneResistant,
      aiRecommendation: formData.hurricaneResistant
        ? (locale === 'es'
            ? "Tu actualización resistente a huracanes proporcionará protección excepcional contra tormentas y puede calificar para descuentos de seguro."
            : "Your hurricane-resistant upgrade will provide exceptional storm protection and may qualify for insurance discounts.")
        : (locale === 'es'
            ? "Considera actualizar a construcción resistente a huracanes para protección mejorada durante la temporada de tormentas de Florida."
            : "Consider upgrading to hurricane-resistant construction for enhanced protection during Florida's storm season."),
      nextSteps: locale === 'es'
        ? [
            "Programa una consulta gratuita para discutir tu proyecto en detalle",
            "Revisa muestras de materiales y opciones de diseño",
            "Obtén una cotización detallada con especificaciones exactas",
            "Planifica tu cronograma de proyecto según los patrones climáticos de Florida"
          ]
        : [
            "Schedule a free consultation to discuss your project in detail",
            "Review material samples and design options",
            "Get a detailed quote with exact specifications",
            "Plan your project timeline around Florida's weather patterns"
          ]
    };

    setEstimate(estimate);
    setShowResults(true);
    setIsCalculating(false);

    if (onEstimateGenerated) {
      onEstimateGenerated(estimate);
    }
  };

  return (
    <Card className="border-2 border-primary shadow-xl">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          {content.title}
        </CardTitle>
        <CardDescription className="text-lg">
          {content.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!showResults ? (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="project-type">{content.form.projectType}</Label>
                <select
                  id="project-type"
                  value={formData.projectType}
                  onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="">Select project type...</option>
                  {projectTypes.map((project) => (
                    <option key={project.value} value={project.value}>
                      {project.label} - ${project.basePrice}/{sizeUnits[0].label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-muted-foreground">
                  {projectTypes.find(p => p.value === formData.projectType)?.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">{content.form.size}</Label>
                <div className="flex gap-2">
                  <Input
                    id="size"
                    type="number"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                    placeholder="Enter size"
                    className="flex-1"
                  />
                  <select
                    value={formData.sizeUnit}
                    onChange={(e) => setFormData({...formData, sizeUnit: e.target.value})}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    {sizeUnits.map((unit) => (
                      <option key={unit.value} value={unit.value}>{unit.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="materials">{content.form.material}</Label>
                <select
                  id="materials"
                  value={formData.material}
                  onChange={(e) => setFormData({...formData, material: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="">Select material preference...</option>
                  {materials.map((material) => (
                    <option key={material.value} value={material.value}>
                      {material.label} ({(material.multiplier * 100).toFixed(0)}%)
                    </option>
                  ))}
                </select>
                <p className="text-sm text-muted-foreground">
                  {materials.find(m => m.value === formData.material)?.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="complexity">{content.form.complexity}</Label>
                <select
                  id="complexity"
                  value={formData.complexity}
                  onChange={(e) => setFormData({...formData, complexity: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  {complexities.map((complexity) => (
                    <option key={complexity.value} value={complexity.value}>
                      {complexity.label} ({(complexity.multiplier * 100).toFixed(0)}%)
                    </option>
                  ))}
                </select>
                <p className="text-sm text-muted-foreground">
                  {complexities.find(c => c.value === formData.complexity)?.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">{content.form.location}</Label>
                <select
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  {locations.map((location) => (
                    <option key={location.value} value={location.value}>
                      {location.label} ({(location.multiplier * 100).toFixed(0)}%)
                    </option>
                  ))}
                </select>
                <p className="text-sm text-muted-foreground">
                  {locations.find(l => l.value === formData.location)?.description}
                </p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hurricane-resistant"
                    checked={formData.hurricaneResistant}
                    onChange={(e) => setFormData({...formData, hurricaneResistant: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="hurricane-resistant" className="text-sm font-medium">
                    {content.form.hurricaneResistant}
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  {locale === 'es' ? 'Agrega 20% de prima para protección mejorada contra tormentas' : 'Adds 20% premium for enhanced storm protection'}
                </p>
              </div>
            </div>

            <Button
              onClick={calculateEstimate}
              disabled={isCalculating || !formData.projectType || !formData.size || !formData.material || !formData.location}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isCalculating ? (
                <>
                  <Calculator className="mr-2 h-4 w-4 animate-spin" />
                  {content.form.calculating}
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" />
                  {content.form.calculate}
                </>
              )}
            </Button>
          </div>
        ) : (
          estimate && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border border-primary/20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    ${estimate.totalEstimate.min.toLocaleString()} - ${estimate.totalEstimate.max.toLocaleString()}
                  </h3>
                  <p className="text-muted-foreground">
                    {content.results.totalEstimate}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {content.results.costBreakdown}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{content.results.baseCost}</span>
                      <span>${estimate.baseCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{content.results.materialCost}</span>
                      <span>{(estimate.materialMultiplier * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{content.results.complexityCost}</span>
                      <span>{(estimate.complexityMultiplier * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{content.results.locationCost}</span>
                      <span>{(estimate.locationMultiplier * 100).toFixed(0)}%</span>
                    </div>
                    {estimate.hurricaneResistant && (
                      <div className="flex justify-between text-green-600">
                        <span className="text-muted-foreground">{content.results.hurricaneCost}</span>
                        <span>+20%</span>
                      </div>
                    )}
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>{content.results.totalEstimate}</span>
                      <span>${estimate.totalEstimate.min.toLocaleString()} - ${estimate.totalEstimate.max.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    {content.results.timeline}
                  </h4>
                  <p className="text-lg font-semibold text-primary">{estimate.timeline}</p>

                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    {content.results.aiRecommendation}
                  </h4>
                  <p className="text-sm text-muted-foreground">{estimate.aiRecommendation}</p>
                </div>
              </div>

              <div className="bg-secondary/10 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  {content.results.nextSteps}
                </h4>
                <ul className="space-y-2">
                  {estimate.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  {content.results.bookConsultation}
                </Button>
                <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  {content.results.getDetailedQuote}
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={() => {
                  setShowResults(false);
                  setEstimate(null);
                }}
                className="w-full"
              >
                {locale === 'es' ? 'Calcular Otra Estimación' : 'Calculate Another Estimate'}
              </Button>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}