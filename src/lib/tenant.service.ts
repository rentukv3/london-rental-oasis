
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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

export type TenantInsert = Omit<Tenant, 'id' | 'created_at' | 'updated_at'>;
export type TenantUpdate = Partial<TenantInsert>;

export async function getTenants(): Promise<Tenant[]> {
  try {
    // Use a stored function instead of a direct table query
    const { data, error } = await supabase.rpc('get_tenants');

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    return data as Tenant[];
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
}

export async function createTenant(tenant: TenantInsert): Promise<Tenant | null> {
  try {
    // Use a stored function instead of a direct table insert
    const { data, error } = await supabase.rpc('create_tenant', {
      tenant: tenant
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    return data as Tenant;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
}

export async function updateTenant(id: string, tenant: TenantUpdate): Promise<Tenant | null> {
  try {
    // Use a stored function instead of a direct table update
    const { data, error } = await supabase.rpc('update_tenant', {
      tenant_id: id,
      tenant: tenant
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    return data as Tenant;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
}

export async function deleteTenant(id: string): Promise<boolean> {
  try {
    // Use a stored function instead of a direct table delete
    const { data, error } = await supabase.rpc('delete_tenant', { 
      tenant_id: id 
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }

    return true;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
}
