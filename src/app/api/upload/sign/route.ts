import { NextResponse } from "next/server";
import { auth } from "@/features/auth/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    // Only logged-in users (owners/admins) can upload images
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { folder = "roomfinder" } = body;

    // Generate a timestamp
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Create signature
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      process.env.CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json({
      timestamp,
      signature,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder,
    });
  } catch (error) {
    console.error("Error generating signature:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
