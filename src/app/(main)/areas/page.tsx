import Link from "next/link";
import { MapPin, BookOpen, Coffee, Shield, ArrowRight, Sparkles, Compass } from "lucide-react";
import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Area Insights",
  description: "Explore top areas in Prayagraj for student housing, PGs, and hostels.",
};

const AREAS_DATA = [
  {
    id: "civil-lines",
    name: "Civil Lines",
    tagline: "Premium & Central",
    description: "The premium and most central location in Prayagraj. Known for wide roads, safety, and excellent connectivity. Higher cost of living but unmatched convenience.",
    highlights: ["Safest neighborhood", "Premium cafes & restaurants", "Central location", "Close to major coachings"],
    avgRent: "₹6,000 - ₹12,000",
    gradient: "from-blue-500 to-blue-700",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    id: "katra",
    name: "Katra",
    tagline: "Ultimate Student Hub",
    description: "The heart of student life. Surrounded by fellow aspirants, bookstores, and budget eateries. It's bustling, lively, and incredibly affordable.",
    highlights: ["Strong student community", "Budget-friendly living", "Bookstores everywhere", "Vibrant atmosphere"],
    avgRent: "₹3,000 - ₹7,000",
    gradient: "from-amber-500 to-orange-600",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    id: "allahpur",
    name: "Allahpur",
    tagline: "Peaceful & Affordable",
    description: "A rapidly developing student-friendly zone. Great balance between quiet study environments and proximity to coaching hubs.",
    highlights: ["Peaceful environment", "Very affordable", "Good local markets", "Walking distance to coachings"],
    avgRent: "₹3,500 - ₹8,000",
    gradient: "from-emerald-500 to-teal-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "george-town",
    name: "George Town",
    tagline: "Quiet & Upscale",
    description: "An upscale, quiet residential neighborhood. Ideal for students who prefer a calm, distraction-free environment close to the city center.",
    highlights: ["Extremely quiet", "Green surroundings", "Spacious properties", "Premium safety"],
    avgRent: "₹5,000 - ₹10,000",
    gradient: "from-violet-500 to-purple-700",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    iconBg: "bg-violet-100 text-violet-600",
  },
];

export default async function AreasPage() {
  await connectToDatabase();

  const propertyCounts = await Property.aggregate([
    { $match: { approvalStatus: "approved", availability: "available" } },
    { $group: { _id: "$area", count: { $sum: 1 } } }
  ]);

  const countMap = propertyCounts.reduce((acc, curr) => {
    acc[curr._id] = curr.count;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 gradient-bg-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.12),transparent_50%)]" />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm font-bold mb-6 backdrop-blur-sm">
            <Compass className="w-4 h-4 text-amber-400" />
            Explore Neighborhoods
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            Prayagraj Area Insights
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Not sure where to live? Explore detailed insights into Prayagraj&apos;s top student neighborhoods
            to find the perfect fit for your lifestyle and budget.
          </p>
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 -mt-12 md:-mt-16 relative z-10 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {AREAS_DATA.map((area) => {
            const availableCount = countMap[area.id] || 0;

            return (
              <div key={area.id} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 card-hover shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-slate-900">{area.name}</h2>
                    <span className={`inline-block text-xs font-extrabold px-3 py-1 rounded-xl border ${area.badge}`}>
                      {area.tagline}
                    </span>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl ${area.iconBg} flex items-center justify-center shadow-md shrink-0`}>
                    <MapPin className="w-7 h-7" />
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  {area.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider mb-1">Avg. Rent</p>
                    <p className="font-extrabold text-slate-900 text-sm">{area.avgRent}</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider mb-1">Available</p>
                    <p className="font-extrabold text-slate-900 text-sm">{availableCount} properties</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">Highlights</p>
                  <div className="grid grid-cols-2 gap-2">
                    {area.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${area.gradient}`} />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                <Link href={`/properties?area=${area.id}`}>
                  <Button
                    className={`w-full bg-gradient-to-r ${area.gradient} text-white hover:opacity-90 gap-2 rounded-2xl font-extrabold shadow-md`}
                  >
                    Browse in {area.name} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
