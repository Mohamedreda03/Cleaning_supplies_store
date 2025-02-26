"use client";

import { Product } from "@prisma/client";
import { Button } from "./ui/button";
import OrderModel from "./models/OrderModel";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function OrderButton({
  product,
  className,
  onClick,
}: {
  product: Product;
  className?: string;
  onClick: () => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Button
      onClick={() => onClick}
      className={cn("mt-3 rounded-full w-full", className)}
      variant="main"
    >
      أضف الي السلة
    </Button>
  );
}
