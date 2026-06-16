import mongoose, { Schema, Document, Model } from "mongoose";

// ==================================================
// AreaInsight Model (Auto-calculated + Community-driven)
// ==================================================

export interface IAreaInsight extends Document {
  _id: mongoose.Types.ObjectId;
  area: string;
  city: string;
  slug: string;
  avgRent: number;
  totalListings: number;
  studentFriendliness: number;
  affordability: number;
  totalVotes: number;
  popularCoachingCenterIds: mongoose.Types.ObjectId[];
  lastCalculatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AreaInsightSchema = new Schema<IAreaInsight>(
  {
    area: { type: String, required: true, trim: true },
    city: { type: String, required: true, default: "Prayagraj" },
    slug: { type: String, required: true },
    avgRent: { type: Number, default: 0 },
    totalListings: { type: Number, default: 0 },
    studentFriendliness: { type: Number, default: 0, min: 0, max: 5 },
    affordability: { type: Number, default: 0, min: 0, max: 5 },
    totalVotes: { type: Number, default: 0 },
    popularCoachingCenterIds: [
      { type: Schema.Types.ObjectId, ref: "CoachingCenter" },
    ],
    lastCalculatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

AreaInsightSchema.index({ city: 1, slug: 1 }, { unique: true });
AreaInsightSchema.index({ city: 1, area: 1 });

const AreaInsight: Model<IAreaInsight> =
  mongoose.models.AreaInsight ||
  mongoose.model<IAreaInsight>("AreaInsight", AreaInsightSchema);

export default AreaInsight;
