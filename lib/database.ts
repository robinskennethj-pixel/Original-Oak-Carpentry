// Database service for future PostgreSQL integration
// This is a mock implementation that can be replaced with real database calls

export interface ContactForm {
  id?: number
  firstName: string
  lastName: string
  email: string
  phone: string
  projectType: string
  projectDetails: string
  createdAt?: Date
  status?: 'new' | 'contacted' | 'quoted' | 'completed'
}

export interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
  project: string
  completedAt: string
  featured: boolean
}

export interface Service {
  id: number
  title: string
  description: string
  features: string[]
  icon: string
  category: string
  pricing: string
  duration: string
  featured: boolean
  images: string[]
  materials: string[]
  techniques: string[]
}

export interface PortfolioItem {
  id: number
  title: string
  category: string
  description: string
  image: string
  featured: boolean
  completedAt: string
  client: string
  location: string
  materials: string[]
  techniques: string[]
}

// Mock data storage (replace with real database)
let contactForms: ContactForm[] = []

// Contact form operations
export const saveContactForm = async (data: Omit<ContactForm, 'id' | 'createdAt'>) => {
  const newForm: ContactForm = {
    ...data,
    id: contactForms.length + 1,
    createdAt: new Date(),
    status: 'new'
  }
  contactForms.push(newForm)
  return newForm
}

export const getContactForms = async () => {
  return contactForms
}

export const getContactFormById = async (id: number) => {
  return contactForms.find(form => form.id === id)
}

export const updateContactFormStatus = async (id: number, status: ContactForm['status']) => {
  const form = contactForms.find(f => f.id === id)
  if (form) {
    form.status = status
    return form
  }
  return null
}

// Analytics operations
export const getAnalyticsData = async () => {
  return {
    totalContactForms: contactForms.length,
    contactFormsByStatus: {
      new: contactForms.filter(f => f.status === 'new').length,
      contacted: contactForms.filter(f => f.status === 'contacted').length,
      quoted: contactForms.filter(f => f.status === 'quoted').length,
      completed: contactForms.filter(f => f.status === 'completed').length,
    },
    contactFormsByMonth: getContactFormsByMonth(),
    recentContactForms: contactForms.slice(-5).reverse()
  }
}

const getContactFormsByMonth = () => {
  const monthlyData: Record<string, number> = {}
  contactForms.forEach(form => {
    if (form.createdAt) {
      const month = form.createdAt.toISOString().slice(0, 7) // YYYY-MM format
      monthlyData[month] = (monthlyData[month] || 0) + 1
    }
  })
  return monthlyData
}

// Newsletter operations
interface NewsletterSubscriber {
  id: number
  email: string
  createdAt: Date
  status: 'active' | 'unsubscribed'
}

let newsletterSubscribers: NewsletterSubscriber[] = []

export const addNewsletterSubscriber = async (email: string) => {
  const existing = newsletterSubscribers.find(s => s.email === email)
  if (existing) {
    return { success: false, message: 'Email already subscribed' }
  }

  const newSubscriber: NewsletterSubscriber = {
    id: newsletterSubscribers.length + 1,
    email,
    createdAt: new Date(),
    status: 'active'
  }
  newsletterSubscribers.push(newSubscriber)
  return { success: true, subscriber: newSubscriber }
}

export const getNewsletterSubscribers = async () => {
  return newsletterSubscribers.filter(s => s.status === 'active')
}

export const unsubscribeNewsletter = async (email: string) => {
  const subscriber = newsletterSubscribers.find(s => s.email === email)
  if (subscriber) {
    subscriber.status = 'unsubscribed'
    return { success: true }
  }
  return { success: false, message: 'Subscriber not found' }
}

// Utility functions
export const getStats = async () => {
  return {
    totalContactForms: contactForms.length,
    totalNewsletterSubscribers: newsletterSubscribers.filter(s => s.status === 'active').length,
    contactFormsThisMonth: contactForms.filter(form => {
      if (!form.createdAt) return false
      const now = new Date()
      const formDate = new Date(form.createdAt)
      return formDate.getMonth() === now.getMonth() && formDate.getFullYear() === now.getFullYear()
    }).length,
    recentActivity: {
      lastContactForm: contactForms[contactForms.length - 1],
      lastNewsletterSignup: newsletterSubscribers[newsletterSubscribers.length - 1]
    }
  }
}

// This would be replaced with real database queries when implementing PostgreSQL
export const initializeDatabase = async () => {
  console.log('Database service initialized')
  // Add any initialization logic here
}

export default {
  saveContactForm,
  getContactForms,
  getContactFormById,
  updateContactFormStatus,
  getAnalyticsData,
  addNewsletterSubscriber,
  getNewsletterSubscribers,
  unsubscribeNewsletter,
  getStats,
  initializeDatabase
}