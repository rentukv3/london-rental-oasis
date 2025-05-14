import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface Landlord {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  company_registration: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  created_at: string | null;
  updated_at: string | null;
  status: string;
  verification_status: string;
  subscription_status: string;
  subscription_id: string | null;
  notes: string | null;
  documents: any | null;
}

export type LandlordInsert = Omit<Landlord, 'id' | 'created_at' | 'updated_at'>;
export type LandlordUpdate = Partial<LandlordInsert>;

export async function getLandlords(): Promise<Landlord[]> {
  const { data, error } = await supabase
    .from('landlords')
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

export async function createLandlord(landlord: LandlordInsert): Promise<Landlord | null> {
  const { data, error } = await supabase
    .from('landlords')
    .insert(landlord)
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

export async function updateLandlord(id: string, landlord: LandlordUpdate): Promise<Landlord | null> {
  const { data, error } = await supabase
    .from('landlords')
    .update(landlord)
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

export async function deleteLandlord(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('landlords')
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