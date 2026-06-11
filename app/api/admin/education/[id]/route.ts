import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { schoolName, degree, period, description, order } = data;
    
    const updatedEdu = await prisma.education.update({
      where: { id },
      data: {
        schoolName,
        degree,
        period,
        description,
        order: Number(order) || 0,
      },
    });
    return NextResponse.json({ success: true, education: updatedEdu });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.education.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: "Pendidikan berhasil dihapus." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
