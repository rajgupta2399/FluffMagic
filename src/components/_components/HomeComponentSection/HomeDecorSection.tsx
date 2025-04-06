"use client";
import { useEffect, useState } from "react";
import { getWixClient } from "@/lib/wix-client.base";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductSection from "./ProductSection";
import Autoplay from "embla-carousel-autoplay";
// import { ProductsQueryResult } from "@wix/stores_products"; // Import Wix types
import { ProductsQueryResult } from "@wix/auto_sdk_stores_products";
import Image from "next/image";
import Link from "next/link";
// import SoftToyBanner1 from "../../../assets/softToysBanner1.png";
// import SoftToyBanner3 from "../../../assets/softToysSquare.png";
// import SoftToyBanner2 from "../../../assets/softToysBanner2.png";
import HomeDecorBanner1 from "../../../assets/home decor products banner sqr.png"
import HomeDecorBanner2 from "../../../assets/home decor banner reg 1.png"
import HomeDecorBanner3 from "../../../assets/home decor products banner reg.png"
import { ChevronRight } from "lucide-react";
// import { ChevronRight } from "lucide-react";

// Skeleton Loader for better UX
function ProductSkeleton() {
  return (
    <div className="h-40 w-full animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
  );
}

export default function HomeDecorSection() {
  const [softToysProduct, setSoftToysProduct] =
    useState<ProductsQueryResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const wixClient = getWixClient(undefined);

        if (!wixClient.collections) {
          console.error("Wix client collections module is undefined!");
          return;
        }
        const { collection } =
          await wixClient.collections.getCollectionBySlug("all-products");

        if (!collection?._id) {
          setLoading(false);
          return;
        }

        const products = await wixClient.products
          .queryProducts()
          .hasSome("collectionIds", [collection._id])
          .descending("lastUpdated")
          .find();

        setSoftToysProduct(products);
      } catch (error) {
        console.error("Error fetching digital instruments: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="relative space-y-3 overflow-hidden">
        <h2 className="text-xl font-bold sm:text-2xl sm:font-semibold">
          Home Decor
        </h2>
        <div className="flex w-full">
          {/* Skeleton for Banner 1 */}
          <div className="digitalInstrumentBanner1 w-full sm:w-1/2 sm:pr-4">
          <div className="h-80 w-full animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
        </div>
          {/* Skeleton for Banner 2 */}
          <div className="digitalInstrumentBanner2 hidden w-1/2 sm:block">
            <div className="di1 flex space-x-4 pt-1">
              <div className="h-36 w-full animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className="di2 mt-4 flex space-x-4">
              <div className="h-40 w-full animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-screen-xl">
          <Carousel className="w-full">
            <CarouselContent className="flex">
              {[...Array(5)].map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <ProductSkeleton />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    );
  }

  if (!softToysProduct?.items?.length) return null;

  return (
    <div className="relative space-y-4 overflow-hidden py-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold sm:text-2xl sm:font-semibold">
          Home Decor
        </h2>
        <Link
          href="/baby-products"
          className="flex items-center space-x-2 text-sm font-semibold transition-all duration-300 hover:translate-x-1 hover:text-[#fd9aac] -mb-6"
        >
          <span>See All</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="digitalInstrument flex w-full">
        <div className="digitalInstrumentBanner1 pr-0 sm:w-1/2 sm:pr-4">
          <Link href={"/home-decor"}>
            <Image
              src={HomeDecorBanner1}
              alt="digitalInstrument Banner"
              width={0}
              unoptimized
              height={0}
              className="w-full rounded-lg"
            />
          </Link>
        </div>
        <div className="digitalInstrumentBanner2 hidden w-1/2 sm:block">
          <div className="di1 flex space-x-4 pt-1.5">
            <Link href={"/home-decor"} className="w-full">
              <Image
                src={HomeDecorBanner2}
                alt="digitalInstrument Banner"
                width={200}
                unoptimized
                height={200}
                className="w-full rounded-lg"
              />
            </Link>
            {/* <Link href={"/home-decor"} className="w-full">
              <Image
                src={DI3}
                alt="digitalInstrument Banner"
                width={0}
                height={0}
                className="w-full rounded-lg"
              />
            </Link> */}
          </div>
          <div className="di2 mt-4 flex space-x-4">
            <Link href={"/home-decor"} className="w-full">
              <Image
                src={HomeDecorBanner3}
                alt="digitalInstrument Banner"
                width={0}
                unoptimized
                height={0}
                className="w-full rounded-lg"
              />
            </Link>
            {/* <Link href={"/home-decor"} className="w-full">
              <Image
                src={DI4}
                alt="digitalInstrument Banner"
                width={0}
                height={0}
                className="w-full rounded-lg"
              />
            </Link> */}
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-screen-xl">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[Autoplay({ delay: 6000 })]}
          className="w-full"
        >
          <CarouselContent className="flex">
            {softToysProduct.items.map((product) => (
              <CarouselItem
                key={product._id!} // Using non-null assertion if sure _id exists
                className="basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <div className="h-full rounded-lg border p-1  bg-white dark:bg-[#16181D] ">
                  <ProductSection product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute top-1/2 z-10 -translate-y-1/2 sm:left-0" />
          <CarouselNext className="absolute top-1/2 z-10 -translate-y-1/2 sm:right-0" />
        </Carousel>
      </div>
    </div>
  );
}
