"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function SignOutButton() {
  const { data: session } = useSession();
  return (
    <>
      {session?.user && (
        <Button
          onClick={() => signOut()}
          variant="outline"
          className="hidden md:flex items-center justify-center gap-1"
        >
          تسجيل الخروج
          <ArrowLeftIcon size={15} className="mr-1" />
        </Button>
      )}
    </>
  );
}
