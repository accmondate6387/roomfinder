// ==================================================
// Coaching Centers Seed Script
// ==================================================
// Seeds initial coaching center data for Prayagraj.
// Usage: npm run seed:coaching
// ==================================================

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

// Prayagraj coaching centers with approximate coordinates
const coachingCenters = [
  {
    name: "Drishti IAS",
    slug: "drishti-ias-prayagraj",
    category: "upsc" as const,
    address: "Civil Lines, Prayagraj",
    city: "Prayagraj",
    location: { type: "Point" as const, coordinates: [81.8497, 25.4484] },
  },
  {
    name: "PW (Physics Wallah) Centre",
    slug: "pw-centre-prayagraj",
    category: "jee" as const,
    address: "George Town, Prayagraj",
    city: "Prayagraj",
    location: { type: "Point" as const, coordinates: [81.8462, 25.4358] },
  },
  {
    name: "KD Campus",
    slug: "kd-campus-prayagraj",
    category: "ssc" as const,
    address: "Civil Lines, Prayagraj",
    city: "Prayagraj",
    location: { type: "Point" as const, coordinates: [81.8510, 25.4465] },
  },
  {
    name: "Career Launcher",
    slug: "career-launcher-prayagraj",
    category: "upsc" as const,
    address: "Tagore Town, Prayagraj",
    city: "Prayagraj",
    location: { type: "Point" as const, coordinates: [81.8430, 25.4320] },
  },
  {
    name: "Kiran Prakashan Study Centre",
    slug: "kiran-prakashan-prayagraj",
    category: "ssc" as const,
    address: "Lukerganj, Prayagraj",
    city: "Prayagraj",
    location: { type: "Point" as const, coordinates: [81.8400, 25.4380] },
  },
  {
    name: "Aakash Institute",
    slug: "aakash-institute-prayagraj",
    category: "neet" as const,
    address: "Civil Lines, Prayagraj",
    city: "Prayagraj",
    location: { type: "Point" as const, coordinates: [81.8520, 25.4490] },
  },
  {
    name: "Allen Career Institute",
    slug: "allen-career-institute-prayagraj",
    category: "jee" as const,
    address: "George Town, Prayagraj",
    city: "Prayagraj",
    location: { type: "Point" as const, coordinates: [81.8455, 25.4370] },
  },
  {
    name: "UP PCS Coaching Centre",
    slug: "up-pcs-coaching-prayagraj",
    category: "pcs" as const,
    address: "Allahpur, Prayagraj",
    city: "Prayagraj",
    location: { type: "Point" as const, coordinates: [81.8380, 25.4350] },
  },
  {
    name: "Sarvesh Coaching Classes",
    slug: "sarvesh-coaching-prayagraj",
    category: "upsc" as const,
    address: "Katra, Prayagraj",
    city: "Prayagraj",
    location: { type: "Point" as const, coordinates: [81.8530, 25.4300] },
  },
  {
    name: "Resonance Eduventures",
    slug: "resonance-eduventures-prayagraj",
    category: "jee" as const,
    address: "Civil Lines, Prayagraj",
    city: "Prayagraj",
    location: { type: "Point" as const, coordinates: [81.8500, 25.4470] },
  },
];

async function seedCoachingCenters() {
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not set");
    process.exit(1);
  }

  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);

    const { default: CoachingCenter } = await import(
      "@/lib/db/models/CoachingCenter"
    );

    console.log("🏫 Seeding coaching centers...");

    let created = 0;
    let skipped = 0;

    for (const center of coachingCenters) {
      const existing = await CoachingCenter.findOne({ slug: center.slug });
      if (existing) {
        console.log(`  ⏩ Skipped: ${center.name} (already exists)`);
        skipped++;
      } else {
        await CoachingCenter.create(center);
        console.log(`  ✅ Created: ${center.name}`);
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

seedCoachingCenters();
