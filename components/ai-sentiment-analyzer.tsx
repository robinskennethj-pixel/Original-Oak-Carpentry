'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Award,
  Clock,
  Filter,
  BarChart3,
  PieChart,
  Zap,
  Heart,
  Smile,
  Frown
} from "lucide-react"

interface SentimentAnalysis {
  overall: {
    positive: number;
    neutral: number;
    negative: number;
    score: number; // -1 to 1
  };
  themes: {
    topic: string;
    mentions: number;
    sentiment: 'positive' | 'neutral' | 'negative';
    keywords: string[];
  }[];
  highlights: {
    mostPositive: string;
    mostHelpful: string;
    commonPraise: string[];
    commonComplaints: string[];
  };
  trends: {
    period: string;
    sentiment: number;
    volume: number;
  }[];
}

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  source: 'google' | 'yelp' | 'facebook' | 'website';
  sentiment?: {
    score: number;
    label: 'positive' | 'neutral' | 'negative';
    confidence: number;
  };
  themes?: string[];
}

interface AISentimentAnalyzerProps {
  locale?: string;
  reviews?: Review[];
  onAnalysisComplete?: (analysis: SentimentAnalysis) => void;
}

interface AIHighlightedReviewProps {
  locale?: string;
  reviews?: Review[];
}

export function AISentimentAnalyzer({ locale = 'en', reviews = [], onAnalysisComplete }: AISentimentAnalyzerProps) {
  const [analysis, setAnalysis] = useState<SentimentAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('12m');
  const [filterSentiment, setFilterSentiment] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');

  const content = {
    en: {
      title: "AI Sentiment Analysis",
      subtitle: "Intelligent insights from customer reviews",
      analyze: "Analyze Reviews",
      reanalyze: "Reanalyze",
      analyzing: "AI is analyzing sentiment...",
      overallSentiment: "Overall Sentiment",
      positive: "Positive",
      neutral: "Neutral",
      negative: "Negative",
      themes: "Key Themes",
      highlights: "Review Highlights",
      mostPositive: "Most Positive Review",
      mostHelpful: "Most Helpful Review",
      commonPraise: "Common Praise",
      commonComplaints: "Areas for Improvement",
      trends: "Sentiment Trends",
      recentReviews: "Recent Reviews",
      filterBy: "Filter by sentiment",
      timeframe: "Timeframe",
      confidence: "AI Confidence",
      reviewVolume: "Review Volume",
      averageRating: "Average Rating",
      totalReviews: "Total Reviews",
      insights: "AI Insights",
      recommendations: "Recommendations",
      sources: {
        google: 'Google',
        yelp: 'Yelp',
        facebook: 'Facebook',
        website: 'Website'
      }
    },
    es: {
      title: "Análisis de Sentimiento con IA",
      subtitle: "Perspectivas inteligentes de reseñas de clientes",
      analyze: "Analizar Reseñas",
      reanalyze: "Reanalizar",
      analyzing: "IA está analizando sentimiento...",
      overallSentiment: "Sentimiento General",
      positive: "Positivo",
      neutral: "Neutral",
      negative: "Negativo",
      themes: "Temas Clave",
      highlights: "Destacados de Reseñas",
      mostPositive: "Reseña Más Positiva",
      mostHelpful: "Reseña Más Útil",
      commonPraise: "Elogios Comunes",
      commonComplaints: "Áreas para Mejorar",
      trends: "Tendencias de Sentimiento",
      recentReviews: "Reseñas Recientes",
      filterBy: "Filtrar por sentimiento",
      timeframe: "Período de Tiempo",
      confidence: "Confianza de IA",
      reviewVolume: "Volumen de Reseñas",
      averageRating: "Calificación Promedio",
      totalReviews: "Total de Reseñas",
      insights: "Perspectivas de IA",
      recommendations: "Recomendaciones",
      sources: {
        google: 'Google',
        yelp: 'Yelp',
        facebook: 'Facebook',
        website: 'Sitio Web'
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  // Mock reviews data (in production, this would come from APIs)
  const mockReviews: Review[] = [
    {
      id: '1',
      author: 'Sarah Johnson',
      rating: 5,
      date: '2024-01-15',
      content: 'Original Oak Carpentry did an amazing job on our hurricane-resistant deck! The craftsmanship is exceptional and they completed the project ahead of schedule. Highly recommend for anyone in Florida looking for quality outdoor construction.',
      source: 'google'
    },
    {
      id: '2',
      author: 'Mike Rodriguez',
      rating: 5,
      date: '2024-01-10',
      content: 'Outstanding work on our custom cabinetry! The attention to detail and precision is remarkable. They were professional, on time, and exceeded our expectations. The hurricane-resistant features give us peace of mind.',
      source: 'yelp'
    },
    {
      id: '3',
      author: 'Jennifer Chen',
      rating: 4,
      date: '2024-01-08',
      content: 'Great experience overall. The pergola looks beautiful and the team was knowledgeable about Florida building codes. Only minor delay due to weather, but they communicated well throughout the process.',
      source: 'facebook'
    },
    {
      id: '4',
      author: 'David Thompson',
      rating: 5,
      date: '2024-01-05',
      content: 'Impressed with the quality of work on our interior trim. The craftsmanship is top-notch and they left the workspace clean every day. Very professional and would definitely hire again.',
      source: 'website'
    },
    {
      id: '5',
      author: 'Lisa Martinez',
      rating: 5,
      date: '2024-01-03',
      content: 'Exceptional service from start to finish! The hurricane shutters are not only functional but look great too. Their expertise in Florida weather-resistant construction really shows.',
      source: 'google'
    }
  ];

  const reviewData = reviews.length > 0 ? reviews : mockReviews;

  const analyzeSentiment = async () => {
    setIsAnalyzing(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock sentiment analysis (in production, this would call an actual AI API)
    const mockAnalysis: SentimentAnalysis = {
      overall: {
        positive: 84,
        neutral: 12,
        negative: 4,
        score: 0.87
      },
      themes: [
        {
          topic: 'Hurricane-Resistant Construction',
          mentions: 3,
          sentiment: 'positive',
          keywords: ['hurricane-resistant', 'weather-resistant', 'storm protection']
        },
        {
          topic: 'Craftsmanship Quality',
          mentions: 4,
          sentiment: 'positive',
          keywords: ['craftsmanship', 'quality', 'precision', 'detail']
        },
        {
          topic: 'Professional Service',
          mentions: 3,
          sentiment: 'positive',
          keywords: ['professional', 'on time', 'communicated', 'clean']
        },
        {
          topic: 'Project Timeline',
          mentions: 2,
          sentiment: 'neutral',
          keywords: ['schedule', 'timeline', 'delay']
        }
      ],
      highlights: {
        mostPositive: 'Original Oak Carpentry did an amazing job on our hurricane-resistant deck! The craftsmanship is exceptional and they completed the project ahead of schedule.',
        mostHelpful: 'Outstanding work on our custom cabinetry! The attention to detail and precision is remarkable. They were professional, on time, and exceeded our expectations.',
        commonPraise: [
          'Exceptional craftsmanship and attention to detail',
          'Professional and reliable service',
          'Knowledgeable about Florida building codes and hurricane requirements',
          'Quality materials and construction techniques',
          'Clean workspace and good communication'
        ],
        commonComplaints: [
          'Minor weather-related delays',
          'Would appreciate more detailed project timelines upfront'
        ]
      },
      trends: [
        { period: 'Jan 2024', sentiment: 0.85, volume: 5 },
        { period: 'Dec 2023', sentiment: 0.82, volume: 8 },
        { period: 'Nov 2023', sentiment: 0.88, volume: 6 },
        { period: 'Oct 2023', sentiment: 0.79, volume: 4 }
      ]
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);

    if (onAnalysisComplete) {
      onAnalysisComplete(mockAnalysis);
    }
  };

  const getSentimentIcon = (sentiment: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <ThumbsDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const averageRating = reviewData.reduce((sum, review) => sum + review.rating, 0) / reviewData.length;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{t.title}</h2>
          <Zap className="h-8 w-8 text-primary" />
        </div>
        <p className="text-lg text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button
          onClick={analyzeSentiment}
          disabled={isAnalyzing}
          className="gap-2"
        >
          {isAnalyzing ? (
            <>
              <TrendingUp className="h-4 w-4 animate-spin" />
              {t.analyzing}
            </>
          ) : (
            <>
              <PieChart className="h-4 w-4" />
              {analysis ? t.reanalyze : t.analyze}
            </>
          )}
        </Button>

        <div className="flex gap-2">
          <select
            value={filterSentiment}
            onChange={(e) => setFilterSentiment(e.target.value as any)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="all">All Reviews</option>
            <option value="positive">Positive Only</option>
            <option value="neutral">Neutral Only</option>
            <option value="negative">Negative Only</option>
          </select>
        </div>
      </div>

      {analysis && (
        <>
          {/* Overview Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{reviewData.length}</div>
                <p className="text-muted-foreground">{t.totalReviews}</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{averageRating.toFixed(1)}</div>
                <p className="text-muted-foreground">{t.averageRating}</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{analysis.overall.positive}%</div>
                <p className="text-muted-foreground">{t.positive}</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {analysis.overall.score > 0.7 ? (
                    <>
                      <Smile className="h-6 w-6 text-green-500" />
                      <span className="text-2xl font-bold text-green-600">Excellent</span>
                    </>
                  ) : analysis.overall.score > 0.4 ? (
                    <>
                      <Heart className="h-6 w-6 text-yellow-500" />
                      <span className="text-2xl font-bold text-yellow-600">Good</span>
                    </>
                  ) : (
                    <>
                      <Frown className="h-6 w-6 text-red-500" />
                      <span className="text-2xl font-bold text-red-600">Needs Work</span>
                    </>
                  )}
                </div>
                <p className="text-muted-foreground">{t.confidence}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sentiment Breakdown */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    {t.overallSentiment}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span>{t.positive}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={analysis.overall.positive} className="w-24" />
                        <span className="font-medium">{analysis.overall.positive}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Minus className="h-4 w-4 text-gray-500" />
                        <span>{t.neutral}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={analysis.overall.neutral} className="w-24" />
                        <span className="font-medium">{analysis.overall.neutral}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                        <span>{t.negative}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={analysis.overall.negative} className="w-24" />
                        <span className="font-medium">{analysis.overall.negative}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    {t.highlights}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">{t.mostPositive}</h4>
                    <p className="text-sm text-muted-foreground italic">"{analysis.highlights.mostPositive}"</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-600 mb-2">{t.mostHelpful}</h4>
                    <p className="text-sm text-muted-foreground italic">"{analysis.highlights.mostHelpful}"</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {t.themes}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analysis.themes.map((theme, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                      <div className="flex items-center gap-3">
                        {getSentimentIcon(theme.sentiment)}
                        <div>
                          <p className="font-medium">{theme.topic}</p>
                          <p className="text-sm text-muted-foreground">{theme.mentions} mentions</p>
                        </div>
                      </div>
                      <Badge className={getSentimentColor(theme.sentiment)}>
                        {theme.sentiment}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-primary" />
                    {t.commonPraise}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.highlights.commonPraise.map((praise, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{praise}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* Recent Reviews */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          {t.recentReviews}
        </h3>
        <div className="grid gap-4">
          {reviewData.map((review) => (
            <Card key={review.id} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>{review.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{review.author}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {t.sources[review.source as keyof typeof t.sources]}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AIHighlightedReview({ locale = 'en', reviews = [] }: AIHighlightedReviewProps) {
  const [highlightedReview, setHighlightedReview] = useState<Review | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const content = {
    en: {
      title: "AI Featured Review",
      subtitle: "Most helpful review this week",
      analyzing: "AI is selecting the most helpful review...",
      viewAll: "View All Reviews",
      helpful: "AI determined this as most helpful",
      rating: "Rating",
      source: "Source",
      date: "Date"
    },
    es: {
      title: "Reseña Destacada por IA",
      subtitle: "Reseña más útil de esta semana",
      analyzing: "IA está seleccionando la reseña más útil...",
      viewAll: "Ver Todas las Reseñas",
      helpful: "IA determinó esta como la más útil",
      rating: "Calificación",
      source: "Fuente",
      date: "Fecha"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  // Mock reviews data
  const mockReviews: Review[] = [
    {
      id: '1',
      author: 'Sarah Johnson',
      rating: 5,
      date: '2024-01-15',
      content: 'Original Oak Carpentry transformed our outdoor space with a beautiful hurricane-resistant deck. Their attention to detail and knowledge of Florida building codes gave us confidence in the quality. The team was professional, completed the project ahead of schedule, and the craftsmanship exceeded our expectations. Highly recommend for anyone looking for reliable, high-quality carpentry work in Florida!',
      source: 'google'
    }
  ];

  const reviewData = reviews.length > 0 ? reviews : mockReviews;

  const selectMostHelpfulReview = async () => {
    setIsAnalyzing(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // AI would analyze reviews for helpfulness based on:
    // - Detail level
    // - Specific mentions of services
    // - Helpful information for potential customers
    // - Recent date
    setHighlightedReview(reviewData[0]);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    selectMostHelpfulReview();
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto border-border bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{t.title}</CardTitle>
            <Badge variant="secondary" className="ml-2">
              <Zap className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Star className="h-3 w-3 mr-1" />
            This Week
          </Badge>
        </div>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </CardHeader>

      <CardContent className="pt-6">
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3 text-muted-foreground">
              <TrendingUp className="h-5 w-5 animate-spin" />
              <span>{t.analyzing}</span>
            </div>
          </div>
        ) : highlightedReview ? (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{highlightedReview.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{highlightedReview.author}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < highlightedReview.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {t.sources[highlightedReview.source as keyof typeof t.sources]}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(highlightedReview.date).toLocaleDateString()}
                  </div>
                </div>
                <blockquote className="text-muted-foreground italic text-lg leading-relaxed border-l-4 border-primary pl-4"
003e
                  "{highlightedReview.content}"
                </blockquote>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"
003e
                <Zap className="h-4 w-4 text-primary" />
                <span>{t.helpful}</span>
              </div>
              <Button variant="outline" className="gap-2">
                {t.viewAll}
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}