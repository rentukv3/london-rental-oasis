
export interface Booking {
  id: string;
  tenant_id: string;
  property_id: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at?: string;
}
