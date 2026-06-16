import mongoose, { Schema, Document, Model } from "mongoose";

// ==================================================
// Report Model
// ==================================================

export interface IReport extends Document {
  _id: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  reporter: mongoose.Types.ObjectId;
  reason:
    | "fraud"
    | "wrong-photos"
    | "incorrect-price"
    | "already-occupied"
    | "misleading";
  description: string;
  status: "pending" | "reviewed" | "resolved" | "dismissed";
  adminNote: string | null;
  reviewedBy: mongoose.Types.ObjectId | null;
  reviewedAt: Date | null;
  createdAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      enum: [
        "fraud",
        "wrong-photos",
        "incorrect-price",
        "already-occupied",
        "misleading",
      ],
      required: true,
    },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    status: {
      type: String,
      enum: ["pending", "reviewed", "resolved", "dismissed"],
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
  { timestamps: { createdAt: true, updatedAt: false } }
);

ReportSchema.index({ status: 1, createdAt: -1 });
ReportSchema.index({ property: 1 });
ReportSchema.index({ reporter: 1 });

const Report: Model<IReport> =
  mongoose.models.Report || mongoose.model<IReport>("Report", ReportSchema);

export default Report;
