import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }

  const body = await req.json();

  await db.product.update({
    where: {
      id: params.productId,
    },
    data: {
      best_seller: body.best_seller,
      categoryId: body.categoryId,
      images: body.images,
      name: body.name,
      price: body.price,
      description: body.description,
    },
  });

  return NextResponse.json({ message: "Product updated successfully" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }

  await db.product.delete({
    where: {
      id: params.productId,
    },
  });

  return NextResponse.json({ message: "Product deleted successfully" });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const product = await db.product.findFirst({
    where: {
      id: params.productId,
    },
  });

  return NextResponse.json(product);
}
