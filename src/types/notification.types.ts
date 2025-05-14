
export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  message: string;
  data: any;
  status: NotificationStatus;
  read_at: string | null;
  created_at: string;
}

export type NotificationType = 
  | 'booking_request'
  | 'booking_approved'
  | 'booking_rejected'
  | 'property_approved'
  | 'property_rejected'
  | 'system';

export type NotificationStatus = 'sent' | 'delivered' | 'read';

export type NotificationInsert = Omit<Notification, 'id' | 'created_at'>;
export type NotificationUpdate = Partial<Omit<Notification, 'id' | 'created_at'>>;
