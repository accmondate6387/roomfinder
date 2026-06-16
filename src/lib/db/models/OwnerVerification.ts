import mongoose, { Schema, Document, Model } from "mongoose";

// ==================================================
// OwnerVerification Model
// ==================================================

export interface IOwnerVerification extends Document {
  _id: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
  idProofType: "aadhaar" | "pan" | "voter-id" | "driving-license";
  idProofUrl: string;
  idProofPublicId: string;
  phone: string;
  propertyProofUrl: string | null;
  propertyProofPublicId: string | null;
  status: "pending" | "approved" | "rejected";
  adminNote: string | null;
  reviewedBy: mongoose.Types.ObjectId | null;
  reviewedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const OwnerVerificationSchema = new Schema<IOwnerVerification>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    idProofType: {
      type: String,
      enum: ["aadhaar", "pan", "voter-id", "driving-license"],
      required: true,
    },
    idProofUrl: { type: String, required: true },
    idProofPublicId: { type: String, required: true },
    phone: { type: String, required: true, trim: true },
    propertyProofUrl: { type: String, default: null },
    propertyProofPublicId: { type: String, default: null },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNote: { type: String, default: null },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reviewedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

OwnerVerificationSchema.index({ status: 1, createdAt: -1 });

const OwnerVerification: Model<IOwnerVerification> =
  mongoose.models.OwnerVerification ||
  mongoose.model<IOwnerVerification>(
    "OwnerVerification",
    OwnerVerificationSchema
  );

export default OwnerVerification;
