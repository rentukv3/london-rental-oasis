
/**
 * Available subscription plan intervals
 */
export type SubscriptionInterval = 'month' | 'year' | 'free';

/**
 * Available subscription statuses
 */
export type SubscriptionStatus = 
  | 'active'     // Subscription is active and paid
  | 'trialing'   // Subscription is in trial period
  | 'past_due'   // Payment is past due but subscription still active
  | 'canceled'   // Subscription has been canceled
  | 'incomplete' // Initial payment failed
  | 'incomplete_expired' // Initial payment failed and expired
  | 'unpaid';    // Payment failed after being active

/**
 * Listing priority levels based on subscription plan
 */
export type ListingPriority = 'standard' | 'priority' | 'premium';

/**
 * Analytics levels available for different subscription plans
 */
export type AnalyticsLevel = 'none' | 'basic' | 'advanced';

/**
 * Features included in a subscription plan
 */
export interface SubscriptionFeatures {
  /** Number of listings included in the plan */
  listingsIncluded: number;
  /** Number of featured listings included in the plan */
  featuredIncluded: number;
  /** Priority level of listings */
  listingPriority: ListingPriority;
  /** Level of analytics provided */
  analytics: AnalyticsLevel;
  /** Whether marketing tools are included */
  marketingTools: boolean;
}

/**
 * Subscription plan definition
 */
export interface SubscriptionPlan {
  /** Unique identifier */
  id: string;
  /** Plan name (e.g., "Basic", "Premium", "Pro") */
  name: string;
  /** Monthly price in USD */
  price: number;
  /** Billing interval */
  interval: SubscriptionInterval;
  /** Stripe price ID for this plan */
  stripePriceId?: string;
  /** PayPal plan ID for this plan */
  paypalPlanId?: string;
  /** Features included in this plan */
  features: SubscriptionFeatures;
  /** Maximum number of listings (null for unlimited) */
  maxListings: number | null;
  /** Maximum number of featured listings */
  maxFeaturedListings: number;
  /** Duration of each listing in days */
  listingDuration: number;
  /** Date when the plan was created */
  createdAt: Date;
  /** Date when the plan was last updated */
  updatedAt: Date;
}

/**
 * User subscription information
 */
export interface Subscription {
  /** Unique identifier */
  id: string;
  /** ID of the user who owns this subscription */
  userId: string;
  /** ID of the subscription plan */
  planId: string;
  /** Current status of the subscription */
  status: SubscriptionStatus;
  /** Stripe subscription ID */
  stripeSubscriptionId?: string;
  /** PayPal subscription ID */
  paypalSubscriptionId?: string;
  /** Start date of current billing period */
  currentPeriodStart?: Date;
  /** End date of current billing period */
  currentPeriodEnd?: Date;
  /** Whether the subscription will be canceled at the period end */
  cancelAtPeriodEnd: boolean;
  /** Date when the subscription was canceled */
  canceledAt?: Date;
  /** Start date of the trial period */
  trialStart?: Date;
  /** End date of the trial period */
  trialEnd?: Date;
  /** Date when the subscription was created */
  createdAt: Date;
  /** Date when the subscription was last updated */
  updatedAt: Date;
}
