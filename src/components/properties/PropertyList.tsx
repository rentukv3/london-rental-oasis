import React from 'react';
import { Property } from '@/types';
import { PropertyCard } from './PropertyCard';
import { useQuery } from '@tanstack/react-query';
import { getPublishedProperties } from '@/lib/property.service';

export const PropertyList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: () => getPublishedProperties(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading properties</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}; 