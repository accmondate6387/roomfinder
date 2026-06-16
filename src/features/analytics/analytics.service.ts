import { AnalyticsRepository } from "./analytics.repository";

export class AnalyticsService {
  static async recordPropertyView(propertyId: string, userId: string | null, sessionId: string) {
    return await AnalyticsRepository.recordPropertyView(propertyId, userId, sessionId);
  }

  static async recordContactClick(propertyId: string) {
    return await AnalyticsRepository.recordContactClick(propertyId);
  }

  static async getOwnerAnalyticsSummary(ownerId: string) {
    return await AnalyticsRepository.getOwnerAnalyticsSummary(ownerId);
  }
}
