'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Clock,
  Phone,
  Calendar,
  MapPin,
  Star
} from "lucide-react"

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'options' | 'calendar' | 'phone';
  options?: string[];
}

interface AIChatbotProps {
  locale?: string;
  position?: 'bottom-right' | 'bottom-left';
  apiKey?: string;
}

export function AIChatbot({ locale = 'en', position = 'bottom-right', apiKey }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      title: "Original Oak Assistant",
      subtitle: "Ask me about carpentry services, pricing, or book a consultation",
      placeholder: "Type your message...",
      send: "Send",
      welcome: "Hi! I'm the Original Oak Carpentry AI assistant. How can I help you today?",
      faqs: {
        pricing: "Pricing & Estimates",
        services: "Our Services",
        hurricane: "Hurricane-Resistant Work",
        booking: "Book Consultation",
        locations: "Service Areas"
      },
      responses: {
        greeting: "Hello! Welcome to Original Oak Carpentry. I'm here to help with your project questions.",
        pricing: "We offer free estimates for all projects. Decks typically range $25-45/sqft, custom cabinetry $400-600/linear ft. Would you like a detailed estimate?",
        services: "We specialize in finish carpentry, outdoor living spaces, structural framing, and hurricane-resistant construction. What type of project are you considering?",
        hurricane: "All our outdoor projects are built to Florida hurricane standards with reinforced connections and pressure-treated materials. We ensure code compliance.",
        booking: "I'd be happy to schedule a consultation! You can book directly through our calendar or I can collect your info for a callback.",
        locations: "We serve Central & South Florida including Orlando, Tampa, Miami-Dade, Broward, and Palm Beach counties. What's your location?",
        unknown: "I'm not sure about that specific detail. Let me connect you with our team for accurate information. Would you like a callback?"
      }
    },
    es: {
      title: "Asistente de Oak Original",
      subtitle: "Pregúntame sobre servicios de carpintería, precios o reserva una consulta",
      placeholder: "Escribe tu mensaje...",
      send: "Enviar",
      welcome: "¡Hola! Soy el asistente de IA de Carpintería Oak Original. ¿Cómo puedo ayudarte hoy?",
      faqs: {
        pricing: "Precios y Estimaciones",
        services: "Nuestros Servicios",
        hurricane: "Trabajo Resistente a Huracanes",
        booking: "Reservar Consulta",
        locations: "Áreas de Servicio"
      },
      responses: {
        greeting: "¡Hola! Bienvenido a Carpintería Oak Original. Estoy aquí para ayudar con tus preguntas sobre proyectos.",
        pricing: "Ofrecemos estimaciones gratuitas para todos los proyectos. Las cubiertas típicamente varían $25-45/pie², gabinetes personalizados $400-600/pie lineal. ¿Te gustaría una estimación detallada?",
        services: "Nos especializamos en carpintería de acabado, espacios exteriores, encuadre estructural y construcción resistente a huracanes. ¿Qué tipo de proyecto estás considerando?",
        hurricane: "Todos nuestros proyectos exteriores están construidos según los estándares de huracanes de Florida con conexiones reforzadas y materiales tratados con presión. Aseguramos cumplimiento de códigos.",
        booking: "¡Estaría encantado de programar una consulta! Puedes reservar directamente a través de nuestro calendario o puedo recopilar tu información para una devolución de llamada.",
        locations: "Servimos el Centro y Sur de Florida incluyendo Orlando, Tampa, Miami-Dade, Broward y condados de Palm Beach. ¿Cuál es tu ubicación?",
        unknown: "No estoy seguro sobre ese detalle específico. Permíteme conectarte con nuestro equipo para información precisa. ¿Te gustaría una devolución de llamada?"
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  useEffect(() => {
    // Add welcome message when chat opens
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: t.welcome,
        sender: 'bot',
        timestamp: new Date(),
        type: 'options',
        options: Object.values(t.faqs)
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, t.welcome, t.faqs]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    setIsTyping(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const lowerMessage = userMessage.toLowerCase();
    let responseText = t.responses.unknown;
    let responseType: Message['type'] = 'text';
    let options: string[] = [];

    // Simple keyword-based responses (in production, this would call OpenAI API)
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hola')) {
      responseText = t.responses.greeting;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('precio')) {
      responseText = t.responses.pricing;
      options = ['Get Detailed Estimate', 'View Pricing Guide', 'Book Consultation'];
    } else if (lowerMessage.includes('service') || lowerMessage.includes('servicio')) {
      responseText = t.responses.services;
    } else if (lowerMessage.includes('hurricane') || lowerMessage.includes('storm') || lowerMessage.includes('huracán')) {
      responseText = t.responses.hurricane;
    } else if (lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('reservar')) {
      responseText = t.responses.booking;
      responseType = 'calendar';
    } else if (lowerMessage.includes('location') || lowerMessage.includes('area') || lowerMessage.includes('ubicación')) {
      responseText = t.responses.locations;
    }

    setIsTyping(false);

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      type: responseType,
      options: options.length > 0 ? options : undefined
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Generate AI response
    const aiResponse = await generateAIResponse(inputText);
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleOptionClick = async (option: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: option,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate appropriate response based on option
    let responseKey = 'unknown';

    if (option === t.faqs.pricing) responseKey = 'pricing';
    else if (option === t.faqs.services) responseKey = 'services';
    else if (option === t.faqs.hurricane) responseKey = 'hurricane';
    else if (option === t.faqs.booking) responseKey = 'booking';
    else if (option === t.faqs.locations) responseKey = 'locations';

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: t.responses[responseKey as keyof typeof t.responses],
      sender: 'bot',
      timestamp: new Date(),
      type: responseKey === 'booking' ? 'calendar' : 'text',
      options: responseKey === 'pricing' ? ['Get Detailed Estimate', 'View Pricing Guide', 'Book Consultation'] : undefined
    };

    setMessages(prev => [...prev, aiResponse]);
  };

  const handleCalendarBooking = () => {
    // Open Calendly widget
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/originaloakcarpentry/consultation'
      });
    }
  };

  const handlePhoneCall = () => {
    window.open('tel:+14075550123');
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-50 rounded-full p-4 shadow-lg transition-all duration-300 ${
          position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'
        } ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed z-40 w-96 h-[500px] shadow-2xl border-border ${
          position === 'bottom-right' ? 'bottom-20 right-6' : 'bottom-20 left-6'
        }`}>
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg p-4">
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8" />
              <div>
                <CardTitle className="text-lg">{t.title}</CardTitle>
                <p className="text-sm opacity-90">{t.subtitle}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-80px)] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[350px]">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-2 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}

                  <div className={`max-w-[75%] ${
                    message.sender === 'user' ? 'order-1' : 'order-2'
                  }`}>
                    <div className={`rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <p className="text-sm">{message.text}</p>

                      {message.options && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.options.map((option, index) => (
                            <Button
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      )}

                      {message.type === 'calendar' && (
                        <Button
                          onClick={handleCalendarBooking}
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Consultation
                        </Button>
                      )}

                      {message.type === 'phone' && (
                        <Button
                          onClick={handlePhoneCall}
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 order-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.placeholder}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendly Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(C,a,l,e,n,d,l,y){
              C[l]=C[l]||function(){(C[l].q=C[l].q||[]).push(arguments)};
              C[l].l=+new Date;
              n=a.createElement(e);
              d=a.getElementsByTagName(e)[0];
              n.async=1;
              n.src="https://calendly.com/assets/external/widget.js";
              d.parentNode.insertBefore(n,d);
            })(window,document,"Calendly","script");
          `
        }}
      />
    </>
  );
}