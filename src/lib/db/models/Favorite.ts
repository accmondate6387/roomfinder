import mongoose, { Schema, Document, Model } from "mongoose";

// ==================================================
// Favorite Model
// ==================================================

export interface IFavorite extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  createdAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// One favorite per user per property
FavoriteSchema.index({ user: 1, property: 1 }, { unique: true });
FavoriteSchema.index({ user: 1, createdAt: -1 });

const Favorite: Model<IFavorite> =
  mongoose.models.Favorite ||
  mongoose.model<IFavorite>("Favorite", FavoriteSchema);

export default Favorite;
