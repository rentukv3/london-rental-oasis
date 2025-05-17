import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Booking } from "@/types/booking.types";
import { NotificationType } from "@/types/notification.types";

interface BookingInsert extends Omit<Booking, 'id' | 'created_at' | 'updated_at'> {}

// Mensajes de notificación en español e inglés
const messages = {
  es: {
    bookingCreated: "Reserva creada exitosamente",
    bookingUpdated: "Reserva actualizada exitosamente",
    bookingDeleted: "Reserva eliminada exitosamente",
    propertyUnavailable: "La propiedad no está disponible para las fechas seleccionadas",
    error: "Error",
    success: "Éxito"
  },
  en: {
    bookingCreated: "Booking created successfully",
    bookingUpdated: "Booking updated successfully",
    bookingDeleted: "Booking deleted successfully",
    propertyUnavailable: "Property is not available for selected dates",
    error: "Error",
    success: "Success"
  }
};

// Función para validar la disponibilidad de la propiedad
async function validatePropertyAvailability(propertyId: string, startDate: string, endDate: string): Promise<boolean> {
  const { data: existingBookings, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('property_id', propertyId)
    .or(`start_date.lte.${endDate},end_date.gte.${startDate}`)
    .eq('status', 'active');

  if (error) {
    console.error('Error checking property availability:', error);
    return false;
  }

  return existingBookings.length === 0;
}

// Función para crear una notificación
async function createNotification(userId: string, type: NotificationType, message: string, data?: any) {
  const { error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      type,
      message,
      data
    });

  if (error) {
    console.error('Error creating notification:', error);
  }
}

export async function getBookings(): Promise<Booking[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({
        title: messages.en.error,
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
    
    return data as Booking[];
  } catch (error: any) {
    toast({
      title: messages.en.error,
      description: error.message || "Failed to fetch bookings",
      variant: "destructive",
    });
    return [];
  }
}

export async function createBooking(booking: BookingInsert): Promise<Booking | null> {
  try {
    // Validar disponibilidad de la propiedad
    const isAvailable = await validatePropertyAvailability(
      booking.property_id,
      booking.start_date,
      booking.end_date
    );

    if (!isAvailable) {
      toast({
        title: messages.en.error,
        description: messages.en.propertyUnavailable,
        variant: "destructive",
      });
      return null;
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();
    
    if (error) {
      toast({
        title: messages.en.error,
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    // Crear notificación para el propietario
    await createNotification(
      booking.tenant_id,
      'booking',
      `New booking request for property ${booking.property_id}`,
      { bookingId: data.id }
    );
    
    toast({
      title: messages.en.success,
      description: messages.en.bookingCreated,
    });
    
    return data as Booking;
  } catch (error: any) {
    toast({
      title: messages.en.error,
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
        title: messages.en.error,
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    // Crear notificación para el inquilino
    if (data.tenant_id) {
      await createNotification(
        data.tenant_id,
        'booking',
        `Your booking status has been updated to ${booking.status}`,
        { bookingId: id, status: booking.status }
      );
    }
    
    toast({
      title: messages.en.success,
      description: messages.en.bookingUpdated,
    });
    
    return data as Booking;
  } catch (error: any) {
    toast({
      title: messages.en.error,
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
        title: messages.en.error,
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
    
    toast({
      title: messages.en.success,
      description: messages.en.bookingDeleted,
    });
    
    return true;
  } catch (error: any) {
    toast({
      title: messages.en.error,
      description: error.message || "Failed to delete booking",
      variant: "destructive",
    });
    return false;
  }
}

// Nuevas funciones para obtener reservas por inquilino y propiedad
export async function getBookingsByTenant(tenantId: string): Promise<Booking[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({
        title: messages.en.error,
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
    
    return data as Booking[];
  } catch (error: any) {
    toast({
      title: messages.en.error,
      description: error.message || "Failed to fetch tenant bookings",
      variant: "destructive",
    });
    return [];
  }
}

export async function getBookingsByProperty(propertyId: string): Promise<Booking[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({
        title: messages.en.error,
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
    
    return data as Booking[];
  } catch (error: any) {
    toast({
      title: messages.en.error,
      description: error.message || "Failed to fetch property bookings",
      variant: "destructive",
    });
    return [];
  }
}
