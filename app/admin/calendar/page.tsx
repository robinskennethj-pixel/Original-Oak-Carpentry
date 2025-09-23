'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, User, Phone, Mail, Plus, ChevronLeft, ChevronRight } from 'lucide-react'

// Mock calendar data
const events = [
  {
    id: '1',
    title: 'Deck Installation Consultation',
    client: 'Sarah Johnson',
    date: '2024-09-25',
    time: '10:00 AM',
    duration: '2 hours',
    location: '123 Oak Street, Tampa, FL',
    phone: '(813) 555-0101',
    email: 'sarah.j@email.com',
    type: 'consultation',
    status: 'confirmed'
  },
  {
    id: '2',
    title: 'Kitchen Cabinet Measurements',
    client: 'Michael Rodriguez',
    date: '2024-09-25',
    time: '2:00 PM',
    duration: '1.5 hours',
    location: '456 Pine Avenue, Tampa, FL',
    phone: '(813) 555-0102',
    email: 'm.rodriguez@email.com',
    type: 'measurement',
    status: 'confirmed'
  },
  {
    id: '3',
    title: 'Hurricane Shutter Installation',
    client: 'Jennifer Davis',
    date: '2024-09-26',
    time: '9:00 AM',
    duration: '6 hours',
    location: '789 Beach Road, Tampa, FL',
    phone: '(813) 555-0103',
    email: 'j.davis@email.com',
    type: 'installation',
    status: 'confirmed'
  },
  {
    id: '4',
    title: 'Repair Consultation',
    client: 'Robert Wilson',
    date: '2024-09-27',
    time: '11:00 AM',
    duration: '1 hour',
    location: '321 Elm Street, Tampa, FL',
    phone: '(813) 555-0104',
    email: 'r.wilson@email.com',
    type: 'consultation',
    status: 'pending'
  }
]

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getEventTypeColor(type: string) {
  switch (type) {
    case 'consultation':
      return 'bg-blue-100 text-blue-800'
    case 'measurement':
      return 'bg-green-100 text-green-800'
    case 'installation':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function generateCalendarDays() {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const firstDay = new Date(currentYear, currentMonth, 1)
  const lastDay = new Date(currentYear, currentMonth + 1, 0)

  const days = []
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    days.push(date)
  }

  return days
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const calendarDays = generateCalendarDays()
  const today = new Date().toISOString().split('T')[0]

  const todaysEvents = events.filter(event => event.date === selectedDate)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar & Bookings</h1>
          <p className="text-muted-foreground">Manage your appointments and schedule</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar View */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>September 2024</CardTitle>
              <CardDescription>Click on a date to view appointments</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Week Day Headers */}
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((date, index) => {
                  const dateStr = date.toISOString().split('T')[0]
                  const dayEvents = events.filter(event => event.date === dateStr)
                  const isSelected = dateStr === selectedDate
                  const isToday = dateStr === today
                  const isCurrentMonth = date.getMonth() === new Date().getMonth()

                  return (
                    <Button
                      key={index}
                      variant={isSelected ? "default" : "ghost"}
                      className={cn(
                        "h-12 w-full p-2 relative",
                        !isCurrentMonth && "text-muted-foreground opacity-50",
                        isToday && "border-2 border-primary"
                      )}
                      onClick={() => setSelectedDate(dateStr)}
                    >
                      <div className="text-sm">{date.getDate()}</div>
                      {dayEvents.length > 0 && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                      )}
                    </Button>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>
              {selectedDate === today ? 'Today' : new Date(selectedDate).toLocaleDateString()} appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {todaysEvents.length > 0 ? (
                todaysEvents.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.client}</p>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time} ({event.duration})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{event.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{event.phone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{event.email}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No appointments scheduled for this date</p>
                  <Button className="mt-4" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Appointment
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}