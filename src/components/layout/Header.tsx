"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Menu, X, User, LogOut, Home, Building, MapPin, Info,
  ChevronDown, LayoutDashboard, Shield, Heart, Sparkles
} from "lucide-react";
import { siteConfig, navConfig } from "@/config/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { NotificationBell } from "./NotificationBell";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data: session, status } = useSession();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = status === "authenticated";
  const user = session?.user;
  const userRole = (user as any)?.role;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  // Close the user menu when viewport switches to mobile
  const prevIsMobileRef = useRef(isMobile);
  useEffect(() => {
    const wasMobile = prevIsMobileRef.current;
    prevIsMobileRef.current = isMobile;
    if (!wasMobile && isMobile) {
      setUserMenuOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!userMenuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    // Use mousedown so it fires before any onClick inside the menu
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) return null;

  const getDashboardLink = () => {
    if (userRole === "admin") return "/admin";
    if (userRole === "owner") return "/dashboard";
    return "/favorites";
  };

  const getDashboardLabel = () => {
    if (userRole === "admin") return "Admin";
    if (userRole === "owner") return "Dashboard";
    return "Favorites";
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-md py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 z-50 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-violet-200 transition-all duration-300 group-hover:shadow-violet-300 group-hover:scale-110 group-hover:rotate-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-transparent">
            <span className="hidden sm:inline">RoomFinder</span>
            <span className="sm:hidden">RF</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navConfig.mainNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-bold rounded-2xl transition-all ${
                  isActive
                    ? "text-violet-700 bg-violet-50 shadow-sm"
                    : "text-slate-600 hover:text-violet-700 hover:bg-violet-50/50"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <NotificationBell />
              {/* User menu — ref wraps both the button and the dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-violet-50/50 transition-colors"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-violet-100 border border-violet-100 z-50 overflow-hidden animate-scale-in origin-top-right">
                    <div className="px-4 py-3 border-b border-violet-50">
                      <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                    <div className="p-1.5">
                      <Link
                        href={getDashboardLink()}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-violet-50 transition-colors font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-violet-500" />
                        {getDashboardLabel()}
                      </Link>
                    </div>
                    <div className="border-t border-violet-50 p-1.5">
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-600 hover:bg-rose-50 transition-colors w-full font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-bold text-slate-600 hover:text-violet-700 px-4 py-2 rounded-2xl hover:bg-violet-50/50 transition-all"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-2xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg hover:shadow-violet-200 active:scale-[0.97]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden z-50 p-2 text-slate-600 hover:text-violet-700 focus:outline-none rounded-2xl hover:bg-violet-50/50 transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out transform md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
          {isAuthenticated && (
            <div className="flex items-center gap-3 mb-8 p-4 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl border border-violet-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-lg font-bold shadow-md">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 truncate">{user?.name}</p>
                <p className="text-sm text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
          )}

          <nav className="flex flex-col gap-1 mb-auto">
            {navConfig.mainNav.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              let Icon = Home;
              if (item.href === "/properties") Icon = Building;
              if (item.href === "/areas") Icon = MapPin;
              if (item.href === "/about") Icon = Info;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-lg font-bold transition-all ${
                    isActive
                      ? "text-violet-700 bg-violet-50"
                      : "text-slate-700 hover:bg-violet-50/50"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-violet-500" : "text-slate-400"}`} />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-violet-100 pt-6 space-y-3">
            {isAuthenticated ? (
              <>
                <Link
                  href={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-lg font-bold text-slate-700 hover:bg-violet-50 transition-all"
                >
                  <LayoutDashboard className="w-5 h-5 text-violet-500" />
                  {getDashboardLabel()}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-lg font-bold text-rose-600 hover:bg-rose-50 transition-all w-full"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full text-center py-3.5 text-lg font-bold text-slate-700 border-2 border-slate-200 rounded-2xl hover:bg-violet-50 hover:border-violet-200 transition-all"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center py-3.5 text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl shadow-md hover:from-violet-700 hover:to-indigo-700 transition-all active:scale-[0.98]"
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
