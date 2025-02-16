import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
    const isConnected = mongoose.connection.readyState === 1;

    return NextResponse.json({ status: isConnected ? "✅ 연결됨" : "❌ 연결되지 않음" });
  } catch {
    return NextResponse.json({ error: "❌ MongoDB 연결 실패" }, { status: 500 });
  }
}
