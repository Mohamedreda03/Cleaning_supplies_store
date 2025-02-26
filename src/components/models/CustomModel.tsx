"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface CustomModelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title: string;
}

export default function CustomModel({
  className,
  isOpen,
  onClose,
  children,
  title,
}: CustomModelProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-black flex items-center justify-center z-50 bg-opacity-20",
        {
          hidden: !isOpen,
        }
      )}
    >
      <div
        className={cn(
          "max-w-[600px] max-h-[800px] w-full min-h-[200px] bg-white rounded-xl p-5",
          className
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <Button variant="secondary" className="py-1 px-2" onClick={onClose}>
            <X size={20} />
          </Button>
          <h3 className="text-xl font-medium">{title}</h3>
          <div className="w-6"></div>
        </div>
        {children}
      </div>
    </div>
  );
}
