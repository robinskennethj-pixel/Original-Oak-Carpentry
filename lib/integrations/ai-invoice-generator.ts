import OpenAI from 'openai'
import { z } from 'zod'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

// AI-generated content schema
export const aiInvoiceContentSchema = z.object({
  projectDescription: z.string().min(10),
  clientMessage: z.string().min(20),
  paymentInstructions: z.string().min(10),
  warrantyNotes: z.string().optional(),
  maintenanceNotes: z.string().optional(),
  projectCategory: z.enum([
    'deck',
    'trim-work',
    'cabinet-installation',
    'hurricane-repair',
    'outdoor-living',
    'finish-carpentry',
    'repair-restoration',
    'custom-furniture',
    'flooring',
    'other'
  ]),
  suggestedAddOns: z.array(z.string()).optional(),
})

export type AIInvoiceContent = z.infer<typeof aiInvoiceContentSchema>

// Project data input schema
export const projectDataSchema = z.object({
  clientName: z.string().min(1),
  projectType: z.string().min(1),
  materials: z.array(z.object({
    name: z.string(),
    quantity: z.number().positive(),
    unit: z.string(),
    cost: z.number().positive(),
  })),
  laborHours: z.number().optional(),
  laborRate: z.number().optional(),
  totalCost: z.number().positive(),
  completionDate: z.string(),
  specialRequests: z.string().optional(),
  location: z.string().optional(),
  weatherConditions: z.string().optional(),
  challenges: z.string().optional(),
  warrantyRequested: z.boolean().optional().default(false),
})

export type ProjectData = z.infer<typeof projectDataSchema>

// Generate AI-powered invoice content
export const generateAIInvoiceContent = async (projectData: ProjectData): Promise<{
  success: boolean
  content?: AIInvoiceContent
  error?: string
}> => {
  try {
    const validatedData = projectDataSchema.parse(projectData)

    const prompt = `
Create professional invoice content for Ogun Carpentry based on the following project details:

CLIENT: ${validatedData.clientName}
PROJECT TYPE: ${validatedData.projectType}
COMPLETION DATE: ${validatedData.completionDate}
TOTAL COST: $${validatedData.totalCost.toFixed(2)}

MATERIALS USED:
${validatedData.materials.map(m => `- ${m.name}: ${m.quantity} ${m.unit} ($${m.cost.toFixed(2)})`).join('\n')}

${validatedData.laborHours ? `LABOR: ${validatedData.laborHours} hours at $${validatedData.laborRate?.toFixed(2)}/hour` : ''}

${validatedData.specialRequests ? `SPECIAL REQUESTS: ${validatedData.specialRequests}` : ''}
${validatedData.location ? `LOCATION: ${validatedData.location}` : ''}
${validatedData.weatherConditions ? `WEATHER CONDITIONS: ${validatedData.weatherConditions}` : ''}
${validatedData.challenges ? `CHALLENGES OVERCOME: ${validatedData.challenges}` : ''}

Please generate:
1. A detailed project description for the invoice (2-3 sentences)
2. A personalized thank-you message to the client
3. Payment instructions
4. Relevant warranty or maintenance notes based on project type
5. Project category classification
6. Any suggested add-on services

Make the content professional but warm, reflecting Ogun Carpentry's commitment to quality craftsmanship. Use specific details from the project when possible.
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert invoice content generator for Ogun Carpentry, a premium carpentry service.
Create professional, detailed, and personalized invoice content that reflects the company's commitment to quality craftsmanship.

Guidelines:
- Use warm, professional language
- Include specific project details when available
- Suggest relevant maintenance or warranty information
- Recommend appropriate add-on services
- Classify projects into appropriate categories
- Make clients feel valued and appreciated`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const aiResponse = completion.choices[0]?.message?.content
    if (!aiResponse) {
      throw new Error('No response from AI')
    }

    // Parse the AI response
    const content = parseAIResponse(aiResponse, validatedData)

    return {
      success: true,
      content,
    }

  } catch (error) {
    console.error('AI Invoice Generation Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate AI invoice content',
    }
  }
}

// Parse AI response into structured data
function parseAIResponse(aiResponse: string, projectData: ProjectData): AIInvoiceContent {
  try {
    // Extract sections using regex patterns
    const sections = {
      projectDescription: extractSection(aiResponse, /project description:?\s*([^\n]+(?:\n[^\n]+)*?)(?=\n\s*(?:thank you|payment|warranty|maintenance|category|add-ons)|\n\s*$)/i),
      clientMessage: extractSection(aiResponse, /thank you message:?\s*([^\n]+(?:\n[^\n]+)*?)(?=\n\s*(?:payment|warranty|maintenance|category|add-ons)|\n\s*$)/i),
      paymentInstructions: extractSection(aiResponse, /payment instructions:?\s*([^\n]+(?:\n[^\n]+)*?)(?=\n\s*(?:warranty|maintenance|category|add-ons)|\n\s*$)/i),
      warrantyNotes: extractSection(aiResponse, /warranty:?\s*([^\n]+(?:\n[^\n]+)*?)(?=\n\s*(?:maintenance|category|add-ons)|\n\s*$)/i),
      maintenanceNotes: extractSection(aiResponse, /maintenance:?\s*([^\n]+(?:\n[^\n]+)*?)(?=\n\s*(?:category|add-ons)|\n\s*$)/i),
      projectCategory: extractSection(aiResponse, /category:?\s*([^\n]+)/i),
      suggestedAddOns: extractSection(aiResponse, /add-ons:?\s*([^\n]+(?:\n[^\n]+)*?)(?=\n\s*$|$)/i),
    }

    // Determine project category
    const category = determineProjectCategory(
      sections.projectCategory || projectData.projectType,
      projectData.projectType
    )

    // Parse suggested add-ons
    const suggestedAddOns = sections.suggestedAddOns
      ? sections.suggestedAddOns.split(/[,\n]/).map(item => item.trim()).filter(Boolean)
      : []

    return {
      projectDescription: sections.projectDescription || generateDefaultDescription(projectData),
      clientMessage: sections.clientMessage || generateDefaultClientMessage(projectData),
      paymentInstructions: sections.paymentInstructions || generateDefaultPaymentInstructions(),
      warrantyNotes: sections.warrantyNotes || generateDefaultWarrantyNotes(category, projectData.warrantyRequested),
      maintenanceNotes: sections.maintenanceNotes || generateDefaultMaintenanceNotes(category),
      projectCategory: category,
      suggestedAddOns: suggestedAddOns.length > 0 ? suggestedAddOns : generateDefaultAddOns(category),
    }

  } catch (error) {
    console.error('Error parsing AI response:', error)
    // Fallback to default content
    return generateFallbackContent(projectData)
  }
}

// Extract section from AI response
function extractSection(text: string, regex: RegExp): string | undefined {
  const match = text.match(regex)
  return match ? match[1].trim() : undefined
}

// Determine project category
function determineProjectCategory(aiCategory: string, projectType: string): AIInvoiceContent['projectCategory'] {
  const categoryMap: Record<string, AIInvoiceContent['projectCategory']> = {
    'deck': 'deck',
    'trim': 'trim-work',
    'cabinet': 'cabinet-installation',
    'hurricane': 'hurricane-repair',
    'outdoor': 'outdoor-living',
    'finish': 'finish-carpentry',
    'repair': 'repair-restoration',
    'furniture': 'custom-furniture',
    'floor': 'flooring',
  }

  const lowerAiCategory = aiCategory.toLowerCase()
  const lowerProjectType = projectType.toLowerCase()

  // Check AI category first
  for (const [key, value] of Object.entries(categoryMap)) {
    if (lowerAiCategory.includes(key)) {
      return value
    }
  }

  // Check project type
  for (const [key, value] of Object.entries(categoryMap)) {
    if (lowerProjectType.includes(key)) {
      return value
    }
  }

  return 'other'
}

// Generate default content when AI parsing fails
function generateFallbackContent(projectData: ProjectData): AIInvoiceContent {
  return {
    projectDescription: generateDefaultDescription(projectData),
    clientMessage: generateDefaultClientMessage(projectData),
    paymentInstructions: generateDefaultPaymentInstructions(),
    warrantyNotes: generateDefaultWarrantyNotes('other', projectData.warrantyRequested),
    maintenanceNotes: generateDefaultMaintenanceNotes('other'),
    projectCategory: 'other',
    suggestedAddOns: generateDefaultAddOns('other'),
  }
}

// Default content generators
function generateDefaultDescription(projectData: ProjectData): string {
  return `Custom ${projectData.projectType.toLowerCase()} project completed with premium materials and expert craftsmanship. All work performed to the highest standards with attention to detail and client satisfaction.`
}

function generateDefaultClientMessage(projectData: ProjectData): string {
  return `Thank you for choosing Ogun Carpentry for your ${projectData.projectType.toLowerCase()} project! We appreciate your trust in our craftsmanship and look forward to serving you again.`
}

function generateDefaultPaymentInstructions(): string {
  return `Payment can be made online through the secure payment link, by bank transfer, or by check. Please contact us if you have any questions about payment options.`
}

function generateDefaultWarrantyNotes(category: AIInvoiceContent['projectCategory'], warrantyRequested: boolean): string | undefined {
  if (!warrantyRequested) return undefined

  const warrantyNotes: Record<AIInvoiceContent['projectCategory'], string> = {
    'deck': '1-year warranty on structural integrity and installation quality. Warranty covers defects in workmanship under normal use conditions.',
    'trim-work': '6-month warranty on installation quality. Warranty covers loose or improperly installed trim.',
    'cabinet-installation': '1-year warranty on cabinet installation and hardware. Warranty covers installation defects and hardware failure under normal use.',
    'hurricane-repair': '2-year warranty on hurricane-resistant installations. Warranty covers structural integrity and weather resistance.',
    'outdoor-living': '1-year warranty on outdoor installations. Warranty covers structural defects and installation quality.',
    'finish-carpentry': '6-month warranty on finish work. Warranty covers defects in installation and finish quality.',
    'repair-restoration': '1-year warranty on restoration work. Warranty covers repaired areas against defects in workmanship.',
    'custom-furniture': '1-year warranty on custom furniture. Warranty covers structural integrity and craftsmanship.',
    'flooring': '1-year warranty on flooring installation. Warranty covers installation defects and subfloor issues.',
    'other': '6-month warranty on workmanship. Warranty covers defects in installation and materials under normal use.',
  }

  return warrantyNotes[category] || warrantyNotes['other']
}

function generateDefaultMaintenanceNotes(category: AIInvoiceContent['projectCategory']): string | undefined {
  const maintenanceNotes: Record<AIInvoiceContent['projectCategory'], string> = {
    'deck': 'Recommended maintenance: Clean and seal deck surface every 12-18 months. Check for loose boards or railings annually.',
    'trim-work': 'Clean with mild soap and water. Touch up paint or finish as needed. Check for gaps due to seasonal expansion.',
    'cabinet-installation': 'Clean with mild cleaner and soft cloth. Adjust hinges if doors become misaligned. Avoid excessive moisture exposure.',
    'hurricane-repair': 'Inspect annually before hurricane season. Check seals and weather stripping. Test shutters and storm protection features.',
    'outdoor-living': 'Clean outdoor surfaces regularly. Check for weather damage seasonally. Maintain protective finishes as needed.',
    'finish-carpentry': 'Dust regularly and clean with appropriate products. Touch up finishes as needed to maintain appearance.',
    'repair-restoration': 'Monitor repaired areas for changes. Follow specific care instructions for restored materials.',
    'custom-furniture': 'Clean with appropriate products for wood type. Avoid direct sunlight and extreme humidity. Polish occasionally.',
    'flooring': 'Clean regularly with appropriate products. Use furniture pads to prevent scratches. Maintain consistent humidity levels.',
    'other': 'Follow standard care instructions for wood products. Clean regularly and maintain protective finishes.',
  }

  return maintenanceNotes[category]
}

function generateDefaultAddOns(category: AIInvoiceContent['projectCategory']): string[] {
  const addOns: Record<AIInvoiceContent['projectCategory'], string[]> = {
    'deck': ['Deck staining/sealing', 'Outdoor lighting installation', 'Deck furniture', 'Pergola addition'],
    'trim-work': ['Interior painting', 'Door installation', 'Window trim', 'Crown molding'],
    'cabinet-installation': ['Cabinet hardware upgrade', 'Under-cabinet lighting', 'Kitchen backsplash', 'Countertop installation'],
    'hurricane-repair': ['Impact windows', 'Storm shutters', 'Garage door bracing', 'Roof reinforcement'],
    'outdoor-living': ['Outdoor kitchen', 'Fire pit installation', 'Patio cover', 'Landscape carpentry'],
    'finish-carpentry': ['Interior painting', 'Flooring installation', 'Custom built-ins', 'Door installation'],
    'repair-restoration': ['Historic preservation', 'Structural reinforcement', 'Weatherproofing', 'Maintenance contract'],
    'custom-furniture': ['Matching pieces', 'Custom storage', 'Built-in shelving', 'Furniture restoration'],
    'flooring': ['Baseboard installation', 'Transition strips', 'Floor maintenance', 'Area rug binding'],
    'other': ['General maintenance', 'Consultation services', 'Design services', 'Project planning'],
  }

  return addOns[category] || addOns['other']
}

// Generate email content with AI
export const generateAIEmailContent = async (clientName: string, projectType: string, invoiceAmount: number): Promise<{
  success: boolean
  content?: {
    subject: string
    body: string
    greeting: string
    closing: string
  }
  error?: string
}> => {
  try {
    const prompt = `
Create a professional email for Ogun Carpentry to send an invoice to a client.

CLIENT: ${clientName}
PROJECT TYPE: ${projectType}
INVOICE AMOUNT: $${invoiceAmount.toFixed(2)}

Please generate:
1. Email subject line
2. Professional greeting
3. Email body (2-3 paragraphs) that:
   - Thanks the client for their business
   - Mentions the project type
   - Explains the invoice
   - Provides payment instructions
4. Professional closing

Tone should be warm, professional, and appreciative. Make it personal but business-appropriate.
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a professional email writer for Ogun Carpentry. Create warm, appreciative, and professional emails for invoice delivery. Make clients feel valued while maintaining business professionalism.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800,
    })

    const aiResponse = completion.choices[0]?.message?.content
    if (!aiResponse) {
      throw new Error('No response from AI')
    }

    // Parse email content
    const lines = aiResponse.split('\n').filter(line => line.trim())
    const subject = lines.find(line => line.toLowerCase().includes('subject:'))?.replace(/subject:\s*/i, '') ||
                    `Invoice for your ${projectType} project`

    const greeting = lines.find(line => line.toLowerCase().includes('dear') || line.toLowerCase().includes('hello')) ||
                     `Dear ${clientName},`

    const closing = lines.find(line => line.toLowerCase().includes('sincerely') || line.toLowerCase().includes('best regards')) ||
                    'Best regards,\nThe Ogun Carpentry Team'

    const bodyStart = lines.findIndex(line => line === greeting) + 1
    const bodyEnd = lines.findIndex(line => line === closing || line.toLowerCase().includes('sincerely') || line.toLowerCase().includes('best regards'))
    const body = lines.slice(bodyStart, bodyEnd > 0 ? bodyEnd : undefined).join('\n')

    return {
      success: true,
      content: {
        subject,
        body: body || `Thank you for choosing Ogun Carpentry for your ${projectType.toLowerCase()} project. Your invoice is ready for payment.`,
        greeting,
        closing,
      },
    }

  } catch (error) {
    console.error('AI Email Generation Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate AI email content',
    }
  }
}

// Mock AI content for development
export const getMockAIInvoiceContent = (): AIInvoiceContent => ({
  projectDescription: 'Custom 12x16 ft treated wood deck installation with premium railing system. All work completed with attention to detail and weather-resistant construction methods.',
  clientMessage: 'Thank you for choosing Ogun Carpentry for your deck project! We appreciate your trust in our craftsmanship and look forward to serving you again.',
  paymentInstructions: 'Payment can be made online through the secure payment link, by bank transfer, or by check. Please contact us if you have any questions about payment options.',
  warrantyNotes: '1-year warranty on structural integrity and installation quality. Warranty covers defects in workmanship under normal use conditions.',
  maintenanceNotes: 'Recommended maintenance: Clean and seal deck surface every 12-18 months. Check for loose boards or railings annually.',
  projectCategory: 'deck',
  suggestedAddOns: ['Deck staining/sealing', 'Outdoor lighting installation', 'Deck furniture', 'Pergola addition'],
})

export default {
  generateAIInvoiceContent,
  generateAIEmailContent,
  getMockAIInvoiceContent,
}