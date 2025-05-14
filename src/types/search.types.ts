
/**
 * Search criteria for property search
 */
export interface SearchCriteria {
  /** Location to search in */
  location?: string;
  /** Minimum price */
  minPrice?: number;
  /** Maximum price */
  maxPrice?: number;
  /** Minimum number of bedrooms */
  minBedrooms?: number;
  /** Maximum number of bedrooms */
  maxBedrooms?: number;
  /** Property type filter */
  propertyType?: string;
  /** Whether to include only properties that allow pets */
  petsAllowed?: boolean;
  /** Whether to include only furnished properties */
  furnished?: boolean;
  /** Minimum area in square meters */
  minAreaSqm?: number;
  /** Maximum area in square meters */
  maxAreaSqm?: number;
  /** Availability date from */
  availableFrom?: string | Date;
  /** Keywords to search for in title and description */
  keywords?: string;
}
