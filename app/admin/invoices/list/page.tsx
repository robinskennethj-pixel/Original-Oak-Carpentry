'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Search,
  Filter,
  Download,
  Eye,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Plus,
  BarChart3
} from 'lucide-react'

interface Invoice {
  id: string
  clientName: string
  clientEmail: string
  projectType: string
  amount: number
  status: 'draft' | 'open' | 'paid' | 'overdue' | 'uncollectible' | 'void'
  createdDate: string
  dueDate: string
  invoiceUrl?: string
  invoicePdf?: string
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'open', label: 'Open' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'uncollectible', label: 'Uncollectible' },
  { value: 'void', label: 'Void' }
]

const PROJECT_TYPES = [
  { value: 'all', label: 'All Projects' },
  { value: 'Custom Deck Installation', label: 'Deck Installation' },
  { value: 'Interior Trim Work', label: 'Trim Work' },
  { value: 'Cabinet Installation', label: 'Cabinet Installation' },
  { value: 'Hurricane Repair', label: 'Hurricane Repair' },
  { value: 'Outdoor Living Space', label: 'Outdoor Living' },
  { value: 'Finish Carpentry', label: 'Finish Carpentry' },
  { value: 'Repair & Restoration', label: 'Repair & Restoration' },
  { value: 'Custom Furniture', label: 'Custom Furniture' },
  { value: 'Flooring Installation', label: 'Flooring' }
]

export default function InvoiceManagementList() {
  const router = useRouter()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [projectFilter, setProjectFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentInvoices = filteredInvoices.slice(startIndex, endIndex)

  useEffect(() => {
    fetchInvoices()
  }, [])

  useEffect(() => {
    filterInvoices()
  }, [invoices, searchTerm, statusFilter, projectFilter])

  const fetchInvoices = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/invoices/list')
      const data = await response.json()

      if (data.success) {
        setInvoices(data.invoices)
      } else {
        console.error('Failed to fetch invoices:', data.error)
      }
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterInvoices = () => {
    let filtered = invoices

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(invoice =>
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.projectType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === statusFilter)
    }

    // Filter by project type
    if (projectFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.projectType === projectFilter)
    }

    setFilteredInvoices(filtered)
    setCurrentPage(1)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200'
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200'
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'uncollectible': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'void': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'open': return <Clock className="w-4 h-4 text-blue-600" />
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'draft': return <FileText className="w-4 h-4 text-gray-600" />
      default: return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const viewInvoice = (invoiceId: string) => {
    window.open(`/admin/invoices/${invoiceId}`, '_blank')
  }

  const downloadInvoice = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/download`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `invoice-${invoiceId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading invoice:', error)
    }
  }

  const sendReminder = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/reminder`, {
        method: 'POST'
      })
      const data = await response.json()

      if (data.success) {
        alert('Reminder sent successfully!')
      } else {
        alert('Failed to send reminder')
      }
    } catch (error) {
      console.error('Error sending reminder:', error)
      alert('Error sending reminder')
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invoices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-forest-green">Invoice Management</h1>
          <div className="flex gap-2">
            <Button onClick={() => router.push('/admin/invoices/analytics')} variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button onClick={() => router.push('/admin/invoices')} className="bg-forest-green hover:bg-forest-green/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Invoice
            </Button>
          </div>
        </div>
        <p className="text-gray-600">Manage and track all your invoices</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPES.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="25">25 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredInvoices.length)} of {filteredInvoices.length} invoices
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Project Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{invoice.clientName}</p>
                      <p className="text-sm text-gray-500">{invoice.clientEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>{invoice.projectType}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(invoice.status)}
                        <span className="capitalize">{invoice.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewInvoice(invoice.id)}
                        title="View Invoice"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadInvoice(invoice.id)}
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      {invoice.status === 'open' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => sendReminder(invoice.id)}
                          title="Send Reminder"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No invoices found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNum)}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}