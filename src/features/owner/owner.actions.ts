"use server";

import { auth } from "@/features/auth/auth";
import { OwnerService } from "./owner.service";
import { revalidatePath } from "next/cache";

export async function submitVerificationAction(data: {
  idProofType: string;
  idProofUrl: string;
  idProofPublicId: string;
  phone: string;
}) {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, error: "Unauthorized" };
    if (session.user.role !== "owner") return { success: false, error: "Only owners can submit verifications" };

    const result = await OwnerService.submitVerification(session.user.id, data);
    
    revalidatePath("/dashboard/verification");
    return { success: true, data: { id: result._id.toString() } };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to submit verification" };
  }
}
