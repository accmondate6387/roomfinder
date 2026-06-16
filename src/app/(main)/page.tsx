import Link from "next/link";
import { Search, MapPin, Shield, Star, Building } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-slate-50 -z-20" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 -z-10" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary font-medium text-sm mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              #1 Student Housing Platform in Prayagraj
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight leading-tight animate-fade-in-up stagger-1">
              Find your perfect <br className="hidden md:block" />
              <span className="gradient-text">home away from home</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto animate-fade-in-up stagger-2">
              Discover verified rooms, PGs, and hostels near top coaching centers. Trusted by thousands of UPSC, SSC, and JEE aspirants.
            </p>

            {/* Quick Search Bar */}
            <div className="bg-white p-3 rounded-2xl md:rounded-full shadow-lg max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-3 animate-fade-in-up stagger-3">
              <div className="flex-1 flex items-center gap-3 px-4 w-full md:w-auto border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0">
                <MapPin className="text-slate-400 w-5 h-5 shrink-0" />
                <select className="w-full bg-transparent text-slate-700 focus:outline-none appearance-none font-medium">
                  <option value="">Select Area</option>
                  <option value="civil-lines">Civil Lines</option>
                  <option value="katra">Katra</option>
                  <option value="allahpur">Allahpur</option>
                  <option value="george-town">George Town</option>
                </select>
              </div>
              
              <div className="flex-1 flex items-center gap-3 px-4 w-full md:w-auto pb-3 md:pb-0 border-b md:border-b-0 border-slate-100">
                <Building className="text-slate-400 w-5 h-5 shrink-0" />
                <select className="w-full bg-transparent text-slate-700 focus:outline-none appearance-none font-medium">
                  <option value="">Property Type</option>
                  <option value="room">Single Room</option>
                  <option value="pg">PG</option>
                  <option value="hostel">Hostel</option>
                  <option value="flat">Flat</option>
                </select>
              </div>

              <Link href="/properties" className="w-full md:w-auto">
                <Button size="lg" className="w-full md:w-auto rounded-xl md:rounded-full px-8">
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why choose RoomFinder?</h2>
            <p className="text-slate-600 text-lg">We take the hassle out of finding student accommodation with transparency and trust.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300 card-hover">
              <div className="w-14 h-14 rounded-2xl bg-success-light text-success flex items-center justify-center mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">100% Verified Listings</h3>
              <p className="text-slate-600 leading-relaxed">
                Every property owner undergoes a strict ID verification process. Say goodbye to fake listings and scams.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300 card-hover">
              <div className="w-14 h-14 rounded-2xl bg-info-light text-info flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Near Coaching Centers</h3>
              <p className="text-slate-600 leading-relaxed">
                Find rooms within walking distance to Drishti IAS, Physics Wallah, and other major coaching hubs.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300 card-hover">
              <div className="w-14 h-14 rounded-2xl bg-warning-light text-warning flex items-center justify-center mb-6">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Community Reviews</h3>
              <p className="text-slate-600 leading-relaxed">
                Read authentic reviews from previous students about food quality, owner behavior, and water supply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Are you a property owner?</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            List your PG, hostel, or room to reach thousands of verified students looking for accommodation in Prayagraj.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg rounded-full">
              List Your Property For Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
