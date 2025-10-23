'use client';

import { useState, useEffect } from 'react';
import { useProtectedAdmin } from '@/lib/admin-auth';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  FileText,
  Plus,
  Download,
  Send,
  Calendar,
  DollarSign,
  User,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface OfflineProject {
  id: string;
  clientName: string;
  clientEmail: string;
  projectType: string;
  projectDescription: string;
  materials: string[];
  laborHours: number;
  materialCost: number;
  laborRate: number;
  totalAmount: number;
  completionDate: string;
  location: string;
  specialRequests?: string;
  warrantyRequired: boolean;
  isHurricaneRelated: boolean;
  status: 'pending' | 'invoiced' | 'paid';
  createdAt: string;
}

export default function AdminDashboard() {
  const { isAuthenticated, isLoading } = useProtectedAdmin();
  const [projects, setProjects] = useState<OfflineProject[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    projectType: '',
    projectDescription: '',
    materials: '',
    laborHours: '',
    materialCost: '',
    laborRate: '75',
    completionDate: '',
    location: 'orange-county',
    specialRequests: '',
    warrantyRequired: false,
    isHurricaneRelated: false
  });

  const projectTypes = [
    'Deck Construction',
    'Pergola Construction',
    'Crown Molding Installation',
    'Custom Cabinetry',
    'Interior Trim Work',
    'Structural Framing',
    'Room Addition',
    'Hurricane-Resistant Upgrade',
    'General Carpentry',
    'Historic Restoration'
  ];

  const locations = [
    { value: 'orange-county', label: 'Orange County' },
    { value: 'osceola-county', label: 'Osceola County' },
    { value: 'seminole-county', label: 'Seminole County' },
    { value: 'hillsborough-county', label: 'Hillsborough County' },
    { value: 'pinellas-county', label: 'Pinellas County' },
    { value: 'miami-dade', label: 'Miami-Dade County' },
    { value: 'broward', label: 'Broward County' },
    { value: 'palm-beach', label: 'Palm Beach County' }
  ];

  useEffect(() => {
    // Load projects from localStorage or API
    const savedProjects = localStorage.getItem('offlineProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  const saveProjects = (newProjects: OfflineProject[]) => {
    setProjects(newProjects);
    localStorage.setItem('offlineProjects', JSON.stringify(newProjects));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const materials = formData.materials.split(',').map(m => m.trim()).filter(Boolean);
    const laborHours = parseFloat(formData.laborHours) || 0;
    const materialCost = parseFloat(formData.materialCost) || 0;
    const laborRate = parseFloat(formData.laborRate) || 75;
    const laborCost = laborHours * laborRate;
    const totalAmount = materialCost + laborCost;

    const newProject: OfflineProject = {
      id: Date.now().toString(),
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      projectType: formData.projectType,
      projectDescription: formData.projectDescription,
      materials,
      laborHours,
      materialCost,
      laborRate,
      totalAmount,
      completionDate: formData.completionDate,
      location: formData.location,
      specialRequests: formData.specialRequests,
      warrantyRequired: formData.warrantyRequired,
      isHurricaneRelated: formData.isHurricaneRelated,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);

    // Reset form
    setFormData({
      clientName: '',
      clientEmail: '',
      projectType: '',
      projectDescription: '',
      materials: '',
      laborHours: '',
      materialCost: '',
      laborRate: '75',
      completionDate: '',
      location: 'orange-county',
      specialRequests: '',
      warrantyRequired: false,
      isHurricaneRelated: false
    });

    setShowForm(false);
  };

  const totalRevenue = projects.reduce((sum, p) => sum + p.totalAmount, 0);
  const pendingInvoices = projects.filter(p => p.status === 'pending').length;
  const completedProjects = projects.filter(p => p.status === 'invoiced' || p.status === 'paid').length;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <img
              src="/ORIGINAL OAK CARPENTRY LOGO.png"
              alt="Original Oak Carpentry Logo"
              className="h-20 w-20 object-contain"
            />
            <h1 className="text-3xl font-bold">Original Oak Carpentry - Admin Dashboard</h1>
          </div>
          <p className="mt-2 opacity-90">Manage offline projects and generate AI-powered invoices</p>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingInvoices}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedProjects}</div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Project */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Offline Projects</h2>
          <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add New Project
          </Button>
        </div>

        {/* Project Form */}
        {showForm && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Add Offline Project</CardTitle>
              <CardDescription>Enter project details to generate AI-powered invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="clientName">Client Name *</Label>
                    <Input
                      id="clientName"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientEmail">Client Email *</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      required
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => setFormData({...formData, projectType: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => setFormData({...formData, location: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc.value} value={loc.value}>{loc.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="projectDescription">Project Description *</Label>
                  <Textarea
                    id="projectDescription"
                    required
                    rows={3}
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="materials">Materials Used *</Label>
                  <Textarea
                    id="materials"
                    required
                    placeholder="List materials separated by commas"
                    value={formData.materials}
                    onChange={(e) => setFormData({...formData, materials: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="laborHours">Labor Hours *</Label>
                    <Input
                      id="laborHours"
                      type="number"
                      step="0.5"
                      required
                      value={formData.laborHours}
                      onChange={(e) => setFormData({...formData, laborHours: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="materialCost">Material Cost *</Label>
                    <Input
                      id="materialCost"
                      type="number"
                      step="0.01"
                      required
                      value={formData.materialCost}
                      onChange={(e) => setFormData({...formData, materialCost: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="laborRate">Labor Rate/Hour *</Label>
                    <Input
                      id="laborRate"
                      type="number"
                      step="0.01"
                      required
                      value={formData.laborRate}
                      onChange={(e) => setFormData({...formData, laborRate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="completionDate">Completion Date *</Label>
                    <Input
                      id="completionDate"
                      type="date"
                      required
                      value={formData.completionDate}
                      onChange={(e) => setFormData({...formData, completionDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special considerations or client requests"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="warrantyRequired"
                      checked={formData.warrantyRequired}
                      onChange={(e) => setFormData({...formData, warrantyRequired: e.target.checked})}
                    />
                    <Label htmlFor="warrantyRequired">Warranty Required</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isHurricaneRelated"
                      checked={formData.isHurricaneRelated}
                      onChange={(e) => setFormData({...formData, isHurricaneRelated: e.target.checked})}
                    />
                    <Label htmlFor="isHurricaneRelated">Hurricane Related</Label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Save Project
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Projects Table */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Project List</CardTitle>
            <CardDescription>Manage and invoice your offline projects</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Project Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{project.clientName}</div>
                        <div className="text-sm text-muted-foreground">{project.clientEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{project.projectType}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {locations.find(l => l.value === project.location)?.label}
                      </div>
                    </TableCell>
                    <TableCell>${project.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(project.completionDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'invoiced'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status === 'paid' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {project.status === 'invoiced' && <FileText className="h-3 w-3 mr-1" />}
                        {project.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                        {project.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {projects.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No offline projects yet. Add your first project to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}