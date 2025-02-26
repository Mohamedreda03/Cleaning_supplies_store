"use client";

import OrderButton from "@/components/OrderButton";
import { Button } from "@/components/ui/button";
import useCart from "@/store/cartStore";
import { Product } from "@prisma/client";
import { BadgeDollarSign } from "lucide-react";
import { useState } from "react";

interface PriceAndQuProps {
  product: Product;
}

export default function PriceAndQu({ product }: PriceAndQuProps) {
  const [quantity, setQuantity] = useState(1);
  const cart = useCart();

  const total = product?.price * quantity;
  const totalPoints = product?.points * quantity;

  const decrement = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    cart.addItem({
      id: product.id,
      quantity,
      total,
      name: product.name,
      image: product.images[0],
      description: product.description,
      productId: product.id,
      price: product.price,
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between max-w-[400px]">
        <p className="bg-slate-100 py-2 px-5 rounded-xl text-lg">
          <span>{total}</span>
          <span className="mr-2 text-blue-600">جنية</span>
        </p>
        <p className="bg-slate-100 py-2 px-5 rounded-xl text-lg flex items-center gap-2">
          <span>{totalPoints}</span>
          <BadgeDollarSign size={20} className="text-blue-600" />
        </p>
      </div>
      <div className="flex items-center gap-6 mt-8">
        <p className="text-slate-700 text-lg">الكمية</p>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="text-lg"
            disabled={quantity === 1}
            onClick={() => setQuantity(quantity - 1)}
          >
            -
          </Button>
          <p className="bg-slate-100 py-2 px-5 rounded-xl text-lg border border-blue-200">
            {quantity}
          </p>
          <Button
            variant="secondary"
            className="text-lg"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <Button
        onClick={handleAddToCart}
        className="rounded-xl w-full bg-blue-500 hover:bg-blue-500/85 text-lg max-w-[300px] h-11 mt-8"
      >
        أضف الي السلة
      </Button>
    </div>
  );
}
