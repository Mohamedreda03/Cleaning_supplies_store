import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sesstion = await auth();
  const page = req.nextUrl.searchParams.get("page");
  const size = req.nextUrl.searchParams.get("size");
  const search = req.nextUrl.searchParams.get("search");

  if (!sesstion) {
    NextResponse.redirect(new URL("/sign-in", req.nextUrl).toString());
  }

  const skip = (Number(page) - 1) * Number(size) || 0;
  const take = Number(size) || 10;

  const [products, productsCount] = await Promise.all([
    db.product.findMany({
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        name: {
          startsWith: search!,
        },
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    }),
    db.product.count({
      where: {
        name: {
          startsWith: search!,
        },
      },
    }),
  ]);

  const pageCount = Math.ceil(productsCount / Number(size));

  return NextResponse.json({ data: products, count: pageCount });
}

// /////////////////////////////////////////////////////////////////////////////

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }

  try {
    const product = await db.product.create({
      data: {
        images: body.images,
        best_seller: body.best_seller,
        categoryId: body.categoryId,
        description: body.description,
        name: body.name,
        points: body.points,
        price: body.price,
      },
    });

    return NextResponse.json({ data: product });
  } catch (error: any) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
