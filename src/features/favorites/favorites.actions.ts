"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/features/auth/auth";
import { FavoritesService } from "./favorites.service";

export async function toggleFavoriteAction(propertyId: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (session.user.role !== "student") {
      return { success: false, error: "Only students can save favorites" };
    }

    if (!propertyId) {
      return { success: false, error: "Property ID is required" };
    }

    const result = await FavoritesService.toggleFavorite(session.user.id, propertyId);

    revalidatePath(`/properties/[slug]`, "page");
    revalidatePath(`/favorites`, "page");
    
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to toggle favorite" };
  }
}
