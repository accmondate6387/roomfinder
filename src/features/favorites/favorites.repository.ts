import { connectToDatabase as connectDB } from "@/lib/db/connection";
import Favorite from "@/lib/db/models/Favorite";
import Property from "@/lib/db/models/Property";
import { Types } from "mongoose";

export class FavoritesRepository {
  /**
   * Add a property to user's favorites
   */
  static async addFavorite(userId: string, propertyId: string) {
    await connectDB();
    
    const existing = await Favorite.findOne({
      user: new Types.ObjectId(userId),
      property: new Types.ObjectId(propertyId)
    });

    if (!existing) {
      const favorite = new Favorite({
        user: new Types.ObjectId(userId),
        property: new Types.ObjectId(propertyId)
      });
      await favorite.save();
      
      // Increment favorite count on property
      await Property.findByIdAndUpdate(propertyId, {
        $inc: { "stats.favoriteCount": 1 }
      });
      return true;
    }
    return false;
  }

  /**
   * Remove a property from user's favorites
   */
  static async removeFavorite(userId: string, propertyId: string) {
    await connectDB();
    
    const result = await Favorite.deleteOne({
      user: new Types.ObjectId(userId),
      property: new Types.ObjectId(propertyId)
    });

    if (result.deletedCount > 0) {
      // Decrement favorite count on property
      await Property.findByIdAndUpdate(propertyId, {
        $inc: { "stats.favoriteCount": -1 }
      });
      return true;
    }
    return false;
  }

  /**
   * Check if a property is in user's favorites
   */
  static async isFavorite(userId: string, propertyId: string) {
    await connectDB();
    const count = await Favorite.countDocuments({
      user: new Types.ObjectId(userId),
      property: new Types.ObjectId(propertyId)
    });
    return count > 0;
  }

  /**
   * Get user's favorite properties with pagination
   */
  static async getUserFavorites(userId: string, page = 1, limit = 10) {
    await connectDB();
    const skip = (page - 1) * limit;

    const [favorites, total] = await Promise.all([
      Favorite.find({ user: new Types.ObjectId(userId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: "property",
          match: { approvalStatus: "approved" },
          select: "title slug price area city propertyType roomType genderPreference availability photos stats isVerified isFeatured createdAt"
        })
        .lean(),
      Favorite.countDocuments({ user: new Types.ObjectId(userId) })
    ]);

    // Filter out favorites where property might have been deleted or not approved
    const validFavorites = favorites.filter(f => f.property !== null);

    return { favorites: validFavorites, total };
  }
}
