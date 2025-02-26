import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-[400px] flex items-center justify-center",
        className
      )}
    >
      <LoaderCircle className="w-16 h-16 text-color-2 animate-spin" />
    </div>
  );
}
