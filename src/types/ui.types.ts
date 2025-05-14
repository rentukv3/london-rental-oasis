
/**
 * FAQ item
 */
export interface Faq {
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
}

/**
 * Search criteria for property search
 */
export interface SearchCriteria {
  /** Location to search in */
  location?: string;
  /** Type of property to search for */
  propertyType?: string;
  /** Maximum price to filter by */
  priceMax?: number;
  /** Minimum price to filter by */
  priceMin?: number;
  /** Number of bedrooms */
  bedrooms?: number;
  /** Additional search parameters */
  [key: string]: string | number | boolean | undefined;
}

/**
 * User testimonial
 */
export interface Testimonial {
  /** Unique identifier */
  id: string;
  /** Name of the person giving testimonial */
  name: string;
  /** Role or description of the person */
  role: string;
  /** Testimonial content */
  content: string;
  /** Rating given (1-5) */
  rating: number;
}

/**
 * String literal types for property types displayed in UI
 * Note: These are the display versions that will be converted to PropertyTypeValue when saved
 */
export type PropertyType = 'Apartment' | 'House' | 'Studio' | 'Room' | string;

/**
 * Mapping helper to convert UI property types to actual property type values
 */
export const mapPropertyTypeToValue = (displayType: PropertyType): string => {
  const mapping: Record<string, string> = {
    'Apartment': 'apartment',
    'House': 'house',
    'Studio': 'studio',
    'Room': 'room',
  };
  
  return mapping[displayType] || displayType.toLowerCase();
};

/**
 * View mode for property listings
 */
export type PropertyViewMode = 'grid' | 'list' | 'map';

/**
 * Sort options for property listings
 */
export type PropertySortOption = 
  | 'newest'      // Most recently added
  | 'price_asc'   // Price low to high
  | 'price_desc'  // Price high to low
  | 'popular';    // Most viewed
