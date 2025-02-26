import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const [categories, products] = await Promise.all([
    db.category.findMany(),
    db.product.findMany(),
  ]);

  return NextResponse.json({ categories, products });
}
