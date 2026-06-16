import { ReportsRepository } from "./reports.repository";
import { CreateReportInput } from "@/validations";

export class ReportsService {
  static async submitReport(userId: string, data: CreateReportInput) {
    const hasReported = await ReportsRepository.hasUserReported(data.propertyId, userId);
    
    if (hasReported) {
      throw new Error("You already have an active report for this property");
    }

    const report = await ReportsRepository.createReport({
      property: data.propertyId,
      reporter: userId,
      reason: data.reason,
      description: data.description,
    });

    return report;
  }

  static async getPendingReports() {
    return await ReportsRepository.getPendingReports();
  }

  static async updateReportStatus(reportId: string, status: "resolved" | "dismissed", adminNote?: string) {
    return await ReportsRepository.updateReportStatus(reportId, status, adminNote);
  }
}
