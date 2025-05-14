
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
        totalUsers: data.totalUsers || 0,
        totalProperties: data.totalProperties || 0, 
        totalBookings: data.totalBookings || 0
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
    
    // Transform and type the data properly
    return data.map(item => ({
      id: item.id,
      user_id: item.user_id,
      type: item.type,
      details: item.details || '', // Use item.details if it exists or default to empty string
      status: item.status,
      created_at: item.created_at
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
      type: item.action, // Map action to type
      description: item.details, // Map details to description
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
