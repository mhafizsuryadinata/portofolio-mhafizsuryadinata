import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      projectsCount,
      certificatesCount,
      skillsCount,
      experienceCount,
      educationCount,
      achievementsCount,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.certificate.count(),
      prisma.skill.count(),
      prisma.experience.count(),
      prisma.education.count(),
      prisma.achievement.count(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        projectsCount,
        certificatesCount,
        skillsCount,
        experienceCount,
        educationCount,
        achievementsCount,
      },
    });
  } catch (error: any) {
    console.error("Stats API Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data statistik.", error: error.message },
      { status: 500 }
    );
  }
}
