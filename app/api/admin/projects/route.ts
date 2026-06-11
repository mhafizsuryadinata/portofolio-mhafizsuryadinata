import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, description, imageUrl, techStack, category, demoUrl, githubUrl, order } = data;
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl: imageUrl || "/projects/placeholder.png",
        techStack,
        category,
        demoUrl: demoUrl || null,
        githubUrl: githubUrl || null,
        order: Number(order) || 0,
      },
    });
    return NextResponse.json({ success: true, project: newProject });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
