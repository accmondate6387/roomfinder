import { OwnerRepository } from "./owner.repository";

export class OwnerService {
  static async getVerificationStatus(userId: string) {
    return await OwnerRepository.getVerificationStatus(userId);
  }

  static async submitVerification(userId: string, data: any) {
    return await OwnerRepository.submitVerification(userId, data);
  }
}
