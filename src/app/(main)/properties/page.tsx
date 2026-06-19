import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Search, SlidersHorizontal, MapPin, Building2, Users, X, Sparkles, Home } from "lucide-react";

export const metadata = {
  title: "Browse Properties",
  description: "Find the best rooms, PGs, and hostels in Prayagraj.",
};

export default async function PropertiesPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const area = searchParams?.area as string;
  const type = searchParams?.type as string;
  const gender = searchParams?.gender as string;
  const hasFilters = area || type || gender;

  await connectToDatabase();

  const query: any = {
    approvalStatus: "approved",
    availability: "available",
  };

  if (area) query.area = area;
  if (type) query.propertyType = type;
  if (gender) query.genderPreference = gender;

  const properties = await Property.find(query)
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  const serializedProperties = JSON.parse(JSON.stringify(properties));

  const filterLinks = {
    areas: ["civil-lines", "katra", "allahpur", "george-town", "jhusi"],
    types: ["room", "pg", "hostel", "flat"],
  };

  return (
    <div className="bg-gradient-to-b from-violet-50/50 via-white to-white 
    min-h-screen w-full">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-60 shrink-0 hidden md:block">
            <div className="sticky top-24 bg-white rounded-3xl border border-violet-100 p-5 shadow-md shadow-violet-50">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-violet-50">
                <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                  <SlidersHorizontal className="w-4 h-4 text-violet-600" />
                  Filters
                </div>
                {hasFilters && (
                  <Link href="/properties" className="text-xs font-bold text-violet-600 hover:underline">
                    Clear all
                  </Link>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-violet-500" /> Area
                  </h3>
                  <div className="space-y-1">
                    {filterLinks.areas.map((a) => (
                      <Link
                        key={a}
                        href={`/properties?area=${a}`}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                          area === a
                            ? "bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 border border-violet-100"
                            : "text-slate-600 hover:bg-violet-50 hover:text-slate-900"
                        }`}
                      >
                        {a.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                        {area === a && <div className="w-1.5 h-1.5 rounded-full bg-violet-600 shadow-lg shadow-violet-500/50" />}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-violet-500" /> Type
                  </h3>
                  <div className="space-y-1">
                    {filterLinks.types.map((t) => (
                      <Link
                        key={t}
                        href={`/properties?type=${t}${area ? `&area=${area}` : ''}`}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                          type === t
                            ? "bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 border border-violet-100"
                            : "text-slate-600 hover:bg-violet-50 hover:text-slate-900"
                        }`}
                      >
                        {t.toUpperCase()}
                        {type === t && <div className="w-1.5 h-1.5 rounded-full bg-violet-600 shadow-lg shadow-violet-500/50" />}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-2xl font-extrabold text-slate-900">
                    {area ? `${area.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}` : "All Properties"}
                  </h1>
                </div>
                <p className="text-slate-500 text-sm font-medium ml-[52px]">
                  {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
                  {hasFilters && ' with current filters'}
                </p>
              </div>

              {/* Active Filters */}
              {hasFilters && (
                <div className="flex flex-wrap gap-2">
                  {area && (
                    <Link
                      href={`/properties?${type ? `type=${type}` : ''}${gender ? `&gender=${gender}` : ''}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 text-violet-700 text-xs font-bold rounded-xl hover:bg-violet-100 transition-colors border border-violet-200"
                    >
                      {area.replace("-", " ")} <X className="w-3 h-3" />
                    </Link>
                  )}
                  {type && (
                    <Link
                      href={`/properties?${area ? `area=${area}` : ''}${gender ? `&gender=${gender}` : ''}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 text-violet-700 text-xs font-bold rounded-xl hover:bg-violet-100 transition-colors border border-violet-200"
                    >
                      {type.toUpperCase()} <X className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              )}
            </div>

            {properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border-2 border-dashed border-violet-200 bg-violet-50/30 min-h-[400px]">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-violet-400" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">No properties found</h3>
                <p className="text-slate-500 max-w-sm mb-8 font-medium">
                  We couldn&apos;t find any properties matching your filters. Try adjusting your search criteria.
                </p>
                <Link href="/properties">
                  <Button className="rounded-2xl">Clear Filters</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {serializedProperties.map((property: any) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
