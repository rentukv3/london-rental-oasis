
/**
 * Types of notifications that can be sent
 */
export type NotificationType = 
  | 'booking'     // Booking related notification
  | 'property'    // Property related notification
  | 'payment'     // Payment related notification
  | 'system'      // System notification
  | 'message'     // New message notification
  | 'maintenance' // Maintenance related notification
  | 'subscription'; // Subscription related notification

/**
 * Notification status
 */
export type NotificationStatus = 'sent' | 'read' | 'archived' | 'deleted';

/**
 * Notification model
 */
export interface Notification {
  /** Unique identifier */
  id: string;
  /** User ID the notification is for */
  userId: string;
  /** Type of notification */
  type: NotificationType;
  /** Notification message */
  message: string;
  /** Additional data related to the notification */
  data?: any;
  /** Status of the notification */
  status: NotificationStatus;
  /** When the notification was created */
  createdAt: Date;
  /** When the notification was read (if read) */
  readAt?: Date;
}

/**
 * Notification with JSON data structure from database
 */
export interface RawNotification {
  id: string;
  user_id: string;
  type: string;
  message: string;
  data: any;
  status: string;
  created_at: string;
  read_at: string | null;
}
