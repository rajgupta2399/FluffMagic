"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Banner1 from "../../assets/banner1.png"
import Banner2 from "../../assets/banner2.png";
import Banner3 from "../../assets/banner3.png";

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
          <div className="flex h-28 w-full items-center justify-center bg-secondary md:h-96">
            <Image
              src={Banner3}
              alt="Banner 1"
              className="h-full w-full rounded-xl object-fill"
              priority
              unoptimized
              width={0}
              height={0}
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex h-28 w-full items-center justify-center bg-secondary md:h-96">
            <Image
              src={Banner2}
              alt="Banner 2"
              className="h-full w-full rounded-xl object-fill"
              priority
              width={100}
              unoptimized
              height={100}
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex h-28 w-full items-center justify-center bg-secondary md:h-96">
            <Image
              src={Banner1}
              alt="Banner 2"
              unoptimized
              className="h-full w-full rounded-xl object-fill"
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
