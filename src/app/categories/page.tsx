export const dynamic = 'force-static'
import React from "react";
import {Link} from "next-view-transitions"
import { getCollections } from "@/wix-api/collections";
import { getWixServerClient } from "@/lib/wix-client.server";
// import { collections } from "@wix/stores";

const Categories = async () => {
  const collections = await getCollections(await getWixServerClient());

  return (
    <div className=" mt-20 mb-5">
      {/* Mobile dropdown trigger */}
      <details className="group">
        <summary className="flex cursor-pointer items-center justify-between border-b px-4 py-3 text-sm font-medium">
          Categories
          <svg
            className="ml-2 h-4 w-4 transition-transform group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>

        {/* Mobile categories grid */}
        <div className="grid grid-cols-2 gap-2 p-2 dark:bg-[#16181D]">
          {collections.map((collection) => (
            <Link
              key={collection._id}
              href={`/collections/${collection.slug}`}
              className="rounded-md border p-3 text-center transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-[#2A2D35]"
            >
              <span className="text-sm font-medium">{collection.name}</span>
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
};

export default Categories;
