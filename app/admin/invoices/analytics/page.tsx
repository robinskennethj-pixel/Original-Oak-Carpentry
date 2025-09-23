'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import {
  DollarSign,
  TrendingUp,
  Users,
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

interface InvoiceAnalytics {
  totalInvoices: number
  totalRevenue: number
  paidInvoices: number
  pendingInvoices: number
  overdueInvoices: number
  recentRevenue: number
  averageInvoiceValue: number
  conversionRate: number
}

interface ProjectCategoryData {
  category: string
  count: number
  revenue: number
  percentage: number
}

interface MonthlyData {
  month: string
  revenue: number
  invoices: number
}

interface TopClient {
  name: string
  email: string
  totalSpent: number
  invoiceCount: number
  lastInvoiceDate: string
}

const CATEGORY_COLORS = {
  'deck': '#2D5016',
  'trim-work': '#B85C38',
  'cabinet-installation': '#D4AF37',
  'hurricane-repair': '#8B4513',
  'outdoor-living': '#228B22',
  'finish-carpentry': '#CD853F',
  'repair-restoration': '#A0522D',
  'custom-furniture': '#DEB887',
  'flooring': '#F4A460',
  'other': '#708090'
}

export default function InvoiceAnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<InvoiceAnalytics>({
    totalInvoices: 0,
    totalRevenue: 0,
    paidInvoices: 0,
    pendingInvoices: 0,
    overdueInvoices: 0,
    recentRevenue: 0,
    averageInvoiceValue: 0,
    conversionRate: 0
  })

  const [categoryData, setCategoryData] = useState<ProjectCategoryData[]>([])
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [topClients, setTopClients] = useState<TopClient[]>([])
  const [recentInvoices, setRecentInvoices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true)

      // Fetch analytics data
      const [analyticsResponse, categoryResponse, monthlyResponse, clientsResponse, recentResponse] = await Promise.all([
        fetch(`/api/invoices/analytics?timeRange=${timeRange}`),
        fetch(`/api/invoices/analytics/categories?timeRange=${timeRange}`),
        fetch(`/api/invoices/analytics/monthly?timeRange=${timeRange}`),
        fetch(`/api/invoices/analytics/top-clients?timeRange=${timeRange}`),
        fetch('/api/invoices/recent?limit=10')
      ])

      const analyticsData = await analyticsResponse.json()
      const categoryData = await categoryResponse.json()
      const monthlyData = await monthlyResponse.json()
      const clientsData = await clientsResponse.json()
      const recentData = await recentResponse.json()

      if (analyticsData.success) setAnalytics(analyticsData.data)
      if (categoryData.success) setCategoryData(categoryData.data)
      if (monthlyData.success) setMonthlyData(monthlyData.data)
      if (clientsData.success) setTopClients(clientsData.data)
      if (recentData.success) setRecentInvoices(recentData.data)

    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'open': return 'bg-blue-100 text-blue-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'open': return <Clock className="w-4 h-4 text-blue-600" />
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-forest-green">Invoice Analytics</h1>
          <div className="flex gap-2">
            <Button
              variant={timeRange === '7' ? 'default' : 'outline'}
              onClick={() => setTimeRange('7')}
              size="sm"
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === '30' ? 'default' : 'outline'}
              onClick={() => setTimeRange('30')}
              size="sm"
            >
              30 Days
            </Button>
            <Button
              variant={timeRange === '90' ? 'default' : 'outline'}
              onClick={() => setTimeRange('90')}
              size="sm"
            >
              90 Days
            </Button>
            <Button
              variant={timeRange === '365' ? 'default' : 'outline'}
              onClick={() => setTimeRange('365')}
              size="sm"
            >
              1 Year
            </Button>
          </div>
        </div>
        <p className="text-gray-600">Track your invoice performance and revenue analytics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest-green">{formatCurrency(analytics.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rust-orange">{formatCurrency(analytics.recentRevenue)}</div>
            <p className="text-xs text-muted-foreground">Last {timeRange} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalInvoices}</div>
            <p className="text-xs text-muted-foreground">{analytics.paidInvoices} paid, {analytics.pendingInvoices} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Invoice Value</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.averageInvoiceValue)}</div>
            <p className="text-xs text-muted-foreground">Per invoice</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line type="monotone" dataKey="revenue" stroke="#2D5016" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Project Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ category, percentage }) => `${category} (${percentage.toFixed(1)}%)`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.category as keyof typeof CATEGORY_COLORS] || '#8884d8'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} projects`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Monthly Invoices */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Invoices & Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="invoices" fill="#B85C38" name="Invoices" />
                <Bar yAxisId="right" dataKey="revenue" fill="#2D5016" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((category) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[category.category as keyof typeof CATEGORY_COLORS] || '#8884d8' }}
                    />
                    <span className="text-sm font-medium capitalize">{category.category.replace('-', ' ')}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(category.revenue)}</div>
                    <div className="text-xs text-gray-500">{category.count} projects</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Top Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClients.map((client, index) => (
                <div key={client.email} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-forest-green text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(client.totalSpent)}</p>
                    <p className="text-sm text-gray-500">{client.invoiceCount} invoices</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(invoice.status)}
                    <div>
                      <p className="font-medium">{invoice.clientName}</p>
                      <p className="text-sm text-gray-500">{invoice.projectType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(invoice.amount)}</p>
                    <Badge variant="outline" className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Paid Invoices</p>
                <p className="text-2xl font-bold text-green-900">{analytics.paidInvoices}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Pending Invoices</p>
                <p className="text-2xl font-bold text-blue-900">{analytics.pendingInvoices}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Overdue Invoices</p>
                <p className="text-2xl font-bold text-red-900">{analytics.overdueInvoices}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{formatPercentage(analytics.conversionRate)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}