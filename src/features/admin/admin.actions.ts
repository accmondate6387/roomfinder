"use server";

import { auth } from "@/features/auth/auth";
import { AdminService } from "./admin.service";
import { revalidatePath } from "next/cache";

export async function approvePropertyAction(propertyId: string) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") return { success: false, error: "Unauthorized" };

    await AdminService.updatePropertyStatus(propertyId, "approved");
    revalidatePath("/admin/listings");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to approve property" };
  }
}

export async function rejectPropertyAction(propertyId: string, reason: string) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") return { success: false, error: "Unauthorized" };

    await AdminService.updatePropertyStatus(propertyId, "rejected", reason);
    revalidatePath("/admin/listings");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to reject property" };
  }
}

export async function processOwnerVerificationAction(verificationId: string, status: "approved" | "rejected", note?: string) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") return { success: false, error: "Unauthorized" };

    await AdminService.verifyOwner(verificationId, status, note);
    revalidatePath("/admin/verifications/owners");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to process verification" };
  }
}

import { ReportsService } from "@/features/reports/reports.service";

export async function processReportAction(reportId: string, status: "resolved" | "dismissed", adminNote?: string) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") return { success: false, error: "Unauthorized" };

    await ReportsService.updateReportStatus(reportId, status, adminNote);
    revalidatePath("/admin/reports");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to process report" };
  }
}
