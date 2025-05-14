
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Tenant } from "@/types/admin.types";
import { Json } from "@/types/property.features";

interface TenantInsert extends Omit<Tenant, 'id' | 'created_at' | 'updated_at'> {}

export async function getTenants(): Promise<Tenant[]> {
  try {
    // Use rpc function to get tenants
    const { data, error } = await supabase.rpc('get_tenants');
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
    
    return data as unknown as Tenant[];
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to fetch tenants",
      variant: "destructive",
    });
    return [];
  }
}

export async function createTenant(tenant: TenantInsert): Promise<Tenant | null> {
  try {
    // Use rpc function to create tenant
    const { data, error } = await supabase.rpc('create_tenant', { tenant });
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
    
    toast({
      title: "Success",
      description: "Tenant created successfully",
    });
    
    return data as unknown as Tenant;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to create tenant",
      variant: "destructive",
    });
    return null;
  }
}

export async function updateTenant(id: string, tenant: Partial<Tenant>): Promise<Tenant | null> {
  try {
    // Use rpc function to update tenant
    const { data, error } = await supabase.rpc('update_tenant', {
      tenant_id: id,
      tenant
    });
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
    
    toast({
      title: "Success",
      description: "Tenant updated successfully",
    });
    
    return data as unknown as Tenant;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to update tenant",
      variant: "destructive",
    });
    return null;
  }
}

export async function deleteTenant(id: string): Promise<boolean> {
  try {
    // Use rpc function to delete tenant
    const { error } = await supabase.rpc('delete_tenant', { tenant_id: id });
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
    
    toast({
      title: "Success",
      description: "Tenant deleted successfully",
    });
    
    return true;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to delete tenant",
      variant: "destructive",
    });
    return false;
  }
}
