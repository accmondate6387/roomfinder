// ==================================================
// Notification Store (Zustand)
// ==================================================

import { create } from "zustand";
import type { NotificationDTO } from "@/types";

interface NotificationState {
  notifications: NotificationDTO[];
  unreadCount: number;
  isOpen: boolean;

  // Actions
  setNotifications: (notifications: NotificationDTO[]) => void;
  addNotification: (notification: NotificationDTO) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isOpen: false,

  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + (notification.isRead ? 0 : 1),
    })),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),

  setOpen: (open) => set({ isOpen: open }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
