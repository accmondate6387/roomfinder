import { connectToDatabase } from "@/lib/db/connection";
import Favorite from "@/lib/db/models/Favorite";
import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { Types } from "mongoose";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "My Favorites - RoomFinder",
  description: "View your favorite properties on RoomFinder Prayagraj.",
};

export default async function FavoritesPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  await connectToDatabase();

  const favorites = await Favorite.find({ user: new Types.ObjectId(session.user.id) })
    .populate({
      path: "property",
      match: { approvalStatus: "approved" },
    })
    .sort({ createdAt: -1 })
    .lean();

  const savedProperties = favorites
    .map((fav: any) => fav.property)
    .filter(Boolean);

  const serializedProperties = JSON.parse(JSON.stringify(savedProperties));

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">My Favorites</h1>
        </div>
        <p className="text-slate-500 font-medium ml-[52px]">
          You have {serializedProperties.length} saved {serializedProperties.length === 1 ? 'property' : 'properties'}.
        </p>
      </div>

      {serializedProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border-2 border-dashed border-violet-200 bg-violet-50/30 min-h-[400px]">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-rose-400" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">No favorites yet</h3>
          <p className="text-slate-500 max-w-sm mb-8 font-medium">
            You haven&apos;t saved any properties to your favorites yet. Start exploring to find your perfect room.
          </p>
          <Link href="/properties">
            <Button size="lg" className="gap-2 rounded-2xl">
              Browse Properties <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {serializedProperties.map((property: any) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
