import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: "contact" },
    });
    return NextResponse.json({ success: true, contact });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data kontak.", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { email, whatsapp, github, linkedin, instagram } = data;

    const updatedContact = await prisma.contact.upsert({
      where: { id: "contact" },
      update: {
        email,
        whatsapp,
        github,
        linkedin,
        instagram,
      },
      create: {
        id: "contact",
        email: email || "mhafizsuryadinata@gmail.com",
        whatsapp: whatsapp || "",
        github: github || "",
        linkedin: linkedin || "",
        instagram: instagram || "",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Kontak berhasil diperbarui!",
      contact: updatedContact,
    });
  } catch (error: any) {
    console.error("Contact PUT Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui kontak.", error: error.message },
      { status: 500 }
    );
  }
}
