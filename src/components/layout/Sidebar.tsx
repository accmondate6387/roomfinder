"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X, Sparkles } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import * as Icons from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
}

interface SidebarProps {
  items: NavItem[];
  basePath: string;
  userRole: string;
}

export function Sidebar({ items, basePath, userRole }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const SidebarContent = () => (
    <aside className="w-64 bg-slate-900 flex flex-col h-screen">
      {/* Header */}
      <div className="h-16 flex items-center px-5 border-b border-white/10 shrink-0">
        <Link href="/" className="flex items-center gap-3 flex-1 group min-w-0">
          <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center text-white shrink-0 group-hover:bg-violet-500 transition-colors">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-sm text-white leading-tight truncate">
              {userRole === "admin" ? "Admin Panel" : "Owner Dashboard"}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
              {userRole === "admin" ? "Administration" : "Property Management"}
            </p>
          </div>
        </Link>
        <button
          className="md:hidden ml-2 text-slate-400 hover:text-white p-1 shrink-0"
          onClick={toggleMobile}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== basePath && pathname.startsWith(item.href));
          const Icon = Icons[item.icon] as React.ElementType;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              style={{
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.75)",
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-violet-600"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon className="w-[18px] h-[18px] shrink-0 flex-none" />
              <span className="truncate">{item.title}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-white/10 shrink-0">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{ color: "rgba(255,255,255,0.7)" }}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-semibold hover:bg-rose-500/20 transition-all"
          onMouseEnter={e => (e.currentTarget.style.color = "#fca5a5")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 text-white px-4 py-3 sticky top-0 z-40 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-sm">
            {userRole === "admin" ? "Admin" : "Dashboard"}
          </span>
        </Link>
        <button
          onClick={toggleMobile}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block sticky top-0 h-screen shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed top-0 left-0 z-50 md:hidden h-screen">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
}
