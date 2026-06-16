"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import {
  getUnreadNotificationCountAction,
  getNotificationsAction,
  markNotificationAsReadAction,
  markAllNotificationsAsReadAction
} from "@/features/notifications/notifications.actions";
import { NotificationDTO } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Button } from "../ui/Button";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export function NotificationBell() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadUnreadCount();
      // Optional: Poll every 60s
      const interval = setInterval(loadUnreadCount, 60000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const loadUnreadCount = async () => {
    const res = await getUnreadNotificationCountAction();
    if (res.success && res.data !== undefined) {
      setUnreadCount(res.data);
    }
  };

  const handleOpen = async () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsLoading(true);
      const res = await getNotificationsAction();
      if (res.success && res.data) {
        setNotifications(res.data);
      }
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await markNotificationAsReadAction(id);
    if (res.success) {
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, isRead: true } : n
      ));
      setUnreadCount(Math.max(0, unreadCount - 1));
    }
  };

  const handleMarkAllAsRead = async () => {
    const res = await markAllNotificationsAsReadAction();
    if (res.success) {
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="relative p-2 text-slate-500 hover:text-slate-900 focus:outline-none transition-colors rounded-full hover:bg-slate-100"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-semibold text-slate-900">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-xs font-medium text-primary hover:text-primary/80"
                >
                  Mark all as read
                </button>
              )}
            </div>
            
            <div className="overflow-y-auto flex-1">
              {isLoading ? (
                <div className="p-8 text-center text-sm text-slate-500">Loading notifications...</div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">
                  <Bell className="mx-auto h-8 w-8 text-slate-300 mb-3" />
                  No notifications yet
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {notifications.map((notification) => (
                    <div 
                      key={notification._id}
                      className={`p-4 hover:bg-slate-50 transition-colors ${!notification.isRead ? 'bg-primary/5' : ''}`}
                    >
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <p className={`text-sm ${!notification.isRead ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-slate-400">
                              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                            </span>
                            {!notification.isRead && (
                              <button 
                                onClick={(e) => handleMarkAsRead(notification._id, e)}
                                className="text-xs font-medium text-primary"
                              >
                                Mark read
                              </button>
                            )}
                          </div>
                          {notification.link && (
                            <Link 
                              href={notification.link}
                              onClick={() => setIsOpen(false)}
                              className="mt-3 inline-block text-xs font-medium text-primary hover:underline"
                            >
                              View Details
                            </Link>
                          )}
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-primary mt-1 shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
