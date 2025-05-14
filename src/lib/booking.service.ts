import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface Booking {
  id: string;
  property_id: string;
  tenant_id: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string | null;
  updated_at: string | null;
}

export type BookingInsert = Omit<Booking, 'id' | 'created_at' | 'updated_at'>;
export type BookingUpdate = Partial<BookingInsert>;

export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
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

export async function createBooking(booking: BookingInsert): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
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

export async function updateBooking(id: string, booking: BookingUpdate): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .update(booking)
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

export async function deleteBooking(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('bookings')
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