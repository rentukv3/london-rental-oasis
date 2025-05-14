
import React from 'react';
import { Property } from '@/types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet marker icon issue
// This is needed because the marker icons are not properly imported by default
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

interface PropertyMapProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
}

export const PropertyMap = ({
  properties,
  center = [51.505, -0.09], // London default
  zoom = 13,
}: PropertyMapProps) => {
  // Use a ref for map container
  const mapRef = React.useRef<HTMLDivElement>(null);
  
  // Initialize map after component mounts
  React.useEffect(() => {
    if (!mapRef.current) return;
    
    // Create map instance
    const map = L.map(mapRef.current).setView(center, zoom);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add markers for each property
    properties.forEach(property => {
      if (!property.latitude || !property.longitude) return;
      
      const marker = L.marker([property.latitude, property.longitude]).addTo(map);
      
      // Add popup with property info
      marker.bindPopup(`
        <div>
          <h3 class="font-bold">${property.title}</h3>
          <p>${property.price || 'Price not specified'} ${property.currency || 'GBP'}</p>
          <a href="/property/${property.id}" class="text-blue-500 hover:underline">
            View Details
          </a>
        </div>
      `);
    });
    
    // Clean up on unmount
    return () => {
      map.remove();
    };
  }, [properties, center, zoom]);
  
  return (
    <div 
      ref={mapRef}
      style={{ height: '400px', width: '100%' }}
      className="rounded-lg shadow-md"
    />
  );
};

export default PropertyMap;
