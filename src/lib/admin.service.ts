
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { AdminStats, PendingApproval, Activity } from "@/types";
import { Json } from "@/integrations/supabase/types";

export async function getAdminStats(): Promise<AdminStats> {
  const { data, error } = await supabase.rpc('get_admin_stats');
  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  return data as AdminStats;
}

export async function getPendingApprovals(): Promise<PendingApproval[]> {
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
    throw error;
  }
  return data as PendingApproval[];
}

export async function getRecentActivities(): Promise<Activity[]> {
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
    throw error;
  }
  return data as Activity[];
}

export async function approveItem(id: string, type: string): Promise<void> {
  const { error } = await supabase.rpc('approve_item', { item_id: id, item_type: type });
  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
}

export async function rejectItem(id: string, type: string): Promise<void> {
  const { error } = await supabase.rpc('reject_item', { item_id: id, item_type: type });
  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
}
