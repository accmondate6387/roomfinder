import mongoose, { Schema, Document, Model } from "mongoose";

// ==================================================
// CoachingCenter Model (Admin-seeded)
// ==================================================

export interface ICoachingCenter extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  category: "upsc" | "pcs" | "ssc" | "jee" | "neet" | "other";
  address: string;
  city: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CoachingCenterSchema = new Schema<ICoachingCenter>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["upsc", "pcs", "ssc", "jee", "neet", "other"],
      required: true,
    },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, default: "Prayagraj" },
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
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

CoachingCenterSchema.index({ location: "2dsphere" });
CoachingCenterSchema.index({ city: 1, category: 1, isActive: 1 });

const CoachingCenter: Model<ICoachingCenter> =
  mongoose.models.CoachingCenter ||
  mongoose.model<ICoachingCenter>("CoachingCenter", CoachingCenterSchema);

export default CoachingCenter;
