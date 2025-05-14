
import React from 'react';
import { Property } from '@/types';
import PropertyCard from '@/components/PropertyCard'; // Corrected import path
import { useQuery } from '@tanstack/react-query';
import { getPublishedProperties } from '@/lib/property.service';

export const PropertyList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: () => getPublishedProperties(),
  });

  if (isLoading) return <div className="p-4">Loading properties...</div>;
  
  if (error) {
    console.error('Error loading properties:', error);
    return <div className="p-4 text-red-500">Error loading properties. Please try again later.</div>;
  }

  if (!data || !data.properties || data.properties.length === 0) {
    return <div className="p-4">No properties found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
