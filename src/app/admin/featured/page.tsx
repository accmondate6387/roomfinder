import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import Link from "next/link";
import { Sparkles, Star, ExternalLink } from "lucide-react";
import { ToggleFeaturedButton } from "./ToggleFeaturedButton";

export const metadata = {
  title: "Featured Listings - Admin",
};

export default async function AdminFeaturedPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  await connectToDatabase();

  const properties = await Property.find({ approvalStatus: "approved" })
    .select("title slug area propertyType price isFeatured photos")
    .sort({ isFeatured: -1, createdAt: -1 })
    .limit(50)
    .lean();

  const serialized = JSON.parse(JSON.stringify(properties));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Featured Listings</h1>
        </div>
        <p className="text-slate-500 text-sm font-medium ml-[52px]">
          Toggle which approved listings appear as "featured" on the homepage.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-violet-100 overflow-hidden shadow-md shadow-violet-50">
        {serialized.length === 0 ? (
          <div className="py-16 text-center">
            <Star className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-bold">No approved properties yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-violet-50">
            {serialized.map((p: any) => (
              <div key={p._id} className="flex items-center justify-between px-6 py-4 hover:bg-violet-50/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    {p.photos?.[0]?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.photos[0].url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px] font-bold">No img</div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-extrabold text-slate-900">{p.title}</p>
                      {p.isFeatured && (
                        <span className="text-[10px] font-extrabold bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {p.area?.replace(/-/g, " ")} · {p.propertyType} · ₹{Number(p.price).toLocaleString("en-IN")}/mo
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/properties/${p.slug}`} target="_blank" className="text-violet-400 hover:text-violet-600 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <ToggleFeaturedButton propertyId={p._id} isFeatured={!!p.isFeatured} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
