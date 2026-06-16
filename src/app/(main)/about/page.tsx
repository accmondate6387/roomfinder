import { siteConfig } from "@/config/site";
import { Shield, Users, MapPin, Search } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "Learn more about RoomFinder Prayagraj and our mission to simplify student housing.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Finding a home away from home shouldn't be hard.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-0 leading-relaxed">
            We built RoomFinder Prayagraj to bridge the gap between students, professionals, and trusted property owners. No brokers, no hidden fees, just transparent renting.
          </p>
        </div>
      </section>

      {/* Stats/Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4 text-primary">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Search</h3>
              <p className="text-slate-600 text-sm">Find properties near major coaching centers like Drishti IAS, Physics Wallah, and more.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4 text-success">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Owners</h3>
              <p className="text-slate-600 text-sm">All property owners go through an ID verification process for your safety.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-full bg-info-light flex items-center justify-center mx-auto mb-4 text-info">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Driven</h3>
              <p className="text-slate-600 text-sm">Real reviews and area insights from other students and tenants.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-full bg-warning-light flex items-center justify-center mx-auto mb-4 text-warning">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Focus</h3>
              <p className="text-slate-600 text-sm">Built exclusively for Prayagraj, understanding the specific needs of local aspirants.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Story</h2>
          <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
            <p>
              Every year, thousands of students migrate to Prayagraj with dreams of clearing competitive exams. Their first hurdle isn't the syllabus—it's finding a decent place to live.
            </p>
            <p>
              We noticed that students were spending weeks roaming the streets of Civil Lines, Katra, and Allahpur, dealing with high brokerage fees, misleading photos, and landlords who wouldn't return security deposits.
            </p>
            <p>
              {siteConfig.name} was born out of this frustration. We wanted to create a platform that treats finding a PG or room not as a transaction, but as finding a supportive environment for studies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
