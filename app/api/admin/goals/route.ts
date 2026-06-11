import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const goals = await prisma.goal.findMany({
      orderBy: { targetYear: "asc" },
    });
    return NextResponse.json({ success: true, goals });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, description, targetYear } = data;
    const newGoal = await prisma.goal.create({
      data: {
        title,
        description,
        targetYear,
      },
    });
    return NextResponse.json({ success: true, goal: newGoal });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
