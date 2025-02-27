import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sesstion = await auth();
  const page = req.nextUrl.searchParams.get("page");
  const size = req.nextUrl.searchParams.get("size");
  const search = req.nextUrl.searchParams.get("search");

  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }

  const skip = (Number(page) - 1) * Number(size) || 0;
  const take = Number(size) || 10;

  const [category, categoryCount] = await Promise.all([
    db.category.findMany({
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
        _count: {
          select: { products: true },
        },
      },
    }),
    db.category.count({
      where: {
        name: {
          startsWith: search!,
        },
      },
    }),
  ]);

  const pageCount = Math.ceil(categoryCount / Number(size));

  return NextResponse.json({ data: category, count: pageCount });
}

export async function POST(req: NextRequest) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }

  const body = await req.json();

  const category = await db.category.create({
    data: {
      name: body.name,
    },
  });

  return NextResponse.json({ data: category });
}
