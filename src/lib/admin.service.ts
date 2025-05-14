
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { AdminStats, PendingApproval, Activity } from "@/types/admin.types";
import { Json } from "@/types/property.features";

export async function getAdminStats(): Promise<AdminStats> {
  try {
    const { data, error } = await supabase.rpc('get_admin_stats');
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return { totalUsers: 0, totalProperties: 0, totalBookings: 0 };
    }
    
    // Proper type assertion with safety check
    if (data && typeof data === 'object') {
      return {
        totalUsers: (data as any).totalUsers || 0,
        totalProperties: (data as any).totalProperties || 0, 
        totalBookings: (data as any).totalBookings || 0
      };
    }
    
    return { totalUsers: 0, totalProperties: 0, totalBookings: 0 };
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to fetch admin stats",
      variant: "destructive",
    });
    return { totalUsers: 0, totalProperties: 0, totalBookings: 0 };
  }
}

export async function getPendingApprovals(): Promise<PendingApproval[]> {
  try {
    const { data, error } = await supabase
      .from('pending_approvals')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
    
    // Transform and map the database fields to the PendingApproval interface
    return data.map(item => ({
      id: item.id,
      userId: item.user_id,
      type: item.type,
      status: item.status,
      createdAt: new Date(item.created_at),
      // Use optional chaining to check if data exists before accessing it
      data: item.data as Record<string, any> || {}
    })) as PendingApproval[];
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to fetch pending approvals",
      variant: "destructive",
    });
    return [];
  }
}

export async function getRecentActivities(): Promise<Activity[]> {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      user_id: item.user_id,
      type: item.action || '', 
      description: item.details || '',
      created_at: item.created_at
    })) as Activity[];
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to fetch recent activities",
      variant: "destructive",
    });
    return [];
  }
}
