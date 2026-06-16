import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Wifi, Wind, Shield } from "lucide-react";
import { PropertyCardDTO } from "@/types";
import { MatchScore } from "./MatchScore";
import { Button } from "@/components/ui/Button";
import { Heart } from "lucide-react";

interface PropertyCardProps {
  property: PropertyCardDTO;
  onFavoriteToggle?: (e: React.MouseEvent) => void;
  isFavorite?: boolean;
}

export function PropertyCard({ property, onFavoriteToggle, isFavorite }: PropertyCardProps) {
  // Format price
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(property.price);

  // Get display photo (first photo or placeholder)
  const displayPhoto = property.photos && property.photos.length > 0 
    ? (property.photos[0] as any).url 
    : "https://res.cloudinary.com/demo/image/upload/v1611099688/sample.jpg";

  // Quick format for area
  const formattedArea = property.area.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());

  return (
    <Link href={`/properties/${property.slug}`} className="block h-full group">
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col h-full card-hover hover:border-primary/30">
        
        {/* Image Section */}
        <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
          <Image
            src={displayPhoto}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {property.propertyType === "pg" && (
              <span className="px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
                PG
              </span>
            )}
            {property.propertyType === "hostel" && (
              <span className="px-3 py-1 bg-rose-500 text-white text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
                Hostel
              </span>
            )}
            {property.propertyType === "room" && (
              <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
                Room
              </span>
            )}
          </div>
          
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {property.genderPreference === "boys" && (
              <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                <Users className="w-3 h-3" /> Boys
              </span>
            )}
            {property.genderPreference === "girls" && (
              <span className="px-3 py-1 bg-pink-500/90 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                <Users className="w-3 h-3" /> Girls
              </span>
            )}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col gap-4">
          <div>
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              <div className="text-right shrink-0">
                <span className="font-bold text-lg text-primary block leading-none">{formattedPrice}</span>
                <span className="text-xs text-slate-500 font-medium">/ month</span>
              </div>
            </div>
            
            <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-1 truncate">
              <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
              {property.address}, {formattedArea}
            </p>
          </div>

          {/* Quick Amenities */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-auto pt-4 border-t border-slate-100">
            {property.amenities?.ac && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Wind className="w-4 h-4 text-blue-500" /> AC Available
              </div>
            )}
            {property.amenities?.wifi && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Wifi className="w-4 h-4 text-indigo-500" /> Free WiFi
              </div>
            )}
            {property.amenities?.foodAvailable && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-4 h-4 flex items-center justify-center text-orange-500 text-lg">🍲</span> Food Included
              </div>
            )}
            {property.amenities?.cctv && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Shield className="w-4 h-4 text-green-500" /> CCTV
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
