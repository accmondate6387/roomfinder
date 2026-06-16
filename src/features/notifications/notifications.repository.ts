import { connectToDatabase as connectDB } from "@/lib/db/connection";
import Notification from "@/lib/db/models/Notification";
import { Types } from "mongoose";

export class NotificationsRepository {
  static async createNotification(data: {
    user: string;
    type: string;
    title: string;
    message: string;
    link?: string | null;
  }) {
    await connectDB();
    const notification = new Notification({
      user: new Types.ObjectId(data.user),
      type: data.type,
      title: data.title,
      message: data.message,
      link: data.link || null,
      isRead: false,
    });
    await notification.save();
    return notification;
  }

  static async getUserNotifications(userId: string, limit = 20) {
    await connectDB();
    const notifications = await Notification.find({ user: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return notifications;
  }

  static async markAsRead(notificationId: string, userId: string) {
    await connectDB();
    const result = await Notification.findOneAndUpdate(
      { _id: new Types.ObjectId(notificationId), user: new Types.ObjectId(userId) },
      { $set: { isRead: true } },
      { new: true }
    );
    return result;
  }

  static async markAllAsRead(userId: string) {
    await connectDB();
    await Notification.updateMany(
      { user: new Types.ObjectId(userId), isRead: false },
      { $set: { isRead: true } }
    );
  }

  static async getUnreadCount(userId: string) {
    await connectDB();
    return await Notification.countDocuments({
      user: new Types.ObjectId(userId),
      isRead: false,
    });
  }
}
