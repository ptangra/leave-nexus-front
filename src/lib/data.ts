// Dummy data for the vacation management system
// In a real application, this would come from API calls

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'manager' | 'admin';
  department: string;
  avatar?: string;
  totalLeave: number;
  usedLeave: number;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
}

export interface Notification {
  id: string;
  type: 'request' | 'approval' | 'rejection' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  userId: string;
}

// Current user (would come from authentication)
export const currentUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  role: 'employee',
  department: 'Marketing',
  avatar: 'SJ',
  totalLeave: 25,
  usedLeave: 12
};

// Sample users
export const users: User[] = [
  currentUser,
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'manager',
    department: 'Engineering',
    avatar: 'MC',
    totalLeave: 25,
    usedLeave: 8
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    role: 'employee',
    department: 'Marketing',
    avatar: 'ER',
    totalLeave: 22,
    usedLeave: 15
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'david.thompson@company.com',
    role: 'admin',
    department: 'HR',
    avatar: 'DT',
    totalLeave: 25,
    usedLeave: 5
  }
];

// Sample leave requests
export const leaveRequests: LeaveRequest[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Johnson',
    type: 'annual',
    startDate: '2024-12-20',
    endDate: '2024-12-27',
    days: 6,
    status: 'pending',
    reason: 'Christmas holiday with family'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Michael Chen',
    type: 'personal',
    startDate: '2024-09-15',
    endDate: '2024-09-16',
    days: 2,
    status: 'approved',
    reason: 'Medical appointment',
    approvedBy: 'David Thompson',
    approvedAt: '2024-09-10'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Emily Rodriguez',
    type: 'sick',
    startDate: '2024-08-28',
    endDate: '2024-08-30',
    days: 3,
    status: 'approved',
    reason: 'Flu symptoms',
    approvedBy: 'David Thompson',
    approvedAt: '2024-08-28'
  }
];

// Sample notifications
export const notifications: Notification[] = [
  {
    id: '1',
    type: 'request',
    title: 'New Leave Request',
    message: 'Emily Rodriguez submitted a sick leave request',
    timestamp: '2024-08-28T09:00:00Z',
    read: false,
    userId: '1'
  },
  {
    id: '2',
    type: 'approval',
    title: 'Leave Request Approved',
    message: 'Your personal leave request has been approved',
    timestamp: '2024-09-10T14:30:00Z',
    read: true,
    userId: '2'
  }
];

// Who is away data (upcoming absences)
export const upcomingAbsences = [
  {
    id: '1',
    userName: 'Michael Chen',
    department: 'Engineering',
    type: 'personal' as const,
    startDate: '2024-09-15',
    endDate: '2024-09-16',
    days: 2
  },
  {
    id: '2',
    userName: 'Sarah Johnson',
    department: 'Marketing',
    type: 'annual' as const,
    startDate: '2024-12-20',
    endDate: '2024-12-27',
    days: 6
  }
];

// API simulation functions (replace with actual API calls)
export const api = {
  // Authentication APIs
  login: async (email: string, password: string) => {
    // TODO: Replace with actual API call
    // return await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
    return Promise.resolve({ user: currentUser, token: 'mock-token' });
  },

  // Leave request APIs
  getLeaveRequests: async () => {
    // TODO: Replace with actual API call
    // return await fetch('/api/leave-requests').then(res => res.json())
    return Promise.resolve(leaveRequests);
  },

  submitLeaveRequest: async (request: Omit<LeaveRequest, 'id' | 'status'>) => {
    // TODO: Replace with actual API call
    // return await fetch('/api/leave-requests', { method: 'POST', body: JSON.stringify(request) })
    return Promise.resolve({ ...request, id: Date.now().toString(), status: 'pending' as const });
  },

  // User APIs
  getUsers: async () => {
    // TODO: Replace with actual API call
    // return await fetch('/api/users').then(res => res.json())
    return Promise.resolve(users);
  },

  // Notification APIs
  getNotifications: async () => {
    // TODO: Replace with actual API call
    // return await fetch('/api/notifications').then(res => res.json())
    return Promise.resolve(notifications);
  }
};