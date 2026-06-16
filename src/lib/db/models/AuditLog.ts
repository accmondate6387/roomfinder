import mongoose, { Schema, Document, Model } from "mongoose";
import { DATA_RETENTION } from "@/lib/constants";

// ==================================================
// AuditLog Model
// ==================================================

export interface IAuditLog extends Document {
  _id: mongoose.Types.ObjectId;
  actor: mongoose.Types.ObjectId;
  action: string;
  target: {
    type: "user" | "property" | "review" | "report";
    id: mongoose.Types.ObjectId;
  };
  metadata: Record<string, unknown>;
  ip: string;
  userAgent: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  actor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: { type: String, required: true },
  target: {
    type: {
      type: String,
      enum: ["user", "property", "review", "report"],
      required: true,
    },
    id: { type: Schema.Types.ObjectId, required: true },
  },
  metadata: { type: Schema.Types.Mixed, default: {} },
  ip: { type: String, required: true },
  userAgent: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

// TTL index
AuditLogSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: DATA_RETENTION.AUDIT_LOGS_DAYS * 24 * 60 * 60 }
);
AuditLogSchema.index({ actor: 1, action: 1 });
AuditLogSchema.index({ "target.id": 1 });

const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog ||
  mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);

export default AuditLog;
