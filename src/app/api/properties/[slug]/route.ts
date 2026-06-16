import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import User from "@/lib/db/models/User";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    await connectToDatabase();

    // Populate owner details (just name and image, not sensitive info)
    const property = await Property.findOne({ slug })
      .populate({
        path: "owner",
        select: "name image email", // We might want phone if we added it, but stick to public info
      })
      .lean();

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ property });

  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Failed to fetch property details" },
      { status: 500 }
    );
  }
}
