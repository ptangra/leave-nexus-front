// Dummy data for the vacation management system
// In a real application, this would come from API calls

export interface User {
  user_id: number;
  name: string;
  last_name: string;
  email: string;
  role: 'USER' | 'ACCOUNT_ADMIN' | 'ADMIN';
  department: string;
  account_id: number;
  avatar?: string;
  totalLeave: number;
  usedLeave: number;
  isDepartmentHead?: boolean;
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
  department?: string;
  requestedTo?: string; // Department head who should approve
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
  user_id: 1,
  name: 'Sarah',
  last_name: 'Johnson',
  email: 'sarah.johnson@company.com',
  role: 'USER',
  department: 'Marketing',
  account_id: 1,
  avatar: 'SJ',
  totalLeave: 25,
  usedLeave: 12
};

// Sample users
export const users: User[] = [
  currentUser,
  {
    user_id: 2,
    name: 'Michael',
    last_name: 'Chen',
    email: 'michael.chen@company.com',
    role: 'ACCOUNT_ADMIN',
    department: 'Engineering',
    account_id: 1,
    avatar: 'MC',
    totalLeave: 25,
    usedLeave: 8,
    isDepartmentHead: true
  },
  {
    user_id: 3,
    name: 'Emily',
    last_name: 'Rodriguez',
    email: 'emily.rodriguez@company.com',
    role: 'USER',
    department: 'Marketing',
    account_id: 1,
    avatar: 'ER',
    totalLeave: 22,
    usedLeave: 15
  },
  {
    user_id: 4,
    name: 'David',
    last_name: 'Thompson',
    email: 'david.thompson@company.com',
    role: 'ADMIN',
    department: 'HR',
    account_id: 1,
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