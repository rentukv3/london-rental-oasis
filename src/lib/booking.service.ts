
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Booking } from "@/types/booking.types";

interface BookingInsert extends Omit<Booking, 'id' | 'created_at' | 'updated_at'> {}

export async function getBookings(): Promise<Booking[]> {
  try {
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
      return [];
    }
    
    return data as Booking[];
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to fetch bookings",
      variant: "destructive",
    });
    return [];
  }
}

export async function createBooking(booking: BookingInsert): Promise<Booking | null> {
  try {
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
    
    toast({
      title: "Success",
      description: "Booking created successfully",
    });
    
    return data as Booking;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to create booking",
      variant: "destructive",
    });
    return null;
  }
}

export async function updateBooking(id: string, booking: Partial<Booking>): Promise<Booking | null> {
  try {
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
    
    toast({
      title: "Success",
      description: "Booking updated successfully",
    });
    
    return data as Booking;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to update booking",
      variant: "destructive",
    });
    return null;
  }
}

export async function deleteBooking(id: string): Promise<boolean> {
  try {
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
    
    toast({
      title: "Success",
      description: "Booking deleted successfully",
    });
    
    return true;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to delete booking",
      variant: "destructive",
    });
    return false;
  }
}
