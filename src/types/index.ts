
// Export property types
export * from './property.types';
// Export search types, but avoid ambiguity with SearchCriteria
export type { PropertySearch } from './search.types';
// Export testimonial types, but avoid ambiguity with Testimonial
export type { TestimonialData } from './testimonial.types';
// Export FAQ types, but avoid ambiguity with Faq
export type { FaqCategory } from './faq.types';
// Export other types
export * from './subscription.types';
export * from './notification.types';
export * from './ui.types';
export * from './admin.types';
export * from './booking.types';
// Export PropertyFeatures from property.features.ts to avoid ambiguity
export type { PropertyFeatures } from './property.features';
