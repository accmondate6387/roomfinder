import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Wifi, Wind, Shield, Heart, BedDouble, Sparkles } from "lucide-react";
import { PropertyCardDTO } from "@/types";

interface PropertyCardProps {
  property: PropertyCardDTO;
  onFavoriteToggle?: (e: React.MouseEvent) => void;
  isFavorite?: boolean;
}

export function PropertyCard({ property, onFavoriteToggle, isFavorite }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(property.price);

  const displayPhoto = property.photos && property.photos.length > 0
    ? (property.photos[0] as any).url
    : "https://res.cloudinary.com/demo/image/upload/v1611099688/sample.jpg";

  const formattedArea = property.area.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());

  const typeConfig = {
    pg: { label: "PG", color: "from-indigo-500 to-violet-600" },
    hostel: { label: "Hostel", color: "from-rose-500 to-pink-600" },
    room: { label: "Room", color: "from-emerald-500 to-teal-600" },
    flat: { label: "Flat", color: "from-blue-500 to-cyan-600" },
  } as const;

  const typeInfo = typeConfig[property.propertyType as keyof typeof typeConfig] || typeConfig.room;

  return (
    <Link href={`/properties/${property.slug}`} className="block h-full group">
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-violet-100 hover:border-violet-200 hover:-translate-y-1">

        <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
          <Image
            src={displayPhoto}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <span className={`px-3 py-1 bg-gradient-to-r ${typeInfo.color} text-white text-xs font-extrabold rounded-xl shadow-lg`}>
              {typeInfo.label}
            </span>
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {property.genderPreference === "boys" && (
              <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-extrabold rounded-xl shadow-md flex items-center gap-1">
                <Users className="w-3 h-3" /> Boys
              </span>
            )}
            {property.genderPreference === "girls" && (
              <span className="px-3 py-1 bg-pink-500/90 backdrop-blur-sm text-white text-xs font-extrabold rounded-xl shadow-md flex items-center gap-1">
                <Users className="w-3 h-3" /> Girls
              </span>
            )}
          </div>

          {onFavoriteToggle && (
            <button
              onClick={onFavoriteToggle}
              className={`absolute bottom-3 right-3 p-2 rounded-xl backdrop-blur-sm transition-all ${
                isFavorite ? "bg-rose-500 text-white shadow-lg" : "bg-white/80 text-slate-600 hover:bg-white"
              } shadow-md`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col gap-3">
          <div>
            <div className="flex justify-between items-start gap-3 mb-1.5">
              <h3 className="font-extrabold text-base text-slate-900 line-clamp-1 group-hover:text-violet-700 transition-colors">
                {property.title}
              </h3>
            </div>

            <p className="text-slate-500 text-sm font-medium flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-violet-400" />
              {property.address}, {formattedArea}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-auto pt-3 border-t border-slate-100">
            {property.amenities?.ac && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                <Wind className="w-3.5 h-3.5 text-blue-500" /> AC
              </div>
            )}
            {property.amenities?.wifi && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                <Wifi className="w-3.5 h-3.5 text-indigo-500" /> WiFi
              </div>
            )}
            {property.amenities?.foodAvailable && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                <span className="text-base leading-none">🍲</span> Food
              </div>
            )}
            {property.amenities?.cctv && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                <Shield className="w-3.5 h-3.5 text-green-500" /> CCTV
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="font-extrabold text-lg bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">{formattedPrice}</span>
              <span className="text-xs text-slate-500 font-bold ml-1">/month</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
              <BedDouble className="w-3.5 h-3.5" />
              <span>{property.roomType || "Standard"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
