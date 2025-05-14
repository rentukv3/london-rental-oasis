
/**
 * User testimonial
 */
export interface Testimonial {
  /** Unique identifier */
  id: string;
  /** User name */
  name: string;
  /** User role or occupation */
  role?: string;
  /** Testimonial content */
  content: string;
  /** User rating (1-5) */
  rating: number;
  /** User avatar URL */
  avatar?: string;
  /** Date of testimonial */
  date?: Date | string;
}
