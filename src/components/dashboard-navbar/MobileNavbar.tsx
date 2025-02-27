"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  LucideIcon,
  LayoutDashboard,
  Package2,
  PackageOpen,
  Users,
  Menu,
  ArrowLeftIcon,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

interface Menu {
  name: string;
  path: string;
  Icon: LucideIcon;
}

const menu: Menu[] = [
  {
    name: "المنتجات",
    path: "/dashboard/products",
    Icon: Package2,
  },
  {
    name: "الفئات",
    path: "/dashboard/categories",
    Icon: LayoutDashboard,
  },
  {
    name: "الطلبات",
    path: "/dashboard/orders",
    Icon: PackageOpen,
  },
  {
    name: "المستخدمين",
    path: "/dashboard/users",
    Icon: Users,
  },
];

export default function MobileNavbar() {
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={30} className="text-color-2 cursor-pointer lg:hidden" />
      </SheetTrigger>
      <SheetContent>
        <div className="mt-20">
          <div className="flex flex-col mt-5 text-color-2">
            {menu.map((item) => (
              <SheetClose key={item.name} asChild>
                <Link href={item.path}>
                  <div
                    className={cn(
                      "py-3 px-4 hover:bg-color-3/45 hover:text-color-2 flex gap-3 items-center",
                      pathname.includes(item.path)
                        ? "bg-color-3 text-color-2 hover:bg-color-3 hover:text-color-2"
                        : "text-color-2"
                    )}
                  >
                    <item.Icon size={24} />
                    {item.name}
                  </div>
                </Link>
              </SheetClose>
            ))}
            <SheetClose asChild>
              <Link href="/dashboard/users">
                <div
                  className={cn(
                    "py-3 px-4 hover:bg-color-3/45 hover:text-color-2 flex gap-3 items-center",
                    pathname === "/dashboard/users"
                      ? "bg-color-3 text-color-2 hover:bg-color-3 hover:text-color-2"
                      : "text-color-2"
                  )}
                >
                  <Users size={24} />
                  المستخدمين
                </div>
              </Link>
            </SheetClose>

            <Link href="/" className="">
              <Button
                variant="outline"
                className={cn(
                  "w-full flex items-center justify-center gap-2 flex-row-reverse"
                )}
              >
                الي المتجر
                <ArrowLeftIcon size={15} />
              </Button>
            </Link>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className={cn(
                "w-full flex items-center justify-center gap-2 mt-2 flex-row-reverse"
              )}
            >
              تسجيل الخروج
              <ArrowLeft size={18} />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
