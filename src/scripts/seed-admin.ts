// ==================================================
// Admin Seed Script
// ==================================================
// Usage: npm run seed:admin
// Requires: MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME in .env.local
// ==================================================

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin";

async function seedAdmin() {
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not set in .env.local");
    process.exit(1);
  }

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error(
      "❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.local"
    );
    process.exit(1);
  }

  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Import User model after connection
    const { default: User } = await import("@/lib/db/models/User");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log(`⚠️ Admin user already exists: ${ADMIN_EMAIL}`);
      console.log(`   Role: ${existingAdmin.role}`);
      console.log(`   Status: ${existingAdmin.status}`);
      await mongoose.disconnect();
      process.exit(0);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    // Create admin user
    const admin = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      passwordHash,
      role: "admin",
      provider: "credentials",
      status: "active",
      emailVerified: new Date(),
      lastLoginAt: new Date(),
    });

    console.log("✅ Admin user created successfully!");
    console.log(`   Name: ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   ID: ${admin._id}`);
  } catch (error) {
    console.error("❌ Failed to seed admin:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

seedAdmin();
