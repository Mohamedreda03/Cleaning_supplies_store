import { auth } from "@/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
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

  const [users, usersCount] = await Promise.all([
    db.user.findMany({
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
    }),
    db.user.count({
      where: {
        name: {
          startsWith: search!,
        },
      },
    }),
  ]);

  const pageCount = Math.ceil(usersCount / Number(size));

  return NextResponse.json({ data: users, count: pageCount });
}

export async function POST(req: NextRequest) {
  const sesstion = await auth();
  const { name, email, password } = await req.json();

  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.json({
      success: false,
      error: "الايمال مستخدم بالفعل",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ success: true });
}
