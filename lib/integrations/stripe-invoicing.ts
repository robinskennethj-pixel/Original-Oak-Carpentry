import Stripe from 'stripe'
import { z } from 'zod'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

// Invoice validation schema
export const invoiceSchema = z.object({
  clientEmail: z.string().email(),
  clientName: z.string().min(1),
  clientAddress: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string().default('US'),
  }),
  projectType: z.string(),
  projectDescription: z.string(),
  materialsCost: z.number().min(0),
  laborCost: z.number().min(0),
  totalAmount: z.number().min(0),
  taxAmount: z.number().optional().default(0),
  discountAmount: z.number().optional().default(0),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  paymentTerms: z.string().optional().default('Due on receipt'),
})

export type InvoiceData = z.infer<typeof invoiceSchema>

// Ogun Carpentry brand styling for invoices
export const OGUN_CARPENTRY_BRANDING = {
  logoUrl: 'https://ogun-carpentry.com/ogun_carpentry_logo.webp',
  primaryColor: '#2D5016', // Forest Green
  accentColor: '#B85C38', // Rust Orange
  secondaryColor: '#D4AF37', // Gold
  font: 'Helvetica',
  businessName: 'Ogun Carpentry',
  businessAddress: {
    line1: '123 Workshop Lane',
    line2: 'Suite 100',
    city: 'Tampa',
    state: 'FL',
    postalCode: '33602',
    country: 'US',
  },
  phone: '(813) 555-0123',
  email: 'info@ogun-carpentry.com',
  website: 'https://ogun-carpentry.com',
  licenseNumber: 'CBC125847',
}

// Create a branded invoice
export const createBrandedInvoice = async (invoiceData: InvoiceData) => {
  try {
    const validatedData = invoiceSchema.parse(invoiceData)

    // Create customer if not exists
    const customer = await stripe.customers.create({
      email: validatedData.clientEmail,
      name: validatedData.clientName,
      address: {
        line1: validatedData.clientAddress.line1,
        line2: validatedData.clientAddress.line2,
        city: validatedData.clientAddress.city,
        state: validatedData.clientAddress.state,
        postal_code: validatedData.clientAddress.postalCode,
        country: validatedData.clientAddress.country,
      },
      metadata: {
        projectType: validatedData.projectType,
        projectDescription: validatedData.projectDescription,
      },
    })

    // Create invoice items
    const invoiceItems = []

    // Materials item
    if (validatedData.materialsCost > 0) {
      const materialsItem = await stripe.invoiceItems.create({
        customer: customer.id,
        amount: Math.round(validatedData.materialsCost * 100), // Convert to cents
        currency: 'usd',
        description: `Materials for ${validatedData.projectType}`,
        metadata: {
          type: 'materials',
          projectType: validatedData.projectType,
        },
      })
      invoiceItems.push(materialsItem)
    }

    // Labor item
    if (validatedData.laborCost > 0) {
      const laborItem = await stripe.invoiceItems.create({
        customer: customer.id,
        amount: Math.round(validatedData.laborCost * 100), // Convert to cents
        currency: 'usd',
        description: `Labor for ${validatedData.projectType}`,
        metadata: {
          type: 'labor',
          projectType: validatedData.projectType,
        },
      })
      invoiceItems.push(laborItem)
    }

    // Create the invoice with custom branding
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: false, // Don't auto-finalize
      collection_method: 'send_invoice',
      days_until_due: validatedData.dueDate ?
        Math.ceil((new Date(validatedData.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 30,
      custom_fields: [
        {
          name: 'Project Type',
          value: validatedData.projectType,
        },
        {
          name: 'License Number',
          value: OGUN_CARPENTRY_BRANDING.licenseNumber,
        },
      ],
      footer: `Thank you for choosing Ogun Carpentry! ${validatedData.notes || ''}`,
      metadata: {
        projectType: validatedData.projectType,
        projectDescription: validatedData.projectDescription,
        materialsCost: validatedData.materialsCost.toString(),
        laborCost: validatedData.laborCost.toString(),
        originalTotal: validatedData.totalAmount.toString(),
        taxAmount: validatedData.taxAmount?.toString() || '0',
        discountAmount: validatedData.discountAmount?.toString() || '0',
      },
      // Branding
      customizations: {
        logo_url: OGUN_CARPENTRY_BRANDING.logoUrl,
        primary_color: OGUN_CARPENTRY_BRANDING.primaryColor,
        secondary_color: OGUN_CARPENTRY_BRANDING.accentColor,
        font: OGUN_CARPENTRY_BRANDING.font,
      },
    })

    return {
      success: true,
      invoiceId: invoice.id,
      invoiceUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf,
      customerId: customer.id,
      amount: invoice.amount_due / 100, // Convert back to dollars
      status: invoice.status,
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation error',
        details: error.errors,
      }
    }

    console.error('Stripe Invoice Creation Error:', error)
    return {
      success: false,
      error: 'Failed to create invoice',
      details: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Finalize and send invoice
export const finalizeAndSendInvoice = async (invoiceId: string) => {
  try {
    // Finalize the invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoiceId)

    // Send the invoice
    const sentInvoice = await stripe.invoices.sendInvoice(invoiceId)

    return {
      success: true,
      invoiceId: sentInvoice.id,
      invoiceUrl: sentInvoice.hosted_invoice_url,
      invoicePdf: sentInvoice.invoice_pdf,
      status: sentInvoice.status,
      sentDate: new Date().toISOString(),
    }

  } catch (error) {
    console.error('Finalize and Send Invoice Error:', error)
    return {
      success: false,
      error: 'Failed to finalize and send invoice',
      details: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Get invoice details
export const getInvoiceDetails = async (invoiceId: string) => {
  try {
    const invoice = await stripe.invoices.retrieve(invoiceId)
    return {
      success: true,
      invoice: {
        id: invoice.id,
        amount: invoice.amount_due / 100,
        status: invoice.status,
        invoiceUrl: invoice.hosted_invoice_url,
        invoicePdf: invoice.invoice_pdf,
        customerEmail: invoice.customer_email,
        customerName: invoice.customer_name,
        dueDate: invoice.due_date,
        created: invoice.created,
        metadata: invoice.metadata,
        customFields: invoice.custom_fields,
      },
    }

  } catch (error) {
    console.error('Get Invoice Details Error:', error)
    return {
      success: false,
      error: 'Failed to retrieve invoice details',
      details: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// List invoices with filtering
export const listInvoices = async (options: {
  customer?: string
  status?: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void'
  limit?: number
  startingAfter?: string
} = {}) => {
  try {
    const invoices = await stripe.invoices.list({
      customer: options.customer,
      status: options.status,
      limit: options.limit || 10,
      starting_after: options.startingAfter,
      expand: ['data.customer'],
    })

    return {
      success: true,
      invoices: invoices.data.map(invoice => ({
        id: invoice.id,
        amount: invoice.amount_due / 100,
        status: invoice.status,
        customerEmail: invoice.customer_email,
        customerName: invoice.customer_name,
        dueDate: invoice.due_date,
        created: invoice.created,
        invoiceUrl: invoice.hosted_invoice_url,
        invoicePdf: invoice.invoice_pdf,
        metadata: invoice.metadata,
      })),
      hasMore: invoices.has_more,
    }

  } catch (error) {
    console.error('List Invoices Error:', error)
    return {
      success: false,
      error: 'Failed to list invoices',
      details: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Update invoice
export const updateInvoice = async (invoiceId: string, updates: {
  metadata?: Record<string, string>
  customFields?: Array<{ name: string; value: string }>
  footer?: string
}) => {
  try {
    const invoice = await stripe.invoices.update(invoiceId, {
      metadata: updates.metadata,
      custom_fields: updates.customFields,
      footer: updates.footer,
    })

    return {
      success: true,
      invoice: {
        id: invoice.id,
        amount: invoice.amount_due / 100,
        status: invoice.status,
        metadata: invoice.metadata,
        customFields: invoice.custom_fields,
        footer: invoice.footer,
      },
    }

  } catch (error) {
    console.error('Update Invoice Error:', error)
    return {
      success: false,
      error: 'Failed to update invoice',
      details: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Void invoice
export const voidInvoice = async (invoiceId: string) => {
  try {
    const invoice = await stripe.invoices.voidInvoice(invoiceId)
    return {
      success: true,
      invoiceId: invoice.id,
      status: invoice.status,
    }

  } catch (error) {
    console.error('Void Invoice Error:', error)
    return {
      success: false,
      error: 'Failed to void invoice',
      details: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Get invoice statistics
export const getInvoiceStats = async () => {
  try {
    const now = Math.floor(Date.now() / 1000)
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60)

    const [allInvoices, recentInvoices] = await Promise.all([
      stripe.invoices.list({ limit: 100 }),
      stripe.invoices.list({ limit: 100, created: { gte: thirtyDaysAgo } }),
    ])

    const stats = {
      totalInvoices: allInvoices.data.length,
      recentInvoices: recentInvoices.data.length,
      totalRevenue: allInvoices.data.reduce((sum, inv) => sum + (inv.amount_paid || 0), 0) / 100,
      recentRevenue: recentInvoices.data.reduce((sum, inv) => sum + (inv.amount_paid || 0), 0) / 100,
      paidInvoices: allInvoices.data.filter(inv => inv.status === 'paid').length,
      pendingInvoices: allInvoices.data.filter(inv => inv.status === 'open').length,
      overdueInvoices: allInvoices.data.filter(inv => inv.status === 'open' && inv.due_date && inv.due_date < now).length,
    }

    return {
      success: true,
      stats,
    }

  } catch (error) {
    console.error('Get Invoice Stats Error:', error)
    return {
      success: false,
      error: 'Failed to get invoice statistics',
      details: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Mock invoice data for development
export const getMockInvoiceData = () => ({
  clientEmail: 'john.doe@example.com',
  clientName: 'John Doe',
  clientAddress: {
    line1: '123 Main St',
    city: 'Tampa',
    state: 'FL',
    postalCode: '33602',
  },
  projectType: 'Custom Deck Installation',
  projectDescription: '12x16 ft treated wood deck with railing system',
  materialsCost: 1200.00,
  laborCost: 2000.00,
  totalAmount: 3200.00,
  taxAmount: 224.00,
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  notes: 'Thank you for choosing Ogun Carpentry for your outdoor living project!',
  paymentTerms: 'Net 30',
})

export default {
  createBrandedInvoice,
  finalizeAndSendInvoice,
  getInvoiceDetails,
  listInvoices,
  updateInvoice,
  voidInvoice,
  getInvoiceStats,
  getMockInvoiceData,
  OGUN_CARPENTRY_BRANDING,
}