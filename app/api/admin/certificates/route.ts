import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, certificates });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, issuer, issueDate, imageUrl, credentialUrl, order } = data;
    const newCert = await prisma.certificate.create({
      data: {
        title,
        issuer,
        issueDate,
        imageUrl: imageUrl || "/certs/placeholder.png",
        credentialUrl: credentialUrl || null,
        order: Number(order) || 0,
      },
    });
    return NextResponse.json({ success: true, certificate: newCert });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
