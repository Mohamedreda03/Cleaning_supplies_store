import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }

  const order = await db.orderItem.findMany({
    where: {
      orderId: params.orderId,
    },
  });

  return NextResponse.json({ data: order });
}
