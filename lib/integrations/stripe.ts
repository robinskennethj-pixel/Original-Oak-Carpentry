import Stripe from 'stripe'

// Only create Stripe client when API key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
  });
}

export interface PaymentIntentData {
  amount: number
  currency: string
  customerEmail?: string
  customerName?: string
  metadata?: Record<string, string>
  description?: string
}

export interface CheckoutSessionData {
  successUrl: string
  cancelUrl: string
  customerEmail?: string
  customerName?: string
  lineItems: Array<{
    price_data: {
      currency: string
      product_data: {
        name: string
        description?: string
        images?: string[]
      }
      unit_amount: number
    }
    quantity: number
  }>
  mode: 'payment' | 'setup' | 'subscription'
  metadata?: Record<string, string>
}

// Create payment intent for custom amounts
export const createPaymentIntent = async (data: PaymentIntentData) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: data.currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: data.metadata || {},
      description: data.description || 'Original Oak Carpentry Payment',
      receipt_email: data.customerEmail,
    })

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    }
  } catch (error) {
    console.error('Stripe Payment Intent Error:', error)
    throw error
  }
}

// Create checkout session for predefined products/services
export const createCheckoutSession = async (data: CheckoutSessionData) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: data.lineItems,
      mode: data.mode,
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      customer_email: data.customerEmail,
      metadata: data.metadata || {},
      billing_address_collection: 'required',
      shipping_address_collection: data.mode === 'payment' ? {
        allowed_countries: ['US', 'CA'],
      } : undefined,
    })

    return {
      success: true,
      sessionId: session.id,
      sessionUrl: session.url,
    }
  } catch (error) {
    console.error('Stripe Checkout Session Error:', error)
    throw error
  }
}

// Retrieve payment intent status
export const getPaymentIntentStatus = async (paymentIntentId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    return {
      success: true,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      customer: paymentIntent.customer,
      metadata: paymentIntent.metadata,
    }
  } catch (error) {
    console.error('Stripe Payment Intent Retrieve Error:', error)
    throw error
  }
}

// Handle webhook events
export const handleStripeWebhook = async (payload: string, signature: string) => {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handleSuccessfulPayment(paymentIntent)
        break

      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        await handleCompletedCheckout(session)
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        await handleFailedPayment(failedPayment)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return { received: true }
  } catch (error) {
    console.error('Stripe Webhook Error:', error)
    throw error
  }
}

// Handle successful payment
const handleSuccessfulPayment = async (paymentIntent: Stripe.PaymentIntent) => {
  console.log('Payment succeeded:', paymentIntent.id)

  // Send confirmation email
  // Update database
  // Trigger notifications

  // Example: Send email confirmation
  if (paymentIntent.receipt_email) {
    // await sendPaymentConfirmationEmail(paymentIntent)
  }
}

// Handle completed checkout session
const handleCompletedCheckout = async (session: Stripe.Checkout.Session) => {
  console.log('Checkout session completed:', session.id)

  // Process order
  // Update inventory
  // Send confirmation email

  // Example: Create order record
  if (session.customer_email) {
    // await createOrderRecord(session)
  }
}

// Handle failed payment
const handleFailedPayment = async (paymentIntent: Stripe.PaymentIntent) => {
  console.log('Payment failed:', paymentIntent.id)

  // Send failure notification
  // Update order status
  // Log for analysis
}

// Create customer for repeat payments
export const createCustomer = async (email: string, name?: string) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    })

    return {
      success: true,
      customerId: customer.id,
    }
  } catch (error) {
    console.error('Stripe Customer Creation Error:', error)
    throw error
  }
}

// Create setup intent for saving payment methods
export const createSetupIntent = async (customerId?: string) => {
  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      usage: 'off_session',
    })

    return {
      success: true,
      clientSecret: setupIntent.client_secret,
    }
  } catch (error) {
    console.error('Stripe Setup Intent Error:', error)
    throw error
  }
}

// Refund payment
export const refundPayment = async (paymentIntentId: string, amount?: number) => {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount,
      reason: 'requested_by_customer',
    })

    return {
      success: true,
      refundId: refund.id,
      amount: refund.amount,
      status: refund.status,
    }
  } catch (error) {
    console.error('Stripe Refund Error:', error)
    throw error
  }
}

// Get customer payment methods
export const getCustomerPaymentMethods = async (customerId: string) => {
  try {
    const paymentMethods = await stripe.customers.listPaymentMethods(customerId)

    return {
      success: true,
      paymentMethods: paymentMethods.data.map(pm => ({
        id: pm.id,
        type: pm.type,
        card: pm.card ? {
          brand: pm.card.brand,
          last4: pm.card.last4,
          exp_month: pm.card.exp_month,
          exp_year: pm.card.exp_year,
        } : null,
      })),
    }
  } catch (error) {
    console.error('Stripe Payment Methods Error:', error)
    throw error
  }
}

// Common payment amounts for Original Oak Carpentry services
export const SERVICE_AMOUNTS = {
  CONSULTATION: 5000, // $50.00
  DEPOSIT_SMALL: 25000, // $250.00
  DEPOSIT_MEDIUM: 50000, // $500.00
  DEPOSIT_LARGE: 100000, // $1000.00
  CUSTOM_QUOTE: 0, // Will be calculated based on project
}

// Predefined products for checkout
export const PREDEFINED_PRODUCTS = {
  CONSULTATION: {
    name: "Initial Consultation",
    description: "Professional consultation for your custom project",
    amount: SERVICE_AMOUNTS.CONSULTATION,
  },
  DEPOSIT_SMALL: {
    name: "Small Project Deposit",
    description: "Deposit for projects under $2,500",
    amount: SERVICE_AMOUNTS.DEPOSIT_SMALL,
  },
  DEPOSIT_MEDIUM: {
    name: "Medium Project Deposit",
    description: "Deposit for projects $2,500 - $10,000",
    amount: SERVICE_AMOUNTS.DEPOSIT_MEDIUM,
  },
  DEPOSIT_LARGE: {
    name: "Large Project Deposit",
    description: "Deposit for projects over $10,000",
    amount: SERVICE_AMOUNTS.DEPOSIT_LARGE,
  },
}

export default {
  stripe,
  createPaymentIntent,
  createCheckoutSession,
  getPaymentIntentStatus,
  handleStripeWebhook,
  createCustomer,
  createSetupIntent,
  refundPayment,
  getCustomerPaymentMethods,
  SERVICE_AMOUNTS,
  PREDEFINED_PRODUCTS,
}