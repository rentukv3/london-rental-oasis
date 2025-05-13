
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { SearchCriteria, PropertyType } from '@/types';
import { Search } from 'lucide-react';

interface PropertySearchProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const PropertySearch: React.FC<PropertySearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceMax, setPriceMax] = useState<number>(5000);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location,
      propertyType,
      priceMax
    });
  };
  
  const propertyTypes: PropertyType[] = ['Apartment', 'House', 'Studio', 'Room'];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Search Properties</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <Input
              id="location"
              placeholder="Enter address, neighborhood, or zipcode"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select
              id="property-type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full h-10 px-3 border border-input rounded-md"
            >
              <option value="">All property types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (up to)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">£</span>
              <Input
                id="price"
                type="number"
                min="0"
                step="100"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="pl-7"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button 
            type="submit" 
            className="w-full bg-rent-blue hover:bg-rent-blue-light text-white"
          >
            Search Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertySearch;
