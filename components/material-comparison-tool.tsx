'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  Shield,
  Leaf,
  Palette,
  Wrench,
  DollarSign,
  Info,
  CheckCircle,
  XCircle,
  MessageCircle,
  Send
} from "lucide-react"
import { getMCPClient, MaterialData } from '@/lib/integrations/mcp-client'
import { cn } from '@/lib/utils'

interface ComparisonToolProps {
  locale?: string;
  onComparisonComplete?: (comparison: any) => void;
}

export function MaterialComparisonTool({ locale = 'en', onComparisonComplete }: ComparisonToolProps) {
  const [materials, setMaterials] = useState<MaterialData[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [comparisonResults, setComparisonResults] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    en: {
      title: "Interactive Cost & Material Comparison",
      subtitle: "AI-powered material analysis for your Florida project",
      selectMaterials: "Select Materials to Compare",
      compareButton: "Generate AI Comparison",
      chatPlaceholder: "Ask about materials, costs, or Florida suitability...",
      sendButton: "Send",
      costAnalysis: "Cost Analysis",
      durability: "Durability",
      maintenance: "Maintenance",
      weatherResistance: "Weather Resistance",
      aesthetic: "Aesthetic",
      sustainability: "Sustainability",
      floridaSuitability: "Florida Suitability",
      pros: "Pros",
      cons: "Cons",
      bestFor: "Best For",
      aiRecommendation: "AI Recommendation"
    },
    es: {
      title: "Comparación Interactiva de Costos y Materiales",
      subtitle: "Análisis de materiales con IA para su proyecto en Florida",
      selectMaterials: "Seleccionar Materiales para Comparar",
      compareButton: "Generar Comparación con IA",
      chatPlaceholder: "Pregunte sobre materiales, costos o idoneidad para Florida...",
      sendButton: "Enviar",
      costAnalysis: "Análisis de Costos",
      durability: "Durabilidad",
      maintenance: "Mantenimiento",
      weatherResistance: "Resistencia al Clima",
      aesthetic: "Estética",
      sustainability: "Sostenibilidad",
      floridaSuitability: "Idoneidad para Florida",
      pros: "Ventajas",
      cons: "Desventajas",
      bestFor: "Ideal Para",
      aiRecommendation: "Recomendación de IA"
    }
  };

  const t = content[locale] || content.en;

  useEffect(() => {
    loadMaterialData();
    initializeChat();
  }, []);

  const loadMaterialData = async () => {
    try {
      const mcpClient = getMCPClient();
      const materialData = await mcpClient.getMaterialData();
      setMaterials(materialData);
    } catch (error) {
      console.error('Error loading material data:', error);
      setMaterials(generateDefaultMaterials());
    }
  };

  const generateDefaultMaterials = (): MaterialData[] => [
    {
      name: 'Pressure-Treated Lumber',
      description: 'Chemically treated wood resistant to rot, decay, and insects',
      pros: ['Affordable', 'Weather resistant', 'Widely available', 'Easy to work with'],
      cons: ['Chemical treatment concerns', 'Can warp or crack', 'Requires regular maintenance'],
      costMultiplier: 1.0,
      durability: 7,
      maintenance: 6,
      weatherResistance: 8,
      aesthetic: 6,
      sustainability: 5,
      bestFor: ['Outdoor decks', 'Fencing', 'Structural framing'],
      floridaSuitability: 8
    },
    {
      name: 'Cedar',
      description: 'Natural wood with inherent resistance to decay and insects',
      pros: ['Natural beauty', 'Insect resistant', 'Aromatic', 'Stable in humidity'],
      cons: ['More expensive', 'Requires sealing', 'Can dent easily'],
      costMultiplier: 1.4,
      durability: 8,
      maintenance: 7,
      weatherResistance: 8,
      aesthetic: 9,
      sustainability: 8,
      bestFor: ['Outdoor furniture', 'Siding', 'Decks'],
      floridaSuitability: 9
    },
    {
      name: 'Composite Decking',
      description: 'Wood-plastic composite material designed for outdoor use',
      pros: ['Low maintenance', 'Won\'t splinter', 'Fade resistant', 'Long lasting'],
      cons: ['Expensive', 'Can get hot', 'Limited colors', 'Can scratch'],
      costMultiplier: 2.2,
      durability: 9,
      maintenance: 9,
      weatherResistance: 9,
      aesthetic: 7,
      sustainability: 7,
      bestFor: ['High-end decks', 'Pool areas', 'Low-maintenance projects'],
      floridaSuitability: 9
    }
  ];

  const initializeChat = () => {
    setChatMessages([
      {
        role: 'assistant',
        content: locale === 'es'
          ? '¡Hola! Soy su asistente de comparación de materiales con IA. ¿En qué puedo ayudarle con su proyecto de carpintería en Florida?'
          : 'Hello! I\'m your AI material comparison assistant. How can I help you with your Florida carpentry project?'
      }
    ]);
  };

  const handleMaterialSelection = (materialName: string) => {
    if (selectedMaterials.includes(materialName)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== materialName));
    } else if (selectedMaterials.length < 3) {
      setSelectedMaterials([...selectedMaterials, materialName]);
    }
  };

  const generateAIComparison = async () => {
    if (selectedMaterials.length === 0) return;

    setIsLoading(true);
    try {
      const mcpClient = getMCPClient();
      const selectedMaterialData = materials.filter(m => selectedMaterials.includes(m.name));

      // Generate AI-powered comparison
      const comparison = await generateAIComparisonAnalysis(mcpClient, selectedMaterialData);
      setComparisonResults(comparison);

      if (onComparisonComplete) {
        onComparisonComplete(comparison);
      }
    } catch (error) {
      console.error('Error generating AI comparison:', error);
      // Fallback to basic comparison
      const basicComparison = generateBasicComparison();
      setComparisonResults(basicComparison);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIComparisonAnalysis = async (mcpClient: any, selectedMaterials: MaterialData[]) => {
    const materialNames = selectedMaterials.map(m => m.name);
    const aiAnalysis = await mcpClient.generateMaterialComparison(materialNames);

    return {
      materials: selectedMaterials,
      aiAnalysis: aiAnalysis,
      recommendations: generateSmartRecommendations(selectedMaterials),
      floridaRanking: rankMaterialsForFlorida(selectedMaterials),
      costComparison: generateCostComparison(selectedMaterials),
      sustainabilityScore: calculateSustainabilityScore(selectedMaterials)
    };
  };

  const generateSmartRecommendations = (materials: MaterialData[]) => {
    const recommendations = [];

    // Florida climate recommendations
    const bestFloridaMaterial = materials.reduce((prev, current) =>
      prev.floridaSuitability > current.floridaSuitability ? prev : current
    );
    recommendations.push({
      type: 'climate',
      title: locale === 'es' ? 'Mejor para el Clima de Florida' : 'Best for Florida Climate',
      description: `${bestFloridaMaterial.name} - ${locale === 'es' ? 'Excelente resistencia a la humedad y tormentas' : 'Excellent resistance to humidity and storms'}`,
      material: bestFloridaMaterial.name
    });

    // Budget recommendations
    const cheapestMaterial = materials.reduce((prev, current) =>
      prev.costMultiplier < current.costMultiplier ? prev : current
    );
    recommendations.push({
      type: 'budget',
      title: locale === 'es' ? 'Opción Más Económica' : 'Most Budget-Friendly Option',
      description: `${cheapestMaterial.name} - ${locale === 'es' ? 'Buena relación calidad-precio' : 'Good value for money'}`,
      material: cheapestMaterial.name
    });

    // Maintenance recommendations
    const lowestMaintenance = materials.reduce((prev, current) =>
      prev.maintenance > current.maintenance ? prev : current
    );
    recommendations.push({
      type: 'maintenance',
      title: locale === 'es' ? 'Menor Mantenimiento' : 'Lowest Maintenance',
      description: `${lowestMaintenance.name} - ${locale === 'es' ? 'Requiere menos cuidado a largo plazo' : 'Requires less long-term care'}`,
      material: lowestMaintenance.name
    });

    return recommendations;
  };

  const rankMaterialsForFlorida = (materials: MaterialData[]) => {
    return materials
      .map(material => ({
        ...material,
        overallScore: (
          material.floridaSuitability * 0.3 +
          material.weatherResistance * 0.25 +
          material.durability * 0.2 +
          material.maintenance * 0.15 +
          material.sustainability * 0.1
        )
      }))
      .sort((a, b) => b.overallScore - a.overallScore);
  };

  const generateCostComparison = (materials: MaterialData[]) => {
    const baseCost = 10000; // Base project cost
    return materials.map(material => ({
      name: material.name,
      estimatedCost: baseCost * material.costMultiplier,
      costPerSqFt: (baseCost * material.costMultiplier) / 500, // Assuming 500 sq ft project
      totalWithLabor: (baseCost * material.costMultiplier) * 1.6, // Including 60% labor
      maintenanceCost5Years: baseCost * 0.1 * (10 - material.maintenance) * 5
    }));
  };

  const calculateSustainabilityScore = (materials: MaterialData[]) => {
    const avgSustainability = materials.reduce((sum, m) => sum + m.sustainability, 0) / materials.length;
    return {
      score: avgSustainability,
      level: avgSustainability >= 8 ? 'Excellent' : avgSustainability >= 6 ? 'Good' : 'Needs Improvement',
      recommendations: generateSustainabilityRecommendations(avgSustainability)
    };
  };

  const generateSustainabilityRecommendations = (score: number) => {
    if (score >= 8) {
      return [locale === 'es' ? '¡Excelente elección ecológica!' : 'Excellent eco-friendly choice!'];
    } else if (score >= 6) {
      return [locale === 'es' ? 'Buena opción sostenible' : 'Good sustainable option'];
    } else {
      return [locale === 'es' ? 'Considere opciones más sostenibles' : 'Consider more sustainable options'];
    }
  };

  const generateBasicComparison = () => {
    const selectedMaterialData = materials.filter(m => selectedMaterials.includes(m.name));
    return {
      materials: selectedMaterialData,
      recommendations: generateSmartRecommendations(selectedMaterialData),
      floridaRanking: rankMaterialsForFlorida(selectedMaterialData),
      costComparison: generateCostComparison(selectedMaterialData),
      sustainabilityScore: calculateSustainabilityScore(selectedMaterialData)
    };
  };

  const handleChatMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage;
    setCurrentMessage('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    setIsLoading(true);
    try {
      const mcpClient = getMCPClient();

      // Generate AI response based on the user's question
      const aiResponse = await generateAIChatResponse(mcpClient, userMessage, selectedMaterials);

      setChatMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error generating AI chat response:', error);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: locale === 'es'
          ? 'Lo siento, no pude procesar su pregunta. Por favor, intente de nuevo.'
          : 'Sorry, I couldn\'t process your question. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIChatResponse = async (mcpClient: any, message: string, selectedMaterials: string[]) => {
    const selectedMaterialData = materials.filter(m => selectedMaterials.includes(m.name));

    const prompt = `User question about carpentry materials: "${message}"

Selected materials: ${selectedMaterials.join(', ')}
Material data: ${JSON.stringify(selectedMaterialData, null, 2)}

Please provide a helpful, detailed response that:
1. Answers their specific question
2. References the selected materials when relevant
3. Includes Florida-specific advice if applicable
4. Provides actionable recommendations
5. Is professional and informative

Keep the response concise but comprehensive.`;

    try {
      const response = await mcpClient.generateTextSummary(prompt, 500);
      return response;
    } catch (error) {
      // Fallback response
      return locale === 'es'
        ? `Basado en sus materiales seleccionados (${selectedMaterials.join(', ')}), le recomendaría considerar factores como resistencia al clima de Florida, mantenimiento a largo plazo y presupuesto. ¿Hay algo específico sobre estos materiales que le gustaría saber?`
        : `Based on your selected materials (${selectedMaterials.join(', ')}), I'd recommend considering factors like Florida weather resistance, long-term maintenance, and budget. Is there anything specific about these materials you'd like to know?`;
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 8) return locale === 'es' ? 'Excelente' : 'Excellent';
    if (rating >= 6) return locale === 'es' ? 'Bueno' : 'Good';
    if (rating >= 4) return locale === 'es' ? 'Regular' : 'Fair';
    return locale === 'es' ? 'Pobre' : 'Poor';
  };

  if (materials.length === 0) {
    return (
      <Card className="border-2 border-primary shadow-xl">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-xl flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{locale === 'es' ? 'Cargando datos de materiales...' : 'Loading material data...'}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
          <BarChart3 className="h-4 w-4" />
          AI-Powered Analysis
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          {t.title}
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Material Selection */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            {t.selectMaterials}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((material) => (
              <Card
                key={material.name}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  selectedMaterials.includes(material.name)
                    ? "border-2 border-primary bg-primary/5"
                    : "border border-border hover:border-primary/50"
                )}
                onClick={() => handleMaterialSelection(material.name)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm">{material.name}</h3>
                    <Badge variant={selectedMaterials.includes(material.name) ? "default" : "outline"}>
                      {material.costMultiplier}x
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{material.description}</p>

                  {/* Rating Bars */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>{t.floridaSuitability}</span>
                      <span className={getRatingColor(material.floridaSuitability)}>{material.floridaSuitability}/10</span>
                    </div>
                    <Progress value={material.floridaSuitability * 10} className="h-1" />

                    <div className="flex items-center justify-between text-xs">
                      <span>{t.durability}</span>
                      <span className={getRatingColor(material.durability)}>{material.durability}/10</span>
                    </div>
                    <Progress value={material.durability * 10} className="h-1" />

                    <div className="flex items-center justify-between text-xs">
                      <span>{t.maintenance}</span>
                      <span className={getRatingColor(material.maintenance)}>{material.maintenance}/10</span>
                    </div>
                    <Progress value={material.maintenance * 10} className="h-1" />
                  </div>

                  {/* Best For */}
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-1">{t.bestFor}:</p>
                    <div className="flex flex-wrap gap-1">
                      {material.bestFor.slice(0, 2).map((use, index) => (
                        <Badge key={index} variant="outline" size="sm" className="text-xs">
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={generateAIComparison}
              disabled={selectedMaterials.length === 0 || isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {t.compareButton}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {comparisonResults && (
        <div className="space-y-6">
          {/* AI Analysis */}
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50"
          >
            <CardHeader className="bg-green-100">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <TrendingUp className="h-5 w-5" />
                {t.aiRecommendation}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none text-green-900">
                <p>{comparisonResults.aiAnalysis}</p>
              </div>

              {/* Smart Recommendations */}
              <div className="space-y-3">
                <h4 className="font-semibold text-green-800">Smart Recommendations:</h4>
                {comparisonResults.recommendations.map((rec: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-800">{rec.title}</p>
                      <p className="text-sm text-green-700">{rec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Detailed Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Material</th>
                      <th className="text-center p-2">Cost</th>
                      <th className="text-center p-2">Durability</th>
                      <th className="text-center p-2">Weather</th>
                      <th className="text-center p-2">Florida</th>
                      <th className="text-center p-2">Maintenance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonResults.floridaRanking.map((material: MaterialData & { overallScore: number }, index: number) => (
                      <tr key={material.name} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{material.name}</td>
                        <td className="p-2 text-center">
                          <Badge variant="outline">{material.costMultiplier}x</Badge>
                        </td>
                        <td className="p-2 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={getRatingColor(material.durability)}>{material.durability}/10</span>
                            <span className="text-xs text-muted-foreground">({getRatingLabel(material.durability)})</span>
                          </div>
                        </td>
                        <td className="p-2 text-center">
                          <span className={getRatingColor(material.weatherResistance)}>{material.weatherResistance}/10</span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={getRatingColor(material.floridaSuitability)}>{material.floridaSuitability}/10</span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={getRatingColor(material.maintenance)}>{material.maintenance}/10</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card className="border-2 border-blue-200"
          >
            <CardHeader className="bg-blue-50"
            >
              <CardTitle className="flex items-center gap-2 text-blue-800"
              >
                <DollarSign className="h-5 w-5" />
                {t.costAnalysis}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4"
            >
              {comparisonResults.costComparison.map((cost: any, index: number) => (
                <div key={index} className="space-y-2"
                >
                  <div className="flex justify-between items-center"
                  >
                    <span className="font-medium">{cost.name}</span>
                    <span className="font-semibold text-lg">${cost.estimatedCost.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1"
                  >
                    <div className="flex justify-between"
                    >
                      <span>Cost per sq ft:</span>
                      <span>${cost.costPerSqFt.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between"
                    >
                      <span>Total with labor:</span>
                      <span>${cost.totalWithLabor.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between"
                    >
                      <span>5-year maintenance:</span>
                      <span>${cost.maintenanceCost5Years.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-6"
          >
            {comparisonResults.materials.map((material: MaterialData) => (
              <Card key={material.name} className="border-border"
              >
                <CardHeader className="pb-3"
                >
                  <CardTitle className="text-base"
                  >{material.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4"
                >
                  <div>
                    <h4 className="font-semibold text-green-700 flex items-center gap-2 mb-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      {t.pros}
                    </h4>
                    <ul className="space-y-1"
                    >
                      {material.pros.map((pro, index) => (
                        <li key={index} className="text-sm text-green-700 flex items-start gap-2"
                        >
                          <span className="text-green-500 mt-1">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-700 flex items-center gap-2 mb-2"
                    >
                      <XCircle className="h-4 w-4" />
                      {t.cons}
                    </h4>
                    <ul className="space-y-1"
                    >
                      {material.cons.map((con, index) => (
                        <li key={index} className="text-sm text-red-700 flex items-start gap-2"
                        >
                          <span className="text-red-500 mt-1">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sustainability Score */}
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50"
          >
            <CardHeader className="bg-green-100"
            >
              <CardTitle className="flex items-center gap-2 text-green-800"
              >
                <Leaf className="h-5 w-5" />
                Sustainability Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4"
            >
              <div className="text-center"
              >
                <div className="text-3xl font-bold text-green-600"
                >{comparisonResults.sustainabilityScore.score.toFixed(1)}/10</div>
                <p className="text-green-700 font-medium"
                >{comparisonResults.sustainabilityScore.level}</p>
              </div>

              <div className="space-y-2"
              >
                {comparisonResults.sustainabilityScore.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-2"
                  >
                    <Leaf className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-700"
                    >{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Chat Assistant */}
      <Card className="border-2 border-purple-200"
      >
        <CardHeader className="bg-purple-50"
        >
          <CardTitle className="flex items-center gap-2 text-purple-800"
          >
            <MessageCircle className="h-5 w-5" />
            AI Material Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4"
        >
          <div className="h-64 overflow-y-auto space-y-3 p-4 bg-muted/30 rounded-lg"
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                    message.role === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start"
              >
                <div className="bg-background border rounded-lg px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2"
                  >
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"
                    ></div>
                    <span className="text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2"
          >
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder={t.chatPlaceholder}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleChatMessage()}
            />
            <Button
              onClick={handleChatMessage}
              disabled={isLoading || !currentMessage.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
                ></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Rating Component
function RatingBar({ label, value, max = 10, color = "primary" }: { label: string; value: number; max?: number; color?: string }) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-1"
    >
      <div className="flex justify-between text-sm"
      >
        <span className="font-medium"
        >{label}</span>
        <span className="text-muted-foreground"
        >{value}/{max}</span>
      </div>
      <Progress value={percentage} className={`h-2 bg-${color}/20`} />
    </div>
  );
}

// Material Card Component
function MaterialCard({ material, isSelected, onClick, locale }: {
  material: MaterialData;
  isSelected: boolean;
  onClick: () => void;
  locale: string;
}) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200",
        isSelected
          ? "border-2 border-primary bg-primary/5"
          : "border border-border hover:border-primary/50"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4"
      >
        <div className="flex items-start justify-between mb-2"
        >
          <h3 className="font-semibold text-sm"
          >{material.name}</h3>
          <Badge variant={isSelected ? "default" : "outline"}
          >
            {material.costMultiplier}x
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground mb-3"
        >{material.description}</p>

        {/* Rating Bars */}
        <div className="space-y-2"
        >
          <RatingBar label="Florida Suitability" value={material.floridaSuitability} />
          <RatingBar label="Durability" value={material.durability} />
          <RatingBar label="Weather Resistance" value={material.weatherResistance} />
        </div>

        {/* Best For */}
        <div className="mt-3"
        >
          <p className="text-xs font-medium mb-1">Best For:</p>
          <div className="flex flex-wrap gap-1"
          >
            {material.bestFor.slice(0, 2).map((use, index) => (
              <Badge key={index} variant="outline" size="sm" className="text-xs"
              >
                {use}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MaterialComparisonTool;