import mongoose, { Schema, Document, Model } from "mongoose";
import { DATA_RETENTION } from "@/lib/constants";

// ==================================================
// PropertyView Model (Analytics tracking)
// ==================================================

export interface IPropertyView extends Document {
  _id: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId | null;
  sessionId: string;
  viewedAt: Date;
}

const PropertyViewSchema = new Schema<IPropertyView>({
  property: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  sessionId: { type: String, required: true },
  viewedAt: { type: Date, default: Date.now },
});

PropertyViewSchema.index({ property: 1, viewedAt: -1 });
// TTL index - auto-delete after retention period
PropertyViewSchema.index(
  { viewedAt: 1 },
  { expireAfterSeconds: DATA_RETENTION.PROPERTY_VIEWS_DAYS * 24 * 60 * 60 }
);

const PropertyView: Model<IPropertyView> =
  mongoose.models.PropertyView ||
  mongoose.model<IPropertyView>("PropertyView", PropertyViewSchema);

export default PropertyView;
