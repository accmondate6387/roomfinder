import mongoose, { Schema, Document, Model } from "mongoose";

// ==================================================
// Property Model
// ==================================================

export interface IPropertyPhoto {
  url: string;
  publicId: string;
  alt: string;
  order: number;
}

export interface IPropertyVideo {
  url: string;
  publicId: string;
  duration: number;
}

export interface IAmenities {
  ac: boolean;
  wifi: boolean;
  furnished: boolean;
  foodAvailable: boolean;
  attachedBathroom: boolean;
  laundry: boolean;
  parking: boolean;
  powerBackup: boolean;
  cctv: boolean;
  waterPurifier: boolean;
  studyRoom: boolean;
  hotWater: boolean;
}

export interface INearbyCoachingCenter {
  coachingCenterId: mongoose.Types.ObjectId;
  distanceKm: number;
  walkingTimeMin: number;
  travelTimeMin: number;
}

export interface INearbyEssential {
  essentialId: mongoose.Types.ObjectId;
  distanceKm: number;
}

export interface IPropertyStats {
  viewCount: number;
  favoriteCount: number;
  contactClickCount: number;
  inquiryCount: number;
  avgRating: number;
  reviewCount: number;
}

export interface IProperty extends Document {
  _id: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
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
    coordinates: [number, number]; // [longitude, latitude]
  };
  propertyType: "room" | "pg" | "hostel" | "shared-room" | "flat";
  roomType: "single" | "double" | "triple" | "dormitory";
  genderPreference: "boys" | "girls" | "co-ed";
  amenities: IAmenities;
  photos: IPropertyPhoto[];
  video: IPropertyVideo | null;
  availability:
    | "available-now"
    | "occupied"
    | "available-next-month"
    | "available-from-date";
  availableFrom: Date | null;
  approvalStatus: "draft" | "pending" | "approved" | "rejected";
  rejectionReason: string | null;
  isVerified: boolean;
  isFeatured: boolean;
  featuredUntil: Date | null;
  nearbyCoachingCenters: INearbyCoachingCenter[];
  nearbyEssentials: INearbyEssential[];
  stats: IPropertyStats;
  createdAt: Date;
  updatedAt: Date;
}

const PhotoSchema = new Schema<IPropertyPhoto>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const VideoSchema = new Schema<IPropertyVideo>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    duration: { type: Number, default: 0 },
  },
  { _id: false }
);

const AmenitiesSchema = new Schema<IAmenities>(
  {
    ac: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    furnished: { type: Boolean, default: false },
    foodAvailable: { type: Boolean, default: false },
    attachedBathroom: { type: Boolean, default: false },
    laundry: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    powerBackup: { type: Boolean, default: false },
    cctv: { type: Boolean, default: false },
    waterPurifier: { type: Boolean, default: false },
    studyRoom: { type: Boolean, default: false },
    hotWater: { type: Boolean, default: false },
  },
  { _id: false }
);

const NearbyCoachingSchema = new Schema<INearbyCoachingCenter>(
  {
    coachingCenterId: {
      type: Schema.Types.ObjectId,
      ref: "CoachingCenter",
      required: true,
    },
    distanceKm: { type: Number, required: true },
    walkingTimeMin: { type: Number, required: true },
    travelTimeMin: { type: Number, required: true },
  },
  { _id: false }
);

const NearbyEssentialSchema = new Schema<INearbyEssential>(
  {
    essentialId: {
      type: Schema.Types.ObjectId,
      ref: "Essential",
      required: true,
    },
    distanceKm: { type: Number, required: true },
  },
  { _id: false }
);

const PropertyStatsSchema = new Schema<IPropertyStats>(
  {
    viewCount: { type: Number, default: 0 },
    favoriteCount: { type: Number, default: 0 },
    contactClickCount: { type: Number, default: 0 },
    inquiryCount: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
  },
  { _id: false }
);

const PropertySchema = new Schema<IProperty>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    price: { type: Number, required: true, min: 2000, max: 20000 },
    securityDeposit: { type: Number, default: null },
    area: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, default: "Prayagraj", trim: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    propertyType: {
      type: String,
      enum: ["room", "pg", "hostel", "shared-room", "flat"],
      required: true,
    },
    roomType: {
      type: String,
      enum: ["single", "double", "triple", "dormitory"],
      required: true,
    },
    genderPreference: {
      type: String,
      enum: ["boys", "girls", "co-ed"],
      required: true,
    },
    amenities: { type: AmenitiesSchema, default: () => ({}) },
    photos: {
      type: [PhotoSchema],
      validate: {
        validator: (v: IPropertyPhoto[]) => v.length <= 5,
        message: "Maximum 5 photos allowed",
      },
    },
    video: { type: VideoSchema, default: null },
    availability: {
      type: String,
      enum: [
        "available-now",
        "occupied",
        "available-next-month",
        "available-from-date",
      ],
      default: "available-now",
    },
    availableFrom: { type: Date, default: null },
    approvalStatus: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "draft",
    },
    rejectionReason: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    featuredUntil: { type: Date, default: null },
    nearbyCoachingCenters: [NearbyCoachingSchema],
    nearbyEssentials: [NearbyEssentialSchema],
    stats: { type: PropertyStatsSchema, default: () => ({}) },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete (ret as any).__v;
        return ret;
      },
    },
  }
);

// Geospatial index
PropertySchema.index({ location: "2dsphere" });

// Browse + filter indexes
PropertySchema.index({ city: 1, area: 1, approvalStatus: 1, price: 1 });
PropertySchema.index({
  approvalStatus: 1,
  isFeatured: -1,
  createdAt: -1,
});
PropertySchema.index({ owner: 1, approvalStatus: 1 });
PropertySchema.index({
  propertyType: 1,
  roomType: 1,
  availability: 1,
});
PropertySchema.index({
  "amenities.wifi": 1,
  "amenities.ac": 1,
  genderPreference: 1,
});
PropertySchema.index({ "nearbyCoachingCenters.coachingCenterId": 1 });

// Full-text search index
PropertySchema.index(
  { title: "text", description: "text", area: "text" },
  { weights: { title: 10, area: 5, description: 1 } }
);

const Property: Model<IProperty> =
  mongoose.models.Property ||
  mongoose.model<IProperty>("Property", PropertySchema);

export default Property;
