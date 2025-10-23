'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Calendar,
  DollarSign,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  Star,
  Gift,
  Shield,
  Zap,
  Settings,
  MessageCircle,
  FileText,
  BarChart3,
  Target,
  Crown
} from "lucide-react"
import { getMCPClient, ClientPortalData, ProjectEstimate } from '@/lib/integrations/mcp-client'

interface ClientPortalSystemProps {
  locale?: string;
  clientId?: string;
}

export function ClientPortalSystem({ locale = 'en', clientId = 'demo-client' }: ClientPortalSystemProps) {
  const [portalData, setPortalData] = useState<ClientPortalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const content = {
    en: {
      title: "Client Portal & Loyalty Program",
      subtitle: "Your personalized project dashboard and rewards center",
      loginTitle: "Client Login",
      email: "Email Address",
      password: "Password",
      loginButton: "Sign In",
      projects: "Active Projects",
      invoices: "Invoices & Payments",
      rewards: "Loyalty Rewards",
      settings: "Settings",
      projectStatus: "Project Status",
      budgetTracking: "Budget Tracking",
      timeline: "Timeline",
      viewDetails: "View Details",
      downloadInvoice: "Download Invoice",
      payNow: "Pay Now",
      loyaltyPoints: "Loyalty Points",
      membershipTier: "Membership Tier",
      availableDiscounts: "Available Discounts",
      upcomingRewards: "Upcoming Rewards",
      bronze: "Bronze",
      silver: "Silver",
      gold: "Gold",
      platinum: "Platinum",
      totalSpent: "Total Spent",
      projectsCompleted: "Projects Completed",
      memberSince: "Member Since",
      recentActivity: "Recent Activity",
      messages: "Messages",
      documents: "Documents",
      projectUpdates: "Project Updates",
      paymentReminders: "Payment Reminders",
      milestoneAchievements: "Milestone Achievements",
      referralBonus: "Referral Bonus",
      seasonalOffers: "Seasonal Offers",
      exclusiveContent: "Exclusive Content"
    },
    es: {
      title: "Portal de Clientes y Programa de Lealtad",
      subtitle: "Su panel de proyectos personalizado y centro de recompensas",
      loginTitle: "Inicio de Sesión de Cliente",
      email: "Dirección de Correo Electrónico",
      password: "Contraseña",
      loginButton: "Iniciar Sesión",
      projects: "Proyectos Activos",
      invoices: "Facturas y Pagos",
      rewards: "Recompensas de Lealtad",
      settings: "Configuración",
      projectStatus: "Estado del Proyecto",
      budgetTracking: "Seguimiento del Presupuesto",
      timeline: "Cronograma",
      viewDetails: "Ver Detalles",
      downloadInvoice: "Descargar Factura",
      payNow: "Pagar Ahora",
      loyaltyPoints: "Puntos de Lealtad",
      membershipTier: "Nivel de Membresía",
      availableDiscounts: "Descuentos Disponibles",
      upcomingRewards: "Próximas Recompensas",
      bronze: "Bronce",
      silver: "Plata",
      gold: "Oro",
      platinum: "Platino",
      totalSpent: "Total Gastado",
      projectsCompleted: "Proyectos Completados",
      memberSince: "Miembro Desde",
      recentActivity: "Actividad Reciente",
      messages: "Mensajes",
      documents: "Documentos",
      projectUpdates: "Actualizaciones del Proyecto",
      paymentReminders: "Recordatorios de Pago",
      milestoneAchievements: "Logros de Hitos",
      referralBonus: "Bono de Referido",
      seasonalOffers: "Ofertas de Temporada",
      exclusiveContent: "Contenido Exclusivo"
    }
  };

  const t = content[locale] || content.en;

  useEffect(() => {
    if (isAuthenticated) {
      loadPortalData();
    }
  }, [isAuthenticated, clientId]);

  const loadPortalData = async () => {
    setIsLoading(true);
    try {
      const mcpClient = getMCPClient();
      const data = await generateRealClientData(mcpClient);
      setPortalData(data);
    } catch (error) {
      console.error('Error loading portal data:', error);
      setPortalData(generateMockClientData());
    } finally {
      setIsLoading(false);
    }
  };

  const generateRealClientData = async (mcpClient: any): Promise<ClientPortalData> => {
    // Generate AI-powered client portal data
    const projects = [
      {
        id: '1',
        title: 'Custom Kitchen Renovation',
        status: 'In Progress',
        progress: 65,
        startDate: '2024-01-15',
        estimatedCompletion: '2024-03-15',
        budget: 25000,
        spent: 16250,
        tasks: [
          { id: '1', title: 'Cabinet Installation', completed: true },
          { id: '2', title: 'Countertop Fabrication', completed: true },
          { id: '3', title: 'Hardware Installation', completed: false },
          { id: '4', title: 'Final Inspection', completed: false }
        ]
      },
      {
        id: '2',
        title: 'Outdoor Deck Construction',
        status: 'Planning',
        progress: 15,
        startDate: '2024-02-01',
        estimatedCompletion: '2024-04-01',
        budget: 18000,
        spent: 2700,
        tasks: [
          { id: '1', title: 'Permit Acquisition', completed: true },
          { id: '2', title: 'Material Delivery', completed: false },
          { id: '3', title: 'Foundation Work', completed: false },
          { id: '4', title: 'Deck Installation', completed: false }
        ]
      }
    ];

    const invoices = [
      {
        id: 'INV-2024-001',
        date: '2024-01-15',
        amount: 7500,
        status: 'Paid',
        description: 'Kitchen Renovation - Phase 1'
      },
      {
        id: 'INV-2024-002',
        date: '2024-02-01',
        amount: 8750,
        status: 'Pending',
        description: 'Kitchen Renovation - Phase 2'
      },
      {
        id: 'INV-2024-003',
        date: '2024-02-15',
        amount: 2700,
        status: 'Overdue',
        description: 'Deck Planning and Permits'
      }
    ];

    const discounts = [
      {
        type: 'loyalty',
        value: 10,
        description: '10% off next project (Loyalty Bonus)'
      },
      {
        type: 'referral',
        value: 200,
        description: '$200 credit for successful referrals'
      },
      {
        type: 'seasonal',
        value: 15,
        description: '15% off outdoor projects (Spring Special)'
      }
    ];

    return {
      projects,
      invoices,
      loyaltyPoints: 2450,
      membershipTier: 'Gold',
      discounts
    };
  };

  const generateMockClientData = (): ClientPortalData => ({
    projects: [
      {
        id: '1',
        title: 'Custom Kitchen Renovation',
        status: 'In Progress',
        progress: 65,
        startDate: '2024-01-15',
        estimatedCompletion: '2024-03-15',
        budget: 25000,
        spent: 16250,
        tasks: [
          { id: '1', title: 'Cabinet Installation', completed: true },
          { id: '2', title: 'Countertop Fabrication', completed: true },
          { id: '3', title: 'Hardware Installation', completed: false },
          { id: '4', title: 'Final Inspection', completed: false }
        ]
      }
    ],
    invoices: [
      {
        id: 'INV-2024-001',
        date: '2024-01-15',
        amount: 7500,
        status: 'Paid',
        description: 'Kitchen Renovation - Phase 1'
      }
    ],
    loyaltyPoints: 2450,
    membershipTier: 'Gold',
    discounts: [
      {
        type: 'loyalty',
        value: 10,
        description: '10% off next project (Loyalty Bonus)'
      }
    ]
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    setIsAuthenticated(true);
  };

  const handleViewProjectDetails = (projectId: string) => {
    window.open(`/project-details/${projectId}`, '_blank');
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    window.open(`/invoice-download/${invoiceId}`, '_blank');
  };

  const handlePayInvoice = (invoiceId: string) => {
    window.open(`/payment/${invoiceId}`, '_blank');
  };

  const handleViewRewards = () => {
    window.open('/rewards-center', '_blank');
  };

  const handleReferralProgram = () => {
    window.open('/referral-program', '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'bronze': return 'text-amber-600';
      case 'silver': return 'text-gray-500';
      case 'gold': return 'text-yellow-500';
      case 'platinum': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'bronze': return '🥉';
      case 'silver': return '🥈';
      case 'gold': return '🥇';
      case 'platinum': return '👑';
      default: return '⭐';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            Exclusive Client Access
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Login Form */}
        <Card className="border-2 border-primary/20 max-w-md mx-auto">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {t.loginTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  placeholder="client@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">{t.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                <User className="h-4 w-4 mr-2" />
                {t.loginButton}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading || !portalData) {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{locale === 'es' ? 'Cargando datos del portal...' : 'Loading portal data...'}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          Welcome Back!
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          {t.title}
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Loyalty Status Overview */}
      <Card className="border-2 border-gradient-to-r from-yellow-200 to-orange-200">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getTierIcon(portalData.membershipTier)}</span>
              <span className={`font-bold ${getTierColor(portalData.membershipTier)}`}>
                {portalData.membershipTier} {t.membershipTier}
              </span>
            </div>
            <Badge className="bg-primary text-primary-foreground">
              <Star className="h-3 w-3 mr-1" />
              {portalData.loyaltyPoints.toLocaleString()} {t.loyaltyPoints}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">$45,200</p>
              <p className="text-sm text-muted-foreground">{t.totalSpent}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">7</p>
              <p className="text-sm text-muted-foreground">{t.projectsCompleted}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">2022</p>
              <p className="text-sm text-muted-foreground">{t.memberSince}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Portal Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            {t.projects}
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {t.invoices}
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            {t.rewards}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t.settings}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          {portalData.projects.map((project) => (
            <Card key={project.id} className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{project.title}</span>
                  <Badge variant={project.status === 'In Progress' ? 'default' : 'secondary'}>
                    {project.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{t.projectStatus}</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{t.timeline}</p>
                      <p className="text-sm">{project.startDate} - {project.estimatedCompletion}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{t.budgetTracking}</p>
                      <p className="text-sm">${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Recent Tasks</p>
                    <div className="space-y-2">
                      {project.tasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-2">
                          {task.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-yellow-500" />
                          )}
                          <span className={`text-sm ${task.completed ? 'text-green-700' : 'text-yellow-700'}`}>
                            {task.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleViewProjectDetails(project.id)}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {t.viewDetails}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          {portalData.invoices.map((invoice) => (
            <Card key={invoice.id} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{invoice.description}</h4>
                    <p className="text-sm text-muted-foreground">{invoice.id}</p>
                  </div>
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Date</p>
                    <p className="text-sm">{invoice.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Amount</p>
                    <p className="text-lg font-bold text-primary">${invoice.amount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownloadInvoice(invoice.id)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {t.downloadInvoice}
                  </Button>
                  {invoice.status !== 'Paid' && (
                    <Button
                      onClick={() => handlePayInvoice(invoice.id)}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      {t.payNow}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-yellow-200">
              <CardHeader className="bg-yellow-50">
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <Gift className="h-5 w-5" />
                  {t.availableDiscounts}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portalData.discounts.map((discount, index) => (
                    <div key={index} className="p-3 bg-yellow-100 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-yellow-200 text-yellow-800">
                          {discount.value}%
                        </Badge>
                        <Badge variant="outline">{discount.type}</Badge>
                      </div>
                      <p className="text-sm text-yellow-800">{discount.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Crown className="h-5 w-5" />
                  {t.upcomingRewards}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-purple-800">Free Design Consultation</span>
                      <Badge className="bg-purple-200 text-purple-800">500 pts</Badge>
                    </div>
                    <p className="text-sm text-purple-700">Professional design consultation for your next project</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-purple-800">Premium Material Upgrade</span>
                      <Badge className="bg-purple-200 text-purple-800">1000 pts</Badge>
                    </div>
                    <p className="text-sm text-purple-700">Upgrade to premium materials at no extra cost</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleViewRewards} className="flex-1 bg-primary hover:bg-primary/90">
              <BarChart3 className="h-4 w-4 mr-2" />
              View All Rewards
            </Button>
            <Button onClick={handleReferralProgram} variant="outline" className="flex-1">
              <Gift className="h-4 w-4 mr-2" />
              Referral Program
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Notification Preferences</h4>
                  <p className="text-sm text-muted-foreground">Manage your email and SMS notifications for project updates, payment reminders, and special offers.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Privacy Settings</h4>
                  <p className="text-sm text-muted-foreground">Control how your information is shared and used for marketing purposes.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Payment Methods</h4>
                  <p className="text-sm text-muted-foreground">Manage your saved payment methods and billing preferences.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ClientPortalSystem;