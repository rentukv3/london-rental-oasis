
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

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
