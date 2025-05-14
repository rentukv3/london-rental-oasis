
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
