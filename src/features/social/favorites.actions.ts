"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/features/auth/auth";
import { connectToDatabase } from "@/lib/db/connection";
import Favorite from "@/lib/db/models/Favorite";

export async function toggleFavoriteAction(propertyId: string) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return { error: "Please log in to save properties." };
    }

    await connectToDatabase();
    const userId = session.user.id;

    // Check if favorite exists
    const existingFav = await Favorite.findOne({ userId, propertyId });

    if (existingFav) {
      // Remove it
      await Favorite.findByIdAndDelete(existingFav._id);
      revalidatePath("/properties/[slug]", "page");
      return { success: true, isFavorited: false };
    } else {
      // Add it
      await Favorite.create({ userId, propertyId });
      revalidatePath("/properties/[slug]", "page");
      return { success: true, isFavorited: true };
    }
  } catch (error: any) {
    console.error("Favorite toggle error:", error);
    return { error: "Failed to update favorites." };
  }
}
