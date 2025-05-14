import { supabase } from '@/integrations/supabase/client';
import { Property } from '@/types/property.types';

// Helper function to safely convert database property images to our PropertyImage type
function safelyConvertToPropertyImages(images: any) {
  if (!images) return [];
  if (!Array.isArray(images)) return [];
  
  return images.map((img) => ({
    id: img.id || '',
    url: img.url || '',
    alt: img.alt || '',
    isMain: !!img.isMain
  }));
}

// Helper function to safely convert a database property to our Property type
function convertToProperty(data: any): Property {
  return {
    id: data.id,
    title: data.title || '',
    description: data.description || '',
    price: data.price || 0,
    currency: data.currency || 'USD',
    features: data.features || [],
    images: safelyConvertToPropertyImages(data.images),
    address: data.address || '',
    city: data.city || '',
    country: data.country || '',
    bedrooms: data.bedrooms || 0,
    bathrooms: data.bathrooms || 0,
    area: data.area_sqm || 0,
    type: data.property_type || 'apartment',
    status: data.status || 'draft',
    userId: data.user_id || '',
    createdAt: data.created_at ? new Date(data.created_at) : new Date(),
    updatedAt: data.updated_at ? new Date(data.updated_at) : new Date(),
  };
}

/**
 * Transform API response to property images in the required format
 */
export function mapApiImagesToPropertyImages(images: any[]): PropertyImage[] {
  if (!images || !Array.isArray(images)) return [];
  
  return images.map(image => ({
    url: image.url || '',
    publicId: image.id || image.public_id || 'unknown',
    caption: image.alt || image.caption || '',
    isMain: Boolean(image.isMain)
  }));
}

export async function getProperties(): Promise<Property[]> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(convertToProperty);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function getPublishedProperties(): Promise<Property[]> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(convertToProperty);
  } catch (error) {
    console.error('Error fetching published properties:', error);
    return [];
  }
}

export async function getProperty(id: string): Promise<Property | null> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return convertToProperty(data);
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    return null;
  }
}

// Add more functions as needed
