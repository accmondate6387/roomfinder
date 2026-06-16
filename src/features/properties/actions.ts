"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/features/auth/auth";
import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import { createPropertySchema, updatePropertySchema } from "@/validations";
import type { CreatePropertyInput } from "@/validations";

export interface PropertyActionState {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
}

// Generate a URL-friendly slug
function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${base}-${randomStr}`;
}

/**
 * Create a new property listing (Owner only)
 */
export async function createPropertyAction(
  _prevState: PropertyActionState | undefined,
  formData: FormData
): Promise<PropertyActionState> {
  const session = await auth();
  
  if (!session?.user || session.user.role !== "owner") {
    return { message: "Unauthorized. Only verified owners can add properties." };
  }

  // Parse amenities from FormData (checkboxes)
  const amenities = {
    ac: formData.get("amenities.ac") === "on",
    wifi: formData.get("amenities.wifi") === "on",
    furnished: formData.get("amenities.furnished") === "on",
    foodAvailable: formData.get("amenities.foodAvailable") === "on",
    attachedBathroom: formData.get("amenities.attachedBathroom") === "on",
    laundry: formData.get("amenities.laundry") === "on",
    parking: formData.get("amenities.parking") === "on",
    powerBackup: formData.get("amenities.powerBackup") === "on",
    cctv: formData.get("amenities.cctv") === "on",
    waterPurifier: formData.get("amenities.waterPurifier") === "on",
    studyRoom: formData.get("amenities.studyRoom") === "on",
    hotWater: formData.get("amenities.hotWater") === "on",
  };

  // Parse basic data
  const rawData: any = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    securityDeposit: formData.get("securityDeposit") ? Number(formData.get("securityDeposit")) : null,
    area: formData.get("area"),
    address: formData.get("address"),
    latitude: Number(formData.get("latitude")),
    longitude: Number(formData.get("longitude")),
    propertyType: formData.get("propertyType"),
    roomType: formData.get("roomType"),
    genderPreference: formData.get("genderPreference"),
    availability: formData.get("availability"),
    availableFrom: formData.get("availableFrom") || null,
    amenities,
  };

  // Extract photos (passed as JSON string from client-side upload component)
  const photosJson = formData.get("photosJson") as string;
  let photos = [];
  if (photosJson) {
    try {
      photos = JSON.parse(photosJson);
    } catch {
      return { message: "Invalid photo data." };
    }
  }

  if (photos.length === 0) {
    return { message: "At least one photo is required." };
  }

  const result = createPropertySchema.safeParse(rawData);
  
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await connectToDatabase();

    const slug = generateSlug(result.data.title);

    await Property.create({
      owner: session.user.id,
      ...result.data,
      slug,
      location: {
        type: "Point",
        coordinates: [result.data.longitude, result.data.latitude],
      },
      photos,
      video: null, // Add video handling later if needed
      approvalStatus: "pending", // Requires admin approval before going live
    });
    
  } catch (error: any) {
    console.error("Property creation error:", error);
    return { message: "Something went wrong while saving the property." };
  }

  revalidatePath("/dashboard/listings");
  redirect("/dashboard/listings?created=true");
}

/**
 * Delete a property listing
 */
export async function deletePropertyAction(propertyId: string) {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await connectToDatabase();
  
  // Find property to ensure it belongs to the user (unless admin)
  const property = await Property.findById(propertyId);
  
  if (!property) {
    throw new Error("Property not found");
  }
  
  if (property.owner.toString() !== session.user.id && session.user.role !== "admin") {
    throw new Error("Unauthorized to delete this property");
  }

  await Property.findByIdAndDelete(propertyId);
  
  revalidatePath("/dashboard/listings");
  revalidatePath("/admin/listings");
  revalidatePath("/properties");
}
