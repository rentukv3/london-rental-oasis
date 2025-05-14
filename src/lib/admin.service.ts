
import { supabase } from '@/integrations/supabase/client';
import { AdminDashboardData, AdminStatistics, ActivityLogItem, PendingApproval } from '@/types/admin.types';

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  try {
    // Get admin statistics using the get_admin_stats function
    const { data: statsData, error: statsError } = await supabase.rpc('get_admin_stats');

    if (statsError) throw statsError;

    const stats: AdminStatistics = {
      totalUsers: statsData?.totalUsers || 0,
      activeUsers: statsData?.activeUsers || 0,
      totalProperties: statsData?.totalProperties || 0,
      publishedProperties: statsData?.publishedProperties || 0,
      totalSubscriptions: statsData?.totalSubscriptions || 0,
      activeSubscriptions: statsData?.activeSubscriptions || 0,
      totalRevenue: statsData?.totalRevenue || 0,
      monthlyRevenue: statsData?.monthlyRevenue || 0,
    };

    // Get pending approvals
    const { data: approvalsData, error: approvalsError } = await supabase
      .from('pending_approvals')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (approvalsError) throw approvalsError;

    // Get recent activity
    const { data: activityData, error: activityError } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (activityError) throw activityError;

    // Transform to correct types
    const pendingApprovals: PendingApproval[] = approvalsData.map((item: any) => ({
      id: item.id,
      userId: item.user_id,
      type: item.type,
      status: item.status,
      createdAt: new Date(item.created_at),
      // Safely access the data property with a fallback to an empty object
      data: item.data || {}
    }));

    const recentActivity: ActivityLogItem[] = activityData.map((item: any) => ({
      id: item.id,
      userId: item.user_id,
      action: item.action,
      details: item.details,
      createdAt: new Date(item.created_at),
      userName: item.user_name
    }));

    const dashboardData: AdminDashboardData = {
      stats: stats,
      recentActivity: recentActivity,
      pendingApprovals: pendingApprovals,
    };

    return dashboardData;
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    throw error;
  }
}

// Add these functions to be compatible with Admin.tsx
export async function getAdminStats() {
  try {
    // Use the RPC function instead of direct table access
    const { data, error } = await supabase.rpc('get_admin_stats');
    
    if (error) throw error;
    
    return {
      totalUsers: data?.totalUsers || 0,
      totalProperties: data?.totalProperties || 0,
      totalBookings: data?.totalBookings || 0
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return {
      totalUsers: 0,
      totalProperties: 0,
      totalBookings: 0
    };
  }
}

export async function getPendingApprovals() {
  try {
    const { data, error } = await supabase
      .from('pending_approvals')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    return [];
  }
}

export async function getRecentActivities() {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    return [];
  }
}

export async function approvePendingItem(id: string) {
  try {
    const { data, error } = await supabase
      .from('pending_approvals')
      .update({ status: 'approved' })
      .eq('id', id);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error approving pending item:', error);
    throw error;
  }
}

export async function rejectPendingItem(id: string) {
  try {
    const { data, error } = await supabase
      .from('pending_approvals')
      .update({ status: 'rejected' })
      .eq('id', id);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error rejecting pending item:', error);
    throw error;
  }
}
