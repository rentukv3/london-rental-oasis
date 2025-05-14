
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Tenant } from "@/types/admin.types";
import { Json } from "@/integrations/supabase/types";

export type TenantInsert = Omit<Tenant, 'id' | 'created_at' | 'updated_at'>;
export type TenantUpdate = Partial<TenantInsert>;

export async function getTenants(): Promise<Tenant[]> {
  try {
    // Use supabase functions to avoid type mismatch
    const { data, error } = await supabase.functions.invoke('get-tenants');

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
    // Use supabase functions to avoid type mismatch
    const { data, error } = await supabase.functions.invoke('create-tenant', {
      body: { tenant }
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
    // Use supabase functions to avoid type mismatch
    const { data, error } = await supabase.functions.invoke('update-tenant', {
      body: { id, tenant }
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
    // Use supabase functions to avoid type mismatch
    const { error } = await supabase.functions.invoke('delete-tenant', {
      body: { id }
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
