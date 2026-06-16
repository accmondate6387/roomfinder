import Link from "next/link";
import { MapPin, BookOpen, Coffee, Shield } from "lucide-react";
import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";

export const metadata = {
  title: "Area Insights",
  description: "Explore top areas in Prayagraj for student housing, PGs, and hostels.",
};

const AREAS_DATA = [
  {
    id: "civil-lines",
    name: "Civil Lines",
    description: "The premium and most central location in Prayagraj. Known for wide roads, safety, and excellent connectivity. Higher cost of living but unmatched convenience.",
    highlights: ["Safest neighborhood", "Premium cafes", "Central location", "Close to major coaching centers"],
    avgRent: "₹6,000 - ₹12,000",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    id: "katra",
    name: "Katra",
    description: "The ultimate student hub. If you want to be surrounded by fellow aspirants, bookstores, and budget eateries, Katra is the place. It's bustling, lively, and incredibly affordable.",
    highlights: ["Student community", "Budget-friendly", "Bookstores everywhere", "Vibrant nightlife (student style)"],
    avgRent: "₹3,000 - ₹7,000",
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    id: "allahpur",
    name: "Allahpur",
    description: "A peaceful residential area that has rapidly developed into a student-friendly zone. Great balance between quiet study environments and proximity to coaching hubs.",
    highlights: ["Peaceful environment", "Affordable", "Good local markets", "Walking distance to select coachings"],
    avgRent: "₹3,500 - ₹8,000",
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    id: "george-town",
    name: "George Town",
    description: "An upscale, quiet residential neighborhood. Ideal for students who prefer a calm, distraction-free environment while remaining close to the city center.",
    highlights: ["Extremely quiet", "Green surroundings", "Spacious properties", "Premium safety"],
    avgRent: "₹5,000 - ₹10,000",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-600",
  }
];

export default async function AreasPage() {
  await connectToDatabase();

  // Aggregate property counts per area
  const propertyCounts = await Property.aggregate([
    { $match: { approvalStatus: "approved", availability: "available" } },
    { $group: { _id: "$area", count: { $sum: 1 } } }
  ]);

  const countMap = propertyCounts.reduce((acc, curr) => {
    acc[curr._id] = curr.count;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-slate-900 text-white py-20 md:py-28 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Prayagraj Area Insights</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Not sure where to live? Explore detailed insights into Prayagraj's top student neighborhoods to find the perfect fit for your lifestyle and budget.
        </p>
      </section>

      <div className="container mx-auto px-4 md:px-6 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {AREAS_DATA.map((area) => {
            const availableCount = countMap[area.id] || 0;

            return (
              <div key={area.id} className="bg-white rounded-3xl p-8 shadow-md border border-slate-100 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">{area.name}</h2>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span className={`px-3 py-1 rounded-full ${area.lightColor} ${area.textColor}`}>
                        {availableCount} Properties Available
                      </span>
                    </div>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl ${area.color} text-white flex items-center justify-center shadow-lg shrink-0`}>
                    <MapPin className="w-8 h-8" />
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                  {area.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Avg. Monthly Rent</p>
                    <p className="font-bold text-slate-900">{area.avgRent}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Vibe</p>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <span className="font-bold text-slate-900">Study Focused</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Highlights</h3>
                  <ul className="space-y-3 mb-8">
                    {area.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-700">
                        <div className={`w-2 h-2 rounded-full ${area.color}`} />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/properties?area=${area.id}`} className="mt-auto">
                  <button className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-lg ${area.color} hover:opacity-90`}>
                    Browse properties in {area.name}
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
