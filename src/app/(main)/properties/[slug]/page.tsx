import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, CheckCircle2, Shield, Phone, Mail, ChevronLeft, BedDouble, Bath, Maximize, Wifi, Wind, Coffee, Utensils, Refrigerator, Tv, Car, Thermometer, Dumbbell, Building2, Clock, Star, Sparkles } from "lucide-react";
import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import User from "@/lib/db/models/User";
import CoachingCenter from "@/lib/db/models/CoachingCenter";
import Review from "@/lib/db/models/Review";
import Favorite from "@/lib/db/models/Favorite";
import { auth } from "@/features/auth/auth";
import { Button } from "@/components/ui/Button";
import { MapPreview } from "@/components/map/MapPreview";
import { SocialActions } from "@/components/properties/SocialActions";
import { ReviewsSection } from "@/components/properties/ReviewsSection";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectToDatabase();
  const property = await Property.findOne({ slug }).lean();

  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.title} | RoomFinder Prayagraj`,
    description: property.description.substring(0, 160),
  };
}

export default async function PropertyDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  await connectToDatabase();

  const property = await Property.findOne({ slug })
    .populate({
      path: "owner",
      select: "name image email",
      model: User
    })
    .populate({
      path: "nearbyCoachingCenters.coachingCenterId",
      model: CoachingCenter
    })
    .lean();

  if (!property) notFound();

  const propertyIdStr = property._id.toString();
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const userRole = session?.user?.role;

  let isFavorited = false;
  if (isLoggedIn) {
    const fav = await Favorite.findOne({ userId: session!.user.id, propertyId: propertyIdStr });
    if (fav) isFavorited = true;
  }

  const rawReviews = await Review.find({ propertyId: propertyIdStr, status: "published" })
    .sort({ createdAt: -1 })
    .populate({ path: "authorId", select: "name", model: User })
    .lean();

  const existingReviews = rawReviews.map((r: any) => ({
    id: r._id.toString(),
    authorName: r.authorId?.name || "Anonymous Student",
    rating: r.rating,
    comment: r.comment,
    createdAt: r.createdAt.toISOString(),
  }));

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(property.price);

  const photos = property.photos || [];
  const displayPhoto = photos.length > 0 ? (photos[0] as any).url : "https://res.cloudinary.com/demo/image/upload/v1611099688/sample.jpg";

  const owner = (property.owner as any) || { name: "Verified Owner", email: "contact@example.com" };

  const amenities = property.amenities as any || {};
  const amenityList: { key: string; label: string; icon: React.ReactNode }[] = [
    { key: "ac", label: "AC", icon: <Thermometer className="w-5 h-5" /> },
    { key: "wifi", label: "WiFi", icon: <Wifi className="w-5 h-5" /> },
    { key: "foodAvailable", label: "Food Available", icon: <Coffee className="w-5 h-5" /> },
    { key: "cctv", label: "CCTV", icon: <Shield className="w-5 h-5" /> },
    { key: "furnished", label: "Furnished", icon: <BedDouble className="w-5 h-5" /> },
    { key: "parking", label: "Parking", icon: <Car className="w-5 h-5" /> },
    { key: "powerBackup", label: "Power Backup", icon: <Bath className="w-5 h-5" /> },
    { key: "washingMachine", label: "Washing Machine", icon: <Wind className="w-5 h-5" /> },
    { key: "geyser", label: "Geyser", icon: <Thermometer className="w-5 h-5" /> },
    { key: "fridge", label: "Refrigerator", icon: <Refrigerator className="w-5 h-5" /> },
    { key: "tv", label: "TV", icon: <Tv className="w-5 h-5" /> },
    { key: "gym", label: "Gym", icon: <Dumbbell className="w-5 h-5" /> },
  ];

  const availableAmenities = amenityList.filter(a => amenities[a.key]);

  return (
    <div className="bg-gradient-to-b from-violet-50/50 via-white to-white min-h-screen pb-20 w-full">
      {/* Hero */}
      <div className="w-full h-[45vh] md:h-[65vh] relative bg-slate-900 overflow-hidden">
        <Image
          src={displayPhoto}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute top-6 left-4 md:left-8 z-10">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white text-sm font-bold hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to listings
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="px-3.5 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-extrabold rounded-xl uppercase tracking-wider shadow-lg shadow-violet-500/30">
                    {property.propertyType}
                  </span>
                  <span className="px-3.5 py-1.5 bg-white/15 backdrop-blur-md text-white border border-white/20 text-xs font-extrabold rounded-xl uppercase tracking-wider">
                    {property.genderPreference}
                  </span>
                  {property.roomType && (
                    <span className="px-3.5 py-1.5 bg-emerald-500/80 backdrop-blur-md text-white text-xs font-extrabold rounded-xl uppercase tracking-wider">
                      {property.roomType}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
                  {property.title}
                </h1>
                <p className="text-slate-300 flex items-center gap-2 font-medium">
                  <MapPin className="w-4 h-4" />
                  {property.address}, {property.area.replace("-", " ")}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white min-w-[240px] shadow-xl">
                <p className="text-slate-300 text-xs mb-1 uppercase tracking-wider font-extrabold">Monthly Rent</p>
                <div className="flex items-end gap-2 mb-4">
                  <p className="text-4xl font-extrabold">{formattedPrice}</p>
                  <p className="text-slate-300 text-sm mb-1">/month</p>
                </div>
                <div className="flex items-center justify-between">
                  <SocialActions
                    propertyId={propertyIdStr}
                    initialIsFavorited={isFavorited}
                    isLoggedIn={isLoggedIn}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 -mt-8 md:-mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <section className="bg-white rounded-3xl border border-violet-100 p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">About this Property</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                {property.description}
              </p>
            </section>

            {/* Key Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Property Type", value: property.propertyType?.toUpperCase() || "N/A", icon: Building2 },
                { label: "Room Type", value: (property.roomType?.charAt(0).toUpperCase() + property.roomType?.slice(1)) || "Standard", icon: BedDouble },
                { label: "Status", value: property.availability?.replace("-", " ").toUpperCase() || "N/A", icon: Users },
                { label: "Deposit", value: property.securityDeposit ? `₹${Number(property.securityDeposit).toLocaleString('en-IN')}` : "N/A", icon: Shield },
              ].map((detail) => {
                const Icon = detail.icon;
                return (
                  <div key={detail.label} className="bg-white rounded-2xl border border-slate-200 p-4 text-center hover:border-violet-200 hover:shadow-md hover:shadow-violet-50 transition-all">
                    <Icon className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-500 font-extrabold">{detail.label}</p>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">{detail.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Amenities */}
            {availableAmenities.length > 0 && (
              <section className="bg-white rounded-3xl border border-violet-100 p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-extrabold text-slate-900 mb-5">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableAmenities.map((a) => (
                    <div key={a.key} className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 text-white shadow-md">
                        {a.icon}
                      </div>
                      <span className="text-sm font-extrabold text-slate-700">{a.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Nearby Coaching Centers */}
            {property.nearbyCoachingCenters && property.nearbyCoachingCenters.length > 0 && (
              <section className="bg-white rounded-3xl border border-violet-100 p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-extrabold text-slate-900 mb-5">Nearby Coaching Centers</h2>
                <div className="space-y-3">
                  {property.nearbyCoachingCenters.map((nc: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900 text-sm">{nc.coachingCenterId?.name || "Coaching Center"}</p>
                          <p className="text-xs font-bold text-slate-500">{nc.coachingCenterId?.category?.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-emerald-600 text-sm">{nc.distanceKm} km</p>
                        <p className="text-xs font-bold text-slate-500">away</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Map */}
            <section className="bg-white rounded-3xl border border-violet-100 p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-900 mb-5">Location</h2>
              <div className="rounded-2xl overflow-hidden border border-slate-200 h-[300px]">
                <MapPreview
                  latitude={property.location.coordinates[1]}
                  longitude={property.location.coordinates[0]}
                  title={property.title}
                  coachingCenters={
                    property.nearbyCoachingCenters?.map((nc: any) => ({
                      id: nc.coachingCenterId?._id?.toString() || Math.random().toString(),
                      name: nc.coachingCenterId?.name || "Coaching Center",
                      lat: nc.coachingCenterId?.location?.coordinates?.[1] || 0,
                      lng: nc.coachingCenterId?.location?.coordinates?.[0] || 0,
                      distanceKm: nc.distanceKm
                    })).filter((c: any) => c.lat !== 0) || []
                  }
                />
              </div>
              <p className="mt-3 text-sm text-slate-500 flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4 text-violet-400" />
                {property.address}, {property.area.replace("-", " ")}, {property.city}
              </p>
            </section>

            {/* Reviews */}
            <ReviewsSection
              propertyId={propertyIdStr}
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              existingReviews={existingReviews}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-violet-100 p-6 sticky top-24 shadow-md shadow-violet-50">
              <div className="flex items-center gap-4 mb-6 pb-5 border-b border-violet-100">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 overflow-hidden relative flex items-center justify-center text-violet-600 font-extrabold text-xl shrink-0">
                  {owner.image ? (
                    <Image src={owner.image} alt={owner.name} fill className="object-cover" />
                  ) : (
                    owner.name?.charAt(0) || "O"
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-900 truncate">{owner.name}</h3>
                  <p className="text-xs text-emerald-600 flex items-center gap-1 font-extrabold">
                    <Shield className="w-3.5 h-3.5" /> Verified Owner
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Link href={`https://wa.me/919999999999?text=Hi! I am interested in ${property.title} on RoomFinder.`} target="_blank">
                  <Button fullWidth size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white gap-2 shadow-md shadow-emerald-200 rounded-2xl">
                    <Phone className="w-5 h-5" />
                    WhatsApp
                  </Button>
                </Link>
                <Link href={`mailto:${owner.email}`}>
                  <Button variant="outline" fullWidth size="lg" className="gap-2 rounded-2xl font-extrabold">
                    <Mail className="w-5 h-5" />
                    Send Email
                  </Button>
                </Link>
              </div>

              <div className="mt-6 pt-5 border-t border-violet-100">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                  <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed font-bold">
                    RoomFinder verifies owner IDs, but we recommend visiting the property before making any payments.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
