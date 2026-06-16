import mongoose, { Schema, Document, Model } from "mongoose";

// ==================================================
// PropertyVerification Model
// ==================================================

export interface IPropertyVerification extends Document {
  _id: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  verifiedBy: mongoose.Types.ObjectId;
  verificationNote: string | null;
  verifiedAt: Date;
  createdAt: Date;
}

const PropertyVerificationSchema = new Schema<IPropertyVerification>({
  property: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
    unique: true,
  },
  verifiedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verificationNote: { type: String, default: null },
  verifiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const PropertyVerification: Model<IPropertyVerification> =
  mongoose.models.PropertyVerification ||
  mongoose.model<IPropertyVerification>(
    "PropertyVerification",
    PropertyVerificationSchema
  );

export default PropertyVerification;
