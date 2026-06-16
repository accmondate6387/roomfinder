"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/features/auth/auth";
import { connectToDatabase } from "@/lib/db/connection";
import Review from "@/lib/db/models/Review";
import Property from "@/lib/db/models/Property";
import { z } from "zod";

const reviewSchema = z.object({
  propertyId: z.string().min(1, "Property ID is required"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  comment: z.string().min(10, "Review must be at least 10 characters long").max(1000, "Review is too long"),
});

export async function submitReviewAction(
  prevState: any,
  formData: FormData
) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return { error: "You must be logged in to leave a review." };
    }

    if (session.user.role !== "student") {
      return { error: "Only students can leave property reviews." };
    }

    const rawData = {
      propertyId: formData.get("propertyId"),
      rating: Number(formData.get("rating")),
      comment: formData.get("comment"),
    };

    const validatedData = reviewSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        error: "Invalid input",
        validationErrors: validatedData.error.flatten().fieldErrors,
      };
    }

    await connectToDatabase();

    const userId = session.user.id;
    const { propertyId, rating, comment } = validatedData.data;

    // Check if user already reviewed this property
    const existingReview = await Review.findOne({ propertyId, authorId: userId });
    
    if (existingReview) {
      return { error: "You have already reviewed this property." };
    }

    // Create review
    await Review.create({
      propertyId,
      authorId: userId,
      rating,
      comment,
      status: "published", // Auto-publish for now, could be 'pending' for moderation
    });

    // Update property stats (running average)
    const property = await Property.findById(propertyId);
    if (property) {
      const newReviewCount = property.stats.reviewCount + 1;
      const newAvgRating = ((property.stats.avgRating * property.stats.reviewCount) + rating) / newReviewCount;
      
      await Property.findByIdAndUpdate(propertyId, {
        "stats.reviewCount": newReviewCount,
        "stats.avgRating": newAvgRating,
      });
    }

    revalidatePath("/properties/[slug]", "page");
    return { success: true, message: "Review submitted successfully!" };

  } catch (error: any) {
    console.error("Submit review error:", error);
    return { error: "Failed to submit review. Please try again." };
  }
}
