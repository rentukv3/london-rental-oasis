
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import { Faq } from '@/types';

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
  },
  {
    question: 'What happens if there\'s an issue with my rental?',
    answer: 'For any issues with your rental, you can contact your landlord or property manager directly through our messaging system. If you don\'t receive a satisfactory response, our support team is available to help mediate and resolve the situation.'
  },
  {
    question: 'Can I renew my lease through rentinlondon?',
    answer: 'Yes, lease renewals can be processed through our platform. We\'ll send a notification when your lease is approaching its end date, and you can choose to renew, negotiate terms, or provide notice to vacate through our system.'
  },
  {
    question: 'Are there any fees for tenants?',
    answer: 'Under the Tenant Fees Act, most tenant fees are banned in England. You will only need to pay your rent, security deposit, and potentially a holding deposit (capped at one week\'s rent). There may be charges for late rent payments or lost keys.'
  },
  {
    question: 'How can I filter properties based on my specific requirements?',
    answer: 'Our advanced search feature allows you to filter properties based on numerous criteria including location, price range, property type, number of bedrooms, pet-friendly options, furnished/unfurnished, proximity to transport links, and many other amenities.'
  }
];

const FAQPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h1>
              <p className="text-gray-600 text-center mb-10">
                Find answers to the most common questions about renting properties in London
              </p>
              
              <FaqAccordion faqs={faqs} />
              
              <div className="mt-12 text-center">
                <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
                <p className="text-gray-600 mb-6">
                  If you can't find the answer you're looking for, please contact our support team.
                </p>
                <a 
                  href="/contact" 
                  className="inline-block bg-rent-blue hover:bg-rent-blue-light text-white font-medium px-6 py-3 rounded-md transition duration-150"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
