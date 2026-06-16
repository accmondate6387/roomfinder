// ==================================================
// RoomFinder Prayagraj - Application Constants
// ==================================================

export const APP_NAME = "RoomFinder Prayagraj";
export const APP_DESCRIPTION =
  "Find verified rooms, PGs, hostels & student housing in Prayagraj. Trusted by UPSC, PCS, SSC, JEE & NEET aspirants.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// ---------- Roles ----------
export const ROLES = {
  STUDENT: "student",
  OWNER: "owner",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// ---------- Property Types ----------
export const PROPERTY_TYPES = [
  { value: "room", label: "Room" },
  { value: "pg", label: "PG" },
  { value: "hostel", label: "Hostel" },
  { value: "shared-room", label: "Shared Room" },
  { value: "flat", label: "Flat" },
] as const;

export const ROOM_TYPES = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
  { value: "triple", label: "Triple" },
  { value: "dormitory", label: "Dormitory" },
] as const;

export const GENDER_PREFERENCES = [
  { value: "boys", label: "Boys" },
  { value: "girls", label: "Girls" },
  { value: "co-ed", label: "Co-ed" },
] as const;

// ---------- Amenities ----------
export const AMENITIES = [
  { key: "ac", label: "AC", icon: "Snowflake" },
  { key: "wifi", label: "WiFi", icon: "Wifi" },
  { key: "furnished", label: "Furnished", icon: "Sofa" },
  { key: "foodAvailable", label: "Food Available", icon: "UtensilsCrossed" },
  { key: "attachedBathroom", label: "Attached Bathroom", icon: "Bath" },
  { key: "laundry", label: "Laundry", icon: "WashingMachine" },
  { key: "parking", label: "Parking", icon: "Car" },
  { key: "powerBackup", label: "Power Backup", icon: "Zap" },
  { key: "cctv", label: "CCTV", icon: "Camera" },
  { key: "waterPurifier", label: "Water Purifier", icon: "Droplets" },
  { key: "studyRoom", label: "Study Room", icon: "BookOpen" },
  { key: "hotWater", label: "Hot Water", icon: "Flame" },
] as const;

// ---------- Availability ----------
export const AVAILABILITY_OPTIONS = [
  { value: "available-now", label: "Available Now", color: "emerald" },
  { value: "occupied", label: "Occupied", color: "rose" },
  { value: "available-next-month", label: "Available Next Month", color: "amber" },
  { value: "available-from-date", label: "Available From Date", color: "blue" },
] as const;

// ---------- Approval Status ----------
export const APPROVAL_STATUS = [
  { value: "draft", label: "Draft", color: "slate" },
  { value: "pending", label: "Pending Approval", color: "amber" },
  { value: "approved", label: "Approved", color: "emerald" },
  { value: "rejected", label: "Rejected", color: "rose" },
] as const;

// ---------- Report Reasons ----------
export const REPORT_REASONS = [
  { value: "fraud", label: "Fraud / Scam" },
  { value: "wrong-photos", label: "Wrong Photos" },
  { value: "incorrect-price", label: "Incorrect Price" },
  { value: "already-occupied", label: "Already Occupied" },
  { value: "misleading", label: "Misleading Information" },
] as const;

// ---------- Review Rating Categories ----------
export const REVIEW_CATEGORIES = [
  { key: "cleanliness", label: "Cleanliness", icon: "Sparkles" },
  { key: "waterSupply", label: "Water Supply", icon: "Droplets" },
  { key: "electricity", label: "Electricity", icon: "Zap" },
  { key: "wifiQuality", label: "WiFi Quality", icon: "Wifi" },
  { key: "safety", label: "Safety", icon: "Shield" },
  { key: "ownerBehaviour", label: "Owner Behaviour", icon: "Heart" },
  { key: "overall", label: "Overall", icon: "Star" },
] as const;

// ---------- Coaching Categories ----------
export const COACHING_CATEGORIES = [
  { value: "upsc", label: "UPSC" },
  { value: "pcs", label: "PCS" },
  { value: "ssc", label: "SSC" },
  { value: "jee", label: "JEE" },
  { value: "neet", label: "NEET" },
  { value: "other", label: "Other" },
] as const;

// ---------- Essential Types ----------
export const ESSENTIAL_TYPES = [
  { value: "library", label: "Library", icon: "Library" },
  { value: "mess", label: "Mess / Tiffin", icon: "UtensilsCrossed" },
  { value: "hospital", label: "Hospital", icon: "Hospital" },
  { value: "medical-store", label: "Medical Store", icon: "Pill" },
  { value: "stationery", label: "Stationery Shop", icon: "PenTool" },
  { value: "gym", label: "Gym", icon: "Dumbbell" },
  { value: "bus-stop", label: "Bus Stop", icon: "Bus" },
] as const;

// ---------- ID Proof Types ----------
export const ID_PROOF_TYPES = [
  { value: "aadhaar", label: "Aadhaar Card" },
  { value: "pan", label: "PAN Card" },
  { value: "voter-id", label: "Voter ID" },
  { value: "driving-license", label: "Driving License" },
] as const;

// ---------- Prayagraj Areas ----------
export const PRAYAGRAJ_AREAS = [
  "Civil Lines",
  "George Town",
  "Allahpur",
  "Katra",
  "Rajapur",
  "Tagore Town",
  "Lukerganj",
  "Kareli",
  "Mutthiganj",
  "Zero Road",
  "Atarsuiya",
  "Teliyarganj",
  "Naini",
  "Jhunsi",
  "Daraganj",
  "Kydganj",
  "Allapur",
  "Chowk",
  "Bai Ka Bagh",
  "Stanley Road",
] as const;

// ---------- Upload Limits ----------
export const UPLOAD_LIMITS = {
  PHOTO: {
    maxFiles: 5,
    maxSizeMB: 2,
    maxSizeBytes: 2 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "image/webp"] as string[],
    allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
  },
  VIDEO: {
    maxFiles: 1,
    maxSizeMB: 20,
    maxSizeBytes: 20 * 1024 * 1024,
    allowedTypes: ["video/mp4", "video/webm"] as string[],
    allowedExtensions: [".mp4", ".webm"],
  },
  ID_PROOF: {
    maxFiles: 1,
    maxSizeMB: 5,
    maxSizeBytes: 5 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "application/pdf"] as string[],
    allowedExtensions: [".jpg", ".jpeg", ".png", ".pdf"],
  },
} as const;

// ---------- Price Range ----------
export const PRICE_RANGE = {
  MIN: 2000,
  MAX: 20000,
  STEP: 500,
} as const;

// ---------- Pagination ----------
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 50,
} as const;

// ---------- Rate Limiting ----------
export const RATE_LIMITS = {
  AUTH: { windowMs: 15 * 60 * 1000, maxRequests: 5 },
  API: { windowMs: 15 * 60 * 1000, maxRequests: 100 },
  UPLOAD: { windowMs: 15 * 60 * 1000, maxRequests: 10 },
  SEARCH: { windowMs: 60 * 1000, maxRequests: 30 },
} as const;

// ---------- Listing Limits ----------
export const OWNER_MAX_LISTINGS = 5;

// ---------- Session ----------
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

// ---------- Data Retention ----------
export const DATA_RETENTION = {
  AUDIT_LOGS_DAYS: 90,
  PROPERTY_VIEWS_DAYS: 90,
  NOTIFICATIONS_DAYS: 90,
} as const;

// ---------- Map Defaults (Prayagraj center) ----------
export const MAP_DEFAULTS = {
  CENTER: { lat: 25.4358, lng: 81.8463 } as const,
  ZOOM: 13,
  MIN_ZOOM: 10,
  MAX_ZOOM: 18,
} as const;

// ---------- Sort Options ----------
export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
] as const;
