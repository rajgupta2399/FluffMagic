// import { delay } from "@/lib/utils";
// import banner from "../assets/banner1.webp";
// import Image from "next/image";
import { Suspense } from "react";
// import { getWixClient } from "@/lib/wix-client.base";
import Product from "@/components/_components/Product";
// import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
// import Autoplay from "embla-carousel-autoplay";

// import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Banners from "@/components/_components/Banners";
// import SurgicalSection from "@/components/_components/HomeComponentSection/SurgicalSection";
// import OrthopaedicSection from "@/components/_components/HomeComponentSection/OrthopaedicSection";
// import GauzeSection from "@/components/_components/HomeComponentSection/GauzeProductsSection";
// import BabyCareSection from "@/components/_components/HomeComponentSection/BabyCareSection";
// import HomeAndPersonalSection from "@/components/_components/HomeComponentSection/HomePersonalSection";
// import CriticalCareSection from "@/components/_components/HomeComponentSection/CriticalCareSection";
import BabyProductsSection from "@/components/_components/HomeComponentSection/BabyProductsSection";
import SoftToysSection from "@/components/_components/HomeComponentSection/SoftToysSection";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import HomeDecorSection from "@/components/_components/HomeComponentSection/HomeDecorSection";
import { getWixServerClient } from "@/lib/wix-client.server";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-7xl space-y-5 px-5 py-16 sm:px-10">
        <div className="box mt-7">
          <Banners />
        </div>
        <Suspense fallback={<ProductSkeleton />}>
          <FeaturedProducts />
        </Suspense>
        <Suspense fallback={""}>
          <BabyProductsSection />
        </Suspense>
        <div className="pt-0">
          <hr className="" />
        </div>
        <Suspense fallback={""}>
          <SoftToysSection />
        </Suspense>
        <Suspense fallback={""}>
          <HomeDecorSection />
        </Suspense>
        <div className="pt-0">
          <hr className="" />
        </div>
      </main>
    </>
  );
}

async function FeaturedProducts() {
  // await delay(1000);

  const wixClient = await getWixServerClient(); // Add await here

  // Add debug check
  if (!wixClient?.collections) {
    console.error("Collections module not available in WixClient");
    return null;
  }

  const collection = await getCollectionBySlug(wixClient, "all-products");
  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await queryProducts(wixClient, {
    collectionIds: collection._id,
  });

  if (!featuredProducts.items.length) {
    return null;
  }
  return (
    <div className="relative space-y-3 overflow-hidden">
      <h2 className="text-xl font-bold sm:text-2xl sm:font-semibold">
        Top Selling Products
      </h2>

      <div className="relative mx-auto w-full max-w-screen-xl">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="flex">
            {featuredProducts.items.map((product) => (
              <CarouselItem
                key={product._id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <div className="h-full rounded-lg border p-1 bg-white dark:bg-[#16181D] ">
                  <Product product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Make sure buttons are visible and positioned */}
          <CarouselPrevious className="absolute top-1/2 z-10 -translate-y-1/2 sm:left-0 bg-white dark:bg-[#16181D] " />
          <CarouselNext className="absolute top-1/2 z-10 -translate-y-1/2 sm:right-0  bg-white dark:bg-[#16181D] " />
        </Carousel>
      </div>

      <div className="pt-3">
        <hr className="" />
      </div>
      {/* <pre>{JSON.stringify(featuredProducts, null, 1)}</pre> */}
    </div>
  );
}

// function LoadingSkeleton() {
//   return (
//     <div className="grid grid-cols-2 gap-5 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//       {Array.from({ length: 8 }).map((_, i) => (
//         <Skeleton key={i} className="h-[15rem] w-full" />
//       ))}
//     </div>
//   );
// }

function ProductSkeleton() {
  return (
    <div className="h-40 w-full animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
  );
}
