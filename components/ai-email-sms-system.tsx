'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Mail,
  MessageSquare,
  Clock,
  Calendar,
  Target,
  TrendingUp,
  Users,
  Zap,
  Send,
  Settings,
  BarChart3,
  Bell,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Smartphone,
  MailOpen
} from "lucide-react"

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'both';
  trigger: 'quote-sent' | 'project-completed' | 'seasonal' | 'follow-up' | 'reminder';
  audience: 'new-leads' | 'past-customers' | 'all';
  status: 'active' | 'paused' | 'draft';
  message: {
    subject?: string;
    emailBody?: string;
    smsBody?: string;
  };
  schedule: {
    delay: number; // days after trigger
    timeOfDay: string;
    timezone: string;
  };
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    replied: number;
  };
  aiOptimized: boolean;
}

interface AIEmailSMSSystemProps {
  locale?: string;
  onCampaignCreated?: (campaign: Campaign) => void;
}

interface AICampaignCreatorProps {
  locale?: string;
  onCampaignGenerated?: (campaign: Campaign) => void;
}

export function AIEmailSMSSystem({ locale = 'en', onCampaignCreated }: AIEmailSMSSystemProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreator, setShowCreator] = useState(false);

  const content = {
    en: {
      title: "AI Email & SMS System",
      subtitle: "Automated customer communication with AI optimization",
      createCampaign: "Create Campaign",
      activeCampaigns: "Active Campaigns",
      campaignName: "Campaign Name",
      type: "Type",
      trigger: "Trigger",
      audience: "Audience",
      status: "Status",
      metrics: "Performance",
      lastSent: "Last Sent",
      actions: "Actions",
      aiOptimized: "AI Optimized",
      viewDetails: "View Details",
      pause: "Pause",
      resume: "Resume",
      edit: "Edit",
      delete: "Delete",
      duplicate: "Duplicate",
      triggers: {
        'quote-sent': 'After Quote Sent',
        'project-completed': 'After Project Completed',
        'seasonal': 'Seasonal Campaign',
        'follow-up': 'Follow-up Sequence',
        'reminder': 'Appointment Reminder'
      },
      audiences: {
        'new-leads': 'New Leads',
        'past-customers': 'Past Customers',
        'all': 'All Contacts'
      },
      types: {
        'email': 'Email Only',
        'sms': 'SMS Only',
        'both': 'Email & SMS'
      },
      status: {
        'active': 'Active',
        'paused': 'Paused',
        'draft': 'Draft'
      }
    },
    es: {
      title: "Sistema de Email y SMS con IA",
      subtitle: "Comunicación automatizada con clientes con optimización de IA",
      createCampaign: "Crear Campaña",
      activeCampaigns: "Campañas Activas",
      campaignName: "Nombre de Campaña",
      type: "Tipo",
      trigger: "Disparador",
      audience: "Audiencia",
      status: "Estado",
      metrics: "Rendimiento",
      lastSent: "Último Envío",
      actions: "Acciones",
      aiOptimized: "Optimizado por IA",
      viewDetails: "Ver Detalles",
      pause: "Pausar",
      resume: "Reanudar",
      edit: "Editar",
      delete: "Eliminar",
      duplicate: "Duplicar",
      triggers: {
        'quote-sent': 'Después de Enviar Cotización',
        'project-completed': 'Después de Proyecto Completado',
        'seasonal': 'Campaña Estacional',
        'follow-up': 'Secuencia de Seguimiento',
        'reminder': 'Recordatorio de Cita'
      },
      audiences: {
        'new-leads': 'Nuevos Clientes Potenciales',
        'past-customers': 'Clientes Anteriores',
        'all': 'Todos los Contactos'
      },
      types: {
        'email': 'Solo Email',
        'sms': 'Solo SMS',
        'both': 'Email y SMS'
      },
      status: {
        'active': 'Activo',
        'paused': 'Pausado',
        'draft': 'Borrador'
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  // Mock campaigns data
  const mockCampaigns: Campaign[] = [
    {
      id: '1',
      name: 'Post-Quote Follow-up',
      type: 'both',
      trigger: 'quote-sent',
      audience: 'new-leads',
      status: 'active',
      message: {
        subject: 'Your Original Oak Carpentry Quote - Next Steps',
        emailBody: 'Thank you for requesting a quote from Original Oak Carpentry. We\'ve prepared a detailed estimate for your project and would love to discuss it with you. Our team is ready to answer any questions and help bring your vision to life.',
        smsBody: 'Hi! Your carpentry quote is ready. Let\'s schedule a time to discuss the details. Call us at 954-697-1297 or reply to schedule.'
      },
      schedule: {
        delay: 2,
        timeOfDay: '10:00 AM',
        timezone: 'America/New_York'
      },
      metrics: {
        sent: 45,
        opened: 38,
        clicked: 12,
        replied: 8
      },
      aiOptimized: true
    },
    {
      id: '2',
      name: 'Hurricane Season Prep',
      type: 'email',
      trigger: 'seasonal',
      audience: 'all',
      status: 'active',
      message: {
        subject: 'Hurricane Season is Coming - Is Your Home Ready?',
        emailBody: 'Florida\'s hurricane season is approaching. Ensure your outdoor structures are secure and hurricane-resistant. Original Oak Carpentry specializes in hurricane-resistant construction. Schedule your inspection today!',
        smsBody: ''
      },
      schedule: {
        delay: 0,
        timeOfDay: '9:00 AM',
        timezone: 'America/New_York'
      },
      metrics: {
        sent: 120,
        opened: 89,
        clicked: 34,
        replied: 15
      },
      aiOptimized: true
    },
    {
      id: '3',
      name: 'Project Completion Thank You',
      type: 'both',
      trigger: 'project-completed',
      audience: 'past-customers',
      status: 'active',
      message: {
        subject: 'Thank You for Choosing Original Oak Carpentry!',
        emailBody: 'We hope you\'re thrilled with your completed project! Your satisfaction is our priority. If you have any questions or need additional services, we\'re here to help. Don\'t forget to leave us a review!',
        smsBody: 'Thank you for choosing Original Oak Carpentry! We\'d love to hear about your experience. Please consider leaving us a review.'
      },
      schedule: {
        delay: 1,
        timeOfDay: '2:00 PM',
        timezone: 'America/New_York'
      },
      metrics: {
        sent: 28,
        opened: 26,
        clicked: 5,
        replied: 3
      },
      aiOptimized: true
    }
  ];

  useEffect(() => {
    setCampaigns(mockCampaigns);
  }, []);

  const toggleCampaignStatus = (campaignId: string) => {
    setCampaigns(prev => prev.map(campaign =>
      campaign.id === campaignId
        ? { ...campaign, status: campaign.status === 'active' ? 'paused' : 'active' }
        : campaign
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMetricsDisplay = (metrics: Campaign['metrics']) => {
    const openRate = metrics.sent > 0 ? Math.round((metrics.opened / metrics.sent) * 100) : 0;
    const clickRate = metrics.sent > 0 ? Math.round((metrics.clicked / metrics.sent) * 100) : 0;
    return `${openRate}% open, ${clickRate}% click`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mail className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-3xl font-bold text-foreground">{t.title}</h2>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
        <Button onClick={() => setShowCreator(true)} className="gap-2">
          <Zap className="h-4 w-4" />
          {t.createCampaign}
        </Button>
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          {t.activeCampaigns}
        </h3>

        <div className="grid gap-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {campaign.type === 'email' && <Mail className="h-5 w-5 text-blue-500" />}
                      {campaign.type === 'sms' && <MessageSquare className="h-5 w-5 text-green-500" />}
                      {campaign.type === 'both' && <><Mail className="h-5 w-5 text-blue-500" /><MessageSquare className="h-5 w-5 text-green-500" /></>}
                      <div>
                        <h4 className="font-semibold text-lg">{campaign.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{t.types[campaign.type as keyof typeof t.types]}</Badge>
                          <Badge variant="outline">{t.triggers[campaign.trigger as keyof typeof t.triggers]}</Badge>
                          <Badge variant="outline">{t.audiences[campaign.audience as keyof typeof t.audiences]}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4"
003e
                    <div className="text-right"
003e
                      <Badge className={getStatusColor(campaign.status)}
003e
                        {t.status[campaign.status as keyof typeof t.status]}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1"
003e
                        {getMetricsDisplay(campaign.metrics)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2"
003e
                      {campaign.aiOptimized && (
                        <Badge variant="secondary" className="gap-1"
003e
                          <Zap className="h-3 w-3" />
                          {t.aiOptimized}
                        </Badge>
                      )}
                      <Button
                        onClick={() => toggleCampaignStatus(campaign.id)}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        {campaign.status === 'active' ? (
                          <><AlertCircle className="h-3 w-3" />{t.pause}</>
                        ) : (
                          <><CheckCircle className="h-3 w-3" />{t.resume}</>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Campaign Creator Modal */}
      {showCreator && (
        <AICampaignCreator
          locale={locale}
          onCampaignGenerated={(campaign) => {
            setCampaigns(prev => [...prev, campaign]);
            setShowCreator(false);
            if (onCampaignCreated) {
              onCampaignCreated(campaign);
            }
          }}
        />
      )}
    </div>
  );
}

export function AICampaignCreator({ locale = 'en', onCampaignGenerated }: AICampaignCreatorProps) {
  const [campaign, setCampaign] = useState<Partial<Campaign>>({
    name: '',
    type: 'both',
    trigger: 'quote-sent',
    audience: 'new-leads',
    status: 'draft',
    message: {
      subject: '',
      emailBody: '',
      smsBody: ''
    },
    schedule: {
      delay: 2,
      timeOfDay: '10:00 AM',
      timezone: 'America/New_York'
    },
    aiOptimized: true
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const content = {
    en: {
      title: "AI Campaign Creator",
      subtitle: "Create intelligent email and SMS campaigns",
      campaignName: "Campaign Name",
      campaignType: "Campaign Type",
      triggerEvent: "Trigger Event",
      targetAudience: "Target Audience",
      emailSubject: "Email Subject",
      emailBody: "Email Body",
      smsBody: "SMS Body",
      schedule: "Schedule Settings",
      delay: "Delay (days after trigger)",
      timeOfDay: "Time of Day",
      timezone: "Timezone",
      generate: "Generate with AI",
      generating: "AI is creating campaign content...",
      save: "Save Campaign",
      cancel: "Cancel",
      aiSuggestions: "AI will optimize your campaign for better engagement and conversion rates",
      characterCount: "characters",
      preview: "Preview"
    },
    es: {
      title: "Creador de Campañas con IA",
      subtitle: "Crea campañas inteligentes de email y SMS",
      campaignName: "Nombre de Campaña",
      campaignType: "Tipo de Campaña",
      triggerEvent: "Evento Disparador",
      targetAudience: "Audiencia Objetivo",
      emailSubject: "Asunto del Email",
      emailBody: "Cuerpo del Email",
      smsBody: "Cuerpo del SMS",
      schedule: "Configuración de Horario",
      delay: "Retraso (días después del disparador)",
      timeOfDay: "Hora del Día",
      timezone: "Zona Horaria",
      generate: "Generar con IA",
      generating: "IA está creando contenido de campaña...",
      save: "Guardar Campaña",
      cancel: "Cancelar",
      aiSuggestions: "IA optimizará tu campaña para mejor engagement y tasas de conversión",
      characterCount: "caracteres",
      preview: "Vista Previa"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const generateAICampaign = async () => {
    setIsGenerating(true);

    // Simulate AI content generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    const aiGeneratedContent = {
      email: {
        subject: getAISubject(campaign.trigger || 'quote-sent', campaign.audience || 'new-leads'),
        body: getAIEmailBody(campaign.trigger || 'quote-sent', campaign.audience || 'new-leads')
      },
      sms: getAISMSBody(campaign.trigger || 'quote-sent', campaign.audience || 'new-leads')
    };

    setCampaign(prev => ({
      ...prev,
      message: {
        subject: aiGeneratedContent.email.subject,
        emailBody: aiGeneratedContent.email.body,
        smsBody: aiGeneratedContent.sms
      }
    }));

    setIsGenerating(false);
  };

  const getAISubject = (trigger: string, audience: string) => {
    const subjects = {
      'quote-sent': {
        'new-leads': 'Your Original Oak Carpentry Quote - Next Steps Inside',
        'past-customers': 'New Quote Ready - Let\'s Build Something Amazing',
        'all': 'Your Carpentry Quote is Ready'
      },
      'project-completed': {
        'new-leads': 'Project Complete! Thank You for Choosing Original Oak',
        'past-customers': 'Your Project is Complete - We\'d Love Your Feedback',
        'all': 'Project Completion Confirmation'
      },
      'seasonal': {
        'new-leads': 'Hurricane Season Prep - Is Your Home Ready?',
        'past-customers': 'Seasonal Maintenance Reminder from Original Oak',
        'all': 'Seasonal Carpentry Tips for Florida Homes'
      }
    };
    return subjects[trigger]?.[audience] || 'Important Update from Original Oak Carpentry';
  };

  const getAIEmailBody = (trigger: string, audience: string) => {
    const bodies = {
      'quote-sent': {
        'new-leads': `Hi there!\n\nThank you for requesting a quote from Original Oak Carpentry. We've carefully reviewed your project requirements and prepared a detailed estimate.\n\nOur team specializes in hurricane-resistant construction and custom carpentry projects throughout Florida. We're excited about the opportunity to work with you.\n\nWhat makes us different:\n• 14+ years of Florida carpentry experience\n• Hurricane construction certified\n• Licensed and insured\n• 98% customer satisfaction rate\n\nLet's schedule a time to discuss your project in detail. We're here to answer any questions and help bring your vision to life.\n\nBest regards,\nThe Original Oak Carpentry Team\n\nP.S. Don't forget to ask about our hurricane-resistant options!`,
        'past-customers': `Hello again!\n\nIt's great to hear from you. We've prepared a new quote based on your latest project requirements.\n\nAs a valued past customer, you know the quality and attention to detail we bring to every project. We're excited to work with you again.\n\nPlease review the attached quote and let us know if you have any questions. We're ready to get started whenever you are.\n\nLooking forward to another successful project!\n\nBest regards,\nThe Original Oak Carpentry Team`
      },
      'project-completed': {
        'new-leads': 'Project completion email content...',
        'past-customers': 'Project completion email content...'
      }
    };
    return bodies[trigger]?.[audience] || 'Thank you for your interest in Original Oak Carpentry.';
  };

  const getAISMSBody = (trigger: string, audience: string) => {
    const smsBodies = {
      'quote-sent': {
        'new-leads': 'Hi! Your carpentry quote is ready. Let\'s schedule a time to discuss the details. Call 954-697-1297 or reply to schedule.',
        'past-customers': 'Your new quote is ready! Thanks for choosing us again. Call 954-697-1297 to discuss.',
        'all': 'Your Original Oak Carpentry quote is ready. Call 954-697-1297 to discuss your project.'
      },
      'project-completed': {
        'new-leads': 'Thank you for choosing Original Oak Carpentry! We\'d love to hear about your experience.',
        'past-customers': 'Your project is complete! Thank you for your continued trust in Original Oak.',
        'all': 'Project complete! Thank you for choosing Original Oak Carpentry.'
      }
    };
    return smsBodies[trigger]?.[audience] || 'Thank you for contacting Original Oak Carpentry!';
  };

  const saveCampaign = () => {
    if (!campaign.name || !campaign.message?.emailBody) return;

    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: campaign.name,
      type: campaign.type || 'both',
      trigger: campaign.trigger || 'quote-sent',
      audience: campaign.audience || 'new-leads',
      status: 'active',
      message: campaign.message || { subject: '', emailBody: '', smsBody: '' },
      schedule: campaign.schedule || { delay: 2, timeOfDay: '10:00 AM', timezone: 'America/New_York' },
      metrics: { sent: 0, opened: 0, clicked: 0, replied: 0 },
      aiOptimized: campaign.aiOptimized || true
    };

    if (onCampaignGenerated) {
      onCampaignGenerated(newCampaign);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-border bg-card">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{t.title}</CardTitle>
            <Badge variant="secondary" className="ml-2">
              <Zap className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Campaign Settings */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaignName">{t.campaignName}</Label>
                <Input
                  id="campaignName"
                  value={campaign.name}
                  onChange={(e) => setCampaign(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter campaign name..."
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="campaignType">{t.campaignType}</Label>
                  <Select
                    value={campaign.type}
                    onValueChange={(value) => setCampaign(prev => ({ ...prev, type: value as any }))}
                  >
                    <SelectTrigger id="campaignType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(content.en.types).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="trigger">{t.triggerEvent}</Label>
                  <Select
                    value={campaign.trigger}
                    onValueChange={(value) => setCampaign(prev => ({ ...prev, trigger: value as any }))}
                  >
                    <SelectTrigger id="trigger">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(content.en.triggers).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="audience">{t.targetAudience}</Label>
                <Select
                  value={campaign.audience}
                  onValueChange={(value) => setCampaign(prev => ({ ...prev, audience: value as any }))}
                >
                  <SelectTrigger id="audience">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(content.en.audiences).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">{t.schedule}</h4>
                <Button
                  onClick={generateAICampaign}
                  disabled={isGenerating}
                  className="gap-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      {t.generating}
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      {t.generate}
                    </>
                  )}
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{t.aiSuggestions}</p>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="delay">{t.delay}</Label>
                  <Input
                    id="delay"
                    type="number"
                    value={campaign.schedule?.delay}
                    onChange={(e) => setCampaign(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule!, delay: parseInt(e.target.value) }
                    }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="timeOfDay">{t.timeOfDay}</Label>
                  <Input
                    id="timeOfDay"
                    type="time"
                    value={campaign.schedule?.timeOfDay}
                    onChange={(e) => setCampaign(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule!, timeOfDay: e.target.value }
                    }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="timezone">{t.timezone}</Label>
                  <Input
                    id="timezone"
                    value={campaign.schedule?.timezone}
                    onChange={(e) => setCampaign(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule!, timezone: e.target.value }
                    }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="emailSubject">{t.emailSubject}</Label>
              <Input
                id="emailSubject"
                value={campaign.message?.subject || ''}
                onChange={(e) => setCampaign(prev => ({
                  ...prev,
                  message: { ...prev.message!, subject: e.target.value }
                }))}
                placeholder="Enter email subject..."
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="emailBody">{t.emailBody}</Label>
              <Textarea
                id="emailBody"
                value={campaign.message?.emailBody || ''}
                onChange={(e) => setCampaign(prev => ({
                  ...prev,
                  message: { ...prev.message!, emailBody: e.target.value }
                }))}
                placeholder="Enter email body..."
                className="min-h-[200px] w-full"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {campaign.message?.emailBody?.length || 0} {t.characterCount}
              </p>
            </div>

            <div>
              <Label htmlFor="smsBody">{t.smsBody}</Label>
              <Textarea
                id="smsBody"
                value={campaign.message?.smsBody || ''}
                onChange={(e) => setCampaign(prev => ({
                  ...prev,
                  message: { ...prev.message!, smsBody: e.target.value }
                }))}
                placeholder="Enter SMS body..."
                className="min-h-[100px] w-full"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {campaign.message?.smsBody?.length || 0} {t.characterCount}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-6 border-t border-border">
          <Button variant="outline">
            {t.cancel}
          </Button>
          <Button
            onClick={saveCampaign}
            disabled={!campaign.name || !campaign.message?.emailBody || isGenerating}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            {t.save}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}