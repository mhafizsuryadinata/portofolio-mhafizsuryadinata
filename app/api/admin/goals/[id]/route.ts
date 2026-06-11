import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { title, description, targetYear } = data;
    
    const updatedGoal = await prisma.goal.update({
      where: { id },
      data: {
        title,
        description,
        targetYear,
      },
    });
    return NextResponse.json({ success: true, goal: updatedGoal });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.goal.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: "Target/Cita-cita berhasil dihapus." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
