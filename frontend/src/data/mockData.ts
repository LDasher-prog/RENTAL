import type { NotificationItem, PaymentRecord, Property, Tenant, MaintenanceRequest, UserProfile } from '../types'

export const currentUser: UserProfile = {
  id: 'user-1',
  name: 'Amina Juma',
  email: 'amina@smartrentals.com',
  role: 'landlord',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  company: 'Smart Rentals',
}

export const properties: Property[] = [
  {
    id: 'prop-1',
    name: 'Azure Heights',
    address: '123 Riverside Ave, Nairobi',
    manager: 'Amina Juma',
    description: 'Luxury apartments with modern amenities and flexible leasing.',
    imageUrl: 'https://images.unsplash.com/photo-1560184897-6f88dce45b13?auto=format&fit=crop&w=1200&q=80',
    units: [
      { id: 'unit-1', name: 'Block A - 101', status: 'occupied', rent: 25000, tenantId: 'tenant-1' },
      { id: 'unit-2', name: 'Block B - 204', status: 'vacant', rent: 22000 },
      { id: 'unit-3', name: 'Block C - 306', status: 'maintenance', rent: 27000 },
    ],
  },
  {
    id: 'prop-2',
    name: 'Emerald Plaza',
    address: '89 Westlands Road, Nairobi',
    manager: 'Nina Mwangi',
    description: 'High-rise apartments close to business and retail hubs.',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    units: [
      { id: 'unit-4', name: 'Tower 2 - 501', status: 'occupied', rent: 32000, tenantId: 'tenant-2' },
      { id: 'unit-5', name: 'Tower 1 - 102', status: 'vacant', rent: 28000 },
      { id: 'unit-6', name: 'Tower 3 - 704', status: 'occupied', rent: 35000, tenantId: 'tenant-3' },
    ],
  },
]

export const tenants: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'Samuel Otieno',
    email: 'samuel.otieno@gmail.com',
    phone: '+254712345678',
    unit: 'Block A - 101',
    moveInDate: '2024-08-01',
    status: 'active',
    paymentStatus: 'paid',
    emergencyContact: 'Grace Otieno (+254700123456)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'tenant-2',
    name: 'Faith Karanja',
    email: 'faith.karanja@example.com',
    phone: '+254711987654',
    unit: 'Tower 2 - 501',
    moveInDate: '2025-02-15',
    status: 'active',
    paymentStatus: 'due',
    emergencyContact: 'John Karanja (+254733987654)',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'tenant-3',
    name: 'Moses Njoroge',
    email: 'moses.njoroge@tenant.com',
    phone: '+254723456789',
    unit: 'Tower 3 - 704',
    moveInDate: '2024-11-10',
    status: 'active',
    paymentStatus: 'overdue',
    emergencyContact: 'Ruth Njoroge (+254712123456)',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
  },
]

export const payments: PaymentRecord[] = [
  {
    id: 'pay-1',
    tenantName: 'Samuel Otieno',
    unit: 'Block A - 101',
    amount: 25000,
    date: '2025-05-02',
    status: 'completed',
    method: 'mpesa',
    transactionId: 'MPESA12345678',
  },
  {
    id: 'pay-2',
    tenantName: 'Faith Karanja',
    unit: 'Tower 2 - 501',
    amount: 28000,
    date: '2025-05-01',
    status: 'pending',
    method: 'bank',
    transactionId: 'BANK987654321',
  },
  {
    id: 'pay-3',
    tenantName: 'Moses Njoroge',
    unit: 'Tower 3 - 704',
    amount: 35000,
    date: '2025-04-30',
    status: 'failed',
    method: 'cash',
    transactionId: 'CASH998877',
  },
]

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: 'mt-1',
    title: 'Leaking bathroom sink',
    unit: 'Block A - 101',
    priority: 'high',
    status: 'pending',
    submittedBy: 'Samuel Otieno',
    createdAt: '2025-05-02',
    description: 'The sink in the bathroom has been leaking for two days and needs urgent service.',
  },
  {
    id: 'mt-2',
    title: 'Broken balcony railing',
    unit: 'Tower 1 - 102',
    priority: 'medium',
    status: 'in-progress',
    submittedBy: 'Faith Karanja',
    createdAt: '2025-04-28',
    description: 'The balcony railing is loose and requires a maintenance inspection.',
  },
]

export const notifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New rent payment received',
    description: 'Samuel Otieno paid rent for Block A - 101 via Mpesa.',
    type: 'payment',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 'notif-2',
    title: 'Maintenance request submitted',
    description: 'A new issue has been created for Tower 1 - 102.',
    type: 'maintenance',
    time: '5 hours ago',
    unread: false,
  },
  {
    id: 'notif-3',
    title: 'System check complete',
    description: 'All services are running normally.',
    type: 'system',
    time: '1 day ago',
    unread: false,
  },
]
