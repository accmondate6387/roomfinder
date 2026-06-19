import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { Types } from "mongoose";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, Eye, Building2, Sparkles } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { format } from "date-fns";

export const metadata = {
  title: "My Listings - Owner Dashboard",
  description: "Manage your property listings.",
};

export default async function OwnerListingsPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "owner") redirect("/");

  await connectToDatabase();

  const properties = await Property.find({ owner: new Types.ObjectId(session.user.id) })
    .sort({ createdAt: -1 })
    .lean();

  const serializedProperties = JSON.parse(JSON.stringify(properties));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">My Listings</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium ml-[52px]">Manage your properties and availability.</p>
        </div>
        <Link href="/dashboard/listings/new">
          <Button className="gap-2 rounded-2xl">
            <Plus className="w-4 h-4" /> Add Listing
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-violet-100 overflow-hidden shadow-md shadow-violet-50">
        {serializedProperties.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">No listings yet</h3>
            <p className="text-slate-500 text-sm font-medium mb-6">Create your first property listing to get started.</p>
            <Link href="/dashboard/listings/new">
              <Button className="rounded-2xl">Add New Listing</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-violet-100 bg-gradient-to-r from-violet-50/50 to-indigo-50/50">
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Views</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-50">
                {serializedProperties.map((property: any) => (
                  <tr key={property._id} className="hover:bg-violet-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                          {property.photos && property.photos.length > 0 ? (
                            <img src={property.photos[0].url} alt={property.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px] font-bold">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-extrabold text-slate-900 truncate max-w-[200px]">
                            {property.title}
                          </p>
                          <p className="text-slate-500 text-xs mt-0.5 font-medium">
                            {property.area.replace(/-/g, ' ')} &middot; {property.propertyType}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={property.approvalStatus} />
                    </td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">
                      ₹{Number(property.price).toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {property.stats?.viewCount || 0}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm font-medium whitespace-nowrap">
                      {format(new Date(property.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-1">
                        {property.approvalStatus === "approved" && (
                          <Link href={`/properties/${property.slug}`} target="_blank">
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-violet-600">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                        )}
                        <Link href={`/dashboard/listings/${property._id}/edit`}>
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-violet-600">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-rose-500">
                          <Trash2 className="w-4 h-4" />
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
