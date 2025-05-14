
export interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalBookings: number;
}

export interface PendingApproval {
  id: string;
  user_id: string;
  type: string;
  // Note: details property removed since it doesn't exist in the database
  status: string;
  created_at: string;
}

export interface Activity {
  id: string;
  user_id: string;
  type: string;      // Changed from action to type to match component
  description: string;  // Changed from details to description to match component
  created_at: string;
}

// Add type definitions for landlord and tenant
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
