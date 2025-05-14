import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface Landlord {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  verification_status: string;
  created_at: string;
}

export type LandlordInsert = Omit<Landlord, 'id' | 'created_at' | 'updated_at'>;
export type LandlordUpdate = Partial<LandlordInsert>;

export async function getLandlords(): Promise<Landlord[]> {
  try {
    // Use a raw SQL query since the table might not be in the generated types
    const { data, error } = await supabase.rpc('get_landlords');

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    return data as unknown as Landlord[];
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
    // Use a raw SQL query since the table might not be in the generated types
    const { data, error } = await supabase.rpc('create_landlord', landlord);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    return data as unknown as Landlord;
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
    // Use a raw SQL query since the table might not be in the generated types
    const { data, error } = await supabase.rpc('update_landlord', {
      landlord_id: id,
      ...landlord
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    return data as unknown as Landlord;
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
    // Use a raw SQL query since the table might not be in the generated types
    const { error } = await supabase.rpc('delete_landlord', { landlord_id: id });

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
