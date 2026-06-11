import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, experiences });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { organization, role, period, description, order } = data;
    const newExp = await prisma.experience.create({
      data: {
        organization,
        role,
        period,
        description,
        order: Number(order) || 0,
      },
    });
    return NextResponse.json({ success: true, experience: newExp });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
