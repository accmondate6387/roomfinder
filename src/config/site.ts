// ==================================================
// Site Configuration
// ==================================================

export const siteConfig = {
  name: "RoomFinder Prayagraj",
  shortName: "RoomFinder",
  description:
    "Find verified rooms, PGs, hostels & student housing in Prayagraj. Trusted by UPSC, PCS, SSC, JEE & NEET aspirants.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  author: "RoomFinder Team",
  keywords: [
    "rooms in prayagraj",
    "pg in prayagraj",
    "hostel in prayagraj",
    "student housing prayagraj",
    "rooms near vision ias",
    "pg for upsc students",
    "accommodation prayagraj",
    "rooms for students prayagraj",
    "paying guest prayagraj",
    "hostel for girls prayagraj",
    "hostel for boys prayagraj",
    "rooms in civil lines prayagraj",
    "rooms in george town prayagraj",
    "rooms near coaching center prayagraj",
  ],
  social: {
    twitter: "@roomfinderpryj",
  },
} as const;

export const navConfig = {
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Properties", href: "/properties" },
    { title: "Areas", href: "/areas" },
    { title: "About", href: "/about" },
  ],
  ownerNav: [
    { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { title: "My Listings", href: "/dashboard/listings", icon: "Building2" },
    { title: "Add Listing", href: "/dashboard/listings/new", icon: "Plus" },
    { title: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
    { title: "Verification", href: "/dashboard/verification", icon: "Shield" },
  ],
  adminNav: [
    { title: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
    { title: "Listings", href: "/admin/listings", icon: "Building2" },
    { title: "Users", href: "/admin/users", icon: "Users" },
    {
      title: "Owner Verifications",
      href: "/admin/verifications/owners",
      icon: "UserCheck",
    },
    {
      title: "Property Verifications",
      href: "/admin/verifications/properties",
      icon: "ShieldCheck",
    },
    { title: "Reviews", href: "/admin/reviews", icon: "Star" },
    { title: "Reports", href: "/admin/reports", icon: "Flag" },
    {
      title: "Coaching Centers",
      href: "/admin/coaching-centers",
      icon: "GraduationCap",
    },
    { title: "Essentials", href: "/admin/essentials", icon: "MapPin" },
    { title: "Area Insights", href: "/admin/areas", icon: "Map" },
    { title: "Featured", href: "/admin/featured", icon: "Sparkles" },
  ],
} as const;
