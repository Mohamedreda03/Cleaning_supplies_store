"use client";

// import "react-multi-carousel/lib/styles.css";

import { PlusCircle } from "lucide-react";
import { Category } from "@prisma/client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const CategoriesMenu = ({
  data,
  setCurrentCategory,
  currentCategory,
}: {
  data: Category[];
  setCurrentCategory: Dispatch<SetStateAction<string | null>>;
  currentCategory: string | null;
}) => {
  return (
    <>
      <div className="mt-[50px] md:mt-[80px] mb-[70px]">
        <div className="flex gap-2 overflow-x-scroll scroll_div relative">
          <div>
            <Button
              onClick={() => setCurrentCategory(null)}
              variant={currentCategory === null ? "main" : "secondary"}
              className={cn({
                "text-white": currentCategory === null,
              })}
            >
              كل المنتجات
            </Button>
          </div>
          <div>
            <Button
              onClick={() => setCurrentCategory("best_seller")}
              variant={currentCategory === "best_seller" ? "main" : "secondary"}
              className={cn({
                "text-white": currentCategory === "best_seller",
              })}
            >
              الاكثر مبيعا
            </Button>
          </div>
          {data?.map((category) => (
            <div key={category.id}>
              <Button
                key={category.id}
                onClick={() => setCurrentCategory(category.id)}
                variant={currentCategory === category.id ? "main" : "outline"}
                className={cn({
                  "text-white": currentCategory === category.id,
                })}
              >
                {category.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesMenu;
