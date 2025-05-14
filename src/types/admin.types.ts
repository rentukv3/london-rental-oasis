
export interface PendingApproval {
  id: string;
  userId: string;
  type: string;
  createdAt: Date;
  status: string;
  data?: Record<string, any>;
}

export interface AdminStatistics {
  totalUsers: number;
  activeUsers: number;
  totalProperties: number;
  publishedProperties: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

export interface ActivityLogItem {
  id: string;
  userId: string;
  action: string;
  details: string;
  createdAt: Date;
  userName?: string;
}

export interface AdminDashboardData {
  stats: AdminStatistics;
  recentActivity: ActivityLogItem[];
  pendingApprovals: PendingApproval[];
}

// Legacy interfaces needed by existing components
export interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalBookings: number;
}

export interface Activity {
  id: string;
  user_id: string;
  type: string;
  description: string;
  created_at: string;
}

export interface Landlord {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  company_registration?: string;
  address?: string;
  city?: string;
  country?: string;
  status: string;
  verification_status: string;
  subscription_status?: string;
  subscription_id?: string;
  notes?: string;
  documents?: any;
  created_at: string;
  updated_at?: string;
}

export interface Tenant {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  employment_status?: string;
  annual_income?: number;
  credit_score?: number;
  status: string;
  verification_status: string;
  notes?: string;
  documents?: any;
  created_at: string;
  updated_at?: string;
}
