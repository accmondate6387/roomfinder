"use server";

import { auth } from "@/features/auth/auth";
import { NotificationsService } from "./notifications.service";

export async function getNotificationsAction() {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, error: "Unauthorized" };

    const notifications = await NotificationsService.getUserNotifications(session.user.id);
    return { success: true, data: notifications };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch notifications" };
  }
}

export async function markNotificationAsReadAction(notificationId: string) {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, error: "Unauthorized" };

    await NotificationsService.markAsRead(notificationId, session.user.id);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to mark as read" };
  }
}

export async function markAllNotificationsAsReadAction() {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, error: "Unauthorized" };

    await NotificationsService.markAllAsRead(session.user.id);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to mark all as read" };
  }
}

export async function getUnreadNotificationCountAction() {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, error: "Unauthorized" };

    const count = await NotificationsService.getUnreadCount(session.user.id);
    return { success: true, data: count };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch unread count" };
  }
}
