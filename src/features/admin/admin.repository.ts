import { connectToDatabase as connectDB } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import User from "@/lib/db/models/User";
import OwnerVerification from "@/lib/db/models/OwnerVerification";
import Review from "@/lib/db/models/Review";
import Report from "@/lib/db/models/Report";
import { Types } from "mongoose";

export class AdminRepository {
  static async getPlatformStats() {
    await connectDB();
    
    const [
      totalUsers,
      totalStudents,
      totalOwners,
      totalProperties,
      pendingApprovals,
      pendingVerifications,
      pendingReports,
      totalReviews
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "owner" }),
      Property.countDocuments(),
      Property.countDocuments({ approvalStatus: "pending" }),
      OwnerVerification.countDocuments({ status: "pending" }),
      Report.countDocuments({ status: "pending" }),
      Review.countDocuments()
    ]);

    return {
      totalUsers,
      totalStudents,
      totalOwners,
      totalProperties,
      pendingApprovals,
      pendingVerifications,
      pendingReports,
      totalReviews
    };
  }

  static async updatePropertyStatus(propertyId: string, status: "approved" | "rejected", reason?: string) {
    await connectDB();
    return await Property.findByIdAndUpdate(
      propertyId,
      { 
        approvalStatus: status,
        ...(reason && { rejectionReason: reason })
      },
      { new: true }
    );
  }

  static async verifyOwner(verificationId: string, status: "approved" | "rejected", adminNote?: string) {
    await connectDB();
    const verification = await OwnerVerification.findByIdAndUpdate(
      verificationId,
      { status, adminNote, reviewedAt: new Date() },
      { new: true }
    );

    if (verification && status === "approved") {
      await User.findByIdAndUpdate(verification.owner, { isOwnerVerified: true });
    }

    return verification;
  }
}
