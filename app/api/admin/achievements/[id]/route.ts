import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { title, awarder, date, description, icon } = data;
    
    const updatedAch = await prisma.achievement.update({
      where: { id },
      data: {
        title,
        awarder,
        date,
        description,
        icon: icon || "Award",
      },
    });
    return NextResponse.json({ success: true, achievement: updatedAch });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.achievement.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: "Prestasi berhasil dihapus." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
