
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Landlord } from "@/types/admin.types";
import { Json } from "@/types/property.features";

interface LandlordInsert extends Omit<Landlord, 'id' | 'created_at' | 'updated_at'> {}

// Add these function types to the Supabase client
declare module "@supabase/supabase-js" {
  interface SupabaseClient {
    rpc<T = any>(
      fn: string,
      params?: object,
      options?: {
        head?: boolean;
        count?: null | "exact" | "planned" | "estimated";
      }
    ): Promise<{ data: T; error: Error | null }>;
  }
}

export async function getLandlords(): Promise<Landlord[]> {
  try {
    // Use fetch to call the edge function directly
    const response = await fetch(`${process.env.VITE_SUPABASE_URL}/functions/v1/get-landlords`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching landlords: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return data as Landlord[];
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to fetch landlords",
      variant: "destructive",
    });
    return [];
  }
}

export async function createLandlord(landlord: LandlordInsert): Promise<Landlord | null> {
  try {
    // Use fetch to call the edge function directly
    const response = await fetch(`${process.env.VITE_SUPABASE_URL}/functions/v1/create-landlord`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ landlord })
    });
    
    if (!response.ok) {
      throw new Error(`Error creating landlord: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    toast({
      title: "Success",
      description: "Landlord created successfully",
    });
    
    return data as Landlord;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to create landlord",
      variant: "destructive",
    });
    return null;
  }
}

export async function updateLandlord(id: string, landlord: Partial<Landlord>): Promise<Landlord | null> {
  try {
    // Use fetch to call the edge function directly
    const response = await fetch(`${process.env.VITE_SUPABASE_URL}/functions/v1/update-landlord`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ landlord_id: id, landlord })
    });
    
    if (!response.ok) {
      throw new Error(`Error updating landlord: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    toast({
      title: "Success",
      description: "Landlord updated successfully",
    });
    
    return data as Landlord;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to update landlord",
      variant: "destructive",
    });
    return null;
  }
}

export async function deleteLandlord(id: string): Promise<boolean> {
  try {
    // Use fetch to call the edge function directly
    const response = await fetch(`${process.env.VITE_SUPABASE_URL}/functions/v1/delete-landlord`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ landlord_id: id })
    });
    
    if (!response.ok) {
      throw new Error(`Error deleting landlord: ${response.statusText}`);
    }
    
    toast({
      title: "Success",
      description: "Landlord deleted successfully",
    });
    
    return true;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to delete landlord",
      variant: "destructive",
    });
    return false;
  }
}
