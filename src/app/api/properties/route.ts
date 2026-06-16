import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import { FilterState } from "@/store/useFilterStore";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    // Filters parsing
    const area = searchParams.get("area");
    const propertyType = searchParams.get("propertyType");
    const roomType = searchParams.get("roomType");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const genderPreference = searchParams.get("genderPreference");
    
    // Sort parsing
    const sortBy = searchParams.get("sortBy") || "newest";

    const query: any = {
      approvalStatus: "approved", // Only show approved properties publicly
      availability: "available",
    };

    if (area) query.area = area;
    if (propertyType) query.propertyType = propertyType;
    if (roomType) query.roomType = roomType;
    if (genderPreference && genderPreference !== "any") query.genderPreference = genderPreference;
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    await connectToDatabase();

    // Determine sort order
    let sortOption: any = { createdAt: -1 };
    if (sortBy === "price_asc") sortOption = { price: 1 };
    if (sortBy === "price_desc") sortOption = { price: -1 };
    if (sortBy === "rating") sortOption = { "metrics.rating": -1 };

    const properties = await Property.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Property.countDocuments(query);

    return NextResponse.json({
      properties,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
