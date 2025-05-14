import { supabase } from '@/integrations/supabase/supabase';
import { AdminDashboardData, AdminStatistics, ActivityLogItem, PendingApproval } from '@/types/admin.types';

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  try {
    // Get admin statistics
    const { data: statsData, error: statsError } = await supabase
      .from('admin_stats')
      .select('*')
      .single();

    if (statsError) throw statsError;

    const stats: AdminStatistics = {
      totalUsers: statsData?.total_users || 0,
      activeUsers: statsData?.active_users || 0,
      totalProperties: statsData?.total_properties || 0,
      publishedProperties: statsData?.published_properties || 0,
      totalSubscriptions: statsData?.total_subscriptions || 0,
      activeSubscriptions: statsData?.active_subscriptions || 0,
      totalRevenue: statsData?.total_revenue || 0,
      monthlyRevenue: statsData?.monthly_revenue || 0,
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
      .from('activity_logs')
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
      action: item.type || item.action,
      details: item.description || item.details,
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
