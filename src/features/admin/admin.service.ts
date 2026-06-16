import { AdminRepository } from "./admin.repository";

export class AdminService {
  static async getPlatformStats() {
    return await AdminRepository.getPlatformStats();
  }

  static async updatePropertyStatus(propertyId: string, status: "approved" | "rejected", reason?: string) {
    return await AdminRepository.updatePropertyStatus(propertyId, status, reason);
  }

  static async verifyOwner(verificationId: string, status: "approved" | "rejected", adminNote?: string) {
    return await AdminRepository.verifyOwner(verificationId, status, adminNote);
  }
}
