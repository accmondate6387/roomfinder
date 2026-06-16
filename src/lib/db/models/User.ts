import mongoose, { Schema, Document, Model } from "mongoose";

// ==================================================
// User Model
// ==================================================

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  phone: string | null;
  role: "student" | "owner" | "admin";
  provider: "google" | "credentials";
  passwordHash: string | null;
  isOwnerVerified: boolean;
  ownerVerificationId: mongoose.Types.ObjectId | null;
  status: "active" | "suspended";
  suspendedAt: Date | null;
  suspendedReason: string | null;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    emailVerified: { type: Date, default: null },
    image: { type: String, default: null },
    phone: { type: String, default: null, trim: true },
    role: {
      type: String,
      enum: ["student", "owner", "admin"],
      default: "student",
      index: true,
    },
    provider: {
      type: String,
      enum: ["google", "credentials"],
      required: true,
    },
    passwordHash: { type: String, default: null, select: false },
    isOwnerVerified: { type: Boolean, default: false },
    ownerVerificationId: {
      type: Schema.Types.ObjectId,
      ref: "OwnerVerification",
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
    suspendedAt: { type: Date, default: null },
    suspendedReason: { type: String, default: null },
    lastLoginAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete (ret as any).passwordHash;
        delete (ret as any).__v;
        return ret;
      },
    },
  }
);

// Compound indexes
UserSchema.index({ role: 1, status: 1 });
UserSchema.index({ provider: 1 });

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
