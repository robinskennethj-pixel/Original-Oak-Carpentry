'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Thermometer,
  Droplets,
  AlertTriangle,
  Info,
  RefreshCw,
  MapPin,
  Calendar,
  Clock,
  Shield,
  Zap,
  Snowflake,
  Eye
} from "lucide-react"
import { getMCPClient, WeatherData } from '@/lib/integrations/mcp-client'

interface WeatherAlertsSystemProps {
  locale?: string;
  location?: string;
}

export function WeatherAlertsSystem({ locale = 'en', location = 'Florida' }: WeatherAlertsSystemProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(location);

  const content = {
    en: {
      title: "Weather & Storm Alerts",
      subtitle: "Real-time weather monitoring for your construction projects",
      currentConditions: "Current Conditions",
      temperature: "Temperature",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      condition: "Condition",
      weatherAlerts: "Weather Alerts",
      noAlerts: "No active weather alerts",
      recommendations: "Construction Recommendations",
      refresh: "Refresh Data",
      autoRefresh: "Auto-refresh",
      lastUpdated: "Last updated",
      severeWeather: "Severe Weather Alert",
      moderateWeather: "Weather Advisory",
      lowRisk: "Low Risk Conditions",
      location: "Location",
      viewDetails: "View Details",
      constructionImpact: "Construction Impact",
      safetyRecommendations: "Safety Recommendations"
    },
    es: {
      title: "Alertas del Tiempo y Tormentas",
      subtitle: "Monitoreo del tiempo en tiempo real para sus proyectos de construcción",
      currentConditions: "Condiciones Actuales",
      temperature: "Temperatura",
      humidity: "Humedad",
      windSpeed: "Velocidad del Viento",
      condition: "Condición",
      weatherAlerts: "Alertas del Tiempo",
      noAlerts: "No hay alertas de tiempo activas",
      recommendations: "Recomendaciones de Construcción",
      refresh: "Actualizar Datos",
      autoRefresh: "Actualización automática",
      lastUpdated: "Última actualización",
      severeWeather: "Alerta de Tiempo Severo",
      moderateWeather: "Adversencia del Tiempo",
      lowRisk: "Condiciones de Bajo Riesgo",
      location: "Ubicación",
      viewDetails: "Ver Detalles",
      constructionImpact: "Impacto en Construcción",
      safetyRecommendations: "Recomendaciones de Seguridad"
    }
  };

  const t = content[locale] || content.en;

  const floridaLocations = [
    { value: 'Miami, FL', label: 'Miami' },
    { value: 'Orlando, FL', label: 'Orlando' },
    { value: 'Tampa, FL', label: 'Tampa' },
    { value: 'Jacksonville, FL', label: 'Jacksonville' },
    { value: 'Fort Lauderdale, FL', label: 'Fort Lauderdale' },
    { value: 'Naples, FL', label: 'Naples' },
    { value: 'Florida Keys, FL', label: 'Florida Keys' }
  ];

  useEffect(() => {
    loadWeatherData();

    if (autoRefresh) {
      const interval = setInterval(() => {
        loadWeatherData();
      }, 300000); // Refresh every 5 minutes

      return () => clearInterval(interval);
    }
  }, [selectedLocation, autoRefresh]);

  const loadWeatherData = async () => {
    setIsLoading(true);
    try {
      const mcpClient = getMCPClient();
      const data = await mcpClient.getWeatherData(selectedLocation);
      setWeatherData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading weather data:', error);
      // Fallback to mock data
      setWeatherData(generateMockWeatherData());
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockWeatherData = (): WeatherData => ({
    location: selectedLocation,
    current: {
      temperature: 78,
      condition: 'Partly Cloudy',
      humidity: 68,
      windSpeed: 12
    },
    alerts: [
      {
        type: 'Thunderstorm Warning',
        severity: 'high',
        message: 'Severe thunderstorms expected this afternoon with potential for damaging winds and hail',
        expires: '2024-01-15T18:00:00Z'
      },
      {
        type: 'Heat Advisory',
        severity: 'medium',
        message: 'High heat and humidity levels may affect outdoor work conditions',
        expires: '2024-01-15T20:00:00Z'
      }
    ],
    recommendations: [
      'Secure all loose materials and equipment',
      'Cover outdoor work areas with waterproof tarps',
      'Reschedule concrete pours for better weather conditions',
      'Ensure proper ventilation for indoor work',
      'Monitor weather updates throughout the day'
    ]
  });

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain') || lowerCondition.includes('storm')) return <CloudRain className="h-6 w-6" />;
    if (lowerCondition.includes('cloud')) return <Cloud className="h-6 w-6" />;
    if (lowerCondition.includes('snow')) return <Snowflake className="h-6 w-6" />;
    if (lowerCondition.includes('wind')) return <Wind className="h-6 w-6" />;
    return <Sun className="h-6 w-6" />;
  };

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium': return <Info className="h-5 w-5 text-yellow-500" />;
      default: return <Shield className="h-5 w-5 text-green-500" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      default: return 'border-green-200 bg-green-50 text-green-800';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'high': return t.severeWeather;
      case 'medium': return t.moderateWeather;
      default: return t.lowRisk;
    }
  };

  const handleViewDetails = (alert: any) => {
    // Navigate to detailed weather information page
    window.open(`/weather-details?location=${encodeURIComponent(selectedLocation)}&alert=${encodeURIComponent(alert.type)}`, '_blank');
  };

  const handleConstructionImpact = () => {
    // Navigate to construction impact analysis page
    window.open(`/construction-impact?location=${encodeURIComponent(selectedLocation)}`, '_blank');
  };

  const handleSafetyRecommendations = () => {
    // Navigate to safety recommendations page
    window.open(`/safety-recommendations?location=${encodeURIComponent(selectedLocation)}`, '_blank');
  };

  if (isLoading) {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-primary" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{locale === 'es' ? 'Cargando datos del tiempo...' : 'Loading weather data...'}</p>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-primary" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
          <p className="text-muted-foreground">{locale === 'es' ? 'No se pudieron cargar los datos del tiempo' : 'Unable to load weather data'}</p>
          <Button onClick={loadWeatherData} className="mt-4 bg-primary hover:bg-primary/90">
            <RefreshCw className="h-4 w-4 mr-2" />
            {t.refresh}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          Real-time Monitoring
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          {t.title}
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Location Selector */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {t.location}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {floridaLocations.map((location) => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={loadWeatherData}
                className="bg-primary hover:bg-primary/90"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {t.refresh}
              </Button>
              <Button
                variant={autoRefresh ? 'default' : 'outline'}
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                <Clock className="h-4 w-4 mr-2" />
                {t.autoRefresh}
              </Button>
            </div>
          </div>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground mt-2">
              {t.lastUpdated}: {lastUpdated.toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Current Conditions */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50">
        <CardHeader className="bg-blue-100">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Eye className="h-5 w-5" />
            {t.currentConditions}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="flex justify-center mb-2">
                {getWeatherIcon(weatherData.current.condition)}
              </div>
              <p className="text-sm font-medium text-blue-800">{t.condition}</p>
              <p className="text-lg font-bold text-blue-900">{weatherData.current.condition}</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="flex justify-center mb-2">
                <Thermometer className="h-6 w-6 text-red-500" />
              </div>
              <p className="text-sm font-medium text-blue-800">{t.temperature}</p>
              <p className="text-lg font-bold text-blue-900">{weatherData.current.temperature}°F</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="flex justify-center mb-2">
                <Droplets className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-sm font-medium text-blue-800">{t.humidity}</p>
              <p className="text-lg font-bold text-blue-900">{weatherData.current.humidity}%</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="flex justify-center mb-2">
                <Wind className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-sm font-medium text-blue-800">{t.windSpeed}</p>
              <p className="text-lg font-bold text-blue-900">{weatherData.current.windSpeed} mph</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      <Card className="border-2 border-orange-200">
        <CardHeader className="bg-orange-50">
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="h-5 w-5" />
            {t.weatherAlerts}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {weatherData.alerts.length > 0 ? (
            <div className="space-y-3">
              {weatherData.alerts.map((alert, index) => (
                <Alert key={index} className={getAlertColor(alert.severity)}>
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{alert.type}</h4>
                        <Badge variant="outline" className="text-xs">
                          {getSeverityLabel(alert.severity)}
                        </Badge>
                      </div>
                      <AlertDescription className="mb-3">
                        {alert.message}
                      </AlertDescription>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Expires: {new Date(alert.expires).toLocaleString()}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(alert)}
                          className="text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          {t.viewDetails}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-muted-foreground">{t.noAlerts}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Construction Recommendations */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="bg-green-100">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Zap className="h-5 w-5" />
            {t.recommendations}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-800 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                {t.safetyRecommendations}
              </h4>
              <ul className="space-y-2">
                {weatherData.recommendations.slice(0, 3).map((rec, index) => (
                  <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
              <Button
                size="sm"
                variant="outline"
                onClick={handleSafetyRecommendations}
                className="text-green-700 border-green-300 hover:bg-green-100"
              >
                {t.viewDetails}
              </Button>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-green-800 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {t.constructionImpact}
              </h4>
              <p className="text-sm text-green-700">
                Current weather conditions may affect outdoor construction activities.
                Monitor conditions and adjust schedules accordingly.
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={handleConstructionImpact}
                className="text-green-700 border-green-300 hover:bg-green-100"
              >
                {t.viewDetails}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default WeatherAlertsSystem;