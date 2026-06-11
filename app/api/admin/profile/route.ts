import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { verifySessionToken } from "@/lib/auth";

export async function GET() {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: "profile" },
    });
    return NextResponse.json({ success: true, profile });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil profil.", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { fullName, status, bio, vision, careerGoals, avatarUrl, cvUrl, newPassword } = data;

    // 1. Update Profile fields
    const updatedProfile = await prisma.profile.upsert({
      where: { id: "profile" },
      update: {
        fullName,
        status,
        bio,
        vision,
        careerGoals,
        avatarUrl,
        cvUrl,
      },
      create: {
        id: "profile",
        fullName: fullName || "M.Hafiz Suryadinata",
        status: status || "Mahasiswa",
        bio: bio || "",
        vision: vision || "",
        careerGoals: careerGoals || "",
        avatarUrl: avatarUrl || "/avatar.jpg",
        cvUrl: cvUrl || "/cv.pdf",
      },
    });

    // 2. Handle Password update if newPassword is provided
    if (newPassword && newPassword.trim().length >= 6) {
      // Find the logged-in admin from cookie session
      const token = request.headers.get("cookie")
        ?.split(";")
        .find(c => c.trim().startsWith("admin_session="))
        ?.split("=")[1];

      if (token) {
        const decoded = await verifySessionToken(token);
        if (decoded && decoded.userId) {
          const hashedPassword = bcrypt.hashSync(newPassword, 10);
          await prisma.admin.update({
            where: { id: decoded.userId },
            data: { password: hashedPassword },
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Profil berhasil diperbarui!",
      profile: updatedProfile,
    });
  } catch (error: any) {
    console.error("Profile PUT Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui profil.", error: error.message },
      { status: 500 }
    );
  }
}
