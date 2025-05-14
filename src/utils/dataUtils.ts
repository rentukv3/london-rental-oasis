import { Property, PropertyTypeValue, PropertyImage } from '@/types';

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
      return img;
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
