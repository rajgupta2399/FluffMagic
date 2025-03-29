// components/cart/add-to-cart-button.tsx
"use client";

import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { ShoppingCartIcon } from "lucide-react";
import { useAddItemToCart } from "@/hooks/cart";
import { LoadingButton } from "./LoadingButton";

interface AddToCartButtonProps
  extends React.ComponentProps<typeof LoadingButton> {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  const mutation = useAddItemToCart();

  return (
    <LoadingButton
      onClick={() =>
        mutation.mutate({
          product,
          selectedOptions,
          quantity,
        })
      }
      loading={mutation.isPending}
      className={cn("flex gap-3", className)}
      {...props}
    >
      <ShoppingCartIcon className="h-4 w-4" />
      Add to cart
    </LoadingButton>
  );
}
