import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-md">
                RF
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                RoomFinder
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/properties" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary"></span>
                  Browse Rooms
                </Link>
              </li>
              <li>
                <Link href="/areas" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary"></span>
                  Area Insights
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary"></span>
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Areas */}
          <div>
            <h3 className="text-white font-semibold mb-6">Top Areas in Prayagraj</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/properties?area=civil-lines" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  Civil Lines
                </Link>
              </li>
              <li>
                <Link href="/properties?area=george-town" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  George Town
                </Link>
              </li>
              <li>
                <Link href="/properties?area=allahpur" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  Allahpur
                </Link>
              </li>
              <li>
                <Link href="/properties?area=katra" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  Katra
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">Civil Lines, Prayagraj<br/>Uttar Pradesh 211001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">hello@roomfinder.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
