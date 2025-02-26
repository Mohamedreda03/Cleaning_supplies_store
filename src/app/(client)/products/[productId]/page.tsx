import { db } from "@/lib/db";
import { BadgeDollarSign } from "lucide-react";
import React from "react";
import PriceAndQu from "./_components/PriceAndQu";
import OrderButton from "@/components/OrderButton";
import ImagesSwiper from "./_components/ImagesSwiper";

export default async function page({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const product = await db.product.findFirst({
    where: {
      id: productId,
    },
  });

  return (
    <div className="flex lg:flex-row flex-col gap-11 max-w-screen-xl mx-auto w-full px-5 my-16">
      <div className="flex-1 ">
        <div className="w-full mb-5">
          <h2 className="text-3xl font-bold">{product?.name}</h2>
          <p className="text-slate-700 mb-8 mt-4 max-w-[450px]">
            {product?.description}
          </p>
          {product && <PriceAndQu product={product} />}
        </div>
      </div>
      <div className="flex-1">
        <ImagesSwiper images={product?.images!} />
      </div>
    </div>
  );
}
