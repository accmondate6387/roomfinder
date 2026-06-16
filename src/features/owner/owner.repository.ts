import { connectToDatabase as connectDB } from "@/lib/db/connection";
import OwnerVerification from "@/lib/db/models/OwnerVerification";
import User from "@/lib/db/models/User";
import { Types } from "mongoose";

export class OwnerRepository {
  static async getVerificationStatus(userId: string) {
    await connectDB();
    const verification = await OwnerVerification.findOne({ owner: new Types.ObjectId(userId) }).sort({ createdAt: -1 });
    return verification;
  }

  static async submitVerification(userId: string, data: {
    idProofType: string;
    idProofUrl: string;
    idProofPublicId: string;
    phone: string;
    propertyProofUrl?: string;
    propertyProofPublicId?: string;
  }) {
    await connectDB();
    
    // Check if there's already a pending verification
    const existing = await OwnerVerification.findOne({
      owner: new Types.ObjectId(userId),
      status: "pending"
    });

    if (existing) {
      throw new Error("You already have a pending verification request.");
    }

    const verification = new OwnerVerification({
      owner: new Types.ObjectId(userId),
      idProofType: data.idProofType,
      idProofUrl: data.idProofUrl,
      idProofPublicId: data.idProofPublicId,
      phone: data.phone,
      propertyProofUrl: data.propertyProofUrl || null,
      propertyProofPublicId: data.propertyProofPublicId || null,
      status: "pending"
    });

    await verification.save();
    
    // Update user phone number
    await User.findByIdAndUpdate(userId, { phone: data.phone });

    return verification;
  }
}
