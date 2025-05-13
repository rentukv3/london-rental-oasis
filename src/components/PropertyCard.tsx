
import React from 'react';
import { Property } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(property.price);
  
  const handleViewDetails = () => {
    console.log(`View details for property ${property.id}`);
    // Implement navigation to property details page
  };
  
  const handleFavorite = () => {
    console.log(`Toggle favorite for property ${property.id}`);
    // Implement favorite toggling
  };
  
  const imageUrl = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1365&auto=format&fit=crop';

  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <div className="relative">
        {property.isFeatured && (
          <span className="absolute top-2 left-2 z-10 bg-featured-tag text-white px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </span>
        )}
        
        <button 
          onClick={handleFavorite} 
          className="absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <Heart size={20} className="text-gray-600 hover:text-rent-red transition-colors" />
        </button>
        
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={property.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-2">{property.title}</h3>
          <p className="text-rental-price font-bold whitespace-nowrap">{formattedPrice}/mo</p>
        </div>
        
        <p className="text-gray-600 mb-3">{property.location}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-700">
          {property.propertyType && (
            <span>{property.propertyType}</span>
          )}
          
          {property.bedrooms !== undefined && (
            <span>{property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''}</span>
          )}
          
          {property.bathrooms !== undefined && (
            <span>{property.bathrooms} Bathroom{property.bathrooms !== 1 ? 's' : ''}</span>
          )}
        </div>
        
        {property.availableFrom ? (
          <p className="text-sm mt-2">From {new Date(property.availableFrom).toLocaleDateString('en-GB', { month: 'long', day: 'numeric' })}</p>
        ) : (
          <p className="text-sm mt-2 text-available-tag font-medium">Available Now</p>
        )}
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <Button 
          onClick={handleViewDetails} 
          className="w-full bg-rent-blue hover:bg-rent-blue-light text-white"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
