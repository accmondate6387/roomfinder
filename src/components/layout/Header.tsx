"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut, Home, Building, MapPin, Info, Settings } from "lucide-react";
import { siteConfig, navConfig } from "@/config/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Simulated auth state for now (will connect to Auth.js later)
  const isAuthenticated = false; 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Hide header on dashboard/admin routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md">
            RF
          </div>
          <span className={`font-bold text-xl tracking-tight hidden sm:block ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
            RoomFinder
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navConfig.mainNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-slate-600"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth/Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors">
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 p-2 text-slate-600 hover:text-primary focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Full Screen Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
          <nav className="flex flex-col gap-6 mb-auto">
            {navConfig.mainNav.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              
              // Map icons to main nav for mobile
              let Icon = Home;
              if (item.href === "/properties") Icon = Building;
              if (item.href === "/areas") Icon = MapPin;
              if (item.href === "/about") Icon = Info;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 text-xl font-semibold transition-colors ${
                    isActive ? "text-primary" : "text-slate-800"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "text-primary" : "text-slate-400"}`} />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="mt-12 flex flex-col gap-4 border-t border-slate-100 pt-8">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-4 text-lg font-medium text-slate-700"
                >
                  <Settings className="w-5 h-5 text-slate-400" />
                  Dashboard
                </Link>
                <button
                  className="flex items-center gap-4 text-lg font-medium text-danger"
                >
                  <LogOut className="w-5 h-5" />
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full text-center py-3.5 text-lg font-medium text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center py-3.5 text-lg font-medium bg-primary text-white rounded-xl shadow-md hover:bg-primary-dark transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
