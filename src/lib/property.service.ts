import { supabase } from "@/integrations/supabase/client";
import { Property, PropertyImage, PropertyTypeValue, PropertyStatus, AdType, PromotionStatus, PropertyVisibility } from "@/types";
import { PropertyFeatures } from "@/types/property.features";
import { toast } from "@/components/ui/use-toast";
import { normalizeProperty, propertyToDbFormat, normalizePropertyImages, normalizePropertyFeatures } from "@/utils/dataUtils";
import { getCurrentUserSubscription, getSubscriptionPlanById } from "./subscription.service";
import { Json } from "@/types/property.features";

// Helper function to safely type cast Json to PropertyFeatures 
const safelyConvertToPropertyFeatures = (jsonData: Json): PropertyFeatures => {
  if (typeof jsonData === 'object' && jsonData !== null) {
    return jsonData as PropertyFeatures;
  }
  return {} as PropertyFeatures;
};

// Helper function to safely type cast Json[] to PropertyImage[]
const safelyConvertToPropertyImages = (jsonData: Json): PropertyImage[] => {
  if (Array.isArray(jsonData)) {
    return jsonData.map(img => {
      if (typeof img === 'object' && img !== null) {
        return {
          url: (img as any).url || '',
          publicId: (img as any).publicId || ''
        };
      }
      return { url: '', publicId: '' };
    });
  }
  return [];
};

/**
 * Fetch all published properties
 */
export async function getPublishedProperties(
  limit = 10,
  offset = 0,
  filters = {}
): Promise<{ properties: Property[]; count: number }> {
  try {
    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .eq('visibility', 'public')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    // Apply any additional filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query = query.eq(key, value);
      }
    });
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    if (!data) return { properties: [], count: 0 };
    
    // Convert database objects to Property type objects with safe conversions
    const properties = data.map(item => {
      // Apply safe conversions to the property data
      const propertyData = {
        ...item,
        features: safelyConvertToPropertyFeatures(item.features),
        images: safelyConvertToPropertyImages(item.images)
      };
      return normalizeProperty(propertyData);
    });
    
    return { 
      properties, 
      count: count || 0 
    };
  } catch (error) {
    console.error('Error fetching properties:', error);
    toast({
      title: 'Error',
      description: 'Failed to load properties.',
      variant: 'destructive',
    });
    return { properties: [], count: 0 };
  }
}

/**
 * Fetch a specific property by ID
 */
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    // Increment view count asynchronously
    incrementViewCount(id).catch(console.error);
    
    // Apply safe conversions
    const propertyData = {
      ...data,
      features: safelyConvertToPropertyFeatures(data.features),
      images: safelyConvertToPropertyImages(data.images)
    };
    
    return normalizeProperty(propertyData);
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

/**
 * Fetch properties by user ID (for dashboard)
 */
export async function getUserProperties(userId: string): Promise<Property[]> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Apply safe conversions
    return data?.map(item => {
      const propertyData = {
        ...item,
        features: safelyConvertToPropertyFeatures(item.features),
        images: safelyConvertToPropertyImages(item.images)
      };
      return normalizeProperty(propertyData);
    }) || [];
  } catch (error) {
    console.error('Error fetching user properties:', error);
    toast({
      title: 'Error',
      description: 'Failed to load your properties.',
      variant: 'destructive',
    });
    return [];
  }
}

/**
 * Create a new property listing
 */
export async function createProperty(
  property: Partial<Property>,
  userId: string
): Promise<Property | null> {
  try {
    // Get user subscription and plan to determine listing duration
    const subscription = await getCurrentUserSubscription(userId);
    if (!subscription) {
      toast({
        title: 'Subscription required',
        description: 'You need an active subscription to create property listings.',
        variant: 'destructive',
      });
      return null;
    }
    
    const plan = await getSubscriptionPlanById(subscription.planId);
    if (!plan) {
      toast({
        title: 'Plan not found',
        description: 'Could not determine your subscription plan.',
        variant: 'destructive',
      });
      return null;
    }
    
    // Calculate expiration date based on plan's listing duration
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + plan.listingDuration);
    
    // Create database property object
    const dbProperty: any = {
      user_id: userId,
      title: property.title,
      description: property.description,
      address: property.address,
      city: property.city,
      country: property.country,
      latitude: property.latitude,
      longitude: property.longitude,
      price: property.price,
      currency: property.currency,
      property_type: property.propertyType,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area_sqm: property.areaSqm,
      features: property.features,
      images: property.images,
      virtual_tour_url: property.virtualTourUrl,
      status: 'draft',
      availability_date: property.availabilityDate?.toISOString(),
      is_featured: property.isFeatured || false,
      ad_type: property.adType || 'standard',
      listing_expires_at: expirationDate.toISOString(),
      visibility: property.visibility || 'public',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    const { data, error } = await supabase
      .from('properties')
      .insert(dbProperty)
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: 'Property created',
      description: 'Your property listing has been created successfully.',
    });
    
    return normalizeProperty(data);
  } catch (error) {
    console.error('Error creating property:', error);
    toast({
      title: 'Error',
      description: 'Failed to create property listing.',
      variant: 'destructive',
    });
    return null;
  }
}

/**
 * Update an existing property
 */
export async function updateProperty(
  id: string,
  property: Partial<Property>
): Promise<Property | null> {
  try {
    const updateData = {
      ...propertyToDbFormat(property),
      updated_at: new Date().toISOString(),
    };
    
    const { data, error } = await supabase
      .from('properties')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: 'Property updated',
      description: 'Your property listing has been updated successfully.',
    });
    
    return normalizeProperty(data);
  } catch (error) {
    console.error('Error updating property:', error);
    toast({
      title: 'Error',
      description: 'Failed to update property listing.',
      variant: 'destructive',
    });
    return null;
  }
}

/**
 * Delete a property
 */
export async function deleteProperty(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    toast({
      title: 'Property deleted',
      description: 'Your property listing has been deleted.',
    });
    
    return true;
  } catch (error) {
    console.error('Error deleting property:', error);
    toast({
      title: 'Error',
      description: 'Failed to delete property listing.',
      variant: 'destructive',
    });
    return false;
  }
}

/**
 * Mark a property as featured
 */
export async function setPropertyFeatured(
  id: string,
  isFeatured: boolean
): Promise<boolean> {
  try {
    // If setting to featured, calculate end date (30 days from now)
    const featuredUntil = isFeatured 
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
      : null;
    
    const { error } = await supabase
      .from('properties')
      .update({
        is_featured: isFeatured,
        featured_until: featuredUntil,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);
    
    if (error) throw error;
    
    toast({
      title: isFeatured ? 'Property featured' : 'Feature removed',
      description: isFeatured ? 
        'Your property is now featured for 30 days.' : 
        'Your property is no longer featured.',
    });
    
    return true;
  } catch (error) {
    console.error('Error updating property featured status:', error);
    toast({
      title: 'Error',
      description: 'Failed to update featured status.',
      variant: 'destructive',
    });
    return false;
  }
}

/**
 * Publish a property (change status from draft to published)
 */
export async function publishProperty(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('properties')
      .update({
        status: 'published',
        listing_created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);
    
    if (error) throw error;
    
    toast({
      title: 'Property published',
      description: 'Your property listing is now live.',
    });
    
    return true;
  } catch (error) {
    console.error('Error publishing property:', error);
    toast({
      title: 'Error',
      description: 'Failed to publish property listing.',
      variant: 'destructive',
    });
    return false;
  }
}

/**
 * Update property images
 */
export async function updatePropertyImages(
  id: string,
  images: PropertyImage[]
): Promise<boolean> {
  try {
    // Convert PropertyImage[] to Json compatible format
    const jsonImages = images.map(img => ({
      url: img.url,
      publicId: img.publicId
    })) as unknown as Json;
    
    const { error } = await supabase
      .from('properties')
      .update({
        images: jsonImages,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating property images:', error);
    return false;
  }
}

/**
 * Increment property view count
 */
export async function incrementViewCount(id: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('views_count')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    const currentCount = data.views_count || 0;
    
    const { error: updateError } = await supabase
      .from('properties')
      .update({ views_count: currentCount + 1 })
      .eq('id', id);
    
    if (updateError) throw updateError;
    return true;
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return false;
  }
}

/**
 * Increment contact click count
 */
export async function incrementContactClicks(id: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('contact_clicks')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    const currentCount = data.contact_clicks || 0;
    
    const { error: updateError } = await supabase
      .from('properties')
      .update({ contact_clicks: currentCount + 1 })
      .eq('id', id);
    
    if (updateError) throw updateError;
    return true;
  } catch (error) {
    console.error('Error incrementing contact clicks:', error);
    return false;
  }
}

/**
 * Extend listing expiration date
 */
export async function extendListingExpiration(id: string, days: number): Promise<boolean> {
  try {
    // Get current expiration date
    const { data, error } = await supabase
      .from('properties')
      .select('listing_expires_at')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    let newExpirationDate: Date;
    
    if (data.listing_expires_at) {
      // If there's an existing date, extend from there
      newExpirationDate = new Date(data.listing_expires_at);
    } else {
      // Otherwise, use current date
      newExpirationDate = new Date();
    }
    
    // Add days
    newExpirationDate.setDate(newExpirationDate.getDate() + days);
    
    // Update expiration
    const { error: updateError } = await supabase
      .from('properties')
      .update({
        listing_expires_at: newExpirationDate.toISOString(),
        status: 'published', // Ensure it's published
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);
    
    if (updateError) throw updateError;
    
    toast({
      title: 'Listing extended',
      description: `Your property listing has been extended by ${days} days.`,
    });
    
    return true;
  } catch (error) {
    console.error('Error extending listing expiration:', error);
    toast({
      title: 'Error',
      description: 'Failed to extend listing expiration.',
      variant: 'destructive',
    });
    return false;
  }
}
