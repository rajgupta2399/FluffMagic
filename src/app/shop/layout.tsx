import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollections } from "@/wix-api/collections";
import SearchFilterLayout from "./SearchFilterLayout";
import { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const wixClient = await getWixServerClient();
  const collections = await getCollections(wixClient);

  return (
    <div className="py-10">
      <Suspense fallback={<div>Loading filters...</div>}>
        <SearchFilterLayout collections={collections}>
          {children}
        </SearchFilterLayout>
      </Suspense>
    </div>
  );
}
