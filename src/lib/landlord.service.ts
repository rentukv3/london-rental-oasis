
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Landlord } from "@/types/admin.types";
import { Json } from "@/types/property.features";

interface LandlordInsert extends Omit<Landlord, 'id' | 'created_at' | 'updated_at'> {}

export async function getLandlords(): Promise<Landlord[]> {
  try {
    // Use rpc function to get landlords
    const { data, error } = await supabase.rpc('get_landlords');
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
    
    return data as unknown as Landlord[];
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
    // Use rpc function to create landlord
    const { data, error } = await supabase.rpc('create_landlord', { landlord });
    
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
      description: "Landlord created successfully",
    });
    
    return data as unknown as Landlord;
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
    // Use rpc function to update landlord
    const { data, error } = await supabase.rpc('update_landlord', {
      landlord_id: id,
      landlord
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
      description: "Landlord updated successfully",
    });
    
    return data as unknown as Landlord;
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
    // Use rpc function to delete landlord
    const { error } = await supabase.rpc('delete_landlord', { landlord_id: id });
    
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
