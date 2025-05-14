
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Landlord } from "@/types/admin.types";
import { Json } from "@/integrations/supabase/types";

export type LandlordInsert = Omit<Landlord, 'id' | 'created_at' | 'updated_at'>;
export type LandlordUpdate = Partial<LandlordInsert>;

export async function getLandlords(): Promise<Landlord[]> {
  try {
    // Use supabase functions to avoid type mismatch
    const { data, error } = await supabase.functions.invoke('get-landlords');
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    return data as Landlord[];
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
}

export async function createLandlord(landlord: LandlordInsert): Promise<Landlord | null> {
  try {
    // Use supabase functions to avoid type mismatch
    const { data, error } = await supabase.functions.invoke('create-landlord', {
      body: { landlord }
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    return data as Landlord;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
}

export async function updateLandlord(id: string, landlord: LandlordUpdate): Promise<Landlord | null> {
  try {
    // Use supabase functions to avoid type mismatch
    const { data, error } = await supabase.functions.invoke('update-landlord', {
      body: { id, landlord }
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    return data as Landlord;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
}

export async function deleteLandlord(id: string): Promise<boolean> {
  try {
    // Use supabase functions to avoid type mismatch
    const { error } = await supabase.functions.invoke('delete-landlord', {
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
