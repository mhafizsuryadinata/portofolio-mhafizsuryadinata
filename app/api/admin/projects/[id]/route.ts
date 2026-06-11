import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { title, description, imageUrl, techStack, category, demoUrl, githubUrl, order } = data;
    
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        techStack,
        category,
        demoUrl: demoUrl || null,
        githubUrl: githubUrl || null,
        order: Number(order) || 0,
      },
    });
    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.project.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: "Proyek berhasil dihapus." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
