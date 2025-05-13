
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedProperties from '@/components/FeaturedProperties';
import Testimonials from '@/components/Testimonials';
import FaqAccordion from '@/components/FaqAccordion';
import { Property, SearchCriteria, Testimonial, Faq } from '@/types';
import { normalizeProperty, createPropertyImageFromUrl } from '@/utils/dataUtils';

// Sample data
const featuredProperties: Property[] = [
  normalizeProperty({
    id: '1',
    title: 'Modern Studio in Chelsea',
    location: 'Chelsea, London SW3',
    price: 1800,
    propertyType: 'studio',
    bedrooms: 1,
    bathrooms: 1,
    images: [createPropertyImageFromUrl('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470&auto=format&fit=crop')],
    isFeatured: true
  }),
  normalizeProperty({
    id: '2',
    title: 'Luxury 2 Bed Apartment with Balcony',
    location: 'Shoreditch, London EC2',
    price: 2800,
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    images: [createPropertyImageFromUrl('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1380&auto=format&fit=crop')],
    isFeatured: true
  }),
  normalizeProperty({
    id: '3',
    title: 'Cozy Room in Shared House',
    location: 'Brixton, London SW9',
    price: 950,
    propertyType: 'room',
    bedrooms: 1,
    bathrooms: 1,
    images: [createPropertyImageFromUrl('https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1470&auto=format&fit=crop')],
    availableFrom: '2025-07-15'
  })
];

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Young Professional',
    content: 'rentinlondon made finding my flat so easy! The search filters are incredibly helpful, and I was able to schedule viewings within hours. I found my perfect apartment in just one week.',
    rating: 5
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Student',
    content: 'As an international student, I was worried about finding accommodation in London. This platform connected me with trustworthy landlords and I found a great room in a shared house near my university.',
    rating: 5
  },
  {
    id: '3',
    name: 'Olivia and James',
    role: 'Young Family',
    content: 'We needed to find a family-friendly apartment quickly after relocating to London for work. The detailed listings and responsive landlords made our transition smooth and stress-free.',
    rating: 4
  }
];

const faqs: Faq[] = [
  {
    question: 'How do I schedule a viewing for a property?',
    answer: 'You can schedule a viewing directly through our platform. Simply navigate to the property listing you\'re interested in, click on the "Schedule Viewing" button, and select your preferred date and time from the available slots. The landlord or agent will then confirm your appointment.'
  },
  {
    question: 'Are utilities included in the rental price?',
    answer: 'Utility inclusion varies by property. Each listing will specify whether utilities are included in the rental price. You can also use our search filters to find properties with utilities included if this is important to you.'
  },
  {
    question: 'How long does the application process take?',
    answer: 'The application process typically takes 2-3 business days once all required documentation is submitted. This includes reference checks, credit checks, and landlord approval. Premium members receive expedited application processing.'
  },
  {
    question: 'Is a security deposit required?',
    answer: 'Yes, most properties require a security deposit. The amount is typically equivalent to 5 weeks\' rent for annual rentals under £50,000. This deposit must be protected in a government-approved tenancy deposit scheme.'
  },
  {
    question: 'Can I rent a property if I\'m moving from overseas?',
    answer: 'Yes, we accommodate international tenants. You may need to provide additional documentation such as visa information, proof of funds, and you might need a UK-based guarantor or to pay additional rent in advance. We also offer virtual viewings for overseas applicants.'
  },
  {
    question: 'How do I list my property on rentinlondon?',
    answer: 'To list your property, create a landlord account, click on "Publish Property" in the navigation, and follow the step-by-step process. You\'ll need to provide property details, photos, availability dates, and rental terms. Our team reviews all listings to ensure quality before they go live.'
  }
];

const Index = () => {
  const handleSearch = (criteria: SearchCriteria) => {
    console.log('Search criteria:', criteria);
    // Implement search functionality
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection onSearch={handleSearch} />
        <FeaturedProperties properties={featuredProperties} />
        <Testimonials testimonials={testimonials} />
        <FaqAccordion faqs={faqs} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
