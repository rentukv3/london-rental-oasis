
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
  return (
    <MapContainer
      style={{ height: '400px', width: '100%' }}
      zoom={zoom}
      center={center as L.LatLngExpression}
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
            position={[property.latitude, property.longitude] as L.LatLngExpression}
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
