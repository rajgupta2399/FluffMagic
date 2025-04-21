import { env } from "@/env";
import { WIX_STORES_APP_ID } from "@/lib/constant";
import { findVariant } from "@/lib/utils";
import { WixClient } from "@/lib/wix-client.base";
import { checkout } from "@wix/ecom";
import { products } from "@wix/stores";

export async function getCheckoutUrlForCurrentCart(wixClient: WixClient) {
  const { checkoutId } =
    await wixClient.currentCart.createCheckoutFromCurrentCart({
      channelType: checkout.ChannelType.WEB,
    });

  const { redirectSession } = await wixClient.redirects.createRedirectSession({
    ecomCheckout: { checkoutId },
    callbacks: {
      postFlowUrl: window.location.href,
      thankYouPageUrl: env.NEXT_PUBLIC_BASE_URL + "/checkout-success",
    },
  });

  if (!redirectSession) {
    throw Error("Failed to create redirect session");
  }

  return redirectSession.fullUrl;
}

// export async function getCheckoutUrlForCurrentCart(wixClient: WixClient) {
//   try {
//     // First ensure the cart exists and has items
//     const cart  = await wixClient.currentCart.getCurrentCart();
//     if (!cart?.lineItems?.length) {
//       throw new Error("Cart is empty");
//     }

//     // Create checkout with explicit payment options
//     const { checkoutId } =
//       await wixClient.currentCart.createCheckoutFromCurrentCart({
//         channelType: checkout.ChannelType.WEB,
//       });

//     // Create redirect session
//     const { redirectSession } = await wixClient.redirects.createRedirectSession(
//       {
//         ecomCheckout: { checkoutId },
//         callbacks: {
//           postFlowUrl: window.location.href,
//           thankYouPageUrl: `${env.NEXT_PUBLIC_BASE_URL}/checkout-success`,
//         },
//       },
//     );

//     if (!redirectSession) {
//       throw new Error("Failed to create redirect session");
//     }

//     return redirectSession.fullUrl;
//   } catch (error) {
//     console.error("Checkout error details:", JSON.stringify(error, null, 2));
//     throw new Error(
//       error.message || "Payment configuration error. Please try again later.",
//     );
//   }
// }

export interface GetCheckoutUrlForProductValues {
  product: products.Product;
  quantity: number;
  selectedOptions: Record<string, string>;
}

export async function getCheckoutUrlForProduct(
  wixClient: WixClient,
  { product, quantity, selectedOptions }: GetCheckoutUrlForProductValues,
) {
  const selectedVariant = findVariant(product, selectedOptions);

  const { _id } = await wixClient.checkout.createCheckout({
    channelType: checkout.ChannelType.WEB,
    lineItems: [
      {
        catalogReference: {
          appId: WIX_STORES_APP_ID,
          catalogItemId: product._id,
          options: selectedVariant
            ? {
                variantId: selectedVariant._id,
              }
            : { options: selectedOptions },
        },
        quantity,
      },
    ],
  });

  if (!_id) {
    throw new Error("Failed to create checkout");
  }

  const { redirectSession } = await wixClient.redirects.createRedirectSession({
    ecomCheckout: { checkoutId: _id },
    callbacks: {
      postFlowUrl: window.location.href,
      thankYouPageUrl: env.NEXT_PUBLIC_BASE_URL + "/checkout-success",
    },
  });

  if (!redirectSession) {
    throw Error("Failed to create redirect session");
  }

  return redirectSession.fullUrl;
}
