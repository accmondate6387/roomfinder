import { connectToDatabase } from "@/lib/db/connection";
import Favorite from "@/lib/db/models/Favorite";
import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Heart } from "lucide-react";
import { Types } from "mongoose";

export const metadata = {
  title: "My Favorites - RoomFinder",
  description: "View your favorite properties on RoomFinder Prayagraj.",
};

export default async function FavoritesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

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
    .filter(Boolean); // Remove nulls if property was deleted/unapproved

  const serializedProperties = JSON.parse(JSON.stringify(savedProperties));

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Favorites</h1>
        <p className="text-slate-500">
          You have {serializedProperties.length} saved {serializedProperties.length === 1 ? 'property' : 'properties'}.
        </p>
      </div>

      {serializedProperties.length === 0 ? (
        <EmptyState
          icon="Heart"
          title="No favorites yet"
          description="You haven't saved any properties to your favorites yet. Start exploring to find your perfect room."
          actionLabel="Browse Properties"
          actionHref="/properties"
        />
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
