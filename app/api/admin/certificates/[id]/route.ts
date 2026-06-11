import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { title, issuer, issueDate, imageUrl, credentialUrl, order } = data;
    
    const updatedCert = await prisma.certificate.update({
      where: { id },
      data: {
        title,
        issuer,
        issueDate,
        imageUrl,
        credentialUrl: credentialUrl || null,
        order: Number(order) || 0,
      },
    });
    return NextResponse.json({ success: true, certificate: updatedCert });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.certificate.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: "Sertifikat berhasil dihapus." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
