
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Tenant } from "@/types/admin.types";
import { Json } from "@/types/property.features";

interface TenantInsert extends Omit<Tenant, 'id' | 'created_at' | 'updated_at'> {}

export async function getTenants(): Promise<Tenant[]> {
  try {
    // Use fetch to call the edge function directly
    const response = await fetch(`${process.env.VITE_SUPABASE_URL}/functions/v1/get-tenants`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching tenants: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return data as Tenant[];
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
    // Use fetch to call the edge function directly
    const response = await fetch(`${process.env.VITE_SUPABASE_URL}/functions/v1/create-tenant`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tenant })
    });
    
    if (!response.ok) {
      throw new Error(`Error creating tenant: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    toast({
      title: "Success",
      description: "Tenant created successfully",
    });
    
    return data as Tenant;
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
    // Use fetch to call the edge function directly
    const response = await fetch(`${process.env.VITE_SUPABASE_URL}/functions/v1/update-tenant`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tenant_id: id, tenant })
    });
    
    if (!response.ok) {
      throw new Error(`Error updating tenant: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    toast({
      title: "Success",
      description: "Tenant updated successfully",
    });
    
    return data as Tenant;
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
    // Use fetch to call the edge function directly
    const response = await fetch(`${process.env.VITE_SUPABASE_URL}/functions/v1/delete-tenant`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tenant_id: id })
    });
    
    if (!response.ok) {
      throw new Error(`Error deleting tenant: ${response.statusText}`);
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
