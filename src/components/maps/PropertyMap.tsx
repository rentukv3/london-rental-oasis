import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Property } from '@/types';
import 'leaflet/dist/leaflet.css';

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
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {properties.map((property) => {
        if (!property.latitude || !property.longitude) return null;
        return (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{property.title}</h3>
                <p>{property.price} {property.currency}</p>
                <a
                  href={`/properties/${property.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}; 