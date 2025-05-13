
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  const steps = [
    {
      title: 'Create an Account',
      description: 'Sign up as a tenant looking for a place or as a landlord wanting to list your property.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: 'Search or List Property',
      description: 'Browse our extensive listings or create your own property listing with detailed information and photos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: 'Schedule Viewings',
      description: 'Arrange property viewings at times that work for you, directly through our platform.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Application & Screening',
      description: 'Complete rental applications online and go through our streamlined verification process.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Secure Your Rental',
      description: 'Sign the lease agreement and make payments securely through our platform.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];
  
  const features = [
    {
      title: 'Verified Listings',
      description: 'All properties are verified by our team to ensure quality and accuracy.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    {
      title: 'Virtual Tours',
      description: 'Browse properties with 3D virtual tours and high-quality photos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Secure Payments',
      description: 'Process rent payments securely through our trusted payment system.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Area Insights',
      description: 'Get detailed information about neighborhoods, amenities, and transport links.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">How It Works</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Our platform makes finding and renting London properties simple, secure, and stress-free for tenants and landlords alike.
            </p>
          </div>
        </div>
        
        {/* Steps Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">The Process</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-4">{step.icon}</div>
                  <div className="bg-rent-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-rent-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect London Home?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join thousands of happy tenants who found their ideal rental property through our platform.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-white text-rent-blue hover:bg-gray-100">
                Start Your Search
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-rent-blue">
                List Your Property
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
