"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon path issues with Webpack
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom icon for coaching centers
const coachingIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface CoachingCenterPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distanceKm: number;
}

interface MapPreviewInnerProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  title?: string;
  coachingCenters?: CoachingCenterPoint[];
}

export default function MapPreviewInner({
  latitude,
  longitude,
  zoom = 15,
  title = "Property Location",
  coachingCenters = [],
}: MapPreviewInnerProps) {
  useEffect(() => {
    // Clean up leaflet container on unmount to prevent 'Map container is already initialized' error in React strict mode
    return () => {
      const mapContainer = L.DomUtil.get("map");
      if (mapContainer != null) {
        (mapContainer as any)._leaflet_id = null;
      }
    };
  }, []);

  return (
    <div id="map" className="w-full h-full rounded-2xl overflow-hidden z-0 relative shadow-inner border border-slate-200">
      <MapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Property Marker */}
        <Marker position={[latitude, longitude]} icon={icon}>
          <Popup>
            <div className="font-bold text-slate-900">{title}</div>
            <div className="text-sm text-slate-500">Selected Location</div>
          </Popup>
        </Marker>

        {/* 1km walking radius circle */}
        <Circle
          center={[latitude, longitude]}
          radius={1000} // 1km in meters
          pathOptions={{ fillColor: "#4f46e5", fillOpacity: 0.05, color: "#4f46e5", weight: 1, dashArray: "5, 5" }}
        />

        {/* Nearby Coaching Centers Markers */}
        {coachingCenters.map((cc) => (
          <Marker key={cc.id} position={[cc.lat, cc.lng]} icon={coachingIcon}>
            <Popup>
              <div className="font-bold text-slate-900">{cc.name}</div>
              <div className="text-sm text-slate-600">
                Coaching Center
              </div>
              <div className="text-xs text-primary font-medium mt-1">
                {cc.distanceKm.toFixed(1)} km away
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
