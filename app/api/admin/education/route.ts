import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, education });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { schoolName, degree, period, description, order } = data;
    const newEdu = await prisma.education.create({
      data: {
        schoolName,
        degree,
        period,
        description,
        order: Number(order) || 0,
      },
    });
    return NextResponse.json({ success: true, education: newEdu });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
