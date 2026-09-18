import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function authorized(request: Request) {
  const key = request.headers.get("x-admin-key");

  return (
    !!process.env.ADMIN_API_KEY &&
    key === process.env.ADMIN_API_KEY
  );
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const orders = await prisma.order.findMany({
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  return NextResponse.json(orders);
}