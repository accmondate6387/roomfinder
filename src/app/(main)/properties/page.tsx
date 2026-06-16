import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";

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

  // Need to stringify/parse to pass Mongoose docs to Client Components
  const serializedProperties = JSON.parse(JSON.stringify(properties));

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters (Desktop) */}
      <aside className="w-full md:w-64 shrink-0 hidden md:block">
        <div className="sticky top-24 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-lg mb-6 pb-4 border-b border-slate-100">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            Filters
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Area</h3>
              <div className="space-y-2">
                {["civil-lines", "katra", "allahpur", "george-town", "jhusi"].map((a) => (
                  <Link 
                    key={a} 
                    href={`/properties?area=${a}`}
                    className={`block text-sm transition-colors ${area === a ? "text-primary font-semibold" : "text-slate-600 hover:text-slate-900"}`}
                  >
                    {a.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Property Type</h3>
              <div className="space-y-2">
                {["room", "pg", "hostel", "flat"].map((t) => (
                  <Link 
                    key={t} 
                    href={`/properties?type=${t}${area ? `&area=${area}` : ''}`}
                    className={`block text-sm transition-colors ${type === t ? "text-primary font-semibold" : "text-slate-600 hover:text-slate-900"}`}
                  >
                    {t.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link href="/properties">
              <Button variant="outline" fullWidth size="sm" className="mt-4">
                Clear Filters
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Properties in Prayagraj</h1>
            <p className="text-slate-500">Showing {properties.length} results</p>
          </div>
          
          {/* Mobile Filter Trigger */}
          <Button variant="outline" className="md:hidden gap-2">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </Button>
        </div>

        {properties.length === 0 ? (
          <EmptyState
            icon="Search"
            title="No properties found"
            description="We couldn't find any properties matching your filters. Try adjusting your search criteria."
            actionLabel="Clear Filters"
            onAction={() => {}}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serializedProperties.map((property: any) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
