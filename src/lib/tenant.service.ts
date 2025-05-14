import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface Tenant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  verification_status: string;
  created_at: string;
}

export type TenantInsert = Omit<Tenant, 'id' | 'created_at' | 'updated_at'>;
export type TenantUpdate = Partial<TenantInsert>;

export async function getTenants(): Promise<Tenant[]> {
  const { data, error } = await supabase
    .from('tenants')
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

  return data;
}

export async function createTenant(tenant: TenantInsert): Promise<Tenant | null> {
  const { data, error } = await supabase
    .from('tenants')
    .insert(tenant)
    .select()
    .single();

  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }

  return data;
}

export async function updateTenant(id: string, tenant: TenantUpdate): Promise<Tenant | null> {
  const { data, error } = await supabase
    .from('tenants')
    .update(tenant)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }

  return data;
}

export async function deleteTenant(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('tenants')
    .delete()
    .eq('id', id);

  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }

  return true;
} 