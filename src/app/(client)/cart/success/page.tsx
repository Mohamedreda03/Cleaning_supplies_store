import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";

export default function Success() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-6 mt-28">
        <BadgeCheck size={100} className="text-green-500" />
        <h1 className="text-4xl font-bold text-center">
          تمت ارسال الطلب بنجاح
        </h1>
        <Button variant="link" asChild className="text-lg">
          <Link href="/">العودة للرئيسية</Link>
        </Button>
      </div>
    </div>
  );
}
