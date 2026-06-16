import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, CheckCircle2, Shield, Phone, Mail } from "lucide-react";
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

  if (!property) {
    notFound();
  }

  const propertyIdStr = property._id.toString();
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const userRole = session?.user?.role;

  // Check if favorited by current user
  let isFavorited = false;
  if (isLoggedIn) {
    const fav = await Favorite.findOne({ userId: session!.user.id, propertyId: propertyIdStr });
    if (fav) isFavorited = true;
  }

  // Fetch reviews
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

  // Mock data for Owner to ensure rendering works without breaking if population failed
  const owner = (property.owner as any) || { name: "Verified Owner", email: "contact@example.com" };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Gallery Header */}
      <div className="w-full h-[40vh] md:h-[60vh] relative bg-slate-900 group">
        <Image
          src={displayPhoto}
          alt={property.title}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex gap-2 mb-4">
                  <span className="px-4 py-1.5 bg-primary text-white text-sm font-bold rounded-full shadow-md uppercase tracking-wider">
                    {property.propertyType}
                  </span>
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white border border-white/30 text-sm font-bold rounded-full shadow-md uppercase tracking-wider">
                    {property.genderPreference}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {property.title}
                </h1>
                <p className="text-slate-200 text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {property.address}, {property.area.replace("-", " ")}
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-white">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-slate-300 text-sm mb-1 uppercase tracking-wider font-semibold">Monthly Rent</p>
                    <p className="text-4xl font-bold text-white">{formattedPrice}</p>
                  </div>
                  <SocialActions 
                    propertyId={propertyIdStr} 
                    initialIsFavorited={isFavorited} 
                    isLoggedIn={isLoggedIn} 
                  />
                </div>
                {property.securityDeposit && (
                  <p className="text-sm text-slate-300">
                    Deposit: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(property.securityDeposit)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-8 md:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">About this Property</h2>
              <div className="prose prose-slate max-w-none">
                <p className="whitespace-pre-line text-slate-600 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>
            </section>

            {/* Amenities */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Amenities & Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                {Object.entries(property.amenities || {}).map(([key, value]) => {
                  if (!value) return null;
                  const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={key} className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      {label}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Location & Map */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Location & Map</h2>
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
              <div className="mt-4 text-slate-600 text-sm flex items-start gap-2">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                <p>{property.address}, {property.area.replace("-", " ")}, {property.city}</p>
              </div>
            </section>

            {/* Reviews Section */}
            <ReviewsSection 
              propertyId={propertyIdStr}
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              existingReviews={existingReviews}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden relative border-2 border-primary/20">
                  {owner.image ? (
                    <Image src={owner.image} alt={owner.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-white text-xl font-bold">
                      {owner.name?.charAt(0) || "O"}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{owner.name}</h3>
                  <p className="text-sm text-success flex items-center gap-1 font-medium">
                    <Shield className="w-4 h-4" /> Verified Owner
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Link href={`https://wa.me/919999999999?text=Hi! I am interested in your property ${property.title} listed on RoomFinder.`} target="_blank">
                  <Button fullWidth size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white gap-2 shadow-sm mb-3">
                    <Phone className="w-5 h-5" />
                    Contact via WhatsApp
                  </Button>
                </Link>
                <Link href={`mailto:${owner.email}`}>
                  <Button variant="outline" fullWidth size="lg" className="gap-2">
                    <Mail className="w-5 h-5" />
                    Send Email
                  </Button>
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500">
                  RoomFinder verifies owner IDs, but we recommend visiting the property before making any payments.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
