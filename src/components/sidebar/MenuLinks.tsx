"use client";

import { usePathname } from "next/navigation";
import {
  LucideIcon,
  LayoutDashboard,
  Package2,
  PackageOpen,
  Users,
} from "lucide-react";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";
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

export default function MenuLinks() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col mt-5">
      {menu.map((item) => (
        <Link key={item.name} href={item.path}>
          <div
            className={cn(
              "py-3 px-4 flex gap-3 items-center",
              pathname.includes(item.path)
                ? "bg-blue-100 hover:bg-blue-100"
                : "hover:bg-blue-50"
            )}
          >
            <item.Icon size={24} />
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
