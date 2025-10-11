'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Crown,
  Star,
  Gift,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Zap,
  CheckCircle,
  Award,
  Target,
  Clock,
  Shield,
  Heart,
  ArrowRight,
  RefreshCw,
  Download,
  Share2
} from "lucide-react"

interface MembershipTier {
  id: string;
  name: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  monthlyPrice: number;
  annualPrice: number;
  benefits: {
    discount: number;
    freeServices: string[];
    priorityBooking: boolean;
    exclusiveOffers: boolean;
    referralBonus: number;
    maintenanceVisits: number;
  };
  requirements: {
    minimumSpend: number;
    yearsLoyal: number;
    referrals: number;
  };
  description: string;
  popular?: boolean;
}

interface MemberProfile {
  id: string;
  name: string;
  email: string;
  currentTier: string;
  points: number;
  totalSpent: number;
  referrals: number;
  joinDate: Date;
  lastActivity: Date;
  benefitsUsed: {
    discounts: number;
    freeServices: number;
    referrals: number;
  };
}

interface AIPointsSystem {
  action: string;
  points: number;
  category: 'spending' | 'referrals' | 'reviews' | 'social';
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
}

interface AIMembershipProgramProps {
  locale?: string;
  onMembershipEnrolled?: (tier: string) => void;
}

interface AILoyaltyRewardsProps {
  locale?: string;
  memberProfile?: MemberProfile;
  onPointsRedeemed?: (points: number, reward: string) => void;
}

export function AIMembershipProgram({ locale = 'en', onMembershipEnrolled }: AIMembershipProgramProps) {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showComparison, setShowComparison] = useState(true);

  const content = {
    en: {
      title: "AI Membership Program",
      subtitle: "Unlock exclusive benefits and savings with our loyalty program",
      choosePlan: "Choose Your Plan",
      monthly: "Monthly",
      annual: "Annual (Save 15%)",
      benefits: "Member Benefits",
      joinNow: "Join Now",
      processing: "Processing enrollment...",
      popular: "Most Popular",
      recommended: "AI Recommended",
      currentPlan: "Current Plan",
      upgrade: "Upgrade",
      downgrade: "Downgrade",
      comparePlans: "Compare All Plans",
      membership: "Membership",
      savings: "Estimated Annual Savings",
      priority: "Priority",
      exclusive: "Exclusive",
      benefits: {
        discount: 'Member Discount',
        freeServices: 'Free Services',
        priorityBooking: 'Priority Booking',
        exclusiveOffers: 'Exclusive Offers',
        referralBonus: 'Referral Bonus',
        maintenance: 'Maintenance Visits'
      },
      tiers: {
        bronze: 'Bronze',
        silver: 'Silver',
        gold: 'Gold',
        platinum: 'Platinum'
      }
    },
    es: {
      title: "Programa de Membresía con IA",
      subtitle: "Desbloquea beneficios exclusivos y ahorros con nuestro programa de lealtad",
      choosePlan: "Elige Tu Plan",
      monthly: "Mensual",
      annual: "Anual (Ahorra 15%)",
      benefits: "Beneficios de Miembro",
      joinNow: "Unirse Ahora",
      processing: "Procesando inscripción...",
      popular: "Más Popular",
      recommended: "Recomendado por IA",
      currentPlan: "Plan Actual",
      upgrade: "Mejorar",
      downgrade: "Degradar",
      comparePlans: "Comparar Todos los Planes",
      membership: "Membresía",
      savings: "Ahorros Anuales Estimados",
      priority: "Prioridad",
      exclusive: "Exclusivo",
      benefits: {
        discount: 'Descuento de Miembro',
        freeServices: 'Servicios Gratuitos',
        priorityBooking: 'Reserva Prioritaria',
        exclusiveOffers: 'Ofertas Exclusivas',
        referralBonus: 'Bono de Referido',
        maintenance: 'Visitas de Mantenimiento'
      },
      tiers: {
        bronze: 'Bronce',
        silver: 'Plata',
        gold: 'Oro',
        platinum: 'Platino'
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  // AI-optimized membership tiers
  const membershipTiers: MembershipTier[] = [
    {
      id: 'bronze',
      name: t.tiers.bronze,
      level: 'bronze',
      monthlyPrice: 29,
      annualPrice: 295,
      benefits: {
        discount: 5,
        freeServices: ['Annual Inspection'],
        priorityBooking: false,
        exclusiveOffers: true,
        referralBonus: 50,
        maintenanceVisits: 1
      },
      requirements: {
        minimumSpend: 0,
        yearsLoyal: 0,
        referrals: 0
      },
      description: 'Perfect for first-time customers looking to save on regular maintenance'
    },
    {
      id: 'silver',
      name: t.tiers.silver,
      level: 'silver',
      monthlyPrice: 59,
      annualPrice: 595,
      benefits: {
        discount: 10,
        freeServices: ['Annual Inspection', 'Minor Repairs (up to $200)'],
        priorityBooking: true,
        exclusiveOffers: true,
        referralBonus: 100,
        maintenanceVisits: 2
      },
      requirements: {
        minimumSpend: 2500,
        yearsLoyal: 1,
        referrals: 2
      },
      description: 'Ideal for homeowners with regular maintenance needs',
      popular: true
    },
    {
      id: 'gold',
      name: t.tiers.gold,
      level: 'gold',
      monthlyPrice: 99,
      annualPrice: 995,
      benefits: {
        discount: 15,
        freeServices: ['Annual Inspection', 'Minor Repairs (up to $500)', 'Priority Emergency Service'],
        priorityBooking: true,
        exclusiveOffers: true,
        referralBonus: 200,
        maintenanceVisits: 3
      },
      requirements: {
        minimumSpend: 5000,
        yearsLoyal: 2,
        referrals: 5
      },
      description: 'Comprehensive coverage for active homeowners'
    },
    {
      id: 'platinum',
      name: t.tiers.platinum,
      level: 'platinum',
      monthlyPrice: 149,
      annualPrice: 1495,
      benefits: {
        discount: 20,
        freeServices: ['Annual Inspection', 'Minor Repairs (up to $1000)', 'Priority Emergency Service', 'Free Consultations'],
        priorityBooking: true,
        exclusiveOffers: true,
        referralBonus: 300,
        maintenanceVisits: 4
      },
      requirements: {
        minimumSpend: 10000,
        yearsLoyal: 3,
        referrals: 10
      },
      description: 'Premium membership for our most valued customers'
    }
  ];

  const handleEnrollment = async (tierId: string) => {
    setIsEnrolling(true);

    // Simulate enrollment process
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (onMembershipEnrolled) {
      onMembershipEnrolled(tierId);
    }

    setIsEnrolling(false);
  };

  const getTierColor = (level: string) => {
    const colors = {
      bronze: 'bg-amber-100 text-amber-800 border-amber-200',
      silver: 'bg-gray-100 text-gray-800 border-gray-300',
      gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      platinum: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const calculateSavings = (tier: MembershipTier, billingCycle: 'monthly' | 'annual') => {
    const monthlyCost = billingCycle === 'annual' ? tier.annualPrice / 12 : tier.monthlyPrice;
    const estimatedAnnualSpend = 5000; // Average customer spend
    const discountSavings = estimatedAnnualSpend * (tier.benefits.discount / 100);
    const freeServiceValue = tier.benefits.maintenanceVisits * 200; // Average service value
    const referralBonus = tier.benefits.referralBonus * 2; // Assume 2 referrals per year

    return Math.round(discountSavings + freeServiceValue + referralBonus - (monthlyCost * 12));
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Crown className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">{t.title}</h2>
          <Award className="h-8 w-8 text-primary" />
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 p-1 bg-muted rounded-lg"
003e
          <Button
            variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
            onClick={() => setBillingCycle('monthly')}
            className="h-8"
          >
            {t.monthly}
          </Button>
          <Button
            variant={billingCycle === 'annual' ? 'default' : 'ghost'}
            onClick={() => setBillingCycle('annual')}
            className="h-8"
          >
            {t.annual}
          </Button>
        </div>
      </div>

      {/* Membership Tiers */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {membershipTiers.map((tier) => {
          const annualSavings = calculateSavings(tier, billingCycle);
          const isSelected = selectedTier === tier.id;

          return (
            <Card key={tier.id} className={`relative ${isSelected ? 'border-primary border-2' : 'border-border'}`}
003e
              {tier.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-accent"
003e
                  <Star className="h-3 w-3 mr-1" />
                  {t.popular}
                </Badge>
              )}

              <CardHeader className="text-center pb-4"
003e
                <div className="space-y-3"
003e
                  <Badge className={getTierColor(tier.level)}
003e
                    {tier.name}
                  </Badge>
                  <div className="space-y-1"
003e
                    <div className="text-3xl font-bold"
003e
                      ${billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice}
                    </div>
                    <div className="text-sm text-muted-foreground"
003e
                      {billingCycle === 'annual' ? '/year' : '/month'}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground"
003e{tier.description}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3"
003e
                  <div className="flex items-center justify-between text-sm"
003e
                    <span className="flex items-center gap-2"
003e
                      <DollarSign className="h-4 w-4" />
                      {t.benefits.discount}
                    </span>
                    <Badge variant="secondary">{tier.benefits.discount}%</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm"
003e
                    <span className="flex items-center gap-2"
003e
                      <Heart className="h-4 w-4" />
                      {t.benefits.freeServices}
                    </span>
                    <span className="text-sm font-medium">{tier.benefits.maintenanceVisits}/year</span>
                  </div>
                  <div className="flex items-center justify-between text-sm"
003e
                    <span className="flex items-center gap-2"
003e
                      <Users className="h-4 w-4" />
                      {t.benefits.priorityBooking}
                    </span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between text-sm"
003e
                    <span className="flex items-center gap-2"
003e
                      <Gift className="h-4 w-4" />
                      {t.benefits.referralBonus}
                    </span>
                    <span className="text-sm font-medium">${tier.benefits.referralBonus}</span>
                  </div>
                </div>

                <Separator />

                <div className="text-center space-y-2"
003e
                  <div className="text-sm text-muted-foreground"
003e{t.savings}</div>
                  <div className="text-2xl font-bold text-green-600"
003e
                    ${annualSavings.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground"
003eBased on typical customer spend</div>
                </div>

                <Button
                  onClick={() => handleEnrollment(tier.id)}
                  disabled={isEnrolling}
                  className="w-full gap-2"
                >
                  {isEnrolling ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      {t.processing}
                    </>
                  ) : (
                    <>
                      <Crown className="h-4 w-4" />
                      {t.joinNow}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6"
003e
        <div className="flex items-center gap-3 mb-4"
003e
          <Zap className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">{t.recommended}</h3
003e
        </div>
        <p className="text-muted-foreground"
003e
          Based on your project history and preferences, AI recommends the Silver tier for optimal value and benefits.
        </p>
      </div>
    </div>
  );
}

export function AILoyaltyRewards({ locale = 'en', memberProfile, onPointsRedeemed }: AILoyaltyRewardsProps) {
  const [selectedReward, setSelectedReward] = useState<string>('');
  const [isRedeeming, setIsRedeeming] = useState(false);

  const content = {
    en: {
      title: "AI Loyalty Rewards",
      subtitle: "Redeem your points for exclusive rewards",
      yourPoints: "Your Points",
      availableRewards: "Available Rewards",
      redeem: "Redeem",
      processing: "Processing redemption...",
      points: "points",
      rewardHistory: "Reward History",
      aiSuggestions: "AI Suggestions",
      recommended: "Recommended for You",
      seasonal: "Seasonal Offers",
      exclusive: "Member Exclusive"
    },
    es: {
      title: "Recompensas de Lealtad con IA",
      subtitle: "Canjea tus puntos por recompensas exclusivas",
      yourPoints: "Tus Puntos",
      availableRewards: "Recompensas Disponibles",
      redeem: "Canjear",
      processing: "Procesando canje...",
      points: "puntos",
      rewardHistory: "Historial de Recompensas",
      aiSuggestions: "Sugerencias de IA",
      recommended: "Recomendado para Ti",
      seasonal: "Ofertas de Temporada",
      exclusive: "Exclusivo de Miembro"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  // Mock rewards catalog
  const rewards = [
    {
      id: 'discount-10',
      name: '$100 Off Next Service',
      points: 1000,
      category: 'discounts',
      type: 'immediate',
      description: 'Save $100 on your next carpentry service'
    },
    {
      id: 'free-inspection',
      name: 'Free Annual Inspection',
      points: 500,
      category: 'services',
      type: 'scheduled',
      description: 'Complimentary annual maintenance inspection'
    },
    {
      id: 'premium-material',
      name: 'Premium Material Upgrade',
      points: 1500,
      category: 'upgrades',
      type: 'project',
      description: 'Upgrade to premium materials at no extra cost'
    },
    {
      id: 'priority-booking',
      name: 'Priority Booking (1 Year)',
      points: 2000,
      category: 'priority',
      type: 'membership',
      description: 'Guaranteed priority scheduling for one year'
    }
  ];

  // Mock member profile for demo
  const mockProfile: MemberProfile = {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    currentTier: 'silver',
    points: 1850,
    totalSpent: 8750,
    referrals: 3,
    joinDate: new Date('2023-01-15'),
    lastActivity: new Date(),
    benefitsUsed: {
      discounts: 450,
      freeServices: 2,
      referrals: 300
    }
  };

  const profile = memberProfile || mockProfile;

  const handleRedemption = async (rewardId: string) => {
    setIsRedeeming(true);

    // Simulate redemption process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const reward = rewards.find(r => r.id === rewardId);
    if (reward && onPointsRedeemed) {
      onPointsRedeemed(reward.points, reward.name);
    }

    setIsRedeeming(false);
    setSelectedReward('');
  };

  const getRewardCategory = (category: string) => {
    const categories = {
      discounts: 'bg-blue-100 text-blue-800',
      services: 'bg-green-100 text-green-800',
      upgrades: 'bg-purple-100 text-purple-800',
      priority: 'bg-yellow-100 text-yellow-800'
    };
    return categories[category as keyof typeof categories] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-border bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"
003e
            <Gift className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{t.title}</CardTitle>
            <Badge variant="secondary" className="ml-2"
003e
              <Zap className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
          <Badge className="bg-primary text-primary-foreground"
003e
            {profile.currentTier.toUpperCase()}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Points Summary */}
          <div className="lg:col-span-1 space-y-6"
003e
            <Card className="border-border"
003e
              <CardContent className="p-6 text-center"
003e
                <div className="space-y-3"
003e
                  <div className="text-sm text-muted-foreground"
003e{t.yourPoints}</div>
                  <div className="text-4xl font-bold text-primary"
003e
                    {profile.points.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground"
003e{t.points}</div>
                  <Progress value={(profile.points / 2500) * 100} className="w-full" />
                  <div className="text-xs text-muted-foreground"
003e
                    {Math.max(0, 2500 - profile.points)} points to next reward
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Member Stats */}
            <Card className="border-border"
003e
              <CardHeader>
                <CardTitle className="text-base">Member Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3"
003e
                <div className="flex justify-between"
003e
                  <span className="text-muted-foreground">Total Spent</span>
                  <span className="font-medium">${profile.totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between"
003e
                  <span className="text-muted-foreground">Referrals</span>
                  <span className="font-medium">{profile.referrals}</span>
                </div>
                <div className="flex justify-between"
003e
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-medium">{profile.joinDate.toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rewards Catalog */}
          <div className="lg:col-span-2 space-y-6"
003e
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2"
003e
                <Gift className="h-5 w-5 text-primary" />
                {t.availableRewards}
              </h3>
            </div>

            <Tabs defaultValue="available" className="w-full"
003e
              <TabsList className="grid w-full grid-cols-3"
003e
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="recommended">{t.recommended}</TabsTrigger>
                <TabsTrigger value="history">{t.rewardHistory}</TabsTrigger>
              </TabsList>

              <TabsContent value="available" className="space-y-4"
003e
                {rewards.map((reward) => (
                  <Card key={reward.id} className={`border-2 ${profile.points >= reward.points ? 'border-green-200 bg-green-50' : 'border-border'}`}
003e
                    <CardContent className="p-4"
003e
                      <div className="flex items-start justify-between gap-4"
003e
                        <div className="flex-1 space-y-2"
003e
                          <div className="flex items-center gap-2"
003e
                            <Badge className={getRewardCategory(reward.category)}
003e
                              {reward.category}
                            </Badge>
                            <Badge variant="outline">
                              {reward.points} {t.points}
                            </Badge>
                          </div>
                          <h5 className="font-medium"
003e{reward.name}</h5>
                          <p className="text-sm text-muted-foreground"
003e{reward.description}</p>
                        </div>
                        <div className="text-right"
003e
                          <Button
                            onClick={() => setSelectedReward(reward.id)}
                            disabled={profile.points < reward.points || isRedeeming}
                            className="gap-2"
                          >
                            {isRedeeming && selectedReward === reward.id ? (
                              <>
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                {t.processing}
                              </>
                            ) : (
                              <>
                                <Gift className="h-4 w-4" />
                                {t.redeem}
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="recommended" className="space-y-4"
003e
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
003e
                  <div className="flex items-center gap-2 mb-2"
003e
                    <Zap className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium">{t.aiSuggestions}</h4
003e
                  </div>
                  <p className="text-sm text-blue-800"
003e
                    Based on your spending patterns and project history, we recommend the Premium Material Upgrade for maximum value.
                  </p>
                </div>
                <!-- Recommended rewards would be filtered based on AI analysis -->
              </TabsContent>

              <TabsContent value="history" className="space-y-4"
003e
                <div className="text-center text-muted-foreground py-8"
003e
                  <Gift className="h-12 w-12 mx-auto mb-4" />
                  <p>No reward history yet. Start redeeming to see your history here!</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}