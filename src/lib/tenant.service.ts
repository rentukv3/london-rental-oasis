import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface Tenant {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  employment_status: string | null;
  annual_income: number | null;
  credit_score: number | null;
  created_at: string | null;
  updated_at: string | null;
  status: string;
  notes: string | null;
  documents: any | null;
  verification_status: string;
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