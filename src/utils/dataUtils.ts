import { Property, PropertyTypeValue, PropertyImage } from '@/types';
import { SubscriptionPlan, SubscriptionInterval, SubscriptionFeatures, Subscription, SubscriptionStatus } from '@/types/subscription.types';

/**
 * Helper function to convert string image URLs to PropertyImage objects
 */
export const createPropertyImageFromUrl = (url: string): PropertyImage => {
  return {
    url,
    publicId: url.split('/').pop() || 'unknown'
  };
};

/**
 * Helper function to convert property type strings to valid PropertyTypeValue
 */
export const normalizePropertyType = (type: string): PropertyTypeValue => {
  const normalizedType = type.toLowerCase();
  
  switch (normalizedType) {
    case 'apartment':
    case 'house':
    case 'studio':
    case 'room':
    case 'commercial':
    case 'land':
      return normalizedType as PropertyTypeValue;
    default:
      return 'other';
  }
};

/**
 * Helper function to normalize a property object to ensure it matches the Property interface
 */
export const normalizeProperty = (property: Partial<Property>): Property => {
  // Create a normalized property with required fields
  const normalized: Property = {
    id: property.id || '',
    title: property.title || '',
    images: [],
    isFeatured: property.isFeatured || false
  };
  
  // Add optional fields if they exist
  if (property.propertyType) {
    normalized.propertyType = normalizePropertyType(property.propertyType as string);
  }
  
  // Convert string images to PropertyImage objects
  if (Array.isArray(property.images)) {
    normalized.images = property.images.map((img: any) => {
      if (typeof img === 'string') {
        return createPropertyImageFromUrl(img);
      }
      return img as PropertyImage;
    });
  } else if (typeof property.images === 'string') {
    // Handle case where images might be a single string
    normalized.images = [createPropertyImageFromUrl(property.images)];
  } else if (property.images) {
    // Handle case where images might be a single object
    if (typeof property.images === 'object') {
      normalized.images = [property.images as PropertyImage];
    }
  }
  
  // Copy all other properties
  return { ...property, ...normalized };
};

/**
 * Helper function to format date for display
 */
export const formatDate = (date: Date | string | undefined): string => {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Helper function to format currency values
 */
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};

/**
 * Normalize subscription plan data from database format to our TypeScript interface
 */
export function normalizeSubscriptionPlan(plan: any): SubscriptionPlan {
  return {
    id: plan.id,
    name: plan.name,
    price: plan.price,
    interval: plan.interval as SubscriptionInterval,
    stripePriceId: plan.stripe_price_id,
    paypalPlanId: plan.paypal_plan_id,
    features: plan.features as unknown as SubscriptionFeatures,
    maxListings: plan.max_listings,
    maxFeaturedListings: plan.max_featured_listings,
    listingDuration: plan.listing_duration,
    createdAt: new Date(plan.created_at),
    updatedAt: new Date(plan.updated_at)
  };
}

/**
 * Normalize subscription data from database format to our TypeScript interface
 */
export function normalizeSubscription(subscription: any): Subscription {
  return {
    id: subscription.id,
    userId: subscription.user_id,
    planId: subscription.plan_id,
    status: subscription.status as SubscriptionStatus,
    stripeSubscriptionId: subscription.stripe_subscription_id,
    paypalSubscriptionId: subscription.paypal_subscription_id,
    currentPeriodStart: subscription.current_period_start ? new Date(subscription.current_period_start) : undefined,
    currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end) : undefined,
    cancelAtPeriodEnd: subscription.cancel_at_period_end || false,
    canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at) : undefined,
    trialStart: subscription.trial_start ? new Date(subscription.trial_start) : undefined,
    trialEnd: subscription.trial_end ? new Date(subscription.trial_end) : undefined,
    createdAt: new Date(subscription.created_at),
    updatedAt: new Date(subscription.updated_at)
  };
}

/**
 * Convert a Property object to database format for insert/update operations
 */
export function propertyToDbFormat(property: Partial<Property>): any {
  const dbProperty: any = {
    ...property,
    user_id: property.userId,
    ad_type: property.adType,
    property_type: property.propertyType,
    area_sqm: property.areaSqm,
    views_count: property.viewsCount,
    contact_clicks: property.contactClicks,
    is_featured: property.isFeatured,
    featured_until: property.featuredUntil?.toISOString(),
    availability_date: property.availabilityDate?.toISOString(),
    listing_created_at: property.listingCreatedAt?.toISOString(),
    listing_expires_at: property.listingExpiresAt?.toISOString(),
    promotion_status: property.promotionStatus,
    virtual_tour_url: property.virtualTourUrl,
    created_at: property.createdAt?.toISOString(),
    updated_at: property.updatedAt?.toISOString(),
  };
  
  // Remove TypeScript-specific fields to avoid duplicates
  delete dbProperty.userId;
  delete dbProperty.adType;
  delete dbProperty.propertyType;
  delete dbProperty.areaSqm;
  delete dbProperty.viewsCount;
  delete dbProperty.contactClicks;
  delete dbProperty.isFeatured;
  delete dbProperty.featuredUntil;
  delete dbProperty.availabilityDate;
  delete dbProperty.listingCreatedAt;
  delete dbProperty.listingExpiresAt;
  delete dbProperty.promotionStatus;
  delete dbProperty.virtualTourUrl;
  delete dbProperty.createdAt;
  delete dbProperty.updatedAt;
  
  return dbProperty;
}

/**
 * Convert database JSON to PropertyFeatures
 */
export function normalizePropertyFeatures(features: any): PropertyFeatures {
  if (!features) return {};
  if (typeof features === 'string') {
    try {
      return JSON.parse(features);
    } catch (e) {
      return {};
    }
  }
  return features as PropertyFeatures;
}
