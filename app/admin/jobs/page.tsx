'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  MapPin,
  DollarSign,
  Briefcase,
  Plus,
  Filter,
  Edit,
  Trash2,
  Phone,
  Mail,
  FileText,
  Hammer,
  Home,
  Wrench,
  TrendingUp
} from "lucide-react"

interface Job {
  id: string;
  jobNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectType: string;
  projectDescription: string;
  location: string;
  address: string;
  jobSource: 'online' | 'offline' | 'referral' | 'repeat';
  status: 'lead' | 'quoted' | 'scheduled' | 'in-progress' | 'completed' | 'invoiced' | 'paid' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedValue: number;
  actualValue: number;
  startDate: string;
  endDate: string;
  assignedCrew: string[];
  materials: string[];
  specialRequirements: string;
  isHurricaneRelated: boolean;
  requiresPermits: boolean;
  weatherDependent: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export default function JobManagementDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    projectType: '',
    projectDescription: '',
    location: 'orange-county',
    address: '',
    jobSource: 'online' as const,
    status: 'lead' as const,
    priority: 'medium' as const,
    estimatedValue: '',
    actualValue: '',
    startDate: '',
    endDate: '',
    assignedCrew: '',
    materials: '',
    specialRequirements: '',
    isHurricaneRelated: false,
    requiresPermits: false,
    weatherDependent: false,
    notes: ''
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
    'Historic Restoration',
    'Storm Damage Repair',
    'Maintenance & Repair'
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

  const crewMembers = [
    'Master Carpenter',
    'Senior Carpenter',
    'Carpenter Assistant',
    'Apprentice',
    'Project Manager'
  ];

  useEffect(() => {
    // Load jobs from localStorage or API
    const savedJobs = localStorage.getItem('carpentryJobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      // Initialize with sample data
      const sampleJobs: Job[] = [
        {
          id: '1',
          jobNumber: 'OAK-2024-001',
          clientName: 'Sarah Martinez',
          clientEmail: 'sarah.martinez@email.com',
          clientPhone: '(407) 555-0101',
          projectType: 'Custom Cabinetry',
          projectDescription: 'Kitchen renovation with custom oak cabinets and crown molding',
          location: 'orange-county',
          address: '123 Oak Street, Orlando, FL 32801',
          jobSource: 'online',
          status: 'in-progress',
          priority: 'high',
          estimatedValue: 12500,
          actualValue: 0,
          startDate: '2024-01-15',
          endDate: '2024-01-25',
          assignedCrew: ['Master Carpenter', 'Senior Carpenter'],
          materials: ['Red Oak', 'Premium Hardware', 'Crown Molding'],
          specialRequirements: 'Soft-close drawers, custom finish',
          isHurricaneRelated: false,
          requiresPermits: false,
          weatherDependent: false,
          notes: 'Client very particular about finish quality',
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-15T08:00:00Z'
        },
        {
          id: '2',
          jobNumber: 'OAK-2024-002',
          clientName: 'Robert Chen',
          clientEmail: 'robert.chen@email.com',
          clientPhone: '(813) 555-0102',
          projectType: 'Hurricane-Resistant Upgrade',
          projectDescription: 'Install hurricane-resistant deck with reinforced connections',
          location: 'hillsborough-county',
          address: '456 Palm Avenue, Tampa, FL 33602',
          jobSource: 'referral',
          status: 'scheduled',
          priority: 'urgent',
          estimatedValue: 8500,
          actualValue: 0,
          startDate: '2024-01-20',
          endDate: '2024-01-30',
          assignedCrew: ['Master Carpenter', 'Carpenter Assistant'],
          materials: ['Pressure-Treated Lumber', 'Hurricane Clips', 'Composite Decking'],
          specialRequirements: 'Must meet new hurricane codes',
          isHurricaneRelated: true,
          requiresPermits: true,
          weatherDependent: true,
          notes: 'Permit approved, waiting for weather window',
          createdAt: '2024-01-12T14:30:00Z',
          updatedAt: '2024-01-18T09:15:00Z'
        },
        {
          id: '3',
          jobNumber: 'OAK-2024-003',
          clientName: 'Jennifer Lopez',
          clientEmail: 'jennifer.lopez@email.com',
          clientPhone: '(305) 555-0103',
          projectType: 'Historic Restoration',
          projectDescription: 'Restore original trim work in 1920s Mediterranean home',
          location: 'miami-dade',
          address: '789 Coral Way, Miami, FL 33134',
          jobSource: 'offline',
          status: 'quoted',
          priority: 'medium',
          estimatedValue: 15000,
          actualValue: 0,
          startDate: '2024-02-01',
          endDate: '2024-02-15',
          assignedCrew: ['Master Carpenter'],
          materials: ['Mahogany', 'Traditional Hardware', 'Period-appropriate Finish'],
          specialRequirements: 'Must maintain historical accuracy',
          isHurricaneRelated: false,
          requiresPermits: true,
          weatherDependent: false,
          notes: 'Historic preservation board approval needed',
          createdAt: '2024-01-08T16:45:00Z',
          updatedAt: '2024-01-16T11:30:00Z'
        }
      ];
      setJobs(sampleJobs);
      localStorage.setItem('carpentryJobs', JSON.stringify(sampleJobs));
    }
  }, []);

  const saveJobs = (newJobs: Job[]) => {
    setJobs(newJobs);
    localStorage.setItem('carpentryJobs', JSON.stringify(newJobs));
  };

  const generateJobNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const sequence = String(jobs.length + 1).padStart(3, '0');
    return `OAK-${year}-${sequence}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const materials = formData.materials.split(',').map(m => m.trim()).filter(Boolean);
    const assignedCrew = formData.assignedCrew.split(',').map(c => c.trim()).filter(Boolean);
    const estimatedValue = parseFloat(formData.estimatedValue) || 0;
    const actualValue = parseFloat(formData.actualValue) || 0;

    const newJob: Job = {
      id: Date.now().toString(),
      jobNumber: generateJobNumber(),
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      projectType: formData.projectType,
      projectDescription: formData.projectDescription,
      location: formData.location,
      address: formData.address,
      jobSource: formData.jobSource,
      status: formData.status,
      priority: formData.priority,
      estimatedValue,
      actualValue,
      startDate: formData.startDate,
      endDate: formData.endDate,
      assignedCrew,
      materials,
      specialRequirements: formData.specialRequirements,
      isHurricaneRelated: formData.isHurricaneRelated,
      requiresPermits: formData.requiresPermits,
      weatherDependent: formData.weatherDependent,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isEditing && editingJob) {
      const updatedJobs = jobs.map(job =>
        job.id === editingJob.id
          ? { ...newJob, id: editingJob.id, jobNumber: editingJob.jobNumber }
          : job
      );
      saveJobs(updatedJobs);
      setIsEditing(false);
      setEditingJob(null);
    } else {
      const updatedJobs = [...jobs, newJob];
      saveJobs(updatedJobs);
    }

    // Reset form
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      projectType: '',
      projectDescription: '',
      location: 'orange-county',
      address: '',
      jobSource: 'online',
      status: 'lead',
      priority: 'medium',
      estimatedValue: '',
      actualValue: '',
      startDate: '',
      endDate: '',
      assignedCrew: '',
      materials: '',
      specialRequirements: '',
      isHurricaneRelated: false,
      requiresPermits: false,
      weatherDependent: false,
      notes: ''
    });

    setShowForm(false);
  };

  const editJob = (job: Job) => {
    setFormData({
      clientName: job.clientName,
      clientEmail: job.clientEmail,
      clientPhone: job.clientPhone,
      projectType: job.projectType,
      projectDescription: job.projectDescription,
      location: job.location,
      address: job.address,
      jobSource: job.jobSource,
      status: job.status,
      priority: job.priority,
      estimatedValue: job.estimatedValue.toString(),
      actualValue: job.actualValue.toString(),
      startDate: job.startDate,
      endDate: job.endDate,
      assignedCrew: job.assignedCrew.join(', '),
      materials: job.materials.join(', '),
      specialRequirements: job.specialRequirements,
      isHurricaneRelated: job.isHurricaneRelated,
      requiresPermits: job.requiresPermits,
      weatherDependent: job.weatherDependent,
      notes: job.notes
    });
    setEditingJob(job);
    setIsEditing(true);
    setShowForm(true);
  };

  const deleteJob = (jobId: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      saveJobs(updatedJobs);
    }
  };

  const updateJobStatus = (jobId: string, newStatus: Job['status']) => {
    const updatedJobs = jobs.map(job =>
      job.id === jobId
        ? { ...job, status: newStatus, updatedAt: new Date().toISOString() }
        : job
    );
    saveJobs(updatedJobs);
  };

  const getStatusColor = (status: Job['status']) => {
    const colors = {
      'lead': 'bg-gray-100 text-gray-800',
      'quoted': 'bg-blue-100 text-blue-800',
      'scheduled': 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-orange-100 text-orange-800',
      'completed': 'bg-green-100 text-green-800',
      'invoiced': 'bg-purple-100 text-purple-800',
      'paid': 'bg-emerald-100 text-emerald-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Job['priority']) => {
    const colors = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-blue-100 text-blue-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority];
  };

  const filteredJobs = jobs.filter(job => {
    if (filterStatus !== 'all' && job.status !== filterStatus) return false;
    if (filterSource !== 'all' && job.jobSource !== filterSource) return false;
    if (filterPriority !== 'all' && job.priority !== filterPriority) return false;
    return true;
  });

  const totalRevenue = filteredJobs.reduce((sum, job) => sum + job.actualValue, 0);
  const totalEstimated = filteredJobs.reduce((sum, job) => sum + job.estimatedValue, 0);
  const activeJobs = filteredJobs.filter(job => ['scheduled', 'in-progress'].includes(job.status)).length;
  const hurricaneJobs = filteredJobs.filter(job => job.isHurricaneRelated).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
          <img
            src="/ORIGINAL OAK CARPENTRY - FULL-WEBSITE-LOGO.png"
            alt="Original Oak Carpentry Logo"
            className="h-12 w-auto object-contain"
          />
            <h1 className="text-3xl font-bold">Job Management Dashboard</h1>
          </div>
          <p className="mt-2 opacity-90">Track and manage all carpentry projects - online & offline</p>
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
              <p className="text-xs text-muted-foreground">{filteredJobs.length} jobs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalEstimated.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Estimated value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeJobs}</div>
              <p className="text-xs text-muted-foreground">Scheduled & in-progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hurricane Jobs</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hurricaneJobs}</div>
              <p className="text-xs text-muted-foreground">Storm-related work</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Add Button */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="lead">Leads</SelectItem>
                <SelectItem value="quoted">Quoted</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="invoiced">Invoiced</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="repeat">Repeat Client</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={() => {
            setIsEditing(false);
            setEditingJob(null);
            setShowForm(true);
          }} className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Job
          </Button>
        </div>

        {/* Job Form */}
        {showForm && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Job' : 'Add New Job'}</CardTitle>
              <CardDescription>Track carpentry projects from lead to completion</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Client Information */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="clientName">Client Name *</Label>
                    <Input id="clientName" required value={formData.clientName} onChange={(e) => setFormData({...formData, clientName: e.target.value})} />
                  </div>
                  <div>
                    <Label htmlFor="clientEmail">Client Email *</Label>
                    <Input id="clientEmail" type="email" required value={formData.clientEmail} onChange={(e) => setFormData({...formData, clientEmail: e.target.value})} />
                  </div>
                  <div>
                    <Label htmlFor="clientPhone">Client Phone *</Label>
                    <Input id="clientPhone" type="tel" required value={formData.clientPhone} onChange={(e) => setFormData({...formData, clientPhone: e.target.value})} />
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select value={formData.projectType} onValueChange={(value) => setFormData({...formData, projectType: value})} required>
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
                    <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})} required>
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
                  <Textarea id="projectDescription" required rows={3} value={formData.projectDescription} onChange={(e) => setFormData({...formData, projectDescription: e.target.value})} />
                </div>

                <div>
                  <Label htmlFor="address">Project Address *</Label>
                  <Input id="address" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>

                {/* Job Details */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <Label htmlFor="jobSource">Job Source *</Label>
                    <Select value={formData.jobSource} onValueChange={(value: any) => setFormData({...formData, jobSource: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online/Website</SelectItem>
                        <SelectItem value="offline">Offline/Phone</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="repeat">Repeat Client</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status *</Label>
                    <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lead">Lead</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="invoiced">Invoiced</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority *</Label>
                    <Select value={formData.priority} onValueChange={(value: any) => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="estimatedValue">Estimated Value *</Label>
                    <Input id="estimatedValue" type="number" step="0.01" value={formData.estimatedValue} onChange={(e) => setFormData({...formData, estimatedValue: e.target.value})} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input id="startDate" type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input id="endDate" type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="assignedCrew">Assigned Crew</Label>
                  <Input id="assignedCrew" placeholder="Separate names with commas" value={formData.assignedCrew} onChange={(e) => setFormData({...formData, assignedCrew: e.target.value})} />
                </div>

                <div>
                  <Label htmlFor="materials">Materials</Label>
                  <Input id="materials" placeholder="Separate materials with commas" value={formData.materials} onChange={(e) => setFormData({...formData, materials: e.target.value})} />
                </div>

                <div>
                  <Label htmlFor="specialRequirements">Special Requirements</Label>
                  <Textarea id="specialRequirements" rows={2} value={formData.specialRequirements} onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})} />
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" rows={3} value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
                </div>

                {/* Special Flags */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="isHurricaneRelated" checked={formData.isHurricaneRelated} onChange={(e) => setFormData({...formData, isHurricaneRelated: e.target.checked})} />
                    <Label htmlFor="isHurricaneRelated">Hurricane Related</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="requiresPermits" checked={formData.requiresPermits} onChange={(e) => setFormData({...formData, requiresPermits: e.target.checked})} />
                    <Label htmlFor="requiresPermits">Requires Permits</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="weatherDependent" checked={formData.weatherDependent} onChange={(e) => setFormData({...formData, weatherDependent: e.target.checked})} />
                    <Label htmlFor="weatherDependent">Weather Dependent</Label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    {isEditing ? 'Update Job' : 'Save Job'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => {
                    setShowForm(false);
                    setIsEditing(false);
                    setEditingJob(null);
                  }} >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Jobs Table */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Job List</CardTitle>
            <CardDescription>Manage all carpentry projects from leads to completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Project Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.jobNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{job.clientName}</div>
                          <div className="text-sm text-muted-foreground">
                            <Phone className="inline h-3 w-3 mr-1" />{job.clientPhone}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <Mail className="inline h-3 w-3 mr-1" />{job.clientEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {job.isHurricaneRelated && <AlertCircle className="h-4 w-4 text-orange-500" title="Hurricane Related" />}
                          {job.projectType}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {locations.find(l => l.value === job.location)?.label}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge className={`${getStatusColor(job.status)} text-xs`}>{job.status}</Badge>
                          <div className="flex gap-1">
                            {job.requiresPermits && <Badge variant="outline" className="text-xs">Permit</Badge>}
                            {job.weatherDependent && <Badge variant="outline" className="text-xs">Weather</Badge>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getPriorityColor(job.priority)} text-xs`}>{job.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-right">
                          <div className="font-medium">${job.estimatedValue.toLocaleString()}</div>
                          {job.actualValue > 0 && (
                            <div className="text-sm text-muted-foreground">Actual: ${job.actualValue.toLocaleString()}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {new Date(job.startDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {new Date(job.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{job.jobSource}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => editJob(job)} title="Edit">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => deleteJob(job.id)} title="Delete">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredJobs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center text-muted-foreground py-8">
                        No jobs found matching your filters. Add a new job to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}