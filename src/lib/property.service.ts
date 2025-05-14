import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Property, PropertyTypeValue, PropertyImage, PropertyStatus, AdType, PromotionStatus, PropertyVisibility } from '@/types/property.types';
import { PropertyFeatures } from '@/types/property.features';
import { normalizePropertyType } from '@/utils/dataUtils';

const supabase = createClientComponentClient();

export interface PropertySearchParams {
  searchTerm?: string;
  propertyType?: PropertyTypeValue;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  city?: string;
  country?: string;
  status?: PropertyStatus;
  adType?: AdType;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

// Helper functions to replace the problematic ones in dataUtils.ts
function safelyConvertToPropertyImages(images: any): PropertyImage[] {
  if (!images) return [];
  
  try {
    if (typeof images === 'string') {
      try {
        const parsed = JSON.parse(images);
        return Array.isArray(parsed) 
          ? parsed.map(img => convertToPropertyImage(img))
          : [convertToPropertyImage(parsed)];
      } catch {
        // If parsing fails, treat as a single image URL
        return [{ url: images, publicId: images.split('/').pop() || 'unknown' }];
      }
    }
    
    if (Array.isArray(images)) {
      return images.map(img => convertToPropertyImage(img));
    }
    
    if (typeof images === 'object' && images !== null) {
      return [convertToPropertyImage(images)];
    }
  } catch (e) {
    console.error('Error processing property images:', e);
  }
  
  return [];
}

function convertToPropertyImage(img: any): PropertyImage {
  if (typeof img === 'string') {
    return { 
      url: img, 
      publicId: img.split('/').pop() || 'unknown'
    };
  }
  
  return { 
    url: img.url || '', 
    publicId: img.publicId || img.public_id || 'unknown'
  };
}

function safelyConvertToPropertyFeatures(features: any): PropertyFeatures {
  if (!features) return {};
  
  if (typeof features === 'string') {
    try {
      return JSON.parse(features);
    } catch {
      return {};
    }
  }
  
  if (typeof features === 'object' && features !== null) {
    return features as PropertyFeatures;
  }
  
  return {};
}

export async function searchProperties(params: PropertySearchParams): Promise<Property[]> {
  let query = supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (params.searchTerm) {
    query = query.ilike('title', `%${params.searchTerm}%`);
  }
  if (params.propertyType) {
    query = query.eq('property_type', params.propertyType);
  }
  if (params.minPrice) {
    query = query.gte('price', params.minPrice);
  }
  if (params.maxPrice) {
    query = query.lte('price', params.maxPrice);
  }
  if (params.minBedrooms) {
    query = query.gte('bedrooms', params.minBedrooms);
  }
  if (params.minBathrooms) {
    query = query.gte('bathrooms', params.minBathrooms);
  }
  if (params.city) {
    query = query.ilike('city', `%${params.city}%`);
  }
  if (params.country) {
    query = query.eq('country', params.country);
  }
  if (params.status) {
    query = query.eq('status', params.status);
  }
  if (params.adType) {
    query = query.eq('ad_type', params.adType);
  }
  if (params.isFeatured !== undefined) {
    query = query.eq('is_featured', params.isFeatured);
  }
  if (params.page && params.limit) {
    const startIndex = (params.page - 1) * params.limit;
    const endIndex = startIndex + params.limit - 1;
    query = query.range(startIndex, endIndex);
  }

  const { data: properties, error } = await query;

  if (error) {
    console.error('Error searching properties:', error);
    return [];
  }
  
  return properties.map(item => {
    // Create a normalized property with required fields
    const normalized: Property = {
      id: item.id || '',
      title: item.title || '',
      images: safelyConvertToPropertyImages(item.images),
      isFeatured: Boolean(item.is_featured),
      status: (item.status as PropertyStatus) || 'draft',
      adType: (item.ad_type as AdType) || 'standard',
      propertyType: normalizePropertyType(item.property_type || 'other'),
      featuredUntil: item.featured_until ? new Date(item.featured_until) : undefined,
      promotionStatus: (item.promotion_status as PromotionStatus) || 'inactive',
      visibility: (item.visibility as PropertyVisibility) || 'public',
      availabilityDate: item.availability_date ? new Date(item.availability_date) : undefined,
      features: safelyConvertToPropertyFeatures(item.features),
      description: item.description || '',
      address: item.address || '',
      city: item.city || '',
      country: item.country || '',
      price: item.price || 0,
      currency: item.currency || 'USD',
      bedrooms: item.bedrooms || 0,
      bathrooms: item.bathrooms || 0,
      areaSqm: item.area_sqm || 0,
      userId: item.user_id,
      createdAt: item.created_at ? new Date(item.created_at) : undefined,
      updatedAt: item.updated_at ? new Date(item.updated_at) : undefined
    };

    // Create location string
    let locationStr = '';
    if (item.address) locationStr += item.address;
    if (item.city) locationStr += (locationStr ? ', ' : '') + item.city;
    if (item.country) locationStr += (locationStr ? ', ' : '') + item.country;
    normalized.location = locationStr;
    
    // Add other fields if they exist
    if (item.latitude) normalized.latitude = item.latitude;
    if (item.longitude) normalized.longitude = item.longitude;
    if (item.views_count) normalized.viewsCount = item.views_count;
    if (item.contact_clicks) normalized.contactClicks = item.contact_clicks;
    if (item.virtual_tour_url) normalized.virtualTourUrl = item.virtual_tour_url;
    if (item.listing_created_at) normalized.listingCreatedAt = new Date(item.listing_created_at);
    if (item.listing_expires_at) normalized.listingExpiresAt = new Date(item.listing_expires_at);
    
    return normalized;
  });
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching property by ID:', error);
    return null;
  }

  if (!data) {
    return null;
  }

  // Create a normalized property with required fields
  const item = data;
  const normalized: Property = {
    id: item.id || '',
    title: item.title || '',
    images: safelyConvertToPropertyImages(item.images),
    isFeatured: Boolean(item.is_featured),
    status: (item.status as PropertyStatus) || 'draft',
    adType: (item.ad_type as AdType) || 'standard',
    propertyType: normalizePropertyType(item.property_type || 'other'),
    featuredUntil: item.featured_until ? new Date(item.featured_until) : undefined,
    promotionStatus: (item.promotion_status as PromotionStatus) || 'inactive',
    visibility: (item.visibility as PropertyVisibility) || 'public',
    availabilityDate: item.availability_date ? new Date(item.availability_date) : undefined,
    features: safelyConvertToPropertyFeatures(item.features),
    description: item.description || '',
    address: item.address || '',
    city: item.city || '',
    country: item.country || '',
    price: item.price || 0,
    currency: item.currency || 'USD',
    bedrooms: item.bedrooms || 0,
    bathrooms: item.bathrooms || 0,
    areaSqm: item.area_sqm || 0,
    userId: item.user_id,
    createdAt: item.created_at ? new Date(item.created_at) : undefined,
    updatedAt: item.updated_at ? new Date(item.updated_at) : undefined
  };

  // Create location string
  let locationStr = '';
  if (item.address) locationStr += item.address;
  if (item.city) locationStr += (locationStr ? ', ' : '') + item.city;
  if (item.country) locationStr += (locationStr ? ', ' : '') + item.country;
  normalized.location = locationStr;
  
  // Add other fields if they exist
  if (item.latitude) normalized.latitude = item.latitude;
  if (item.longitude) normalized.longitude = item.longitude;
  if (item.views_count) normalized.viewsCount = item.views_count;
  if (item.contact_clicks) normalized.contactClicks = item.contact_clicks;
  if (item.virtual_tour_url) normalized.virtualTourUrl = item.virtual_tour_url;
  if (item.listing_created_at) normalized.listingCreatedAt = new Date(item.listing_created_at);
  if (item.listing_expires_at) normalized.listingExpiresAt = new Date(item.listing_expires_at);
  
  return normalized;
}

export async function createProperty(property: Omit<Property, 'id'>): Promise<Property | null> {
  const { data, error } = await supabase
    .from('properties')
    .insert([property])
    .select()
    .single();

  if (error) {
    console.error('Error creating property:', error);
    return null;
  }

  return data as Property;
}

export async function updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating property:', error);
    return null;
  }

  return data as Property;
}

export async function deleteProperty(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting property:', error);
    return false;
  }

  return true;
}
