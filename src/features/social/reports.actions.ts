"use server";

import { auth } from "@/features/auth/auth";
import { connectToDatabase } from "@/lib/db/connection";
import Report from "@/lib/db/models/Report";
import { z } from "zod";

const reportSchema = z.object({
  propertyId: z.string().min(1, "Property ID is required"),
  reason: z.enum(["fake_listing", "scam", "inaccurate_info", "offensive", "other"]),
  details: z.string().max(1000, "Details are too long").optional(),
});

export async function submitReportAction(
  prevState: any,
  formData: FormData
) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return { error: "You must be logged in to report a listing." };
    }

    const rawData = {
      propertyId: formData.get("propertyId"),
      reason: formData.get("reason"),
      details: formData.get("details"),
    };

    const validatedData = reportSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        error: "Invalid input",
        validationErrors: validatedData.error.flatten().fieldErrors,
      };
    }

    await connectToDatabase();

    const reporterId = session.user.id;
    const { propertyId, reason, details } = validatedData.data;

    // Create report (Admin will review this in the admin dashboard)
    await Report.create({
      propertyId,
      reporterId,
      reason,
      details,
      status: "pending",
    });

    return { success: true, message: "Report submitted successfully. Our team will review it." };

  } catch (error: any) {
    console.error("Submit report error:", error);
    return { error: "Failed to submit report. Please try again later." };
  }
}
