import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ success: true, skills });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, category, percentage } = data;
    const newSkill = await prisma.skill.create({
      data: {
        name,
        category,
        percentage: Number(percentage) || 80,
      },
    });
    return NextResponse.json({ success: true, skill: newSkill });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
