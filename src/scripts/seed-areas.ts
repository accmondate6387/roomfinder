// ==================================================
// Areas Seed Script
// ==================================================

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const areas = [
  "Civil Lines",
  "George Town",
  "Allahpur",
  "Katra",
  "Rajapur",
  "Tagore Town",
  "Lukerganj",
  "Kareli",
  "Mutthiganj",
  "Zero Road",
  "Atarsuiya",
  "Teliyarganj",
  "Naini",
  "Jhunsi",
  "Daraganj",
  "Kydganj",
  "Chowk",
  "Bai Ka Bagh",
  "Stanley Road",
  "Subedarganj",
];

async function seedAreas() {
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not set");
    process.exit(1);
  }

  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);

    const { default: AreaInsight } = await import(
      "@/lib/db/models/AreaInsight"
    );

    console.log("📍 Seeding area insights...");

    let created = 0;
    let skipped = 0;

    for (const area of areas) {
      const slug = generateSlug(area);
      const existing = await AreaInsight.findOne({
        city: "Prayagraj",
        slug,
      });

      if (existing) {
        console.log(`  ⏩ Skipped: ${area} (already exists)`);
        skipped++;
      } else {
        await AreaInsight.create({
          area,
          city: "Prayagraj",
          slug,
          avgRent: 0,
          totalListings: 0,
          studentFriendliness: 0,
          affordability: 0,
          totalVotes: 0,
          popularCoachingCenterIds: [],
          lastCalculatedAt: new Date(),
        });
        console.log(`  ✅ Created: ${area}`);
        created++;
      }
    }

    console.log(`\n✅ Done! Created: ${created}, Skipped: ${skipped}`);
  } catch (error) {
    console.error("❌ Failed to seed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedAreas();
