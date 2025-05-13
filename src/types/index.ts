
export type PropertyType = 'Apartment' | 'House' | 'Studio' | 'Room';

export interface SearchCriteria {
  location: string;
  propertyType: string;
  priceMax: number;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  isFeatured?: boolean;
  availableFrom?: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface Faq {
  question: string;
  answer: string;
}
