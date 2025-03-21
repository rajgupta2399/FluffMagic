// import { useAddItemToCart } from "../../hooks/cart"
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { ShoppingCartIcon } from "lucide-react";
// import LoadingButton from "./LoadingButton";
import { Button, ButtonProps } from "../ui/button";
import { addToCart } from "@/wix-api/cart";

interface AddToCartButtonProps extends ButtonProps {
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
  // const mutation = useAddItemToCart();

  return (
    <Button
      onClick={() =>
        // mutation.mutate({
        //   product,
        //   selectedOptions,
        //   quantity,
        // })
        addToCart({
          product,
          selectedOptions,
          quantity,
        })
      }
      // loading={mutation.isPending}
      className={cn("flex gap-3", className)}
      {...props}
    >
      <ShoppingCartIcon />
      Add to cart
    </Button>
  );
}
