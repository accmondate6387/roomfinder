import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { Types } from "mongoose";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { format } from "date-fns";

export const metadata = {
  title: "My Listings - Owner Dashboard",
  description: "Manage your property listings.",
};

export default async function OwnerListingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "owner") {
    redirect("/");
  }

  await connectToDatabase();

  const properties = await Property.find({ owner: new Types.ObjectId(session.user.id) })
    .sort({ createdAt: -1 })
    .lean();

  const serializedProperties = JSON.parse(JSON.stringify(properties));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Listings</h1>
          <p className="text-slate-500 mt-1">Manage your properties and availability.</p>
        </div>
        <Link href="/dashboard/listings/new">
          <Button className="gap-2">
            <Plus size={16} /> Add Listing
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {serializedProperties.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-slate-900 mb-2">No listings yet</h3>
            <p className="text-slate-500 mb-6">Create your first property listing to get started.</p>
            <Link href="/dashboard/listings/new">
              <Button>Add New Listing</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Views</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {serializedProperties.map((property: any) => (
                  <tr key={property._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-16 bg-slate-100 rounded overflow-hidden shrink-0">
                          {property.photos && property.photos.length > 0 ? (
                            <img src={property.photos[0].url} alt={property.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              No image
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 truncate max-w-[200px]">
                            {property.title}
                          </p>
                          <p className="text-slate-500 text-xs">
                            {property.area}, {property.city}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={property.approvalStatus} />
                    </td>
                    <td className="px-6 py-4 font-medium">
                      ₹{property.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {property.stats?.viewCount || 0}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {format(new Date(property.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {property.approvalStatus === "approved" && (
                          <Link href={`/properties/${property.slug}`} target="_blank">
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary">
                              <Eye size={18} />
                            </Button>
                          </Link>
                        )}
                        <Link href={`/dashboard/listings/${property._id}/edit`}>
                          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary">
                            <Edit size={18} />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-rose-600">
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
