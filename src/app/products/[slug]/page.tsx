import { getProductBySlug } from "@/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
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
//   const product = await getProductBySlug(slug);

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
  const product = await getProductBySlug(slug);

  // If product is not found, return a 404
  if (!product?._id) notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-24 sm:px-10">
      <ProductDetails product={product} />
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
    </main>
  );
}

// Override the internal type-checking behavior
export default Page as unknown as React.FC<{
  params: Promise<{ slug: string }>;
  searchParams?: Promise<SearchParams>;
}>;