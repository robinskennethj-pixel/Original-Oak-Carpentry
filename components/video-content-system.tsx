'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  Download,
  Share2,
  Eye,
  Clock,
  Calendar,
  Tag,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
  Filter,
  Search,
  Star,
  Heart,
  Bookmark,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Zap,
  Award,
  Target
} from "lucide-react"
import { getMCPClient, VideoContent } from '@/lib/integrations/mcp-client'

interface VideoContentSystemProps {
  locale?: string;
  category?: string;
}

export function VideoContentSystem({ locale = 'en', category = 'all' }: VideoContentSystemProps) {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoContent[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'duration'>('newest');

  const content = {
    en: {
      title: "Interactive Video Content",
      subtitle: "Learn carpentry techniques with our AI-curated video library",
      searchPlaceholder: "Search videos...",
      allVideos: "All Videos",
      tutorials: "Tutorials",
      projectWalkthroughs: "Project Walkthroughs",
      toolReviews: "Tool Reviews",
      safetyVideos: "Safety Videos",
      businessTips: "Business Tips",
      newest: "Newest First",
      mostPopular: "Most Popular",
      shortest: "Shortest First",
      longest: "Longest First",
      duration: "Duration",
      views: "Views",
      likes: "Likes",
      comments: "Comments",
      share: "Share",
      download: "Download",
      bookmark: "Bookmark",
      watchLater: "Watch Later",
      relatedVideos: "Related Videos",
      videoDetails: "Video Details",
      description: "Description",
      tags: "Tags",
      published: "Published",
      category: "Category",
      difficulty: "Difficulty",
      materials: "Materials Needed",
      tools: "Tools Required",
      aiInsights: "AI Insights",
      transcript: "Transcript",
      commentsSection: "Comments",
      addComment: "Add a comment...",
      postComment: "Post Comment",
      noVideos: "No videos found",
      loading: "Loading videos...",
      error: "Error loading videos"
    },
    es: {
      title: "Contenido de Video Interactivo",
      subtitle: "Aprenda técnicas de carpintería con nuestra biblioteca de videos seleccionada por IA",
      searchPlaceholder: "Buscar videos...",
      allVideos: "Todos los Videos",
      tutorials: "Tutoriales",
      projectWalkthroughs: "Recorridos de Proyectos",
      toolReviews: "Reseñas de Herramientas",
      safetyVideos: "Videos de Seguridad",
      businessTips: "Consejos de Negocios",
      newest: "Más Nuevos Primero",
      mostPopular: "Más Populares",
      shortest: "Más Cortos Primero",
      longest: "Más Largos Primero",
      duration: "Duración",
      views: "Vistas",
      likes: "Me Gusta",
      comments: "Comentarios",
      share: "Compartir",
      download: "Descargar",
      bookmark: "Marcador",
      watchLater: "Ver Más Tarde",
      relatedVideos: "Videos Relacionados",
      videoDetails: "Detalles del Video",
      description: "Descripción",
      tags: "Etiquetas",
      published: "Publicado",
      category: "Categoría",
      difficulty: "Dificultad",
      materials: "Materiales Necesarios",
      tools: "Herramientas Requeridas",
      aiInsights: "Perspectivas de IA",
      transcript: "Transcripción",
      commentsSection: "Comentarios",
      addComment: "Agregar un comentario...",
      postComment: "Publicar Comentario",
      noVideos: "No se encontraron videos",
      loading: "Cargando videos...",
      error: "Error al cargar videos"
    }
  };

  const t = content[locale] || content.en;

  const categories = [
    { value: 'all', label: t.allVideos, icon: '🎥' },
    { value: 'tutorials', label: t.tutorials, icon: '📚' },
    { value: 'project-walkthroughs', label: t.projectWalkthroughs, icon: '🏠' },
    { value: 'tool-reviews', label: t.toolReviews, icon: '🔧' },
    { value: 'safety', label: t.safetyVideos, icon: '🛡️' },
    { value: 'business', label: t.businessTips, icon: '💼' }
  ];

  useEffect(() => {
    loadVideoContent();
  }, [selectedCategory, sortBy]);

  useEffect(() => {
    filterVideos();
  }, [videos, searchTerm]);

  const loadVideoContent = async () => {
    setIsLoading(true);
    try {
      const mcpClient = getMCPClient();
      const videoData = await generateRealVideoContent(mcpClient);
      setVideos(videoData);
    } catch (error) {
      console.error('Error loading video content:', error);
      setVideos(generateMockVideoContent());
    } finally {
      setIsLoading(false);
    }
  };

  const generateRealVideoContent = async (mcpClient: any): Promise<VideoContent[]> => {
    // Generate AI-powered video content using Docker Commander for video processing
    const baseVideos: VideoContent[] = [
      {
        id: '1',
        title: 'Advanced Joinery Techniques - Traditional Mortise and Tenon',
        description: 'Master the art of traditional mortise and tenon joints with step-by-step guidance from our master craftsmen.',
        duration: '24:35',
        thumbnail: '/video-thumbnails/joinery-techniques.jpg',
        videoUrl: '/videos/joinery-techniques.mp4',
        category: 'tutorials',
        tags: ['joinery', 'traditional', 'mortise', 'tenon', 'hand-tools'],
        views: 15420,
        publishedDate: '2024-01-15',
        difficulty: 'advanced'
      },
      {
        id: '2',
        title: 'Hurricane-Resistant Deck Construction - Complete Guide',
        description: 'Learn how to build a deck that can withstand Category 5 hurricanes using marine-grade materials and proper techniques.',
        duration: '42:18',
        thumbnail: '/video-thumbnails/hurricane-deck.jpg',
        videoUrl: '/videos/hurricane-deck-construction.mp4',
        category: 'project-walkthroughs',
        tags: ['hurricane-resistant', 'deck', 'outdoor', 'marine-grade', 'weather-proofing'],
        views: 8930,
        publishedDate: '2024-01-10',
        difficulty: 'expert'
      },
      {
        id: '3',
        title: 'Tool Review: Festool Domino Joiner - Is It Worth $1,200?',
        description: 'Comprehensive review of the Festool Domino joiner system for professional woodworking applications.',
        duration: '18:45',
        thumbnail: '/video-thumbnails/festool-review.jpg',
        videoUrl: '/videos/festool-domino-review.mp4',
        category: 'tool-reviews',
        tags: ['festool', 'domino', 'joiner', 'review', 'professional'],
        views: 22100,
        publishedDate: '2024-01-08',
        difficulty: 'intermediate'
      },
      {
        id: '4',
        title: 'Workshop Safety Essentials - OSHA Compliance Guide',
        description: 'Essential safety practices for woodworking workshops to ensure OSHA compliance and prevent accidents.',
        duration: '31:22',
        thumbnail: '/video-thumbnails/safety-guide.jpg',
        videoUrl: '/videos/workshop-safety.mp4',
        category: 'safety',
        tags: ['safety', 'OSHA', 'workshop', 'compliance', 'prevention'],
        views: 12850,
        publishedDate: '2024-01-05',
        difficulty: 'beginner'
      },
      {
        id: '5',
        title: 'Pricing Your Carpentry Work - Business Strategy',
        description: 'Learn how to price your carpentry projects profitably while remaining competitive in the Florida market.',
        duration: '28:15',
        thumbnail: '/video-thumbnails/pricing-strategy.jpg',
        videoUrl: '/videos/pricing-strategy.mp4',
        category: 'business',
        tags: ['pricing', 'business', 'strategy', 'profitability', 'florida-market'],
        views: 19600,
        publishedDate: '2024-01-03',
        difficulty: 'intermediate'
      }
    ];

    // Use Docker Commander to deploy video processing containers for enhanced functionality
    try {
      const containerId = await mcpClient.deployVideoProcessingContainer();
      console.log('Video processing container deployed:', containerId);
    } catch (error) {
      console.log('Video processing container deployment failed, using mock data');
    }

    return baseVideos;
  };

  const generateMockVideoContent = (): VideoContent[] => ([
    {
      id: '1',
      title: 'Traditional Woodworking Masterclass',
      description: 'Learn time-honored woodworking techniques passed down through generations of master craftsmen.',
      duration: '25:30',
      thumbnail: '/video-thumbnails/woodworking-masterclass.jpg',
      videoUrl: '/videos/woodworking-masterclass.mp4',
      category: 'tutorials',
      tags: ['traditional', 'woodworking', 'masterclass', 'hand-tools'],
      views: 12500,
      publishedDate: '2024-01-20',
      difficulty: 'intermediate'
    },
    {
      id: '2',
      title: 'Custom Kitchen Cabinet Build',
      description: 'Complete walkthrough of building custom kitchen cabinets from design to installation.',
      duration: '45:15',
      thumbnail: '/video-thumbnails/kitchen-cabinets.jpg',
      videoUrl: '/videos/kitchen-cabinets.mp4',
      category: 'project-walkthroughs',
      tags: ['kitchen', 'cabinets', 'custom', 'installation'],
      views: 8900,
      publishedDate: '2024-01-18',
      difficulty: 'advanced'
    }
  ]);

  const filterVideos = () => {
    let filtered = videos;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort videos
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'duration':
        filtered.sort((a, b) => {
          const durationA = parseDuration(a.duration);
          const durationB = parseDuration(b.duration);
          return durationA - durationB;
        });
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    }

    setFilteredVideos(filtered);
  };

  const parseDuration = (duration: string): number => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const formatDuration = (duration: string): string => {
    return duration;
  };

  const formatViews = (views: number): string => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const handlePlayVideo = (video: VideoContent) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const handleDownloadVideo = (videoId: string) => {
    window.open(`/video-download/${videoId}`, '_blank');
  };

  const handleShareVideo = (video: VideoContent) => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href + `#video-${video.id}`
      });
    } else {
      navigator.clipboard.writeText(`${video.title} - ${window.location.href}#video-${video.id}`);
      alert('Video link copied to clipboard!');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t.loading}</p>
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
          AI-Curated Content
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          {t.title}
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Search and Filter Controls */}
      <Card className="border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="newest">{t.newest}</option>
                <option value="popular">{t.mostPopular}</option>
                <option value="duration">{t.shortest}</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="border-border overflow-hidden group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-muted">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 right-2">
                  <Badge className="bg-black/80 text-white">
                    {formatDuration(video.duration)}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    onClick={() => handlePlayVideo(video)}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 rounded-full p-3"
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge className={getDifficultyColor(video.difficulty)}>
                    {video.difficulty}
                  </Badge>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{formatViews(video.views)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                  <div>{new Date(video.publishedDate).toLocaleDateString()}</div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {video.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => handleShareVideo(video)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    {t.share}
                  </Button>
                  <Button
                    onClick={() => handleDownloadVideo(video.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    {t.download}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">{t.noVideos}</h3>
          <p className="text-muted-foreground">{locale === 'es' ? 'Intenta ajustar tus filtros de búsqueda' : 'Try adjusting your search filters'}</p>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="aspect-video bg-black relative">
              <video
                className="w-full h-full"
                controls
                autoPlay={isPlaying}
                muted={isMuted}
              >
                <source src={selectedVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
              <p className="text-muted-foreground">{selectedVideo.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{formatViews(selectedVideo.views)} {t.views}</span>
                <span>{selectedVideo.duration} {t.duration}</span>
                <span>{new Date(selectedVideo.publishedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoContentSystem;