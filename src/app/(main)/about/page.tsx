import { siteConfig } from "@/config/site";
import { Shield, Users, MapPin, Search, ArrowRight, BookOpen, Target, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "About Us",
  description: "Learn more about RoomFinder Prayagraj and our mission to simplify student housing.",
};

const values = [
  {
    title: "Smart Search",
    description: "Find properties near major coaching centers like Drishti IAS, Physics Wallah, and more with our intelligent filtering.",
    icon: Search,
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    title: "Verified Owners",
    description: "All property owners go through a strict ID verification process for your complete safety and peace of mind.",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Community Driven",
    description: "Real reviews and area insights from fellow students and tenants help you make informed decisions.",
    icon: Heart,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    title: "Local Focus",
    description: "Built exclusively for Prayagraj, understanding the specific needs of UPSC, SSC, JEE & NEET aspirants.",
    icon: MapPin,
    gradient: "from-amber-500 to-orange-600",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 gradient-bg-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.15),transparent_50%)]" />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm font-bold mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            Finding a home away from home{" "}
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
              shouldn&apos;t be hard
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            We built RoomFinder Prayagraj to bridge the gap between students and trusted property owners.
            No brokers, no hidden fees, just transparent renting.
          </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-28 bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-700 text-sm font-bold mb-4 border border-violet-200">
              <Sparkles className="w-4 h-4" />
              What We Stand For
            </span>
            <h2 className="section-heading text-slate-900 mb-4">
              Why <span className="gradient-text">RoomFinder</span>?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="group p-6 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-violet-100 hover:-translate-y-1 hover:border-violet-200 transition-all">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-all group-hover:rotate-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(124,58,237,0.12),transparent_50%)]" />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm font-bold mb-4 backdrop-blur-sm">
              <BookOpen className="w-4 h-4" />
              How It Started
            </span>
            <h2 className="section-heading text-white mb-4">Our Story</h2>
          </div>
          <div className="space-y-6 text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            <p className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10 backdrop-blur-sm font-medium">
              Every year, thousands of students migrate to Prayagraj with dreams of clearing competitive exams.
              Their first hurdle isn&apos;t the syllabus — it&apos;s finding a decent place to live.
            </p>
            <p className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10 backdrop-blur-sm font-medium">
              We noticed that students were spending weeks roaming the streets of Civil Lines, Katra, and Allahpur,
              dealing with high brokerage fees, misleading photos, and landlords who wouldn&apos;t return security deposits.
            </p>
            <p className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10 backdrop-blur-sm font-medium">
              {siteConfig.name} was born out of this frustration. We wanted to create a platform that treats finding
              a PG or room not as a transaction, but as finding a supportive environment for studies.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 text-center">
          <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center mx-auto mb-5">
            <Target className="w-8 h-8 text-violet-600" />
          </div>
          <h2 className="section-heading text-slate-900 mb-4">Ready to find your perfect room?</h2>
          <p className="text-slate-600 text-lg mb-8 font-medium">
            Join thousands of students who found their home away from home through RoomFinder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button size="xl" className="gap-2 rounded-2xl shadow-lg shadow-violet-200">
                Browse Properties <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="xl" className="rounded-2xl">
                Create an Account
              </Button>
            </Link>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}
