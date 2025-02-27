import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CartItemType } from "@/store/cartStore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sesstion = await auth();
  const page = req.nextUrl.searchParams.get("page");
  const size = req.nextUrl.searchParams.get("size");

  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }

  const skip = (Number(page) - 1) * Number(size) || 0;
  const take = Number(size) || 10;

  const [orders, ordersCount] = await Promise.all([
    db.order.findMany({
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    }),
    db.order.count(),
  ]);

  const pageCount = Math.ceil(ordersCount / Number(size));

  return NextResponse.json({ data: orders, count: pageCount });
}

// /////////////////////////////////////////////////////////////////////////////

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const order = await db.order.create({
      data: {
        address: body.address,
        phone: body.phone,
        total: body.total,
        user_id: body.user_id,
        user_name: body.user_name,
        gift_code: body.gift_code,
        status: "PENDING",
        orderItems: {
          createMany: {
            data: body.orderItems.map((item: CartItemType) => ({
              ...item,
              price: item.price,
            })),
          },
        },
      },
    });

    return NextResponse.json({ data: order });
  } catch (error: any) {
    console.log("ORDER CREATE ERROR:", error);

    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
