import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Search, Mail, Phone, UserPlus, FileText, DollarSign, Users } from 'lucide-react'

// Mock customer data - in real app this would come from API
const customers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(813) 555-0101',
    totalProjects: 3,
    totalSpent: 15420,
    status: 'active',
    lastProject: 'Custom Deck Installation',
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    email: 'm.rodriguez@email.com',
    phone: '(813) 555-0102',
    totalProjects: 1,
    totalSpent: 8750,
    status: 'active',
    lastProject: 'Kitchen Cabinet Installation',
    joinDate: '2024-02-20'
  },
  {
    id: '3',
    name: 'Jennifer Davis',
    email: 'j.davis@email.com',
    phone: '(813) 555-0103',
    totalProjects: 5,
    totalSpent: 28900,
    status: 'vip',
    lastProject: 'Historic Home Restoration',
    joinDate: '2023-11-08'
  },
  {
    id: '4',
    name: 'Robert Wilson',
    email: 'r.wilson@email.com',
    phone: '(813) 555-0104',
    totalProjects: 2,
    totalSpent: 12300,
    status: 'active',
    lastProject: 'Hurricane Shutters',
    joinDate: '2024-03-12'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'l.thompson@email.com',
    phone: '(813) 555-0105',
    totalProjects: 1,
    totalSpent: 6800,
    status: 'new',
    lastProject: 'Custom Shelving',
    joinDate: '2024-04-05'
  }
]

function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'vip':
      return 'bg-purple-100 text-purple-800'
    case 'new':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your client relationships</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search customers by name, email, or phone..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">Active clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${customers.reduce((sum, customer) => sum + customer.totalSpent, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Lifetime value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Project Value</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(customers.reduce((sum, customer) => sum + customer.totalSpent, 0) / customers.reduce((sum, customer) => sum + customer.totalProjects, 0)).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Per project</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>All your clients and their project history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{customer.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Last project: {customer.lastProject}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>{customer.totalProjects} projects</p>
                    <p className="font-semibold">${customer.totalSpent.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}