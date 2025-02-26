import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const categoryId = req.nextUrl.searchParams.get("category") as string;

  const categories = await db.category.findMany({
    where: {
      id: categoryId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      products: true,
    },
  });

  return NextResponse.json({ data: categories });
}
