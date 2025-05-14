
import { Property, PropertyTypeValue, PropertyImage, PropertyStatus, AdType, PromotionStatus, PropertyVisibility } from '@/types';
import { PropertyFeatures } from '@/types/property.features';
import { SubscriptionPlan, SubscriptionInterval, SubscriptionFeatures, Subscription, SubscriptionStatus } from '@/types/subscription.types';
import { Json } from '@/integrations/supabase/types';

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
 * Safely convert JSON data to PropertyImage[] type
 */
export const normalizePropertyImages = (images: Json | null): PropertyImage[] => {
  if (!images) return [];
  
  try {
    if (typeof images === 'string') {
      // Try to parse if it's a JSON string
      const parsedImages = JSON.parse(images);
      return Array.isArray(parsedImages) 
        ? parsedImages.map(img => typeof img === 'string' 
            ? createPropertyImageFromUrl(img) 
            : img as PropertyImage)
        : [parsedImages as PropertyImage];
    } else if (Array.isArray(images)) {
      return images.map(img => typeof img === 'string' 
        ? createPropertyImageFromUrl(img) 
        : img as PropertyImage);
    } else if (typeof images === 'object') {
      return [images as PropertyImage];
    }
  } catch (e) {
    console.error('Error normalizing property images:', e);
  }
  
  return [];
};

/**
 * Safely convert JSON to PropertyFeatures type
 */
export const normalizePropertyFeatures = (features: Json | null): PropertyFeatures => {
  if (!features) return {};
  
  try {
    if (typeof features === 'string') {
      return JSON.parse(features) as PropertyFeatures;
    } else if (typeof features === 'object') {
      return features as PropertyFeatures;
    }
  } catch (e) {
    console.error('Error normalizing property features:', e);
  }
  
  return {};
};

/**
 * Convert database row to our Property type
 */
export const normalizeProperty = (data: any): Property => {
  // Create a normalized property with required fields
  const normalized: Property = {
    id: data.id || '',
    title: data.title || '',
    images: normalizePropertyImages(data.images),
    isFeatured: Boolean(data.is_featured),
    status: (data.status as PropertyStatus) || 'draft',
    adType: (data.ad_type as AdType) || 'standard',
    propertyType: normalizePropertyType(data.property_type || 'other'),
    featuredUntil: data.featured_until ? new Date(data.featured_until) : undefined,
    promotionStatus: (data.promotion_status as PromotionStatus) || 'inactive',
    visibility: (data.visibility as PropertyVisibility) || 'public',
    availabilityDate: data.availability_date ? new Date(data.availability_date) : undefined,
    features: normalizePropertyFeatures(data.features),
    description: data.description || '',
    address: data.address || '',
    city: data.city || '',
    country: data.country || '',
    price: data.price || 0,
    currency: data.currency || 'USD',
    bedrooms: data.bedrooms || 0,
    bathrooms: data.bathrooms || 0,
    areaSqm: data.area_sqm || 0,
    userId: data.user_id,
    createdAt: data.created_at ? new Date(data.created_at) : undefined,
    updatedAt: data.updated_at ? new Date(data.updated_at) : undefined
  };
  
  // Create location string
  let locationStr = '';
  if (data.address) locationStr += data.address;
  if (data.city) locationStr += (locationStr ? ', ' : '') + data.city;
  if (data.country) locationStr += (locationStr ? ', ' : '') + data.country;
  normalized.location = locationStr;
  
  // Add other fields if they exist
  if (data.latitude) normalized.latitude = data.latitude;
  if (data.longitude) normalized.longitude = data.longitude;
  if (data.views_count) normalized.viewsCount = data.views_count;
  if (data.contact_clicks) normalized.contactClicks = data.contact_clicks;
  if (data.virtual_tour_url) normalized.virtualTourUrl = data.virtual_tour_url;
  if (data.listing_created_at) normalized.listingCreatedAt = new Date(data.listing_created_at);
  if (data.listing_expires_at) normalized.listingExpiresAt = new Date(data.listing_expires_at);
  
  return normalized;
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
  const dbProperty: any = {};
  
  // Handle basic string/number fields
  if (property.title !== undefined) dbProperty.title = property.title;
  if (property.description !== undefined) dbProperty.description = property.description;
  if (property.address !== undefined) dbProperty.address = property.address;
  if (property.city !== undefined) dbProperty.city = property.city;
  if (property.country !== undefined) dbProperty.country = property.country;
  if (property.price !== undefined) dbProperty.price = property.price;
  if (property.currency !== undefined) dbProperty.currency = property.currency;
  if (property.bedrooms !== undefined) dbProperty.bedrooms = property.bedrooms;
  if (property.bathrooms !== undefined) dbProperty.bathrooms = property.bathrooms;
  if (property.latitude !== undefined) dbProperty.latitude = property.latitude;
  if (property.longitude !== undefined) dbProperty.longitude = property.longitude;
  if (property.userId !== undefined) dbProperty.user_id = property.userId;
  if (property.virtualTourUrl !== undefined) dbProperty.virtual_tour_url = property.virtualTourUrl;
  if (property.areaSqm !== undefined) dbProperty.area_sqm = property.areaSqm;
  if (property.viewsCount !== undefined) dbProperty.views_count = property.viewsCount;
  if (property.contactClicks !== undefined) dbProperty.contact_clicks = property.contactClicks;
  
  // Handle enum types
  if (property.propertyType !== undefined) dbProperty.property_type = property.propertyType;
  if (property.status !== undefined) dbProperty.status = property.status;
  if (property.adType !== undefined) dbProperty.ad_type = property.adType;
  if (property.promotionStatus !== undefined) dbProperty.promotion_status = property.promotionStatus;
  if (property.visibility !== undefined) dbProperty.visibility = property.visibility;
  
  // Handle boolean fields
  if (property.isFeatured !== undefined) dbProperty.is_featured = property.isFeatured;
  
  // Handle date fields
  if (property.availabilityDate) dbProperty.availability_date = property.availabilityDate.toISOString();
  if (property.featuredUntil) dbProperty.featured_until = property.featuredUntil.toISOString();
  if (property.listingCreatedAt) dbProperty.listing_created_at = property.listingCreatedAt.toISOString();
  if (property.listingExpiresAt) dbProperty.listing_expires_at = property.listingExpiresAt.toISOString();
  if (property.createdAt) dbProperty.created_at = property.createdAt.toISOString();
  if (property.updatedAt) dbProperty.updated_at = property.updatedAt.toISOString();
  
  // Handle complex fields that need serialization
  if (property.features) dbProperty.features = property.features;
  if (property.images) dbProperty.images = property.images;
  
  return dbProperty;
}
