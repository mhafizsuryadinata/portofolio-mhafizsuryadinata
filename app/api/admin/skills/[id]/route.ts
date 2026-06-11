import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { name, category, percentage } = data;
    
    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: {
        name,
        category,
        percentage: Number(percentage) || 80,
      },
    });
    return NextResponse.json({ success: true, skill: updatedSkill });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.skill.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: "Keterampilan berhasil dihapus." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
