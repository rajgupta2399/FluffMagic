import { WixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

export const getCollectionBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    // const wixClient = getWixClient();

    const { collection } =
      await wixClient.collections.getCollectionBySlug(slug);

    return collection || null;
  },
);

// export const getCollectionBySlug = cache(
//   async (wixClient: WixClient, slug: string) => {
//     const { collection } =
//       await wixClient.collections.getCollectionBySlug(slug);

//     return collection || null;
//   },
// );

export const getCollections = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collections = await wixClient.collections
      .queryCollections()
      // .ne("_id", "60a47cf3-9b39-2ad0-54dc-254b6b832aff") // Baby products
      // .ne("_id", "c912f2d5-ff2b-277d-0599-fb02a506e3bc") // soft toys products
      // .ne("_id", "c8a8b6c0-aae4-ec75-735c-594b10c5fd4d") // Combos products
      // .ne("_id", "db9fff8a-f3a9-bb24-57a5-f4b4f4691b4b") // Home decor products
      .ne("_id", "00000000-000000-000000-000000000001") // all products
      .ne("_id", "b24cb3d6-7da1-f5de-64a3-12f26fb1aa3c") // Electronics products
      .ne("_id", "7efab143-7618-0107-44fc-540f60abc0fb") // Safety Helmets products
      .ne("_id", "ce1376b9-6622-166e-cabb-b2401e30f700") // Jewellery products
      .ne("_id", "41506d4d-9145-c916-f4b5-eaee0d0d3d65") // Rai Pillow products
      .find();

    return collections.items;
  },
);
