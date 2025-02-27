"use client";

import Image from "next/image";
import MenuLinks from "./MenuLinks";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div
      className={cn(
        "hidden lg:flex flex-col md:fixed inset-y-0 w-56 h-full py-8 right-0 border-l"
      )}
    >
      <div>
        <div className="h-[100px] flex items-center justify-center">
          <Image src="/logo-head.png" width={150} height={50} alt="" />
        </div>
        <MenuLinks />
      </div>
      <div
        className={
          "mt-auto mb-2 flex flex-col items-center justify-center gap-3"
        }
      >
        <Button onClick={handleSignOut} variant="outline" className={"mx-auto"}>
          تسجيل الخروج
          <ArrowLeft size={18} className="mr-2" />
        </Button>
      </div>
    </div>
  );
}
