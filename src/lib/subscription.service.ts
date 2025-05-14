
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionPlan, Subscription, SubscriptionStatus } from "@/types";
import { toast } from "@/components/ui/use-toast";

/**
 * Fetch all available subscription plans
 */
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  try {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .order('price', { ascending: true });
    
    if (error) throw error;
    return data as SubscriptionPlan[];
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    toast({
      title: 'Error',
      description: 'Failed to load subscription plans.',
      variant: 'destructive',
    });
    return [];
  }
}

/**
 * Get a specific subscription plan by ID
 */
export async function getSubscriptionPlanById(planId: string): Promise<SubscriptionPlan | null> {
  try {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single();
    
    if (error) throw error;
    return data as SubscriptionPlan;
  } catch (error) {
    console.error('Error fetching subscription plan:', error);
    return null;
  }
}

/**
 * Get the current user's subscription
 */
export async function getCurrentUserSubscription(userId: string): Promise<Subscription | null> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*, subscription_plans(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No subscription found, not an error
        return null;
      }
      throw error;
    }
    return data as unknown as Subscription;
  } catch (error) {
    console.error('Error fetching current user subscription:', error);
    return null;
  }
}

/**
 * Create a new subscription (free tier or initial subscription)
 */
export async function createSubscription(
  userId: string,
  planId: string,
  status: SubscriptionStatus = 'active'
): Promise<Subscription | null> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_id: planId,
        status,
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    toast({
      title: 'Error',
      description: 'Failed to create subscription.',
      variant: 'destructive',
    });
    return null;
  }
}

/**
 * Update a subscription's status
 */
export async function updateSubscriptionStatus(
  subscriptionId: string,
  status: SubscriptionStatus
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', subscriptionId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating subscription status:', error);
    return false;
  }
}

/**
 * Cancel a subscription (set cancel_at_period_end to true)
 */
export async function cancelSubscription(subscriptionId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({ 
        cancel_at_period_end: true,
        canceled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriptionId);
    
    if (error) throw error;
    
    toast({
      title: 'Subscription canceled',
      description: 'Your subscription will be active until the end of the current billing period.',
    });
    
    return true;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    toast({
      title: 'Error',
      description: 'Failed to cancel subscription.',
      variant: 'destructive',
    });
    return false;
  }
}

/**
 * Check if a user has reached their listings limit
 */
export async function hasReachedListingsLimit(userId: string): Promise<boolean> {
  try {
    // Get the user's current subscription with plan details
    const subscription = await getCurrentUserSubscription(userId);
    
    if (!subscription) return true; // No subscription = no listings allowed
    
    // Get plan details
    const plan = await getSubscriptionPlanById(subscription.planId);
    if (!plan) return true;
    
    // If plan allows unlimited listings
    if (plan.maxListings === null) return false;
    
    // Count user's current active listings
    const { count, error } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .in('status', ['draft', 'published']);
    
    if (error) throw error;
    
    return count !== null && count >= plan.maxListings;
  } catch (error) {
    console.error('Error checking listings limit:', error);
    return true; // Default to limit reached on error
  }
}

/**
 * Check if a user has reached their featured listings limit
 */
export async function hasReachedFeaturedLimit(userId: string): Promise<boolean> {
  try {
    // Get the user's current subscription with plan details
    const subscription = await getCurrentUserSubscription(userId);
    
    if (!subscription) return true; // No subscription = no featured allowed
    
    // Get plan details
    const plan = await getSubscriptionPlanById(subscription.planId);
    if (!plan) return true;
    
    // Count user's current featured listings
    const { count, error } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_featured', true)
      .in('status', ['draft', 'published']);
    
    if (error) throw error;
    
    return count !== null && count >= plan.maxFeaturedListings;
  } catch (error) {
    console.error('Error checking featured limit:', error);
    return true; // Default to limit reached on error
  }
}
