"use server";

import { auth } from "@/features/auth/auth";
import { AnalyticsService } from "./analytics.service";
import { cookies } from "next/headers";

export async function recordPropertyViewAction(propertyId: string) {
  try {
    const session = await auth();
    
    // Get or set anonymous session ID
    const cookieStore = await cookies();
    let sessionId = cookieStore.get("rf_session")?.value;
    
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      cookieStore.set("rf_session", sessionId, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    }

    const userId = session?.user?.id || null;
    
    await AnalyticsService.recordPropertyView(propertyId, userId, sessionId);
    return { success: true };
  } catch (error) {
    // Fail silently for analytics
    return { success: false };
  }
}

export async function recordContactClickAction(propertyId: string) {
  try {
    await AnalyticsService.recordContactClick(propertyId);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
