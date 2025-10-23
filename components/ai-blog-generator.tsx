'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Target,
  TrendingUp,
  Search,
  Copy,
  Lightbulb,
  Users,
  Clock,
  FileText,
  Zap
} from "lucide-react"

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

interface SEOAnalysis {
  score: number;
  title: string;
  description: string;
  keywords: string[];
  suggestions: string[];
}

function AIBlogGenerator() {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('general');
  const [tone, setTone] = useState('conversational');
  const [audience, setAudience] = useState('homeowners');
  const [length, setLength] = useState('medium');
  const [includeSEO, setIncludeSEO] = useState(true);
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [seoAnalysis, setSeoAnalysis] = useState<SEOAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateBlogPost = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI-generated content
    const mockPost: BlogPost = {
      title: `${topic}: A Complete Guide for Homeowners`,
      content: `## Introduction\n\n${topic} is an essential aspect of home maintenance that every homeowner should understand. In this comprehensive guide, we'll explore the key considerations and best practices.\n\n## Main Content\n\nWhen it comes to ${topic}, there are several important factors to consider:\n\n### Key Considerations\n- Quality materials and craftsmanship\n- Proper planning and design\n- Budget considerations\n- Timeline expectations\n\n### Best Practices\nWorking with experienced professionals ensures that your project will be completed to the highest standards. Always request detailed quotes and check references before making decisions.\n\n## Conclusion\n\n${topic} doesn't have to be overwhelming when you have the right information and professional support.`,
      excerpt: `Learn everything you need to know about ${topic} with this comprehensive guide for homeowners.`,
      tags: [topic, 'home improvement', 'maintenance', 'guide'],
      readingTime: 5,
      seoTitle: `${topic} Guide: Everything Homeowners Need to Know`,
      seoDescription: `Complete guide to ${topic} for homeowners. Learn about materials, costs, timeline, and best practices.`,
      keywords: [topic, 'homeowner guide', 'home improvement', 'maintenance tips']
    };

    setBlogPost(mockPost);
    setIsGenerating(false);
  };

  const analyzeSEO = async () => {
    if (!blogPost) return;

    setIsAnalyzing(true);

    // Simulate AI SEO analysis
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockAnalysis: SEOAnalysis = {
      score: 85,
      title: blogPost.seoTitle,
      description: blogPost.seoDescription,
      keywords: blogPost.keywords,
      suggestions: [
        'Consider adding more internal links to related content',
        'Include more specific keywords related to your local area',
        'Add a call-to-action at the end of the post',
        'Consider adding FAQ section for better search visibility'
      ]
    };

    setSeoAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  // English translations (default)
  const t = {
    title: "AI Blog Generator",
    subtitle: "Create engaging blog content with AI assistance",
    topic: "Blog Topic",
    topicPlaceholder: "Enter your blog topic...",
    category: "Category",
    tone: "Writing Tone",
    audience: "Target Audience",
    length: "Content Length",
    seo: "Include SEO Optimization",
    generate: "Generate Blog Post",
    regenerating: "AI is creating content...",
    copy: "Copy Content",
    copySeo: "Copy SEO Data",
    analyze: "Analyze SEO",
    reanalyze: "Reanalyze SEO",
    analyzing: "AI is analyzing SEO...",
    seoScore: "SEO Score",
    suggestions: "Improvement Suggestions",
    viewAll: "View All Reviews",
    readingTime: "Reading Time",
    minutes: "minutes",
    helpful: "AI identified as most helpful"
  };

  const categories = {
    general: 'General',
    kitchen: 'Kitchen Remodeling',
    bathroom: 'Bathroom Remodeling',
    flooring: 'Flooring',
    painting: 'Painting',
    roofing: 'Roofing',
    decking: 'Decking',
    custom: 'Custom Carpentry'
  };

  const tones = {
    educational: 'Educational',
    conversational: 'Conversational',
    technical: 'Technical'
  };

  const audiences = {
    homeowners: 'Homeowners',
    contractors: 'Contractors',
    diy: 'DIY Enthusiasts',
    commercial: 'Commercial Property Owners',
    'first-time': 'First-Time Homeowners'
  };

  const lengths = {
    short: 'Short (500-700 words)',
    medium: 'Medium (800-1200 words)',
    long: 'Long (1300-1800 words)',
    comprehensive: 'Comprehensive (2000+ words)'
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Improvement';
    return 'Poor';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-border">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{t.title}</CardTitle>
          </div>
          <Button
            onClick={analyzeSEO}
            disabled={isAnalyzing || !blogPost}
            className="gap-2"
          >
            {isAnalyzing ? (
              <>
                <TrendingUp className="h-4 w-4 animate-spin" />
                {t.analyzing}
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                {seoAnalysis ? t.reanalyze : t.analyze}
              </>
            )}
          </Button>
        </div>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </CardHeader>

      <CardContent className="pt-6">
        {seoAnalysis ? (
          <div className="space-y-6">
            {/* SEO Score */}
            <div className="text-center p-6 bg-primary/5 rounded-lg">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(seoAnalysis.score)}`}>
                {seoAnalysis.score}/100
              </div>
              <div className={`text-lg font-medium ${getScoreColor(seoAnalysis.score)}`}>
                {getScoreLabel(seoAnalysis.score)}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{t.seoScore}</p>
            </div>

            {/* SEO Data */}
            <div className="space-y-4">
              <div>
                <Label>{t.title}</Label>
                <Input value={seoAnalysis.title} readOnly className="bg-background" />
              </div>
              <div>
                <Label>{t.description}</Label>
                <Textarea value={seoAnalysis.description} readOnly className="min-h-[80px] bg-background" />
              </div>
              <div>
                <Label>{t.keywords}</Label>
                <div className="flex flex-wrap gap-2">
                  {seoAnalysis.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                {t.suggestions}
              </Label>
              <ul className="space-y-2">
                {seoAnalysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={() => copyToClipboard(JSON.stringify(seoAnalysis, null, 2))} className="gap-2">
                <Copy className="h-4 w-4" />
                {t.copySeo}
              </Button>
              <Button variant="outline" onClick={() => setSeoAnalysis(null)}>
                Back to Blog
              </Button>
            </div>
          </div>
        ) : blogPost ? (
          <div className="space-y-6">
            {/* Blog Post */}
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={blogPost.title} readOnly className="bg-background font-semibold" />
              </div>
              <div>
                <Label>Excerpt</Label>
                <Textarea value={blogPost.excerpt} readOnly className="bg-background" />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea
                  value={blogPost.content}
                  readOnly
                  className="min-h-[400px] bg-background font-mono text-sm"
                />
              </div>
            </div>

            {/* Tags and Reading Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{t.readingTime}:</span>
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  {blogPost.readingTime} {t.minutes}
                </Badge>
              </div>
              <div className="flex gap-2">
                {blogPost.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={() => copyToClipboard(blogPost.content)} className="gap-2">
                <Copy className="h-4 w-4" />
                {t.copy}
              </Button>
              <Button variant="outline" onClick={() => setBlogPost(null)}>
                Generate New
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Topic Input */}
            <div className="space-y-2">
              <Label>{t.topic}</Label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t.topicPlaceholder}
                className="w-full"
              />
            </div>

            {/* Configuration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.category}</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  {Object.entries(categories).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>{t.tone}</Label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  {Object.entries(tones).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>{t.audience}</Label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  {Object.entries(audiences).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>{t.length}</Label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  {Object.entries(lengths).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* SEO Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="seo"
                checked={includeSEO}
                onChange={(e) => setIncludeSEO(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="seo">{t.seo}</Label>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateBlogPost}
              disabled={isGenerating || !topic.trim()}
              className="w-full gap-2"
            >
              {isGenerating ? (
                <>
                  <Zap className="h-4 w-4 animate-spin" />
                  {t.regenerating}
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  {t.generate}
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { AIBlogGenerator as default, AIBlogGenerator };

// Re-export for compatibility
export const AIBlogSEOAssistant = AIBlogGenerator;