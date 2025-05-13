
/**
 * Push subscription information (as per the Web Push API)
 */
export interface PushSubscription {
  /** Unique identifier */
  id: string;
  /** ID of the user who owns this subscription */
  userId: string;
  /** Push subscription endpoint URL */
  endpoint: string;
  /** P256DH key for encryption */
  p256dh: string;
  /** Auth secret for encryption */
  auth: string;
  /** Date when the subscription was created */
  createdAt: Date;
}

/**
 * Push notification payload
 */
export interface PushNotificationPayload {
  /** Title of the notification */
  title: string;
  /** Body text of the notification */
  body: string;
  /** URL to open when the notification is clicked */
  url?: string;
  /** Icon URL to display */
  icon?: string;
  /** Badge URL to display */
  badge?: string;
  /** Additional custom data */
  data?: Record<string, any>;
}
