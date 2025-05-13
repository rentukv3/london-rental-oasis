
import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="group">
      <Card className="overflow-hidden h-full transition-transform duration-300 group-hover:shadow-lg">
        <div className="relative h-48 overflow-hidden">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0].url}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
          {property.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-rent-blue">Featured</Badge>
          )}
        </div>
        
        <CardContent className="pt-4">
          <h3 className="font-bold text-lg mb-1 group-hover:text-rent-blue transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-500 mb-3">
            <MapPin size={16} className="mr-1 flex-shrink-0" />
            <span className="text-sm truncate">{property.location || `${property.city || ''}, ${property.country || ''}`}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Bed size={16} className="mr-1 text-gray-500" />
                <span className="text-sm">{property.bedrooms}</span>
              </div>
              
              <div className="flex items-center">
                <Bath size={16} className="mr-1 text-gray-500" />
                <span className="text-sm">{property.bathrooms}</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center border-t border-gray-100 pt-4 bg-gray-50">
          <span className="font-bold text-lg text-rent-blue">£{property.price}<span className="text-xs font-normal text-gray-500">/month</span></span>
          
          <span className="text-sm text-gray-500">
            {property.availableFrom ? `Available from ${property.availableFrom}` : 'Available Now'}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
