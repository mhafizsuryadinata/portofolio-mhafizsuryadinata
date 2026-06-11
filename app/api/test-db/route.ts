import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    env: {
      has_database_url: !!process.env.DATABASE_URL,
      database_url_preview: process.env.DATABASE_URL
        ? `${process.env.DATABASE_URL.substring(0, 15)}...`
        : "not set",
      has_direct_url: !!process.env.DIRECT_URL,
    },
    connection: "unknown",
    error: null,
    data: null,
  };

  try {
    // Try to perform a query
    const count = await prisma.project.count();
    diagnostics.connection = "success";
    diagnostics.data = {
      project_count: count,
    };
  } catch (err: any) {
    diagnostics.connection = "failed";
    diagnostics.error = {
      message: err.message,
      code: err.code,
      stack: err.stack ? err.stack.split("\n").slice(0, 3) : null,
    };
  }

  return NextResponse.json(diagnostics);
}
