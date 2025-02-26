"use client";

import Alert from "./Alert";
import { Button } from "../ui/button";
import { useState } from "react";
import { Product } from "@prisma/client";
import Image from "next/image";
import useCart from "@/store/cartStore";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import "./model.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function OrderModel({
  isOpen,
  onClose,
  product,
}: DeleteAlertProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  const total = product.price * quantity;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
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
    <Alert
      title={""}
      className="max-w-[600px] w-full md:px-10 overflow-y-scroll h-full md:h-auto"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="">
        <div className="flex flex-col">
          <div className="flex flex-col-reverse md:flex-row">
            <div className="md:flex-[1.3]">
              <div className="flex justify-between w-full">
                <div className="flex flex-col items-center mx-auto mt-3 md:block md:mx-0 w-full">
                  <div className="relative w-fit">
                    <div className="z-10 text-5xl md:text-4xl mb-2">
                      {product.name}
                    </div>
                    <div className="absolute bottom-2 w-full h-4 bg-color-4/40 -z-10"></div>
                  </div>
                  <p className="text-muted-foreground mb-2 text-md">
                    {product.description}
                  </p>
                  <div className="text-xl border-y border-color-4  w-full md:w-fit flex items-center justify-around p-2">
                    <span>
                      {product.price}{" "}
                      <span className="mr-1 text-muted-foreground text-sm">
                        جنية
                      </span>
                    </span>
                    <span className="h-3 w-[1px] hidden md:block md:mx-4 bg-color-4" />
                  </div>
                </div>
              </div>

              <div className="mb-5 mt-3 w-40 flex flex-col items-center md:block mx-auto md:mx-0">
                <p className="text-sm text-gray-500 mb-2">الكمية</p>
                <div className="flex justify-between items-center w-40">
                  <Button
                    onClick={handleDecrement}
                    size="icon"
                    variant="outline"
                  >
                    -
                  </Button>
                  <p className="text-2xl">{quantity}</p>
                  <Button
                    onClick={handleIncrement}
                    size="icon"
                    variant="outline"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Image
                src={product.image}
                width={200}
                height={200}
                alt="product image"
                className="rounded-lg w-full h-[300px] md:w-[200px] md:h-[150px] object-cover"
              />
              <div>
                <div className="flex justify-between border-y border-color-4 mt-5 p-2 text-lg">
                  <p>الاجمالي</p>
                  <p className="text-xl w-fit mr-3">
                    {total}{" "}
                    <span className="mr-1 text-sm text-muted-foreground">
                      جنية
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} variant="outline">
            الغاء
          </Button>
          <Button onClick={handleAddToCart} variant="main">
            اضف الي السلة
          </Button>
        </div>
      </div>
    </Alert>
  );
}
