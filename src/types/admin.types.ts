
export interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalBookings: number;
}

export interface PendingApproval {
  id: string;
  type: string;
  user_id: string;
  status: string;
  created_at: string;
}

export interface Activity {
  id: string;
  user_id: string;
  action: string;
  details: string;
  created_at: string;
}
