"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImagesSwiperProps {
  images: string[];
}

export default function ImagesSwiper({ images }: ImagesSwiperProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="max-w-screen-sm w-full">
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        slidesPerView={1}
        className="mb-4"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            style={{
              position: "relative",
              width: "400px",
              height: "600px",
            }}
          >
            <Image
              src={image}
              fill
              quality={100}
              sizes="100vw"
              alt={`image-${index}`}
              style={{
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        watchSlidesProgress
        className="mt-4 flex justify-center"
      >
        {images.map((image, index) => (
          <SwiperSlide
            style={{
              position: "relative",
              width: "200px",
              height: "100px",
            }}
            className="cursor-pointer"
            key={index}
          >
            <Image
              src={image}
              //   height={200}
              //   width={200}
              fill
              alt={`thumb-${index}`}
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
