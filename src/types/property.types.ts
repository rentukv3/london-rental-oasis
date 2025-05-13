
/**
 * Available property types
 */
export type PropertyTypeValue = 
  | 'apartment' 
  | 'house' 
  | 'studio'
  | 'room'
  | 'commercial'
  | 'land'
  | 'other';

/**
 * Status of a property listing
 */
export type PropertyStatus = 
  | 'draft'     // Not yet published
  | 'published' // Active and visible
  | 'rented'    // No longer available, has been rented
  | 'archived'  // Manually archived by owner
  | 'expired';  // Listing duration has ended

/**
 * Status of property promotion
 */
export type PromotionStatus = 
  | 'active'    // Promotion is currently active
  | 'inactive'  // No promotion
  | 'expired';  // Promotion has ended

/**
 * Visibility settings for a property
 */
export type PropertyVisibility = 
  | 'public'    // Visible to everyone
  | 'private'   // Only visible to owner
  | 'unlisted'; // Not shown in listings but accessible via direct link

/**
 * Type of advertisement
 */
export type AdType = 'standard' | 'featured';

/**
 * Property features
 */
export interface PropertyFeatures {
  /** Whether pets are allowed */
  petsAllowed?: boolean;
  /** Whether the property is furnished */
  furnished?: boolean;
  /** Whether parking is available */
  parking?: boolean;
  /** Whether air conditioning is available */
  airConditioning?: boolean;
  /** Whether heating is available */
  heating?: boolean;
  /** Whether the property has a garden */
  garden?: boolean;
  /** Whether the property has a balcony */
  balcony?: boolean;
  /** Whether WiFi is included */
  wifi?: boolean;
  /** Whether the property has a pool */
  pool?: boolean;
  /** Additional features as key-value pairs */
  [key: string]: boolean | undefined;
}

/**
 * Image information
 */
export interface PropertyImage {
  /** Cloudinary URL */
  url: string;
  /** Cloudinary public ID */
  publicId: string;
  /** Optional caption */
  caption?: string;
  /** Whether this is the main/cover image */
  isMain?: boolean;
}

/**
 * Property (advertisement) full information
 */
export interface Property {
  /** Unique identifier */
  id: string;
  /** ID of the user who posted this property */
  userId: string;
  /** Property title */
  title: string;
  /** Detailed description */
  description?: string;
  /** Street address */
  address?: string;
  /** City */
  city?: string;
  /** Country */
  country?: string;
  /** Latitude */
  latitude?: number;
  /** Longitude */
  longitude?: number;
  /** Price (rental amount) */
  price?: number;
  /** Currency (USD, EUR, etc.) */
  currency?: string;
  /** Type of property */
  propertyType?: PropertyTypeValue;
  /** Number of bedrooms */
  bedrooms?: number;
  /** Number of bathrooms */
  bathrooms?: number;
  /** Area in square meters */
  areaSqm?: number;
  /** Additional features */
  features?: PropertyFeatures;
  /** Array of property images */
  images: PropertyImage[];
  /** URL to virtual tour if available */
  virtualTourUrl?: string;
  /** Current status of the listing */
  status: PropertyStatus;
  /** Date when the property is available for rent */
  availabilityDate?: Date;
  /** Whether this is a featured listing */
  isFeatured: boolean;
  /** Until when the featured status lasts */
  featuredUntil?: Date;
  /** Type of advertisement (standard or featured) */
  adType: AdType;
  /** Number of views */
  viewsCount: number;
  /** Number of contact button clicks */
  contactClicks: number;
  /** Date when this listing was created */
  listingCreatedAt: Date;
  /** Date when this listing expires */
  listingExpiresAt?: Date;
  /** Current promotion status */
  promotionStatus: PromotionStatus;
  /** Visibility setting */
  visibility: PropertyVisibility;
  /** Date when the property was first created */
  createdAt: Date;
  /** Date when the property was last updated */
  updatedAt: Date;
}
