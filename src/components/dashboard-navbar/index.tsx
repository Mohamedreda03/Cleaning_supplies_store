import Image from "next/image";
import React from "react";
import MobileNavbar from "./MobileNavbar";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function DashboardNavbar() {
  return (
    <div className="lg:pr-56">
      <div className="w-full h-[60px] border-b flex items-center justify-between">
        <div className="px-5 flex items-center justify-between w-full">
          <div>
            <MobileNavbar />

            <Link href="/" className="hidden lg:block">
              <Button
                variant="outline"
                className={cn("w-full flex items-center justify-center gap-2")}
              >
                الي المتجر
                <ArrowLeftIcon size={15} />
              </Button>
            </Link>
          </div>
          <div>
            <Image src="/logo-head.png" width={100} height={50} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
