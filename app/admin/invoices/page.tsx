'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Plus, Save, Send, Eye, Download, Calendar, DollarSign, User, Home, Wrench } from 'lucide-react'

interface Material {
  id: string
  name: string
  quantity: number
  unit: string
  cost: number
}

interface ProjectForm {
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress: {
    line1: string
    line2: string
    city: string
    state: string
    postalCode: string
  }
  projectType: string
  projectDescription: string
  materials: Material[]
  laborHours: number
  laborRate: number
  totalAmount: number
  taxAmount: number
  completionDate: string
  dueDate: string
  specialRequests: string
  warrantyRequested: boolean
  notes: string
}

const PROJECT_TYPES = [
  'Custom Deck Installation',
  'Interior Trim Work',
  'Cabinet Installation',
  'Hurricane Repair',
  'Outdoor Living Space',
  'Finish Carpentry',
  'Repair & Restoration',
  'Custom Furniture',
  'Flooring Installation',
  'Other'
]

const STATES = [
  'FL', 'AL', 'GA', 'SC', 'NC', 'TN', 'MS', 'LA', 'TX'
]

export default function AdminInvoiceDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [showPreview, setShowPreview] = useState(false)
  const [aiGeneratedContent, setAiGeneratedContent] = useState<any>(null)

  const [form, setForm] = useState<ProjectForm>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: {
      line1: '',
      line2: '',
      city: '',
      state: 'FL',
      postalCode: ''
    },
    projectType: '',
    projectDescription: '',
    materials: [{ id: '1', name: '', quantity: 1, unit: 'pcs', cost: 0 }],
    laborHours: 0,
    laborRate: 75,
    totalAmount: 0,
    taxAmount: 0,
    completionDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    specialRequests: '',
    warrantyRequested: false,
    notes: ''
  })

  // Calculate totals
  useEffect(() => {
    const materialsTotal = form.materials.reduce((sum, material) => sum + (material.cost * material.quantity), 0)
    const laborTotal = form.laborHours * form.laborRate
    const subtotal = materialsTotal + laborTotal
    const tax = subtotal * 0.07 // 7% tax
    const total = subtotal + tax

    setForm(prev => ({
      ...prev,
      taxAmount: Number(tax.toFixed(2)),
      totalAmount: Number(total.toFixed(2))
    }))
  }, [form.materials, form.laborHours, form.laborRate])

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof ProjectForm] as any,
          [child]: value
        }
      }))
    } else {
      setForm(prev => ({ ...prev, [field]: value }))
    }
  }

  const addMaterial = () => {
    setForm(prev => ({
      ...prev,
      materials: [...prev.materials, { id: Date.now().toString(), name: '', quantity: 1, unit: 'pcs', cost: 0 }]
    }))
  }

  const updateMaterial = (id: string, field: keyof Material, value: any) => {
    setForm(prev => ({
      ...prev,
      materials: prev.materials.map(material =>
        material.id === id ? { ...material, [field]: value } : material
      )
    }))
  }

  const removeMaterial = (id: string) => {
    setForm(prev => ({
      ...prev,
      materials: prev.materials.filter(material => material.id !== id)
    }))
  }

  const generateAIContent = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/invoices/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: form.clientName,
          projectType: form.projectType,
          materials: form.materials,
          laborHours: form.laborHours,
          laborRate: form.laborRate,
          totalCost: form.totalAmount,
          completionDate: form.completionDate,
          specialRequests: form.specialRequests,
          warrantyRequested: form.warrantyRequested,
        })
      })

      const data = await response.json()

      if (data.success) {
        setAiGeneratedContent(data.content)
        setMessage('AI content generated successfully!')
        setMessageType('success')
      } else {
        setMessage(`AI generation failed: ${data.error}`)
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Failed to generate AI content')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  const createInvoice = async (sendImmediately = false) => {
    setIsLoading(true)
    setMessage('')

    try {
      const invoiceData = {
        clientEmail: form.clientEmail,
        clientName: form.clientName,
        clientAddress: {
          line1: form.clientAddress.line1,
          line2: form.clientAddress.line2,
          city: form.clientAddress.city,
          state: form.clientAddress.state,
          postalCode: form.clientAddress.postalCode,
        },
        projectType: form.projectType,
        projectDescription: aiGeneratedContent?.projectDescription || form.projectDescription,
        materialsCost: form.materials.reduce((sum, material) => sum + (material.cost * material.quantity), 0),
        laborCost: form.laborHours * form.laborRate,
        totalAmount: form.totalAmount,
        taxAmount: form.taxAmount,
        dueDate: form.dueDate,
        notes: form.notes || aiGeneratedContent?.clientMessage,
      }

      const response = await fetch('/api/invoices/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceData,
          aiContent: aiGeneratedContent,
          sendImmediately,
        })
      })

      const data = await response.json()

      if (data.success) {
        setMessage(`Invoice created successfully! ${sendImmediately ? 'Sent to client.' : 'Ready to send.'}`)
        setMessageType('success')

        if (sendImmediately) {
          // Redirect to invoices list after a delay
          setTimeout(() => {
            router.push('/admin/invoices/list')
          }, 2000)
        }
      } else {
        setMessage(`Invoice creation failed: ${data.error}`)
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Failed to create invoice')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  const previewInvoice = () => {
    setShowPreview(true)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-forest-green mb-2">Create Invoice</h1>
        <p className="text-gray-600">Generate a professional invoice for your carpentry project</p>
      </div>

      {message && (
        <Alert className={`mb-6 ${messageType === 'success' ? 'border-green-500' : 'border-red-500'}`}>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={form.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail">Email *</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={form.clientEmail}
                    onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="clientPhone">Phone</Label>
                <Input
                  id="clientPhone"
                  type="tel"
                  value={form.clientPhone}
                  onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                  placeholder="(813) 555-0123"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientAddress.line1">Address Line 1</Label>
                  <Input
                    id="clientAddress.line1"
                    value={form.clientAddress.line1}
                    onChange={(e) => handleInputChange('clientAddress.line1', e.target.value)}
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <Label htmlFor="clientAddress.line2">Address Line 2</Label>
                  <Input
                    id="clientAddress.line2"
                    value={form.clientAddress.line2}
                    onChange={(e) => handleInputChange('clientAddress.line2', e.target.value)}
                    placeholder="Apt 4B"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="clientAddress.city">City</Label>
                  <Input
                    id="clientAddress.city"
                    value={form.clientAddress.city}
                    onChange={(e) => handleInputChange('clientAddress.city', e.target.value)}
                    placeholder="Tampa"
                  />
                </div>
                <div>
                  <Label htmlFor="clientAddress.state">State</Label>
                  <Select
                    value={form.clientAddress.state}
                    onValueChange={(value) => handleInputChange('clientAddress.state', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="clientAddress.postalCode">ZIP Code</Label>
                  <Input
                    id="clientAddress.postalCode"
                    value={form.clientAddress.postalCode}
                    onChange={(e) => handleInputChange('clientAddress.postalCode', e.target.value)}
                    placeholder="33602"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Project Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectType">Project Type *</Label>
                  <Select
                    value={form.projectType}
                    onValueChange={(value) => handleInputChange('projectType', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="completionDate">Completion Date *</Label>
                  <Input
                    id="completionDate"
                    type="date"
                    value={form.completionDate}
                    onChange={(e) => handleInputChange('completionDate', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="projectDescription">Project Description</Label>
                <Textarea
                  id="projectDescription"
                  value={form.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                  placeholder="Describe the work completed..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests or Notes</Label>
                <Textarea
                  id="specialRequests"
                  value={form.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Any special requests or important notes..."
                  rows={2}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="warrantyRequested"
                  checked={form.warrantyRequested}
                  onChange={(e) => handleInputChange('warrantyRequested', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="warrantyRequested">Include warranty information</Label>
              </div>
            </CardContent>
          </Card>

          {/* Materials */}
          <Card>
            <CardHeader>
              <CardTitle>Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.materials.map((material, index) => (
                <div key={material.id} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-4">
                    <Label>Material Name</Label>
                    <Input
                      value={material.name}
                      onChange={(e) => updateMaterial(material.id, 'name', e.target.value)}
                      placeholder="Treated lumber"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      value={material.quantity}
                      onChange={(e) => updateMaterial(material.id, 'quantity', Number(e.target.value))}
                      min="1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Unit</Label>
                    <Input
                      value={material.unit}
                      onChange={(e) => updateMaterial(material.id, 'unit', e.target.value)}
                      placeholder="pcs, ft, sqft"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Unit Cost</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={material.cost}
                      onChange={(e) => updateMaterial(material.id, 'cost', Number(e.target.value))}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="col-span-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeMaterial(material.id)}
                      className="w-full"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <Button type="button" onClick={addMaterial} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Material
              </Button>
            </CardContent>
          </Card>

          {/* Labor */}
          <Card>
            <CardHeader>
              <CardTitle>Labor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="laborHours">Labor Hours</Label>
                  <Input
                    id="laborHours"
                    type="number"
                    step="0.5"
                    value={form.laborHours}
                    onChange={(e) => handleInputChange('laborHours', Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="laborRate">Hourly Rate ($)</Label>
                  <Input
                    id="laborRate"
                    type="number"
                    step="0.01"
                    value={form.laborRate}
                    onChange={(e) => handleInputChange('laborRate', Number(e.target.value))}
                    placeholder="75.00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="notes">Invoice Notes</Label>
              <Textarea
                id="notes"
                value={form.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Additional notes to include on the invoice..."
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Invoice Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Materials:</span>
                <span>${form.materials.reduce((sum, material) => sum + (material.cost * material.quantity), 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Labor:</span>
                <span>${(form.laborHours * form.laborRate).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${(form.materials.reduce((sum, material) => sum + (material.cost * material.quantity), 0) + (form.laborHours * form.laborRate)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7%):</span>
                <span>${form.taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${form.totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="completionDate">Completion Date</Label>
                <Input
                  id="completionDate"
                  type="date"
                  value={form.completionDate}
                  onChange={(e) => handleInputChange('completionDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Generation */}
          <Card>
            <CardHeader>
              <CardTitle>AI Content Generation</CardTitle>
              <CardDescription>
                Generate professional invoice content using AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={generateAIContent}
                disabled={isLoading || !form.clientName || !form.projectType}
                className="w-full"
                variant="outline"
              >
                Generate AI Content
              </Button>

              {aiGeneratedContent && (
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Category:</strong>
                    <Badge variant="secondary" className="ml-2">
                      {aiGeneratedContent.projectCategory}
                    </Badge>
                  </div>
                  {aiGeneratedContent.warrantyNotes && (
                    <div>
                      <strong>Warranty:</strong>
                      <p className="text-gray-600 mt-1">{aiGeneratedContent.warrantyNotes}</p>
                    </div>
                  )}
                  {aiGeneratedContent.maintenanceNotes && (
                    <div>
                      <strong>Maintenance:</strong>
                      <p className="text-gray-600 mt-1">{aiGeneratedContent.maintenanceNotes}</p>
                    </div>
                  )}
                  {aiGeneratedContent.suggestedAddOns.length > 0 && (
                    <div>
                      <strong>Suggested Add-ons:</strong>
                      <ul className="text-gray-600 mt-1 list-disc list-inside">
                        {aiGeneratedContent.suggestedAddOns.map((addon: string, index: number) => (
                          <li key={index}>{addon}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => createInvoice(false)}
                disabled={isLoading || !form.clientName || !form.clientEmail || !form.projectType}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
              <Button
                onClick={() => createInvoice(true)}
                disabled={isLoading || !form.clientName || !form.clientEmail || !form.projectType}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                Create & Send
              </Button>
              <Button
                onClick={previewInvoice}
                disabled={isLoading}
                variant="outline"
                className="w-full"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}