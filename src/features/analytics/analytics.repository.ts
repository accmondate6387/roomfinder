import { connectToDatabase as connectDB } from "@/lib/db/connection";
import PropertyView from "@/lib/db/models/PropertyView";
import Property from "@/lib/db/models/Property";
import { Types } from "mongoose";

export class AnalyticsRepository {
  /**
   * Record a property view
   */
  static async recordPropertyView(propertyId: string, userId: string | null, sessionId: string) {
    await connectDB();
    
    // Check if viewed in last 24h by same session
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const existing = await PropertyView.findOne({
      property: new Types.ObjectId(propertyId),
      sessionId,
      viewedAt: { $gte: yesterday }
    });

    if (!existing) {
      const view = new PropertyView({
        property: new Types.ObjectId(propertyId),
        user: userId ? new Types.ObjectId(userId) : null,
        sessionId,
      });
      await view.save();

      // Increment property view count
      await Property.findByIdAndUpdate(propertyId, {
        $inc: { "stats.viewCount": 1 }
      });
      return true;
    }
    return false;
  }

  /**
   * Increment contact clicks
   */
  static async recordContactClick(propertyId: string) {
    await connectDB();
    await Property.findByIdAndUpdate(propertyId, {
      $inc: { "stats.contactClickCount": 1 }
    });
  }

  /**
   * Get owner analytics summary
   */
  static async getOwnerAnalyticsSummary(ownerId: string) {
    await connectDB();
    
    const properties = await Property.find({ owner: new Types.ObjectId(ownerId) }).lean();
    
    let totalViews = 0;
    let totalFavorites = 0;
    let totalContacts = 0;
    let pendingListings = 0;
    let approvedListings = 0;

    properties.forEach((p: any) => {
      totalViews += (p.stats?.viewCount || 0);
      totalFavorites += (p.stats?.favoriteCount || 0);
      totalContacts += (p.stats?.contactClickCount || 0);
      
      if (p.approvalStatus === "pending") pendingListings++;
      if (p.approvalStatus === "approved") approvedListings++;
    });

    return {
      totalListings: properties.length,
      totalViews,
      totalFavorites,
      totalContacts,
      pendingListings,
      approvedListings
    };
  }
}
