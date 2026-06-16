// ==================================================
// Zod Validation Schemas
// ==================================================

import { z } from "zod";
import { PRICE_RANGE, UPLOAD_LIMITS } from "@/lib/constants";

// ---------- User Schemas ----------

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  email: z.string().email("Please enter a valid email").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: z.enum(["student", "owner"], {
    required_error: "Please select a role",
  }),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

// ---------- Property Schemas ----------

const amenitiesSchema = z.object({
  ac: z.boolean().default(false),
  wifi: z.boolean().default(false),
  furnished: z.boolean().default(false),
  foodAvailable: z.boolean().default(false),
  attachedBathroom: z.boolean().default(false),
  laundry: z.boolean().default(false),
  parking: z.boolean().default(false),
  powerBackup: z.boolean().default(false),
  cctv: z.boolean().default(false),
  waterPurifier: z.boolean().default(false),
  studyRoom: z.boolean().default(false),
  hotWater: z.boolean().default(false),
});

export const createPropertySchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be under 100 characters")
    .trim(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must be under 2000 characters")
    .trim(),
  price: z
    .number()
    .min(PRICE_RANGE.MIN, `Minimum rent is ₹${PRICE_RANGE.MIN}`)
    .max(PRICE_RANGE.MAX, `Maximum rent is ₹${PRICE_RANGE.MAX}`),
  securityDeposit: z.number().min(0).nullable().optional(),
  area: z.string().min(2, "Area is required").trim(),
  address: z.string().min(5, "Address is required").trim(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  propertyType: z.enum(["room", "pg", "hostel", "shared-room", "flat"]),
  roomType: z.enum(["single", "double", "triple", "dormitory"]),
  genderPreference: z.enum(["boys", "girls", "co-ed"]),
  amenities: amenitiesSchema,
  availability: z.enum([
    "available-now",
    "occupied",
    "available-next-month",
    "available-from-date",
  ]),
  availableFrom: z.string().datetime().nullable().optional(),
  nearbyCoachingCenterIds: z.array(z.string()).optional(),
});

export const updatePropertySchema = createPropertySchema.partial();

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;

// ---------- Review Schemas ----------

const ratingField = z.number().min(1, "Rating required").max(5);

export const createReviewSchema = z.object({
  propertyId: z.string().min(1, "Property ID is required"),
  ratings: z.object({
    cleanliness: ratingField,
    waterSupply: ratingField,
    electricity: ratingField,
    wifiQuality: ratingField,
    safety: ratingField,
    ownerBehaviour: ratingField,
    overall: ratingField,
  }),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(1000, "Comment must be under 1000 characters")
    .trim(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;

// ---------- Report Schemas ----------

export const createReportSchema = z.object({
  propertyId: z.string().min(1, "Property ID is required"),
  reason: z.enum([
    "fraud",
    "wrong-photos",
    "incorrect-price",
    "already-occupied",
    "misleading",
  ]),
  description: z
    .string()
    .min(10, "Please provide more details")
    .max(500, "Description must be under 500 characters")
    .trim(),
});

export type CreateReportInput = z.infer<typeof createReportSchema>;

// ---------- Upload Schemas ----------

export const uploadPhotoSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= UPLOAD_LIMITS.PHOTO.maxSizeBytes,
      `Photo must be under ${UPLOAD_LIMITS.PHOTO.maxSizeMB}MB`
    )
    .refine(
      (file) => UPLOAD_LIMITS.PHOTO.allowedTypes.includes(file.type),
      "Only JPG, PNG, and WEBP images are allowed"
    ),
});

export const uploadVideoSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= UPLOAD_LIMITS.VIDEO.maxSizeBytes,
      `Video must be under ${UPLOAD_LIMITS.VIDEO.maxSizeMB}MB`
    )
    .refine(
      (file) => UPLOAD_LIMITS.VIDEO.allowedTypes.includes(file.type),
      "Only MP4 and WEBM videos are allowed"
    ),
});

// ---------- Search Schemas ----------

export const searchSchema = z.object({
  q: z.string().max(200).optional(),
  city: z.string().optional(),
  area: z.string().optional(),
  priceMin: z.coerce.number().min(0).optional(),
  priceMax: z.coerce.number().max(100000).optional(),
  propertyType: z.string().optional(),
  roomType: z.string().optional(),
  gender: z.string().optional(),
  amenities: z.string().optional(), // comma-separated
  availability: z.string().optional(),
  verified: z.coerce.boolean().optional(),
  nearCoaching: z.string().optional(),
  nearCoachingRadius: z.coerce.number().min(0.5).max(10).optional(),
  sort: z.enum(["newest", "price_asc", "price_desc", "rating"]).optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(50).optional(),
});

export type SearchInput = z.infer<typeof searchSchema>;

// ---------- Owner Verification Schema ----------

export const ownerVerificationSchema = z.object({
  idProofType: z.enum(["aadhaar", "pan", "voter-id", "driving-license"]),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15)
    .regex(/^[0-9+\-\s]+$/, "Invalid phone number format"),
});

export type OwnerVerificationInput = z.infer<typeof ownerVerificationSchema>;

// ---------- Area Community Rating Schema ----------

export const areaRatingSchema = z.object({
  areaSlug: z.string().min(1),
  studentFriendliness: z.number().min(1).max(5),
  affordability: z.number().min(1).max(5),
});

export type AreaRatingInput = z.infer<typeof areaRatingSchema>;

// ---------- Admin Action Schemas ----------

export const rejectListingSchema = z.object({
  reason: z.string().min(5, "Please provide a rejection reason").max(500),
});

export const suspendUserSchema = z.object({
  reason: z.string().min(5, "Please provide a reason").max(500),
});

// ---------- Coaching Center Schema (Admin) ----------

export const coachingCenterSchema = z.object({
  name: z.string().min(2).max(200).trim(),
  category: z.enum(["upsc", "pcs", "ssc", "jee", "neet", "other"]),
  address: z.string().min(5).trim(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export type CoachingCenterInput = z.infer<typeof coachingCenterSchema>;

// ---------- Essential Schema (Admin) ----------

export const essentialSchema = z.object({
  name: z.string().min(2).max(200).trim(),
  type: z.enum([
    "library",
    "mess",
    "hospital",
    "medical-store",
    "stationery",
    "gym",
    "bus-stop",
  ]),
  address: z.string().min(5).trim(),
  area: z.string().min(2).trim(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export type EssentialInput = z.infer<typeof essentialSchema>;
