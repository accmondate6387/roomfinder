import { connectToDatabase as connectDB } from "@/lib/db/connection";
import Report from "@/lib/db/models/Report";
import { Types } from "mongoose";

export class ReportsRepository {
  static async createReport(data: {
    property: string;
    reporter: string;
    reason: string;
    description: string;
  }) {
    await connectDB();
    const report = new Report({
      property: new Types.ObjectId(data.property),
      reporter: new Types.ObjectId(data.reporter),
      reason: data.reason,
      description: data.description,
      status: "pending",
    });
    await report.save();
    return report;
  }

  static async hasUserReported(propertyId: string, reporterId: string) {
    await connectDB();
    const count = await Report.countDocuments({
      property: new Types.ObjectId(propertyId),
      reporter: new Types.ObjectId(reporterId),
      status: { $in: ["pending", "reviewed"] } // if it's already resolved or dismissed, they might report again? Usually limit to 1 active report per property
    });
    return count > 0;
  }

  static async getPendingReports() {
    await connectDB();
    return await Report.find({ status: "pending" })
      .populate("property", "title slug owner")
      .populate("reporter", "name email")
      .sort({ createdAt: -1 })
      .lean();
  }

  static async updateReportStatus(reportId: string, status: "resolved" | "dismissed", adminNote?: string) {
    await connectDB();
    return await Report.findByIdAndUpdate(
      reportId,
      { status, adminNote, resolvedAt: new Date() },
      { new: true }
    );
  }
}
