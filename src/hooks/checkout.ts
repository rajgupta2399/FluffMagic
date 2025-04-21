import { wixBrowserClient } from "@/lib/wix-client.browser";
import {
  getCheckoutUrlForCurrentCart,
  getCheckoutUrlForProduct,
  GetCheckoutUrlForProductValues,
} from "@/wix-api/checkout";
import { useState } from "react";
import { useToast } from "./use-toast";

export function useCartCheckout() {
  const { toast } = useToast();

  const [pending, setPending] = useState(false);

  async function startCheckoutFlow() {
    setPending(true);

    try {
      const checkoutUrl = await getCheckoutUrlForCurrentCart(wixBrowserClient);
      window.location.href = checkoutUrl;
    } catch (error) {
      setPending(false);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to load checkout. Please try again.",
      });
    }
  }

  return { startCheckoutFlow, pending };
}

// export function useCartCheckout() {
//   const { toast } = useToast();
//   const [pending, setPending] = useState(false);

//   async function startCheckoutFlow() {
//     setPending(true);
//     try {
//       const checkoutUrl = await getCheckoutUrlForCurrentCart(wixBrowserClient);
//       window.location.href = checkoutUrl;
//     } catch (error) {
//       setPending(false);

//       let errorMessage = "Failed to load checkout. Please try again.";
//       if (error?.message?.includes("SITE_MUST_ACCEPT_PAYMENTS")) {
//         errorMessage =
//           "Payment methods not configured. Please contact support.";
//       } else if (error?.message?.includes("Cart is empty")) {
//         errorMessage = "Your cart is empty. Add items to proceed.";
//       }

//       toast({
//         variant: "destructive",
//         title: "Checkout Error",
//         description: errorMessage,
//       });
//     }
//   }

//   return { startCheckoutFlow, pending };
// }

export function useQuickBuy() {
  const { toast } = useToast();

  const [pending, setPending] = useState(false);

  async function startCheckoutFlow(values: GetCheckoutUrlForProductValues) {
    setPending(true);

    try {
      const checkoutUrl = await getCheckoutUrlForProduct(
        wixBrowserClient,
        values,
      );
      window.location.href = checkoutUrl;
    } catch (error) {
      setPending(false);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to load checkout. Please try again.",
      });
    }
  }

  return { startCheckoutFlow, pending };
}
