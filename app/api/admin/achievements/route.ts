import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, achievements });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, awarder, date, description, icon } = data;
    const newAch = await prisma.achievement.create({
      data: {
        title,
        awarder,
        date,
        description,
        icon: icon || "Award",
      },
    });
    return NextResponse.json({ success: true, achievement: newAch });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
