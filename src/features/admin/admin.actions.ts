"use server";

import { auth } from "@/features/auth/auth";
import { AdminService } from "./admin.service";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db/connection";
import User from "@/lib/db/models/User";
import Review from "@/lib/db/models/Review";
import Property from "@/lib/db/models/Property";
import CoachingCenter from "@/lib/db/models/CoachingCenter";
import Essential from "@/lib/db/models/Essential";
import { ReportsService } from "@/features/reports/reports.service";

// ── Auth guard helper ──────────────────────────────────────────────────────
async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "admin") throw new Error("Unauthorized");
  return session;
}

// ── Property approval ──────────────────────────────────────────────────────
export async function approvePropertyAction(propertyId: string) {
  try {
    await requireAdmin();
    await AdminService.updatePropertyStatus(propertyId, "approved");
    revalidatePath("/admin/listings");
    revalidatePath("/admin/verifications/properties");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function rejectPropertyAction(propertyId: string, reason: string) {
  try {
    await requireAdmin();
    await AdminService.updatePropertyStatus(propertyId, "rejected", reason);
    revalidatePath("/admin/listings");
    revalidatePath("/admin/verifications/properties");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ── Owner verification ─────────────────────────────────────────────────────
export async function processOwnerVerificationAction(
  verificationId: string,
  status: "approved" | "rejected",
  note?: string
) {
  try {
    await requireAdmin();
    await AdminService.verifyOwner(verificationId, status, note);
    revalidatePath("/admin/verifications/owners");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ── Reports ────────────────────────────────────────────────────────────────
export async function processReportAction(
  reportId: string,
  status: "resolved" | "dismissed",
  adminNote?: string
) {
  try {
    await requireAdmin();
    await ReportsService.updateReportStatus(reportId, status, adminNote);
    revalidatePath("/admin/reports");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ── User management ────────────────────────────────────────────────────────
export async function toggleUserSuspensionAction(
  userId: string,
  newStatus: "active" | "suspended",
  reason?: string
) {
  try {
    await requireAdmin();
    await connectToDatabase();
    await User.findByIdAndUpdate(userId, {
      status: newStatus,
      ...(newStatus === "suspended"
        ? { suspendedAt: new Date(), suspendedReason: reason || "" }
        : { suspendedAt: null, suspendedReason: null }),
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ── Review moderation ──────────────────────────────────────────────────────
export async function moderateReviewAction(
  reviewId: string,
  action: "flag" | "remove" | "restore"
) {
  try {
    await requireAdmin();
    await connectToDatabase();
    const statusMap = { flag: "flagged", remove: "removed", restore: "active" } as const;
    await Review.findByIdAndUpdate(reviewId, { status: statusMap[action] });
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ── Coaching centers ───────────────────────────────────────────────────────
interface CoachingCenterActionState {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
}

export async function addCoachingCenterAction(
  _prev: CoachingCenterActionState | undefined,
  formData: FormData
): Promise<CoachingCenterActionState> {
  try {
    await requireAdmin();
    await connectToDatabase();

    const name = (formData.get("name") as string)?.trim();
    const category = formData.get("category") as string;
    const address = (formData.get("address") as string)?.trim();
    const latitude = Number(formData.get("latitude"));
    const longitude = Number(formData.get("longitude"));

    const errors: Record<string, string[]> = {};
    if (!name || name.length < 2) errors.name = ["Name must be at least 2 characters"];
    if (!category) errors.category = ["Category is required"];
    if (!address || address.length < 5) errors.address = ["Address is required"];
    if (isNaN(latitude) || latitude < -90 || latitude > 90) errors.latitude = ["Valid latitude required"];
    if (isNaN(longitude) || longitude < -180 || longitude > 180) errors.longitude = ["Valid longitude required"];

    if (Object.keys(errors).length > 0) return { errors };

    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      + "-" + Math.random().toString(36).substring(2, 6);

    await CoachingCenter.create({
      name,
      slug,
      category,
      address,
      city: "Prayagraj",
      location: { type: "Point", coordinates: [longitude, latitude] },
      isActive: true,
    });

    revalidatePath("/admin/coaching-centers");
    return { success: true, message: `"${name}" added successfully.` };
  } catch (error: any) {
    return { message: error.message || "Failed to add coaching center." };
  }
}

export async function toggleCoachingCenterAction(
  centerId: string,
  isActive: boolean
) {
  try {
    await requireAdmin();
    await connectToDatabase();
    await CoachingCenter.findByIdAndUpdate(centerId, { isActive });
    revalidatePath("/admin/coaching-centers");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ── Featured listings ──────────────────────────────────────────────────────
export async function toggleFeaturedAction(
  propertyId: string,
  featured: boolean
) {
  try {
    await requireAdmin();
    await connectToDatabase();
    await Property.findByIdAndUpdate(propertyId, { isFeatured: featured });
    revalidatePath("/admin/featured");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ── Essentials ─────────────────────────────────────────────────────────────
interface EssentialActionState {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
}

export async function addEssentialAction(
  _prev: EssentialActionState | undefined,
  formData: FormData
): Promise<EssentialActionState> {
  try {
    await requireAdmin();
    await connectToDatabase();

    const name    = (formData.get("name") as string)?.trim();
    const type    = formData.get("type") as string;
    const area    = formData.get("area") as string;
    const address = (formData.get("address") as string)?.trim();
    const latitude  = Number(formData.get("latitude"));
    const longitude = Number(formData.get("longitude"));

    const errors: Record<string, string[]> = {};
    if (!name || name.length < 2)    errors.name    = ["Name must be at least 2 characters"];
    if (!type)                        errors.type    = ["Type is required"];
    if (!area)                        errors.area    = ["Area is required"];
    if (!address || address.length < 5) errors.address = ["Address is required"];
    if (isNaN(latitude)  || latitude  < -90  || latitude  > 90)  errors.latitude  = ["Valid latitude required"];
    if (isNaN(longitude) || longitude < -180 || longitude > 180) errors.longitude = ["Valid longitude required"];

    if (Object.keys(errors).length > 0) return { errors };

    await Essential.create({
      name,
      type,
      area,
      address,
      city: "Prayagraj",
      location: { type: "Point", coordinates: [longitude, latitude] },
      isActive: true,
    });

    revalidatePath("/admin/essentials");
    return { success: true, message: `"${name}" added successfully.` };
  } catch (error: any) {
    return { message: error.message || "Failed to add essential." };
  }
}

export async function toggleEssentialAction(
  essentialId: string,
  isActive: boolean
) {
  try {
    await requireAdmin();
    await connectToDatabase();
    await Essential.findByIdAndUpdate(essentialId, { isActive });
    revalidatePath("/admin/essentials");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

