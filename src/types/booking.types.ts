
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
