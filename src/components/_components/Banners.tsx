"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Banners = () => {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="flex h-28 w-full items-center justify-center bg-secondary md:h-72">
            <Image
              src="https://www.uniseoul.in/cdn/shop/files/Homepage_banner-2.jpg?v=1726500462"
              alt="Banner 1"
              className="h-full w-full rounded-xl object-cover"
              priority
              unoptimized
              width={0}
              height={0}
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex h-28 w-full items-center justify-center bg-secondary md:h-72">
            <Image
              src="https://www.uniseoul.in/cdn/shop/files/Banner4_d0f3c92c-6ba3-41d0-8f18-c2d23e7722c6.jpg?v=1726500486"
              alt="Banner 2"
              className="h-full w-full rounded-xl object-cover"
              priority
              width={100}
              unoptimized
              height={100}
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex h-28 w-full items-center justify-center bg-secondary md:h-72">
            <Image
              src={
                "https://teddydaddy.in/wp-content/uploads/Home-Soft-Toy-Plush-Teddy-Daddy-6-1536x532.png"
              }
              alt="Banner 2"
              unoptimized
              className="h-full w-full rounded-xl object-cover"
              priority
              width={100}
              height={100}
            />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Banners;
