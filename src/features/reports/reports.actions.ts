"use server";

import { auth } from "@/features/auth/auth";
import { createReportSchema, CreateReportInput } from "@/validations";
import { ReportsService } from "./reports.service";

export async function submitReportAction(data: CreateReportInput) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (session.user.role !== "student") {
      return { success: false, error: "Only students can report listings" };
    }

    // Validate input
    const parsed = createReportSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: "Invalid input data", details: parsed.error.errors };
    }

    const report = await ReportsService.submitReport(session.user.id, parsed.data);
    
    return { success: true, data: { id: report._id.toString() } };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to submit report" };
  }
}
