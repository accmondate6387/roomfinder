"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/features/auth/auth";
import { createReviewSchema, CreateReviewInput } from "@/validations";
import { ReviewsService } from "./reviews.service";

export async function submitReviewAction(data: CreateReviewInput) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (session.user.role !== "student") {
      return { success: false, error: "Only students can submit reviews" };
    }

    // Validate input
    const parsed = createReviewSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: "Invalid input data", details: parsed.error.errors };
    }

    const review = await ReviewsService.submitReview(session.user.id, parsed.data);

    revalidatePath(`/properties/[slug]`, "page");
    
    return { success: true, data: review };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to submit review" };
  }
}
