"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Banners1 from "../../assets/hero section 1.png";
import Banners2 from "../../assets/hero section 2.png";
import Banners3 from "../../assets/hero section 3.png";
import Banners4 from "../../assets/hero section 4.png";
import Banners5 from "../../assets/hero section 5.png";

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
          <div className="flex h-32 w-full items-center justify-center bg-secondary md:h-96">
            <Image
              src={Banners1}
              alt="Banner 1"
              className="h-full w-full rounded-xl object-fill sm:h-full sm:w-full"
              priority
              unoptimized
              width={0}
              height={0}
            />
          </div>
        </CarouselItem>
        <CarouselItem className="hidden sm:flex">
          <div className="flex h-32 w-full items-center justify-center bg-secondary md:h-96">
            <Image
              src={Banners4}
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
          <div className="flex h-32 w-full items-center justify-center bg-secondary md:h-96">
            <Image
              src={Banners3}
              alt="Banner 2"
              unoptimized
              className="h-full w-full rounded-xl object-fill"
              priority
              width={100}
              height={100}
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex h-32 w-full items-center justify-center bg-secondary md:h-96">
            <Image
              src={Banners2}
              alt="Banner 2"
              unoptimized
              className="h-full w-full rounded-xl object-fill"
              priority
              width={100}
              height={100}
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex h-32 w-full items-center justify-center bg-secondary md:h-96">
            <Image
              src={Banners5}
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
