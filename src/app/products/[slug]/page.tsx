import { getProductBySlug } from "@/wix-api/products";
// import { getProductBySlug, getRelatedProducts } from "@/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { getWixServerClient } from "@/lib/wix-client.server";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Suspense } from "react";
// import Product from "@/components/_components/Product";
// import { Metadata } from "next";

// interface PageProps {
//   params: { slug: string };
// }
interface SearchParams {
  [key: string]: string | string[] | undefined;
}

// Define PageProps with the correct type
interface PageProps {
  params: { slug: string };
  searchParams?: SearchParams;
}

// export async function generateMetadata({
//   params: { slug },
// }: PageProps): Promise<Metadata> {
//   const product = await getProductBySlug(getWixServerClient(),slug);

//   if (!product) notFound();

//   const mainImage = product.media?.mainMedia?.image;

//   return {
//     title: product.name,
//     description: "Get this product on Fluff Magic",
//     openGraph: {
//       images: mainImage?.url
//         ? [
//             {
//               url: mainImage.url,
//               width: mainImage.width,
//               height: mainImage.height,
//               alt: mainImage.altText || "",
//             },
//           ]
//         : undefined,
//     },
//   };
// }

async function Page({ params }: PageProps) {
  if (!params || !params.slug) notFound(); // Check if params is undefined
  // Handle the case where slug might be an array
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  if (!slug) notFound();

  // If slug is not found, return a 404
  if (!slug) notFound();

  // Fetch the product using the slug

  const wixClient = await getWixServerClient();

  // Then fetch the product using the client
  const product = await getProductBySlug(wixClient, slug);

  // const product = await getProductBySlug(getWixServerClient(), slug);

  // If product is not found, return a 404
  if (!product?._id) notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-[105px] sm:px-10">
      <ProductDetails product={product} />
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
      <hr />

      {/* <Suspense fallback={<RelatedProductsLoadingSkeleton />}>
        <RelatedProducts productId={product._id} />
      </Suspense> */}
    </main>
  );
}

// Override the internal type-checking behavior
export default Page as unknown as React.FC<{
  params: Promise<{ slug: string }>;
  searchParams?: Promise<SearchParams>;
}>;

// interface RelatedProductsProps {
//   productId: string;
// }

// async function RelatedProducts({ productId }: RelatedProductsProps) {
//   const wixClient = await getWixServerClient();
//   const relatedProducts = await getRelatedProducts(wixClient, productId);

//   if (!relatedProducts.length) return null;

//   return (
//     <div className="space-y-5">
//       <h2 className="text-2xl font-bold">Related Products</h2>
//       <div className="flex grid-cols-2 flex-col gap-5 sm:grid lg:grid-cols-4">
//         {relatedProducts.map((product) => (
//           <Product key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function RelatedProductsLoadingSkeleton() {
//   return (
//     <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid lg:grid-cols-4">
//       {Array.from({ length: 4 }).map((_, i) => (
//         <Skeleton key={i} className="h-[26rem] w-full" />
//       ))}
//     </div>
//   );
// }
