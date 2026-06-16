import { connectToDatabase as connectDB } from "@/lib/db/connection";
import Review from "@/lib/db/models/Review";
import Property from "@/lib/db/models/Property";
import { Types } from "mongoose";

export class ReviewsRepository {
  /**
   * Create a new review
   */
  static async createReview(data: {
    property: string;
    user: string;
    ratings: {
      cleanliness: number;
      waterSupply: number;
      electricity: number;
      wifiQuality: number;
      safety: number;
      ownerBehaviour: number;
      overall: number;
    };
    comment: string;
  }) {
    await connectDB();

    const review = new Review({
      property: new Types.ObjectId(data.property),
      user: new Types.ObjectId(data.user),
      ratings: data.ratings,
      comment: data.comment,
      status: "active",
    });

    await review.save();

    // Update property stats
    await this.updatePropertyReviewStats(data.property);

    return review;
  }

  /**
   * Check if a user has already reviewed a property
   */
  static async hasUserReviewed(propertyId: string, userId: string) {
    await connectDB();
    const count = await Review.countDocuments({
      property: new Types.ObjectId(propertyId),
      user: new Types.ObjectId(userId),
    });
    return count > 0;
  }

  /**
   * Get active reviews for a property
   */
  static async getPropertyReviews(propertyId: string, page = 1, limit = 10) {
    await connectDB();
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      Review.find({
        property: new Types.ObjectId(propertyId),
        status: "active",
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "name image")
        .lean(),
      Review.countDocuments({
        property: new Types.ObjectId(propertyId),
        status: "active",
      }),
    ]);

    return { reviews, total };
  }

  /**
   * Update the review stats for a property
   */
  private static async updatePropertyReviewStats(propertyId: string) {
    await connectDB();
    
    const pipeline = [
      {
        $match: {
          property: new Types.ObjectId(propertyId),
          status: "active",
        },
      },
      {
        $group: {
          _id: "$property",
          avgRating: { $avg: "$ratings.overall" },
          reviewCount: { $sum: 1 },
        },
      },
    ];

    const stats = await Review.aggregate(pipeline);

    if (stats.length > 0) {
      await Property.findByIdAndUpdate(propertyId, {
        "stats.avgRating": Math.round(stats[0].avgRating * 10) / 10,
        "stats.reviewCount": stats[0].reviewCount,
      });
    }
  }
}
