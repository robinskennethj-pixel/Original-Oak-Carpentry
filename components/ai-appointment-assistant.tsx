'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon, Clock, MapPin, Phone, Mail, User, MessageSquare, CheckCircle, AlertCircle, Zap, Star, Filter, ChevronRight, BookOpen, RefreshCw, Send } from "lucide-react"
import { format } from "date-fns"

interface AppointmentSlot {
  id: string;
  date: Date;
  time: string;
  duration: number;
  type: 'consultation' | 'estimate' | 'follow-up';
  available: boolean;
}

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  preferredDate: Date | null;
  preferredTime: string;
  notes: string;
  urgency: 'standard' | 'urgent' | 'flexible';
  budget: string;
  location: string;
}

interface AIAppointmentAssistantProps {
  locale?: string;
  onAppointmentBooked?: (appointment: any) => void;
}

interface AIChatToBookingBridgeProps {
  locale?: string;
  conversationContext?: string;
  onBookingInitiated?: (context: any) => void;
}

export function AIAppointmentAssistant({ locale = 'en', onAppointmentBooked }: AIAppointmentAssistantProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingRequest, setBookingRequest] = useState<BookingRequest>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    preferredDate: null,
    preferredTime: '',
    notes: '',
    urgency: 'standard',
    budget: '',
    location: ''
  });
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const content = {
    en: {
      title: "AI Appointment Assistant",
      subtitle: "Intelligent scheduling with AI-powered recommendations",
      step1: "Contact Information",
      step2: "Project Details",
      step3: "Schedule Appointment",
      step4: "Review & Confirm",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      projectType: "Project Type",
      projectTypes: {
        'deck': 'Custom Deck Construction',
        'pergola': 'Pergola/Gazebo',
        'cabinetry': 'Custom Cabinetry',
        'trim': 'Interior Trim Work',
        'hurricane-shutters': 'Hurricane Shutters',
        'outdoor-kitchen': 'Outdoor Kitchen',
        'room-addition': 'Room Addition',
        'hurricane-upgrade': 'Hurricane-Resistant Upgrade'
      },
      preferredDate: "Preferred Date",
      preferredTime: "Preferred Time",
      urgency: "Urgency Level",
      urgencies: {
        'flexible': 'Flexible Timeline (8+ weeks)',
        'standard': 'Standard Timeline (4-6 weeks)',
        'urgent': 'Urgent Timeline (2-3 weeks)'
      },
      budget: "Budget Range",
      budgets: {
        'under-5k': 'Under $5,000',
        '5k-15k': '$5,000 - $15,000',
        '15k-30k': '$15,000 - $30,000',
        '30k-50k': '$30,000 - $50,000',
        '50k-plus': '$50,000+'
      },
      location: "Service Location",
      locations: {
        'central-florida': 'Central Florida (Orlando Area)',
        'tampa-bay': 'Tampa Bay Area',
        'south-florida': 'South Florida',
        'miami-dade': 'Miami-Dade County',
        'broward': 'Broward County',
        'palm-beach': 'Palm Beach County'
      },
      notes: "Additional Notes",
      notesPlaceholder: "Tell us more about your project...",
      aiRecommendations: "AI Recommendations",
      availableSlots: "Available Time Slots",
      bookAppointment: "Book Appointment",
      confirmBooking: "Confirm Booking",
      previous: "Previous",
      next: "Next",
      cancel: "Cancel",
      loading: "AI is finding the best slots...",
      aiInsights: "Based on your project details, AI suggests these optimal time slots:"
    },
    es: {
      title: "Asistente de Citas con IA",
      subtitle: "Programación inteligente con recomendaciones potenciadas por IA",
      step1: "Información de Contacto",
      step2: "Detalles del Proyecto",
      step3: "Programar Cita",
      step4: "Revisar y Confirmar",
      name: "Nombre Completo",
      email: "Dirección de Email",
      phone: "Número de Teléfono",
      projectType: "Tipo de Proyecto",
      projectTypes: {
        'deck': 'Construcción de Cubierta Personalizada',
        'pergola': 'Pérgola/Gazebo',
        'cabinetry': 'Gabinetes Personalizados',
        'trim': 'Trabajo de Molduras Interior',
        'hurricane-shutters': 'Contraventanas para Huracanes',
        'outdoor-kitchen': 'Cocina Exterior',
        'room-addition': 'Adición de Habitación',
        'hurricane-upgrade': 'Actualización Resistente a Huracanes'
      },
      preferredDate: "Fecha Preferida",
      preferredTime: "Hora Preferida",
      urgency: "Nivel de Urgencia",
      urgencies: {
        'flexible': 'Cronograma Flexible (8+ semanas)',
        'standard': 'Cronograma Estándar (4-6 semanas)',
        'urgent': 'Cronograma Urgente (2-3 semanas)'
      },
      budget: "Rango de Presupuesto",
      budgets: {
        'under-5k': 'Menos de $5,000',
        '5k-15k': '$5,000 - $15,000',
        '15k-30k': '$15,000 - $30,000',
        '30k-50k': '$30,000 - $50,000',
        '50k-plus': '$50,000+'
      },
      location: "Ubicación del Servicio",
      locations: {
        'central-florida': 'Centro de Florida (Área de Orlando)',
        'tampa-bay': 'Área de Tampa Bay',
        'south-florida': 'Sur de Florida',
        'miami-dade': 'Condado de Miami-Dade',
        'broward': 'Condado de Broward',
        'palm-beach': 'Condado de Palm Beach'
      },
      notes: "Notas Adicionales",
      notesPlaceholder: "Cuéntanos más sobre tu proyecto...",
      aiRecommendations: "Recomendaciones de IA",
      availableSlots: "Franjas Horarias Disponibles",
      bookAppointment: "Reservar Cita",
      confirmBooking: "Confirmar Reserva",
      previous: "Anterior",
      next: "Siguiente",
      cancel: "Cancelar",
      loading: "IA está encontrando las mejores franjas horarias...",
      aiInsights: "Basado en los detalles de tu proyecto, IA sugiere estas franjas horarias óptimas:"
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  // Generate available time slots based on project details
  const generateAvailableSlots = async () => {
    setIsLoading(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI-generated slots based on project type, urgency, and location
    const baseDate = new Date();
    const slots: AppointmentSlot[] = [];

    // Generate slots for the next 14 days
    for (let day = 1; day <= 14; day++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + day);

      // Skip weekends for standard projects
      if (bookingRequest.urgency === 'standard' && (currentDate.getDay() === 0 || currentDate.getDay() === 6)) {
        continue;
      }

      const times = bookingRequest.urgency === 'urgent'
        ? ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
        : ['9:00 AM', '11:00 AM', '2:00 PM'];

      times.forEach(time => {
        slots.push({
          id: `${currentDate.toISOString().split('T')[0]}-${time.replace(':', '-')}`,
          date: new Date(currentDate),
          time,
          duration: bookingRequest.projectType === 'room-addition' ? 120 : 60,
          type: bookingRequest.urgency === 'urgent' ? 'estimate' : 'consultation',
          available: Math.random() > 0.3 // 70% availability
        });
      });
    }

    setAvailableSlots(slots);

    // Generate AI suggestions based on project details
    const suggestions = [
      `Based on your ${bookingRequest.projectType} project, we recommend a ${bookingRequest.urgency === 'urgent' ? '60' : '90'}-minute consultation`,
      `Morning slots work best for detailed project discussions`,
      bookingRequest.location.includes('south-florida') ? 'Consider early morning appointments to avoid afternoon storms' : '',
      bookingRequest.budget.includes('50k') ? 'Premium projects benefit from longer consultation slots' : ''
    ].filter(Boolean);

    setAiSuggestions(suggestions);
    setIsLoading(false);
  };

  const handleNext = () => {
    if (currentStep === 2) {
      generateAvailableSlots();
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleBooking = async () => {
    setIsLoading(true);

    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const appointment = {
      ...bookingRequest,
      id: Date.now().toString(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    if (onAppointmentBooked) {
      onAppointmentBooked(appointment);
    }

    setIsLoading(false);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return t.step1;
      case 2: return t.step2;
      case 3: return t.step3;
      case 4: return t.step4;
      default: return '';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-border bg-card">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{t.title}</CardTitle>
            <Badge variant="secondary" className="ml-2">
              <Zap className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {t.step1} {currentStep} / 4
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Step Title */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">{getStepTitle()}</h3>
          </div>

          {/* Step Content */}
          {currentStep === 1 && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">{t.name}</Label>
                  <Input
                    id="name"
                    value={bookingRequest.name}
                    onChange={(e) => setBookingRequest(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingRequest.email}
                    onChange={(e) => setBookingRequest(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingRequest.phone}
                    onChange={(e) => setBookingRequest(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="location">{t.location}</Label>
                  <Select
                    value={bookingRequest.location}
                    onValueChange={(value) => setBookingRequest(prev => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger id="location">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.locations).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectType">{t.projectType}</Label>
                  <Select
                    value={bookingRequest.projectType}
                    onValueChange={(value) => setBookingRequest(prev => ({ ...prev, projectType: value }))}
                  >
                    <SelectTrigger id="projectType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.projectTypes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="urgency">{t.urgency}</Label>
                  <Select
                    value={bookingRequest.urgency}
                    onValueChange={(value) => setBookingRequest(prev => ({ ...prev, urgency: value as any }))}
                  >
                    <SelectTrigger id="urgency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.urgencies).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="budget">{t.budget}</Label>
                  <Select
                    value={bookingRequest.budget}
                    onValueChange={(value) => setBookingRequest(prev => ({ ...prev, budget: value }))}
                  >
                    <SelectTrigger id="budget">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.budgets).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">{t.notes}</Label>
                  <Textarea
                    id="notes"
                    value={bookingRequest.notes}
                    onChange={(e) => setBookingRequest(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder={t.notesPlaceholder}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              {aiSuggestions.length > 0 && (
                <Card className="border-border bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-primary mt-0.5" />
                      <div className="space-y-2">
                        <h4 className="font-medium">{t.aiRecommendations}</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {aiSuggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <ChevronRight className="h-3 w-3 mt-1 flex-shrink-0" />
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div>
                <Label>{t.availableSlots}</Label>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8 text-muted-foreground">
                    <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                    {t.loading}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableSlots.filter(slot => slot.available).slice(0, 6).map((slot) => (
                      <Button
                        key={slot.id}
                        onClick={() => setBookingRequest(prev => ({
                          ...prev,
                          preferredDate: slot.date,
                          preferredTime: slot.time
                        }))}
                        variant={bookingRequest.preferredDate?.getTime() === slot.date.getTime() &&
                                bookingRequest.preferredTime === slot.time ? "default" : "outline"}
                        className="justify-start text-left h-auto py-3"
                      >
                          <div className="flex items-center gap-2"
>
                            <CalendarIcon className="h-4 w-4" />
                            <div className="text-sm"
>
                              <div className="font-medium">{format(slot.date, 'MMM d, yyyy')}</div>
                              <div className="text-muted-foreground">{slot.time}</div>
                            </div>
                          </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <Card className="border-border"
>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"
>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Review Your Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4"
>
                  <div className="grid md:grid-cols-2 gap-4"
>
                    <div className="space-y-3"
>
                      <div>
                        <Label>Name</Label>
                        <p className="font-medium">{bookingRequest.name}</p>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <p className="font-medium">{bookingRequest.email}</p>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <p className="font-medium">{bookingRequest.phone}</p>
                      </div>
                      <div>
                        <Label>Location</Label>
                        <p className="font-medium">{t.locations[bookingRequest.location as keyof typeof t.locations]}</p>
                      </div>
                    </div>
                    <div className="space-y-3"
>
                      <div>
                        <Label>Project Type</Label>
                        <p className="font-medium">{t.projectTypes[bookingRequest.projectType as keyof typeof t.projectTypes]}</p>
                      </div>
                      <div>
                        <Label>Urgency</Label>
                        <p className="font-medium">{t.urgencies[bookingRequest.urgency as keyof typeof t.urgencies]}</p>
                      </div>
                      <div>
                        <Label>Budget</Label>
                        <p className="font-medium">{t.budgets[bookingRequest.budget as keyof typeof t.budgets]}</p>
                      </div>
                      <div>
                        <Label>Preferred Date & Time</Label>
                        <p className="font-medium">
                          {bookingRequest.preferredDate ? format(bookingRequest.preferredDate, 'MMM d, yyyy') : 'Not selected'} at {bookingRequest.preferredTime || 'Not selected'}
                        </p>
                      </div>
                    </div>
                  </div>
                  {bookingRequest.notes && (
                    <div>
                      <Label>Notes</Label>
                      <p className="text-muted-foreground">{bookingRequest.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg"
>
                <div className="flex items-center gap-2 text-green-800"
>
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Ready to confirm your appointment!</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-border"
>
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="gap-2"
            >
              ← {t.previous}
            </Button>

            <div className="flex gap-2"
>
              {currentStep === 4 ? (
                <Button
                  onClick={handleBooking}
                  disabled={isLoading}
                  className="gap-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      {t.confirmBooking}
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={currentStep === 4}
                  className="gap-2"
                >
                  {t.next} →
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AIChatToBookingBridge({ locale = 'en', conversationContext, onBookingInitiated }: AIChatToBookingBridgeProps) {
  const [showBooking, setShowBooking] = useState(false);
  const [aiContext, setAiContext] = useState<any>(null);

  const content = {
    en: {
      title: "AI Chat → Booking Bridge",
      subtitle: "Seamlessly transition from chat to appointment booking",
      readyToBook: "Ready to schedule your consultation?",
      aiSuggestion: "Based on our conversation, I can help you book the perfect appointment",
      bookNow: "Book Appointment Now",
      continueChat: "Continue Chat",
      processing: "AI is preparing your booking details..."
    },
    es: {
      title: "Puente de Chat → Reserva con IA",
      subtitle: "Transición fluida del chat a la reserva de citas",
      readyToBook: "¿Listo para programar tu consulta?",
      aiSuggestion: "Basado en nuestra conversación, puedo ayudarte a reservar la cita perfecta",
      bookNow: "Reservar Cita Ahora",
      continueChat: "Continuar Chat",
      processing: "IA está preparando los detalles de tu reserva..."
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const handleBookingTransition = async () => {
    // Process conversation context to extract booking information
    const context = {
      projectType: extractProjectType(conversationContext),
      urgency: extractUrgency(conversationContext),
      budget: extractBudgetRange(conversationContext),
      location: extractLocation(conversationContext),
      notes: conversationContext || ''
    };

    setAiContext(context);
    setShowBooking(true);

    if (onBookingInitiated) {
      onBookingInitiated(context);
    }
  };

  // Helper functions to extract information from conversation
  const extractProjectType = (context: string = '') => {
    if (context.includes('deck')) return 'deck';
    if (context.includes('pergola')) return 'pergola';
    if (context.includes('cabinet')) return 'cabinetry';
    if (context.includes('trim')) return 'trim';
    if (context.includes('hurricane')) return 'hurricane-shutters';
    return '';
  };

  const extractUrgency = (context: string = '') => {
    if (context.includes('urgent') || context.includes('asap')) return 'urgent';
    if (context.includes('flexible') || context.includes('whenever')) return 'flexible';
    return 'standard';
  };

  const extractBudgetRange = (context: string = '') => {
    if (context.includes('50k') || context.includes('50000')) return '50k-plus';
    if (context.includes('30k') || context.includes('30000')) return '30k-50k';
    if (context.includes('15k') || context.includes('15000')) return '15k-30k';
    if (context.includes('5k') || context.includes('5000')) return '5k-15k';
    return '';
  };

  const extractLocation = (context: string = '') => {
    if (context.includes('miami')) return 'miami-dade';
    if (context.includes('tampa')) return 'tampa-bay';
    if (context.includes('orlando')) return 'central-florida';
    if (context.includes('broward')) return 'broward';
    if (context.includes('palm beach')) return 'palm-beach';
    return 'central-florida';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!showBooking ? (
        <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <MessageSquare className="h-8 w-8 text-primary" />
                <h2 className="text-xl font-semibold">{t.readyToBook}</h2>
                <Star className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground">{t.aiSuggestion}</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={handleBookingTransition} className="gap-2"
                >
                  <CalendarIcon className="h-4 w-4" />
                  {t.bookNow}
                </Button>
                <Button variant="outline" className="gap-2"
                >
                  {t.continueChat}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <AIAppointmentAssistant
          locale={locale}
          onAppointmentBooked={onBookingInitiated}
        />
      )}
    </div>
  );
}