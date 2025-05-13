
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Property } from '@/types';
import { ArrowLeft, MapPin, Home, Bed, Bath, Calendar, Heart } from 'lucide-react';

// Sample property data (in a real app, this would come from an API)
const propertySample: Record<string, Property> = {
  '1': {
    id: '1',
    title: 'Modern Studio in Chelsea',
    location: 'Chelsea, London SW3',
    price: 1800,
    propertyType: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470&auto=format&fit=crop'],
    description: 'A beautifully presented studio apartment in the heart of Chelsea. This property features a modern kitchen, stylish bathroom, and ample storage space. Perfect for young professionals.',
    isFeatured: true
  },
  '2': {
    id: '2',
    title: 'Luxury 2 Bed Apartment with Balcony',
    location: 'Shoreditch, London EC2',
    price: 2800,
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1380&auto=format&fit=crop'],
    description: 'Stunning 2-bedroom apartment with a private balcony offering views across the city. The property features a spacious open-plan living area, high-end kitchen appliances, and two modern bathrooms. Located in vibrant Shoreditch with easy access to transport links.',
    isFeatured: true
  },
  '3': {
    id: '3',
    title: 'Cozy Room in Shared House',
    location: 'Brixton, London SW9',
    price: 950,
    propertyType: 'Room',
    bedrooms: 1,
    bathrooms: 1,
    images: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1470&auto=format&fit=crop'],
    availableFrom: '2025-07-15',
    description: 'Comfortable room in a friendly shared house in Brixton. The house has a large kitchen, shared living room, and garden. All bills included in the rent. Available from July 15th, 2025.'
  }
};

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, we would fetch the property data from an API
  const property = propertySample[id || ''] || null;
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <p className="mb-6 text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
            <Button 
              onClick={() => navigate('/properties')}
              className="bg-rent-blue hover:bg-rent-blue-light text-white"
            >
              Browse Properties
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBookViewing = () => {
    console.log('Book viewing for property:', property.id);
    // In a real app, this would open a booking form or modal
  };

  const handleSaveProperty = () => {
    console.log('Save property:', property.id);
    // In a real app, this would save the property to the user's favorites
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Back button */}
          <Button 
            variant="ghost" 
            className="mb-6 text-gray-600 hover:text-rent-blue pl-0" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
          
          {/* Property header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-1" />
                <p>{property.location}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-3xl font-bold text-rent-blue">£{property.price} <span className="text-base font-normal text-gray-600">per month</span></p>
            </div>
          </div>
          
          {/* Property image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={property.images[0]} 
              alt={property.title} 
              className="w-full h-[400px] object-cover"
            />
          </div>
          
          {/* Property details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                <p className="text-gray-700 mb-6">{property.description}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center">
                    <Home size={20} className="mr-2 text-rent-blue" />
                    <span className="text-gray-700">{property.propertyType}</span>
                  </div>
                  <div className="flex items-center">
                    <Bed size={20} className="mr-2 text-rent-blue" />
                    <span className="text-gray-700">{property.bedrooms} {property.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath size={20} className="mr-2 text-rent-blue" />
                    <span className="text-gray-700">{property.bathrooms} {property.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}</span>
                  </div>
                </div>
                
                {property.availableFrom && (
                  <div className="flex items-center text-gray-700 mb-6">
                    <Calendar size={20} className="mr-2 text-rent-blue" />
                    <span>Available from: {property.availableFrom}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <p className="text-gray-700 mb-6">
                  Interested in this property? Schedule a viewing or contact the landlord for more information.
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-rent-blue hover:bg-rent-blue-light text-white"
                    onClick={handleBookViewing}
                  >
                    Book a Viewing
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-rent-blue text-rent-blue hover:bg-rent-blue hover:text-white"
                    onClick={handleSaveProperty}
                  >
                    <Heart size={18} className="mr-2" />
                    Save Property
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
