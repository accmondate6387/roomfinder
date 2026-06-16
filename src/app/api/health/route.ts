// ==================================================
// Health Check API
// ==================================================

import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  const status = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  };

  return NextResponse.json(status);
}
