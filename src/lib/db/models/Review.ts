import mongoose, { Schema, Document, Model } from "mongoose";

// ==================================================
// Review Model
// ==================================================

export interface IRatings {
  cleanliness: number;
  waterSupply: number;
  electricity: number;
  wifiQuality: number;
  safety: number;
  ownerBehaviour: number;
  overall: number;
}

export interface IReview extends Document {
  _id: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  ratings: IRatings;
  comment: string;
  status: "active" | "flagged" | "removed";
  moderationNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const RatingsSchema = new Schema<IRatings>(
  {
    cleanliness: { type: Number, required: true, min: 1, max: 5 },
    waterSupply: { type: Number, required: true, min: 1, max: 5 },
    electricity: { type: Number, required: true, min: 1, max: 5 },
    wifiQuality: { type: Number, required: true, min: 1, max: 5 },
    safety: { type: Number, required: true, min: 1, max: 5 },
    ownerBehaviour: { type: Number, required: true, min: 1, max: 5 },
    overall: { type: Number, required: true, min: 1, max: 5 },
  },
  { _id: false }
);

const ReviewSchema = new Schema<IReview>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratings: { type: RatingsSchema, required: true },
    comment: { type: String, required: true, trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ["active", "flagged", "removed"],
      default: "active",
    },
    moderationNote: { type: String, default: null },
  },
  { timestamps: true }
);

// One review per user per property
ReviewSchema.index({ user: 1, property: 1 }, { unique: true });
ReviewSchema.index({ property: 1, createdAt: -1 });
ReviewSchema.index({ status: 1 });

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
