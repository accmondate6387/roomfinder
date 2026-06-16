import { NotificationsRepository } from "./notifications.repository";
import { NotificationDTO } from "@/types";

export class NotificationsService {
  static async sendNotification(data: {
    user: string;
    type: string;
    title: string;
    message: string;
    link?: string;
  }) {
    return await NotificationsRepository.createNotification(data);
  }

  static async getUserNotifications(userId: string): Promise<NotificationDTO[]> {
    const notifications = await NotificationsRepository.getUserNotifications(userId);
    
    return notifications.map((n: any) => ({
      _id: n._id.toString(),
      type: n.type,
      title: n.title,
      message: n.message,
      link: n.link,
      isRead: n.isRead,
      createdAt: n.createdAt.toISOString(),
    }));
  }

  static async markAsRead(notificationId: string, userId: string) {
    const result = await NotificationsRepository.markAsRead(notificationId, userId);
    if (!result) throw new Error("Notification not found");
    return true;
  }

  static async markAllAsRead(userId: string) {
    await NotificationsRepository.markAllAsRead(userId);
    return true;
  }

  static async getUnreadCount(userId: string) {
    return await NotificationsRepository.getUnreadCount(userId);
  }
}
