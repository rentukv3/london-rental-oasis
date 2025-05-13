import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Property } from '@/types';
import { normalizeProperty, createPropertyImageFromUrl } from '@/utils/dataUtils';

// Sample data - in a real app, this would come from an API
const properties: Property[] = [
  normalizeProperty({
    id: '1',
    title: 'Modern Studio in Chelsea',
    description: 'A beautiful modern studio apartment in the heart of Chelsea. This bright and airy property features high ceilings, wooden floors, and modern appliances. The apartment has been recently renovated and includes a fully equipped kitchen, a spacious bathroom with a rain shower, and ample storage space.',
    location: 'Chelsea, London SW3',
    price: 1800,
    propertyType: 'studio',
    bedrooms: 1,
    bathrooms: 1,
    images: [createPropertyImageFromUrl('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470&auto=format&fit=crop')],
    amenities: ['WiFi', 'Dishwasher', 'Washing Machine', 'Central Heating', 'TV'],
    isFeatured: true
  }),
  normalizeProperty({
    id: '2',
    title: 'Luxury 2 Bed Apartment with Balcony',
    description: 'A stunning two-bedroom apartment in the vibrant area of Shoreditch. This luxury property features a spacious open-plan living area with floor-to-ceiling windows leading to a private balcony with city views. The kitchen is fully equipped with high-end appliances, and both bedrooms come with en-suite bathrooms.',
    location: 'Shoreditch, London EC2',
    price: 2800,
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    images: [createPropertyImageFromUrl('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1380&auto=format&fit=crop')],
    amenities: ['Balcony', 'Dishwasher', 'Washing Machine', 'Elevator', 'Gym', '24/7 Security'],
    isFeatured: true
  }),
  normalizeProperty({
    id: '3',
    title: 'Cozy Room in Shared House',
    description: 'A comfortable and well-furnished room in a friendly shared house in Brixton. The room includes a double bed, wardrobe, desk, and chair. Shared facilities include a modern kitchen, two bathrooms, a living room with a smart TV, and a small garden. All bills and WiFi are included in the rent.',
    location: 'Brixton, London SW9',
    price: 950,
    propertyType: 'room',
    bedrooms: 1,
    bathrooms: 1,
    images: [createPropertyImageFromUrl('https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1470&auto=format&fit=crop')],
    amenities: ['Bills Included', 'WiFi', 'Shared Garden', 'Furnished', 'Washing Machine'],
    availableFrom: '2025-07-15'
  })
];

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the property with the matching ID
  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
              <p>Sorry, the property you are looking for could not be found.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Property Image */}
            <div>
              {property.images && property.images.length > 0 ? (
                <img src={property.images[0].url} alt={property.title} className="w-full h-auto rounded-lg shadow-md" />
              ) : (
                <div className="bg-gray-200 aspect-w-16 aspect-h-9 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>
            
            {/* Property Details */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
              <p className="text-gray-600 mb-4">{property.location}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-semibold text-rental-price">£{property.price} <span className="text-gray-500">/ month</span></span>
                {property.isFeatured && (
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-featured-tag text-white">
                    Featured
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">{property.description}</p>
              
              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Amenities</h2>
                  <ul className="list-disc list-inside text-gray-600">
                    {property.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Availability */}
              {property.availableFrom && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Availability</h2>
                  <p className="text-gray-600">Available from: {new Date(property.availableFrom).toLocaleDateString()}</p>
                </div>
              )}
              
              {/* Contact Form or Call to Action */}
              <div>
                <button className="bg-rent-blue hover:bg-rent-blue-light text-white font-bold py-2 px-4 rounded">
                  Contact Agent
                </button>
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
