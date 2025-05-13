
/**
 * Types of notifications
 */
export type NotificationType = 
  | 'subscription' // Related to subscription events
  | 'payment'      // Related to payment events
  | 'property'     // Related to property listing events
  | 'system'       // System notifications
  | 'message';     // User messages

/**
 * Status of notification
 */
export type NotificationStatus = 
  | 'sent'      // Notification created but not confirmed delivered
  | 'delivered' // Confirmed delivered via WebSocket/Push
  | 'read'      // User has read the notification
  | 'archived'; // User has archived the notification

/**
 * Notification data structure
 */
export interface Notification {
  /** Unique identifier */
  id: string;
  /** ID of the user who should receive this notification */
  userId: string;
  /** Type of notification */
  type: NotificationType;
  /** Notification message */
  message: string;
  /** Additional data related to the notification (property ID, payment ID, etc.) */
  data?: Record<string, any>;
  /** Current status of the notification */
  status: NotificationStatus;
  /** Date when the notification was read */
  readAt?: Date;
  /** Date when the notification was created */
  createdAt: Date;
}
