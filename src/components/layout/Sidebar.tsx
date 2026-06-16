"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import * as Icons from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
}

interface SidebarProps {
  items: NavItem[];
  basePath: string; // e.g. '/dashboard' or '/admin'
  userRole: string;
}

export function Sidebar({ items, basePath, userRole }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 text-white p-4 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold">
            RF
          </div>
          <span className="font-bold text-lg">
            {userRole === "admin" ? "Admin Panel" : "Owner Dashboard"}
          </span>
        </Link>
        <button onClick={toggleMobile} className="p-1">
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Content */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out z-50 md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950/50">
          <Link href="/" className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-md">
              RF
            </div>
            <span className="font-bold text-lg text-white truncate">
              {userRole === "admin" ? "Admin Panel" : "Owner Dashboard"}
            </span>
          </Link>
          <button className="md:hidden ml-auto text-slate-400" onClick={toggleMobile}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href || (item.href !== basePath && pathname.startsWith(item.href));
            const Icon = Icons[item.icon] as React.ElementType;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-slate-500"}`} />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-400 hover:bg-slate-800 hover:text-danger transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
