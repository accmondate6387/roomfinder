import mongoose, { Schema, Document, Model } from "mongoose";
import { DATA_RETENTION } from "@/lib/constants";

// ==================================================
// Notification Model (In-app notifications)
// ==================================================

export type NotificationType =
  | "listing-approved"
  | "listing-rejected"
  | "new-review"
  | "new-report"
  | "owner-verified"
  | "property-verified"
  | "account-suspended"
  | "inquiry";

export interface INotification extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  link: string | null;
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: [
      "listing-approved",
      "listing-rejected",
      "new-review",
      "new-report",
      "owner-verified",
      "property-verified",
      "account-suspended",
      "inquiry",
    ],
    required: true,
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String, default: null },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

NotificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });
// TTL index
NotificationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: DATA_RETENTION.NOTIFICATIONS_DAYS * 24 * 60 * 60 }
);

const Notification: Model<INotification> =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;
