import Link from "next/link";
import { Search, MapPin, Shield, Star, Building, Users, CheckCircle, ArrowRight, TrendingUp, Clock, Sparkles, Zap, GraduationCap, Home, BookOpen, Compass, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-bg-hero -z-20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 -z-10" />
        <div className="absolute top-1/4 -right-20 w-[700px] h-[700px] bg-violet-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute -bottom-20 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-violet-400 rounded-full blur-sm" />
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-amber-400 rounded-full blur-sm" />

        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10 py-32 md:py-40">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-400/20 text-violet-200 text-sm font-bold mb-8 animate-fade-in-up backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              #1 Student Housing Platform in Prayagraj
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1] animate-fade-in-up stagger-1">
              Find your
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                perfect student home
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto animate-fade-in-up stagger-2 leading-relaxed font-medium">
              Verified rooms, PGs, and hostels near top coaching centers. 
              Trusted by thousands of UPSC, JEE & NEET aspirants.
            </p>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-3 rounded-3xl md:rounded-full max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-3 animate-fade-in-up stagger-3 shadow-2xl shadow-violet-500/10">
              <div className="flex-1 flex items-center gap-3 px-4 w-full md:w-auto border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0">
                <MapPin className="text-slate-400 w-5 h-5 shrink-0" />
                <select className="w-full bg-transparent text-white focus:outline-none appearance-none font-bold text-sm [&>option]:text-slate-900">
                  <option value="" className="text-slate-900">All Areas</option>
                  <option value="civil-lines" className="text-slate-900">Civil Lines</option>
                  <option value="katra" className="text-slate-900">Katra</option>
                  <option value="allahpur" className="text-slate-900">Allahpur</option>
                  <option value="george-town" className="text-slate-900">George Town</option>
                </select>
              </div>

              <div className="flex-1 flex items-center gap-3 px-4 w-full md:w-auto pb-3 md:pb-0">
                <Building className="text-slate-400 w-5 h-5 shrink-0" />
                <select className="w-full bg-transparent text-white focus:outline-none appearance-none font-bold text-sm [&>option]:text-slate-900">
                  <option value="" className="text-slate-900">All Types</option>
                  <option value="room" className="text-slate-900">Single Room</option>
                  <option value="pg" className="text-slate-900">PG</option>
                  <option value="hostel" className="text-slate-900">Hostel</option>
                  <option value="flat" className="text-slate-900">Flat</option>
                </select>
              </div>

              <Link href="/properties" className="w-full md:w-auto">
                <Button size="lg" className="w-full md:w-auto rounded-xl md:rounded-full px-8 bg-white text-slate-900 hover:bg-slate-100 shadow-lg">
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center gap-8 text-sm text-slate-400 animate-fade-in-up stagger-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">Verified Listings</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">10K+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">Real Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-20">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-white rounded-3xl shadow-xl shadow-violet-100 border border-violet-100 p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Listings", value: "500+", icon: Building, color: "from-violet-500 to-indigo-600" },
              { label: "Active Students", value: "10K+", icon: Users, color: "from-amber-500 to-orange-600" },
              { label: "Verified Owners", value: "200+", icon: Shield, color: "from-emerald-500 to-teal-600" },
              { label: "Areas Covered", value: "15+", icon: MapPin, color: "from-rose-500 to-pink-600" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-all duration-300 group-hover:rotate-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl md:text-3xl font-extrabold text-slate-900">{stat.value}</p>
                  <p className="text-sm font-bold text-slate-500 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-200/30 rounded-full blur-3xl" />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-700 text-sm font-bold mb-4 border border-violet-200">
              <Zap className="w-4 h-4" />
              Simple Process
            </span>
            <h2 className="section-heading text-slate-900 mb-4">
              How it <span className="gradient-text-vibrant">works</span>
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              Find your ideal accommodation in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Search & Explore",
                description: "Browse verified listings with photos, prices, and amenities. Filter by area, type, and budget.",
                icon: Search,
                color: "from-violet-500 to-indigo-600",
                bgColor: "bg-violet-50",
                textColor: "text-violet-600",
              },
              {
                step: "02",
                title: "Compare & Review",
                description: "Read authentic reviews from fellow students. Compare properties side by side.",
                icon: Star,
                color: "from-amber-500 to-orange-600",
                bgColor: "bg-amber-50",
                textColor: "text-amber-600",
              },
              {
                step: "03",
                title: "Book with Confidence",
                description: "Contact verified owners directly. Every listing is 100% verified for your peace of mind.",
                icon: Shield,
                color: "from-emerald-500 to-teal-600",
                bgColor: "bg-emerald-50",
                textColor: "text-emerald-600",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative group">
                  <div className="absolute -top-4 -left-2 text-8xl font-black text-slate-100 select-none leading-none -z-10 transition-all group-hover:text-violet-100">
                    {item.step}
                  </div>
                  <div className="p-8 rounded-3xl bg-white border border-slate-100 card-hover shadow-sm">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg shadow-${item.color.split(' ')[0]}/20 group-hover:scale-110 transition-all duration-300 group-hover:rotate-3`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-3xl" />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-sm font-bold mb-4 border border-amber-200">
              <Compass className="w-4 h-4" />
              Why RoomFinder
            </span>
            <h2 className="section-heading text-slate-900 mb-4">
              Built for <span className="gradient-text-accent">students</span>, by students
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              Everything you need to find the perfect place to focus on your studies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "100% Verified Listings",
                description: "Every owner undergoes strict ID verification. No more fake listings or scams.",
                icon: Shield,
                color: "from-emerald-500 to-teal-600",
                bgColor: "bg-emerald-50",
              },
              {
                title: "Near Coaching Centers",
                description: "Find rooms within walking distance to Drishti IAS, Physics Wallah, and other major hubs.",
                icon: MapPin,
                color: "from-violet-500 to-indigo-600",
                bgColor: "bg-violet-50",
              },
              {
                title: "Genuine Reviews",
                description: "Read honest feedback about food quality, owner behavior, wifi, and water supply.",
                icon: Star,
                color: "from-amber-500 to-orange-600",
                bgColor: "bg-amber-50",
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className={`p-8 rounded-3xl border border-slate-100 card-hover ${feature.bgColor} shadow-sm`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section className="py-24 md:py-32 relative">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-700 text-sm font-bold mb-4 border border-violet-200">
                <GraduationCap className="w-4 h-4" />
                For Students
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Stop hunting. Start <span className="gradient-text">studying.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 font-medium leading-relaxed">
                We know how stressful it is to find the right place when you&apos;re focused on exams. 
                RoomFinder makes it easy to find safe, verified accommodation near your coaching center.
              </p>
              <div className="space-y-4">
                {[
                  { text: "Browse 500+ verified properties across Prayagraj", icon: Home },
                  { text: "Filter by budget, area, gender preference & amenities", icon: Search },
                  { text: "Read honest reviews from real students like you", icon: BookOpen },
                  { text: "Direct contact with verified owners — no middlemen", icon: Phone },
                ].map((item) => {
                  const IconItem = item.icon;
                  return (
                    <div key={item.text} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                        <IconItem className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-slate-700 font-medium pt-1.5">{item.text}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-10">
                <Link href="/properties">
                  <Button size="xl" className="rounded-2xl px-10 shadow-lg shadow-violet-200">
                    Find Your Room
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-200 via-indigo-100 to-amber-100 rounded-3xl blur-3xl opacity-50" />
              <div className="relative bg-white rounded-3xl border border-violet-100 p-8 shadow-xl shadow-violet-100">
                <div className="space-y-4">
                  {[
                    { area: "Civil Lines", count: "120+ rooms", color: "from-violet-500 to-indigo-600" },
                    { area: "George Town", count: "80+ rooms", color: "from-amber-500 to-orange-600" },
                    { area: "Allahpur", count: "95+ rooms", color: "from-emerald-500 to-teal-600" },
                    { area: "Katra", count: "60+ rooms", color: "from-rose-500 to-pink-600" },
                    { area: "Tagore Town", count: "45+ rooms", color: "from-cyan-500 to-blue-600" },
                  ].map((item) => (
                    <div key={item.area} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-violet-200 hover:bg-violet-50/50 transition-all group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-all`}>
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900">{item.area}</p>
                          <p className="text-sm text-slate-500 font-medium">{item.count}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-violet-500 transition-all group-hover:translate-x-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg-hero" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjB2Mkg4di0yaDEyek0yMCAxNHYySDh2LTJoMTJ6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz48L3N2Zz4=')] opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />

        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm font-bold mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Are you a property owner?
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              List your property & reach
              <br />
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                thousands of students
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              List your PG, hostel, or room to reach verified students
              looking for accommodation in Prayagraj. It&apos;s free!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="xl" className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl shadow-violet-500/20 rounded-2xl px-10 font-extrabold">
                  List Your Property For Free
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Link href="/properties">
                <Button size="xl" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-2xl px-10 font-bold">
                  Browse Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
