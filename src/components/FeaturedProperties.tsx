
import React from 'react';
import { Property } from '@/types';
import PropertyCard from './PropertyCard';
import { Button } from '@/components/ui/button';

interface FeaturedPropertiesProps {
  properties: Property[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-600 mt-2">
              Discover our hand-picked selection of the finest rental properties across London
            </p>
          </div>
          
          <div className="hidden md:block">
            <Button variant="outline" className="border-rent-blue text-rent-blue hover:bg-rent-blue hover:text-white">
              View All Properties
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="border-rent-blue text-rent-blue hover:bg-rent-blue hover:text-white">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
