"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Menu, ArrowLeftIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useEffect } from "react";
import Link from "next/link";

interface Menu {
  name: string;
  path: string;
}

const menu: Menu[] = [
  {
    name: "الرئيسية",
    path: "/",
  },
  {
    name: "المنتجات",
    path: "/products",
  },
];

export default function ClientMobileMenu() {
  const { data: session } = useSession();

  const pathname = usePathname();

  useEffect(() => {}, [session]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={30} className="text-color-2 cursor-pointer md:hidden" />
      </SheetTrigger>
      <SheetContent>
        <div className="mt-20">
          <div className="flex flex-col mt-5 text-color-2">
            {menu.map((item) => (
              <SheetClose key={item.name} asChild>
                <Link href={item.path}>
                  <div
                    className={cn(
                      "py-3 px-4 hover:bg-color-3/45 hover:text-color-2 flex gap-3 items-center justify-center text-xl",
                      pathname === item.path
                        ? "bg-color-3 text-color-2 hover:bg-color-3 hover:text-color-2"
                        : "text-color-2"
                    )}
                  >
                    {item.name}
                  </div>
                </Link>
              </SheetClose>
            ))}

            <SheetClose asChild>
              <Link
                href="/dashboard/products"
                className={cn(session?.user ? "block" : "hidden")}
              >
                <div
                  className={cn(
                    "py-3 px-4 hover:bg-color-3/45 hover:text-color-2 flex gap-3 items-center justify-center text-xl",
                    pathname === "/dashboard/users"
                      ? "bg-color-3 text-color-2 hover:bg-color-3 hover:text-color-2"
                      : "text-color-2"
                  )}
                >
                  لوحت التحكم
                </div>
              </Link>
            </SheetClose>

            <Button
              variant="outline"
              className={cn(
                "w-full mt-3 items-center justify-center gap-2 flex-row-reverse",
                session?.user ? "flex" : "hidden"
              )}
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              تسجيل الخروج
              <ArrowLeftIcon size={15} />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
