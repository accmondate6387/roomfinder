import mongoose, { Schema, Document, Model } from "mongoose";

// ==================================================
// Essential Model (Admin-curated nearby places)
// ==================================================

export interface IEssential extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  type:
    | "library"
    | "mess"
    | "hospital"
    | "medical-store"
    | "stationery"
    | "gym"
    | "bus-stop";
  address: string;
  area: string;
  city: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EssentialSchema = new Schema<IEssential>(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: [
        "library",
        "mess",
        "hospital",
        "medical-store",
        "stationery",
        "gym",
        "bus-stop",
      ],
      required: true,
    },
    address: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
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

EssentialSchema.index({ city: 1, area: 1, type: 1, isActive: 1 });
EssentialSchema.index({ location: "2dsphere" });

const Essential: Model<IEssential> =
  mongoose.models.Essential ||
  mongoose.model<IEssential>("Essential", EssentialSchema);

export default Essential;
