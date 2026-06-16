// ==================================================
// TypeScript Types & DTOs
// ==================================================

// ---------- API Response Types ----------
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown[];
  };
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ---------- Auth Types ----------
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: "student" | "owner" | "admin";
}

// ---------- Property DTOs ----------
export interface PropertyCardDTO {
  _id: string;
  title: string;
  slug: string;
  price: number;
  area: string;
  city: string;
  address: string;
  propertyType: string;
  roomType: string;
  genderPreference: string;
  availability: string;
  photos: { url: string; alt: string }[];
  amenities: {
    ac: boolean;
    wifi: boolean;
    furnished: boolean;
    foodAvailable: boolean;
    attachedBathroom: boolean;
    cctv?: boolean;
  };
  stats: {
    avgRating: number;
    reviewCount: number;
  };
  isVerified: boolean;
  isFeatured: boolean;
  matchScore?: number;
  createdAt: string;
}

export interface PropertyDetailDTO {
  _id: string;
  owner: {
    _id: string;
    name: string;
    image: string | null;
    phone: string | null;
    isOwnerVerified: boolean;
  };
  title: string;
  slug: string;
  description: string;
  price: number;
  securityDeposit: number | null;
  area: string;
  address: string;
  city: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  propertyType: string;
  roomType: string;
  genderPreference: string;
  amenities: Record<string, boolean>;
  photos: { url: string; publicId: string; alt: string; order: number }[];
  video: { url: string; publicId: string; duration: number } | null;
  availability: string;
  availableFrom: string | null;
  isVerified: boolean;
  isFeatured: boolean;
  nearbyCoachingCenters: {
    name: string;
    category: string;
    distanceKm: number;
    walkingTimeMin: number;
    travelTimeMin: number;
  }[];
  nearbyEssentials: {
    name: string;
    type: string;
    distanceKm: number;
  }[];
  stats: {
    viewCount: number;
    favoriteCount: number;
    avgRating: number;
    reviewCount: number;
  };
  createdAt: string;
  updatedAt: string;
}

// ---------- Search / Filter Types ----------
export interface PropertyFilters {
  city?: string;
  area?: string;
  priceMin?: number;
  priceMax?: number;
  propertyType?: string;
  roomType?: string;
  gender?: string;
  amenities?: string[];
  availability?: string;
  verified?: boolean;
  nearCoaching?: string;
  nearCoachingRadius?: number;
  sort?: string;
  q?: string;
  page?: number;
  limit?: number;
}

// ---------- Review DTO ----------
export interface ReviewDTO {
  _id: string;
  user: {
    _id: string;
    name: string;
    image: string | null;
  };
  ratings: {
    cleanliness: number;
    waterSupply: number;
    electricity: number;
    wifiQuality: number;
    safety: number;
    ownerBehaviour: number;
    overall: number;
  };
  comment: string;
  createdAt: string;
}

// ---------- Notification DTO ----------
export interface NotificationDTO {
  _id: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

// ---------- Owner Dashboard Types ----------
export interface OwnerDashboardStats {
  totalListings: number;
  totalViews: number;
  totalFavorites: number;
  totalContacts: number;
  pendingListings: number;
  approvedListings: number;
}

export interface OwnerListingDTO {
  _id: string;
  title: string;
  slug: string;
  price: number;
  area: string;
  approvalStatus: string;
  availability: string;
  isVerified: boolean;
  stats: {
    viewCount: number;
    favoriteCount: number;
    contactClickCount: number;
  };
  photos: { url: string }[];
  createdAt: string;
}

// ---------- Admin Dashboard Types ----------
export interface AdminDashboardStats {
  totalUsers: number;
  totalStudents: number;
  totalOwners: number;
  totalProperties: number;
  pendingApprovals: number;
  pendingVerifications: number;
  pendingReports: number;
  totalReviews: number;
}

// ---------- Area Insight DTO ----------
export interface AreaInsightDTO {
  _id: string;
  area: string;
  slug: string;
  avgRent: number;
  totalListings: number;
  studentFriendliness: number;
  affordability: number;
  totalVotes: number;
  popularCoachingCenters: {
    _id: string;
    name: string;
    category: string;
  }[];
}

// ---------- Coaching Center DTO ----------
export interface CoachingCenterDTO {
  _id: string;
  name: string;
  slug: string;
  category: string;
  address: string;
  location: {
    coordinates: [number, number];
  };
}
