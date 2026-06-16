"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

// Dynamically import the inner map component with SSR disabled
const MapPreviewInner = dynamic(
  () => import("./MapPreviewInner"),
  { 
    ssr: false,
    loading: () => <Skeleton className="w-full h-full rounded-2xl" />
  }
);

interface CoachingCenterPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distanceKm: number;
}

interface MapPreviewProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  title?: string;
  coachingCenters?: CoachingCenterPoint[];
  className?: string;
}

export function MapPreview({
  latitude,
  longitude,
  zoom = 15,
  title,
  coachingCenters = [],
  className = "h-[400px] w-full"
}: MapPreviewProps) {
  return (
    <div className={className}>
      <MapPreviewInner
        latitude={latitude}
        longitude={longitude}
        zoom={zoom}
        title={title}
        coachingCenters={coachingCenters}
      />
    </div>
  );
}
