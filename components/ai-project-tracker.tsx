'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline, TimelineItem } from "@/components/ui/timeline"
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Eye,
  Download,
  Share2,
  MessageSquare,
  Camera,
  MapPin,
  DollarSign,
  Users,
  TrendingUp,
  Bell,
  Settings,
  RefreshCw,
  Star,
  ArrowRight
} from "lucide-react"

interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  startDate: Date;
  endDate: Date;
  progress: number;
  tasks: ProjectTask[];
  aiInsights: string[];
}

interface ProjectTask {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
  startDate: Date;
  endDate: Date;
  priority: 'low' | 'medium' | 'high';
  dependencies: string[];
}

interface ProjectUpdate {
  id: string;
  type: 'status' | 'photo' | 'milestone' | 'weather' | 'ai-insight';
  title: string;
  description: string;
  timestamp: Date;
  photos?: string[];
  author: string;
  category: 'progress' | 'issue' | 'celebration' | 'weather' | 'ai';
}

interface ProjectMetrics {
  overallProgress: number;
  budgetUsed: number;
  budgetTotal: number;
  daysRemaining: number;
  tasksCompleted: number;
  tasksTotal: number;
  weatherImpact: 'none' | 'minor' | 'moderate' | 'severe';
  aiConfidence: number;
}

interface AIProjectTrackerProps {
  locale?: string;
  projectId?: string;
  onProgressUpdate?: (update: any) => void;
}

interface AIWeatherIntegrationProps {
  locale?: string;
  projectLocation?: string;
  onWeatherAlert?: (alert: any) => void;
}

export function AIProjectTracker({ locale = 'en', projectId = 'demo-project', onProgressUpdate }: AIProjectTrackerProps) {
  const [projectData, setProjectData] = useState<any>(null);
  const [activePhase, setActivePhase] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const content = {
    en: {
      title: "AI Project Tracker",
      subtitle: "Real-time project updates with intelligent insights",
      overview: "Project Overview",
      timeline: "Project Timeline",
      updates: "Latest Updates",
      metrics: "Project Metrics",
      phases: "Project Phases",
      tasks: "Current Tasks",
      photos: "Progress Photos",
      weather: "Weather Impact",
      aiInsights: "AI Insights",
      budget: "Budget Tracking",
      team: "Team Activity",
      downloadReport: "Download Report",
      shareProgress: "Share Progress",
      refresh: "Refresh",
      autoRefresh: "Auto Refresh",
      daysRemaining: "days remaining",
      tasksCompleted: "tasks completed",
      budgetUsed: "budget used",
      weatherImpact: "Weather Impact",
      aiRecommendation: "AI Recommendation",
      nextMilestone: "Next Milestone",
      recentActivity: "Recent Activity"
    },
    es: {
      title: "Rastreador de Proyectos con IA",
      subtitle: "Actualizaciones de proyectos en tiempo real con perspectivas inteligentes",
      overview: "Resumen del Proyecto",
      timeline: "Cronograma del Proyecto",
      updates: "Últimas Actualizaciones",
      metrics: "Métricas del Proyecto",
      phases: "Fases del Proyecto",
      tasks: "Tareas Actuales",
      photos: "Fotos de Progreso",
      weather: "Impacto del Clima",
      aiInsights: "Perspectivas de IA",
      budget: "Seguimiento de Presupuesto",
      team: "Actividad del Equipo",
      downloadReport: "Descargar Reporte",
      shareProgress: "Compartir Progreso",
      refresh: "Actualizar",
      autoRefresh: "Actualización Automática",
      daysRemaining: "días restantes",
      tasksCompleted: "tareas completadas",
      budgetUsed: "presupuesto usado",
      weatherImpact: "Impacto del Clima",
      aiRecommendation: "Recomendación de IA",
      nextMilestone: "Próximo Hito",
      recentActivity: "Actividad Reciente"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  // Mock project data
  const mockProjectData = {
    id: projectId,
    name: 'Custom Hurricane-Resistant Deck Construction',
    client: 'Sarah Johnson',
    location: 'Miami, FL',
    startDate: new Date('2024-01-15'),
    expectedEndDate: new Date('2024-03-15'),
    budget: 45000,
    status: 'in-progress',
    phases: [
      {
        id: '1',
        name: 'Design & Permits',
        description: 'Finalize design and obtain necessary permits',
        status: 'completed',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-30'),
        progress: 100,
        tasks: [
          { id: '1-1', name: 'Design Approval', status: 'completed', assignedTo: 'Design Team' },
          { id: '1-2', name: 'Permit Submission', status: 'completed', assignedTo: 'Project Manager' }
        ],
        aiInsights: ['Design optimized for hurricane resistance', 'Permits expedited due to AI-preparation']
      },
      {
        id: '2',
        name: 'Site Preparation',
        description: 'Clear and prepare the construction site',
        status: 'in-progress',
        startDate: new Date('2024-01-31'),
        endDate: new Date('2024-02-05'),
        progress: 75,
        tasks: [
          { id: '2-1', name: 'Site Clearing', status: 'completed', assignedTo: 'Construction Team' },
          { id: '2-2', name: 'Foundation Preparation', status: 'in-progress', assignedTo: 'Construction Team' }
        ],
        aiInsights: ['Weather window identified for optimal construction', 'Site conditions excellent for foundation work']
      },
      {
        id: '3',
        name: 'Foundation & Framing',
        description: 'Install foundation and structural framing',
        status: 'pending',
        startDate: new Date('2024-02-06'),
        endDate: new Date('2024-02-20'),
        progress: 0,
        tasks: [
          { id: '3-1', name: 'Foundation Installation', status: 'pending', assignedTo: 'Foundation Team' },
          { id: '3-2', name: 'Structural Framing', status: 'pending', assignedTo: 'Framing Team' }
        ],
        aiInsights: ['Hurricane-resistant foundation specifications ready', 'Material delivery scheduled for optimal timing']
      }
    ],
    updates: [
      {
        id: '1',
        type: 'photo',
        title: 'Site Clearing Complete',
        description: 'Construction area has been cleared and prepared for foundation work.',
        timestamp: new Date('2024-02-02T14:30:00'),
        photos: ['/api/placeholder/300/200', '/api/placeholder/300/200'],
        author: 'Construction Team',
        category: 'progress'
      },
      {
        id: '2',
        type: 'ai-insight',
        title: 'Weather Alert: Optimal Construction Window',
        description: 'AI analysis indicates perfect weather conditions for the next 5 days - ideal for foundation work.',
        timestamp: new Date('2024-02-02T09:15:00'),
        author: 'AI System',
        category: 'ai'
      },
      {
        id: '3',
        type: 'milestone',
        title: 'Phase 1 Complete: Design & Permits',
        description: 'All design approvals and permits have been successfully obtained.',
        timestamp: new Date('2024-01-30T16:00:00'),
        author: 'Project Manager',
        category: 'celebration'
      }
    ],
    metrics: {
      overallProgress: 35,
      budgetUsed: 15750,
      budgetTotal: 45000,
      daysRemaining: 42,
      tasksCompleted: 3,
      tasksTotal: 8,
      weatherImpact: 'none',
      aiConfidence: 92
    }
  };

  useEffect(() => {
    // Simulate loading project data
    setTimeout(() => {
      setProjectData(mockProjectData);
      setActivePhase(mockProjectData.phases[1].id); // Set active phase to current
      setIsLoading(false);
    }, 1500);
  }, [projectId]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      if (projectData) {
        const updatedData = { ...projectData };
        updatedData.metrics.overallProgress = Math.min(updatedData.metrics.overallProgress + 0.1, 100);
        setProjectData(updatedData);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, projectData]);

  const getPhaseStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-gray-100 text-gray-800 border-gray-200',
      delayed: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'photo': return <Camera className="h-4 w-4" />;
      case 'ai-insight': return <Zap className="h-4 w-4" />;
      case 'milestone': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getUpdateColor = (category: string) => {
    const colors = {
      progress: 'text-blue-500',
      celebration: 'text-green-500',
      issue: 'text-red-500',
      weather: 'text-yellow-500',
      ai: 'text-purple-500'
    };
    return colors[category as keyof typeof colors] || 'text-gray-500';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground"
003e
        <RefreshCw className="h-8 w-8 animate-spin mr-2" />
        <span>Loading project data...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between"
003e
        <div className="flex items-center gap-3"
003e
          <TrendingUp className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-3xl font-bold text-foreground">{t.title}</h2>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2"
003e
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            {t.autoRefresh}
          </Button>
          <Button className="gap-2"
003e
            <Download className="h-4 w-4" />
            {t.downloadReport}
          </Button>
        </div>
      </div>

      {/* Project Overview */}
      <Card className="border-border"
003e
        <CardHeader>
          <CardTitle className="flex items-center gap-2"
003e
            <Eye className="h-5 w-5 text-primary" />
            {t.overview}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6"
003e
          <div className="grid md:grid-cols-4 gap-6"
003e
            <div className="text-center"
003e
              <div className="text-2xl font-bold text-primary"
003e{projectData.metrics.overallProgress}%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
              <Progress value={projectData.metrics.overallProgress} className="mt-2" />
            </div>
            <div className="text-center"
003e
              <div className="text-2xl font-bold text-primary"
003e{projectData.metrics.daysRemaining}</div>
              <div className="text-sm text-muted-foreground">{t.daysRemaining}</div>
            </div>
            <div className="text-center"
003e
              <div className="text-2xl font-bold text-primary"
003e{projectData.metrics.tasksCompleted}/{projectData.metrics.tasksTotal}</div>
              <div className="text-sm text-muted-foreground">{t.tasksCompleted}</div>
            </div>
            <div className="text-center"
003e
              <div className="text-2xl font-bold text-primary"
003e${Math.round((projectData.metrics.budgetUsed / projectData.metrics.budgetTotal) * 100)}%</div>
              <div className="text-sm text-muted-foreground">{t.budgetUsed}</div>
              <Progress value={(projectData.metrics.budgetUsed / projectData.metrics.budgetTotal) * 100} className="mt-2" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6"
003e
            <div className="space-y-4"
003e
              <h4 className="font-semibold">{projectData.name}</h4>
              <div className="space-y-2 text-sm"
003e
                <div className="flex justify-between"
003e
                  <span className="text-muted-foreground">Client:</span>
                  <span>{projectData.client}</span>
                </div>
                <div className="flex justify-between"
003e
                  <span className="text-muted-foreground">Location:</span>
                  <span>{projectData.location}</span>
                </div>
                <div className="flex justify-between"
003e
                  <span className="text-muted-foreground">Start Date:</span>
                  <span>{projectData.startDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between"
003e
                  <span className="text-muted-foreground">Expected Completion:</span>
                  <span>{projectData.expectedEndDate.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4"
003e
              <h4 className="font-semibold">{t.metrics}</h4>
              <div className="grid grid-cols-2 gap-4"
003e
                <div className="text-center p-3 bg-muted rounded-lg"
003e
                  <div className="text-lg font-bold text-primary"
003e{projectData.metrics.aiConfidence}%</div>
                  <div className="text-xs text-muted-foreground">AI Confidence</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg"
003e
                  <div className="text-lg font-bold text-green-600"
003e{projectData.metrics.weatherImpact}</div>
                  <div className="text-xs text-muted-foreground">{t.weatherImpact}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Timeline */}
      <div className="grid lg:grid-cols-2 gap-8"
003e
        <Card className="border-border"
003e
          <CardHeader>
            <CardTitle className="flex items-center gap-2"
003e
              <Clock className="h-5 w-5 text-primary" />
              {t.timeline}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4"
003e
            {projectData.phases.map((phase) => (
              <Card key={phase.id} className={`border-l-4 ${phase.status === 'completed' ? 'border-green-500' : phase.status === 'in-progress' ? 'border-blue-500' : 'border-gray-300'}`}
003e
                <CardContent className="p-4"
003e
                  <div className="space-y-3"
003e
                    <div className="flex items-center justify-between"
003e
                      <h4 className="font-semibold">{phase.name}</h4>
                      <Badge className={getPhaseStatusColor(phase.status)}
003e
                        {phase.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                    <div className="flex items-center justify-between text-sm"
003e
                      <span>{phase.startDate.toLocaleDateString()} - {phase.endDate.toLocaleDateString()}</span>
                      <span className="font-medium">{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} className="w-full" />

                    {phase.aiInsights.length > 0 && (
                      <div className="space-y-1"
003e
                        <div className="flex items-center gap-2 text-sm font-medium text-purple-600"
003e
                          <Zap className="h-4 w-4" />
                          {t.aiInsights}
                        </div>
                        <ul className="space-y-1"
003e
                          {phase.aiInsights.map((insight, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2"
003e
                              <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border"
003e
          <CardHeader>
            <CardTitle className="flex items-center gap-2"
003e
              <Bell className="h-5 w-5 text-primary" />
              {t.updates}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4"
003e
            {projectData.updates.map((update) => (
              <Card key={update.id} className="border-border"
003e
                <CardContent className="p-4"
003e
                  <div className="flex items-start gap-3"
003e
                    <div className={`${getUpdateColor(update.category)} mt-1`}
003e
                      {getUpdateIcon(update.type)}
                    </div>
                    <div className="flex-1 space-y-2"
003e
                      <div className="flex items-center justify-between"
003e
                        <h4 className="font-medium">{update.title}</h4>
                        <span className="text-sm text-muted-foreground"
003e{update.timestamp.toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground"
003e{update.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground"
003e
                        <Users className="h-3 w-3" />
                        <span>{update.author}</span>
                      </div>

                      {update.photos && update.photos.length > 0 && (
                        <div className="flex gap-2 mt-2"
003e
                          {update.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`Update photo ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Weather Integration */}
      <AIWeatherIntegration
        locale={locale}
        projectLocation={projectData.location}
      />

      {/* Action Buttons */}
      <div className="flex justify-center gap-4"
003e
        <Button className="gap-2"
003e
          <MessageSquare className="h-4 w-4" />
          Contact Project Manager
        </Button>
        <Button className="gap-2"
003e
          <Camera className="h-4 w-4" />
          Request Photo Update
        </Button>
        <Button variant="outline" className="gap-2"
003e
          <Share2 className="h-4 w-4" />
          {t.shareProgress}
        </Button>
      </div>
    </div>
  );
}

export function AIWeatherIntegration({ locale = 'en', projectLocation, onWeatherAlert }: AIWeatherIntegrationProps) {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const content = {
    en: {
      title: "AI Weather Integration",
      subtitle: "Intelligent weather monitoring for your project",
      currentConditions: "Current Conditions",
      forecast: "7-Day Forecast",
      alerts: "Weather Alerts",
      aiRecommendations: "AI Recommendations",
      temperature: "Temperature",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      precipitation: "Precipitation",
      uvIndex: "UV Index",
      constructionImpact: "Construction Impact",
      optimalDays: "Optimal Construction Days",
      rescheduleSuggestion: "Reschedule Suggestion"
    },
    es: {
      title: "Integración de Clima con IA",
      subtitle: "Monitoreo inteligente del clima para tu proyecto",
      currentConditions: "Condiciones Actuales",
      forecast: "Pronóstico de 7 Días",
      alerts: "Alertas del Clima",
      aiRecommendations: "Recomendaciones de IA",
      temperature: "Temperatura",
      humidity: "Humedad",
      windSpeed: "Velocidad del Viento",
      precipitation: "Precipitación",
      uvIndex: "Índice UV",
      constructionImpact: "Impacto en Construcción",
      optimalDays: "Días Óptimos para Construcción",
      rescheduleSuggestion: "Sugerencia de Reprogramación"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  useEffect(() => {
    // Simulate weather data loading
    setTimeout(() => {
      const mockWeatherData = {
        current: {
          temperature: 78,
          humidity: 65,
          windSpeed: 12,
          precipitation: 0,
          uvIndex: 7,
          conditions: 'Partly Cloudy',
          icon: '⛅'
        },
        forecast: [
          { day: 'Today', high: 82, low: 68, conditions: 'Partly Cloudy', icon: '⛅', constructionImpact: 'Good' },
          { day: 'Tomorrow', high: 84, low: 70, conditions: 'Sunny', icon: '☀️', constructionImpact: 'Excellent' },
          { day: 'Wednesday', high: 86, low: 72, conditions: 'Sunny', icon: '☀️', constructionImpact: 'Excellent' },
          { day: 'Thursday', high: 83, low: 69, conditions: 'Scattered Showers', icon: '🌦️', constructionImpact: 'Fair' },
          { day: 'Friday', high: 81, low: 67, conditions: 'Partly Cloudy', icon: '⛅', constructionImpact: 'Good' },
          { day: 'Saturday', high: 79, low: 65, conditions: 'Cloudy', icon: '☁️', constructionImpact: 'Good' },
          { day: 'Sunday', high: 77, low: 63, conditions: 'Light Rain', icon: '🌧️', constructionImpact: 'Poor' }
        ],
        alerts: [
          {
            type: 'wind',
            severity: 'moderate',
            message: 'Wind speeds may exceed safe construction limits on Thursday',
            recommendation: 'Consider indoor work or reschedule outdoor activities'
          }
        ],
        aiRecommendations: [
          'Tuesday and Wednesday offer optimal conditions for concrete work',
          'Schedule painting or staining for Friday when humidity is lower',
          'Consider Thursday for indoor preparation work due to scattered showers'
        ]
      };

      setWeatherData(mockWeatherData);
      setIsLoading(false);

      if (onWeatherAlert) {
        onWeatherAlert(mockWeatherData.alerts[0]);
      }
    }, 1000);
  }, [projectLocation, onWeatherAlert]);

  if (isLoading) {
    return (
      <Card className="border-border"
003e
        <CardContent className="flex items-center justify-center h-32 text-muted-foreground"
003e
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Loading weather data...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-gradient-to-br from-blue-50 to-indigo-50"
003e
      <CardHeader className="border-b border-blue-200"
003e
        <CardTitle className="flex items-center gap-2"
003e
          <Zap className="h-5 w-5 text-primary" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6"
003e
        <div className="grid lg:grid-cols-3 gap-6"
003e
          {/* Current Conditions */}
          <div className="space-y-4"
003e
            <h4 className="font-semibold">{t.currentConditions}</h4>
            <Card className="border-blue-200 bg-white"
003e
              <CardContent className="p-4 text-center"
003e
                <div className="text-4xl mb-2"
003e{weatherData.current.icon}</div>
                <div className="text-2xl font-bold text-blue-600"
003e{weatherData.current.temperature}°F</div>
                <div className="text-sm text-muted-foreground"
003e{weatherData.current.conditions}</div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm"
003e
                  <div>
                    <div className="text-muted-foreground">{t.humidity}</div>
                    <div className="font-medium">{weatherData.current.humidity}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">{t.windSpeed}</div>
                    <div className="font-medium">{weatherData.current.windSpeed} mph</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 7-Day Forecast */}
          <div className="space-y-4"
003e
            <h4 className="font-semibold">{t.forecast}</h4>
            <div className="space-y-2"
003e
              {weatherData.forecast.map((day, index) => (
                <Card key={index} className="border-blue-200 bg-white"
003e
                  <CardContent className="p-3"
003e
                    <div className="flex items-center justify-between"
003e
                      <div className="flex items-center gap-3"
003e
                        <span className="text-2xl"
003e{day.icon}</span>
                        <div>
                          <div className="font-medium"
003e{day.day}</div>
                          <div className="text-sm text-muted-foreground"
003e{day.conditions}</div>
                        </div>
                      </div>
                      <div className="text-right"
003e
                        <div className="text-sm font-medium"
003e{day.high}° / {day.low}°</div>
                        <Badge className={`text-xs ${
                          day.constructionImpact === 'Excellent' ? 'bg-green-100 text-green-800' :
                          day.constructionImpact === 'Good' ? 'bg-blue-100 text-blue-800' :
                          day.constructionImpact === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
003e
                          {day.constructionImpact}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="space-y-4"
003e
            <h4 className="font-semibold">{t.aiRecommendations}</h4>
            <Card className="border-blue-200 bg-white"
003e
              <CardContent className="p-4 space-y-3"
003e
                {weatherData.aiRecommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2"
003e
                    <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"
003e{recommendation}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {weatherData.alerts.length > 0 && (
              <Card className="border-yellow-200 bg-yellow-50"
003e
                <CardContent className="p-4"
003e
                  <h5 className="font-medium mb-2 flex items-center gap-2"
003e
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    {t.alerts}
                  </h5>
                  {weatherData.alerts.map((alert, index) => (
                    <div key={index} className="text-sm text-yellow-800"
003e
                      <p>{alert.message}</p>
                      <p className="mt-1 font-medium"
003e{alert.recommendation}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}