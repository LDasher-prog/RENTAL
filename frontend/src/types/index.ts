export type UserRole = 'landlord' | 'caretaker' | 'tenant'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  company?: string
}

export interface PropertyUnit {
  id: string
  name: string
  status: 'occupied' | 'vacant' | 'maintenance'
  rent: number
  tenantId?: string
}

export interface Property {
  id: string
  name: string
  address: string
  manager: string
  units: PropertyUnit[]
  description: string
  imageUrl?: string
}

export interface Tenant {
  id: string
  name: string
  email: string
  phone: string
  unit: string
  moveInDate: string
  moveOutDate?: string
  status: 'active' | 'inactive'
  paymentStatus: 'paid' | 'due' | 'overdue'
  emergencyContact: string
  avatar?: string
}

export interface PaymentRecord {
  id: string
  tenantName: string
  unit: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'failed'
  method: 'cash' | 'bank' | 'mpesa'
  transactionId: string
}

export interface MaintenanceRequest {
  id: string
  title: string
  unit: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in-progress' | 'resolved'
  submittedBy: string
  createdAt: string
  description: string
}

export interface NotificationItem {
  id: string
  title: string
  description: string
  type: 'payment' | 'maintenance' | 'system'
  time: string
  unread: boolean
}
