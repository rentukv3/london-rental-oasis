
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/PropertyCard';
import PropertySearch from '@/components/PropertySearch';
import { Property } from '@/types';
import { SearchCriteria } from '@/types/search.types';
import { normalizeProperty, createPropertyImageFromUrl } from '@/utils/dataUtils';
import { Button } from '@/components/ui/button';

// Sample data
const allProperties: Property[] = [
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
  }),
  normalizeProperty({
    id: '4',
    title: 'Luxury 3 Bed Townhouse',
    location: 'Kensington, London SW7',
    price: 3500,
    propertyType: 'house',
    bedrooms: 3,
    bathrooms: 2,
    images: [createPropertyImageFromUrl('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop')],
    isFeatured: true
  }),
  normalizeProperty({
    id: '5',
    title: 'Modern 1 Bed with Balcony',
    location: 'Shoreditch, London EC2',
    price: 1650,
    propertyType: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    images: [createPropertyImageFromUrl('https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1470&auto=format&fit=crop')]
  }),
  normalizeProperty({
    id: '6',
    title: 'Charming Studio near Underground',
    location: 'Brixton, London SW9',
    price: 1100,
    propertyType: 'studio',
    bedrooms: 0,
    bathrooms: 1,
    images: [createPropertyImageFromUrl('https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1471&auto=format&fit=crop')]
  })
];

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>(allProperties);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;
  
  const handleSearch = (criteria: SearchCriteria) => {
    console.log('Search criteria:', criteria);
    // Filter properties based on search criteria
    // This is a simple client-side filtering; in a real app, this would be a server-side search
    const filtered = allProperties.filter(property => {
      const locationMatch = !criteria.location || 
        (property.location && property.location.toLowerCase().includes(criteria.location.toLowerCase()));
      const typeMatch = !criteria.propertyType || 
        (property.propertyType && property.propertyType.toLowerCase() === criteria.propertyType.toLowerCase());
      const priceMatch = !criteria.priceMax || (property.price !== undefined && property.price <= criteria.priceMax);
      
      return locationMatch && typeMatch && priceMatch;
    });
    
    setProperties(filtered);
    setCurrentPage(1);
  };
  
  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Properties for Rent</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <PropertySearch onSearch={handleSearch} />
            </div>
            
            {properties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => paginate(currentPage - 1)} 
                      disabled={currentPage === 1}
                      className="border-gray-300"
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <Button
                        key={number}
                        variant={number === currentPage ? "default" : "outline"}
                        onClick={() => paginate(number)}
                        className={number === currentPage ? 'bg-rent-blue hover:bg-rent-blue-light' : 'border-gray-300'}
                      >
                        {number}
                      </Button>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      onClick={() => paginate(currentPage + 1)} 
                      disabled={currentPage === totalPages}
                      className="border-gray-300"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No properties found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertiesPage;
