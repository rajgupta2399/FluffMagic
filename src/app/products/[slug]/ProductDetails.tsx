"use client";
import Badge from "@/components/ui/badge";
import { products } from "@wix/stores";
import ProductOptions from "./ProductOptions";
import { useState } from "react";
import { checkInStock, findVariant } from "@/lib/utils";
import ProductPrice from "./ProductPrice";
import ProductMedia from "./ProductMedia";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InfoIcon } from "lucide-react";
import AddToCartButton from "@/components/_components/AddToCartButton";
import BackInStockNotificationButton from "@/components/_components/BackInStockNotification";

interface ProductDetailsProps {
  product: products.Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {},
  );

  const selectVariant = findVariant(product, selectedOptions);
  const inStock = checkInStock(product, selectedOptions);

  const availableQuantity =
    selectVariant?.stock?.quantity ?? product.stock?.quantity;

  const availableQuantityExceeded =
    !!availableQuantity && quantity > availableQuantity;

  const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
    const selectedChoice = option.choices?.find(
      (choice) => choice.description === selectedOptions[option.name || ""],
    );
    return selectedChoice?.media?.items ?? [];
  });

  return (
    <>
      <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
        <ProductMedia
          media={
            !!selectedOptionsMedia?.length
              ? selectedOptionsMedia
              : product.media?.items
          }
        />
        <div className="basis-3/5 space-y-5">
          <div className="space-y-2.5">
            <h1 className="text-xl font-semibold lg:text-3xl">
              {product.name}
            </h1>
            {product.brand && (
              <>
                <div className="flex gap-5">
                  <div className="text-muted-foreground">{product.brand}</div>
                  <Badge className="block rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-md">
                    {product.ribbon}
                  </Badge>
                </div>
              </>
            )}
            {/* {product.ribbon && (
              <>
                <Badge className="block rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-md">
                  {product.ribbon}
                </Badge>
              </>
            )} */}
          </div>
          <ProductPrice product={product} selectedVariant={selectVariant} />
          <ProductOptions
            product={product}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          <div className="space-y-1.5">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center gap-2.5">
              <Input
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-24"
                disabled={!inStock}
              />
              {!!availableQuantity &&
                (availableQuantityExceeded || availableQuantity < 10) && (
                  <span className="text-destructive">
                    Only {availableQuantity} left in stock
                  </span>
                )}
            </div>
          </div>

          {inStock ? (
            <div className="flex items-center gap-2.5">
              <AddToCartButton
                product={product}
                selectedOptions={selectedOptions}
                quantity={quantity}
                disabled={availableQuantityExceeded || quantity < 1}
                className="w-full"
              />
              {/* <BuyNowButton
              product={product}
              selectedOptions={selectedOptions}
              quantity={quantity}
              disabled={availableQuantityExceeded || quantity < 1}
            /> */}
            </div>
          ) : (
            // "Out Of Stock"
            <BackInStockNotificationButton
              product={product}
              selectedOptions={selectedOptions}
              className="w-full"
            />
          )}

          {product.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: product.description || "",
              }}
              className="prose text-sm text-muted-foreground dark:prose-invert"
            />
          )}

          {!!product.additionalInfoSections?.length && (
            <div className="space-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <InfoIcon className="size-5" />
                <span>Additional product information</span>
              </span>
              <Accordion type="multiple">
                {product.additionalInfoSections.map((section) => (
                  <AccordionItem
                    value={section.title || ""}
                    key={section.title}
                  >
                    <AccordionTrigger>{section.title}</AccordionTrigger>
                    <AccordionContent>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: section.description || "",
                        }}
                        className="prose text-sm text-muted-foreground dark:prose-invert"
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* <div>Selected Options : {JSON.stringify(selectedOptions)}</div>
          <div>
            Selected variants : {JSON.stringify(selectVariant?.choices)}
          </div> */}
        </div>
      </div>
    </>
  );
}
