import { Product } from "@prisma/client";
import Image from "next/image";
import OrderButton from "./OrderButton";
import { memo } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

function Card({ product }: { product: Product }) {
  return (
    <div
      className="flex flex-col items-center gap-1 rounded-xl border w-full md:max-w-[300px] overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
      style={{ wordSpacing: "2px" }}
    >
      <Image
        src={product.images[0]}
        width={200}
        height={200}
        alt={product.name}
        className="w-full h-[250px] object-cover"
      />
      <div className="p-5 flex flex-col w-full">
        <div className="relative w-fit">
          <p className="z-10 text-2xl">{product.name}</p>
          <div className="absolute bottom-2 w-full h-2 bg-color-4/50 -z-10"></div>
        </div>

        <p className="text-muted-foreground text-sm text-center line-clamp-1 mt-1">
          {product.description}
        </p>
        <div className="flex items-center gap-3"></div>
        {/* <OrderButton product={product} /> */}
        <Button className="bg-blue-500 hover:bg-blue-500/90 mt-3" asChild>
          <Link href={`/products/${product.id}`}>تفاصيل المنتج</Link>
        </Button>
      </div>
    </div>
  );
}

export default memo(Card);
