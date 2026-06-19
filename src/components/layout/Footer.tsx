import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, ArrowUpRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.08),transparent_50%)]" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-violet-200/20 group-hover:scale-110 transition-all duration-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                RoomFinder
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-violet-600 hover:to-indigo-600 hover:text-white transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-violet-600 hover:to-indigo-600 hover:text-white transition-all" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-violet-600 hover:to-indigo-600 hover:text-white transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Browse Rooms", href: "/properties" },
                { label: "Area Insights", href: "/areas" },
                { label: "About Us", href: "/about" },
                { label: "Contact Support", href: "#" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors inline-flex items-center gap-1.5 group font-medium">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Top Areas</h3>
            <ul className="space-y-3">
              {[
                { label: "Civil Lines", href: "/properties?area=civil-lines" },
                { label: "George Town", href: "/properties?area=george-town" },
                { label: "Allahpur", href: "/properties?area=allahpur" },
                { label: "Katra", href: "/properties?area=katra" },
                { label: "Tagore Town", href: "/properties?area=tagore-town" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors inline-flex items-center gap-1.5 group font-medium">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-sm font-medium">Civil Lines, Prayagraj<br />Uttar Pradesh 211001</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-sm font-medium">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-sm font-medium">hello@roomfinder.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-medium">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-white transition-colors font-medium">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-white transition-colors font-medium">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
