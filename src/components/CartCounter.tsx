"use client";

import useCart from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";

import useSpecialProduct from "@/store/specialProduct";
import Link from "next/link";

export default function CartCounter() {
  const cart = useCart();
  const specialCart = useSpecialProduct();

  return (
    <Link href="/cart" className="relative">
      <span className="absolute -top-2 -right-2 flex items-center justify-center text-white rounded-full p-1 bg-color-2 w-5 h-5">
        {cart.items.length + specialCart.items.length}
      </span>
      <ShoppingCart size={30} />
    </Link>
  );
}
