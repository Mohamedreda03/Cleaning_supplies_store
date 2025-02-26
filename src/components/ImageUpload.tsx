"use client";

import { useEffect, useState } from "react";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash, Truck } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  disabled?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  value,
  onChange,
  label,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange([...value, result.info.secure_url]);
  };

  const removeImage = (url: string) => {
    const newValue = value.filter((v) => v !== url);
    onChange(newValue);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                onClick={() => removeImage(url)}
                size="icon"
                variant="destructive"
                type="button"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="dhczaxmh">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
              className={cn("flex items-center gap-2 flex-row-reverse")}
            >
              {label ? label : "Upload Image"}
              <ImagePlus className="h-4 w-4" />
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
