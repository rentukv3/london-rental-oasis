
import { supabase } from "@/integrations/supabase/client";
import { Notification, NotificationType, NotificationStatus } from "@/types";
import { toast } from "@/components/ui/use-toast";

/**
 * Create a new notification and store it in the database
 */
export async function createNotification(
  userId: string,
  type: NotificationType,
  message: string,
  data?: Record<string, any>
): Promise<Notification | null> {
  try {
    const notification = {
      user_id: userId,
      type,
      message,
      data,
      status: 'sent' as NotificationStatus,
      created_at: new Date().toISOString(),
    };
    
    const { data: createdNotification, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single();
    
    if (error) throw error;
    
    // Here we would typically call WebSocket and Push notification methods
    // For demonstration purposes, we'll just show a toast
    if (type !== 'system') {
      toast({
        title: `New ${type} notification`,
        description: message,
      });
    }
    
    return createdNotification as unknown as Notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
}

/**
 * Get notifications for a user
 */
export async function getUserNotifications(
  userId: string,
  limit = 20,
  offset = 0,
  includeRead = false
): Promise<Notification[]> {
  try {
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (!includeRead) {
      query = query.neq('status', 'read');
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data as unknown as Notification[];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}

/**
 * Mark a notification as read
 */
export async function markNotificationAsRead(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({
        status: 'read',
        read_at: new Date().toISOString(),
      })
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
}

/**
 * Mark all notifications for a user as read
 */
export async function markAllNotificationsAsRead(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({
        status: 'read',
        read_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .in('status', ['sent', 'delivered']);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return false;
  }
}

/**
 * Delete a notification
 */
export async function deleteNotification(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting notification:', error);
    return false;
  }
}

/**
 * Create subscription-related notification
 */
export function createSubscriptionNotification(
  userId: string,
  planName: string,
  type: 'created' | 'renewed' | 'cancelled' | 'payment_failed'
): Promise<Notification | null> {
  let message = '';
  
  switch (type) {
    case 'created':
      message = `Your subscription to the ${planName} plan has been activated.`;
      break;
    case 'renewed':
      message = `Your ${planName} plan subscription has been renewed.`;
      break;
    case 'cancelled':
      message = `Your ${planName} plan subscription has been cancelled.`;
      break;
    case 'payment_failed':
      message = `Payment for your ${planName} plan subscription has failed.`;
      break;
  }
  
  return createNotification(userId, 'subscription', message, { planName, eventType: type });
}

/**
 * Create property-related notification
 */
export function createPropertyNotification(
  userId: string,
  propertyTitle: string,
  propertyId: string,
  type: 'published' | 'expired' | 'featured' | 'message'
): Promise<Notification | null> {
  let message = '';
  
  switch (type) {
    case 'published':
      message = `Your property "${propertyTitle}" has been published.`;
      break;
    case 'expired':
      message = `Your property listing "${propertyTitle}" has expired.`;
      break;
    case 'featured':
      message = `Your property "${propertyTitle}" is now featured.`;
      break;
    case 'message':
      message = `You have received a new message about "${propertyTitle}".`;
      break;
  }
  
  return createNotification(userId, 'property', message, { propertyId, propertyTitle, eventType: type });
}

/**
 * Create payment-related notification
 */
export function createPaymentNotification(
  userId: string,
  amount: number,
  type: 'succeeded' | 'failed' | 'refunded'
): Promise<Notification | null> {
  let message = '';
  
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
  
  switch (type) {
    case 'succeeded':
      message = `Payment of ${formattedAmount} has been processed successfully.`;
      break;
    case 'failed':
      message = `Payment of ${formattedAmount} has failed. Please update your payment method.`;
      break;
    case 'refunded':
      message = `Payment of ${formattedAmount} has been refunded.`;
      break;
  }
  
  return createNotification(userId, 'payment', message, { amount, eventType: type });
}
