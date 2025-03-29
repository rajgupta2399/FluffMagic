import { getWixClient } from "@/lib/wix-client.base";
import { products } from "@wix/stores";
import { WixClient } from "@/lib/wix-client.base";
import { findVariant } from "@/lib/utils";
import { WIX_STORES_APP_ID } from "@/lib/constant";

interface WixError {
  details: {
    applicationError: {
      code: string;
    };
  };
}

export async function getCart() {
  const wixClient = getWixClient();
  try {
    return await wixClient.currentCart.getCurrentCart();
  } catch (error) {
    const wixError = error as WixError;
    if (wixError.details.applicationError.code === "OWNED_CART_NOT_FOUND") {
      return null;
    } else {
      throw error;
    }
  }
}

export interface AddToCartValues {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export async function addToCart(
  // wixClient: WixClient,
  { product, selectedOptions, quantity }: AddToCartValues,
) {
  const selectedVariant = findVariant(product, selectedOptions);
  const wixClient = getWixClient();

  return wixClient.currentCart.addToCurrentCart({
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
}

export interface UpdateCartItemQuantityValues {
  productId: string;
  newQuantity: number;
}

export async function updateCartItemQuantity(
  wixClient: WixClient,
  { productId, newQuantity }: UpdateCartItemQuantityValues,
) {
  return wixClient.currentCart.updateCurrentCartLineItemQuantity([
    {
      _id: productId,
      quantity: newQuantity,
    },
  ]);
}

export async function removeCartItem(wixClient: WixClient, productId: string) {
  return wixClient.currentCart.removeLineItemsFromCurrentCart([productId]);
}

// export async function clearCart(wixClient: WixClient) {
//   try {
//     return await wixClient.currentCart.deleteCurrentCart();
//   } catch (error) {
//     if (
//       (error as any).details.applicationError.code === "OWNED_CART_NOT_FOUND"
//     ) {
//       return;
//     } else {
//       throw error;
//     }
//   }
// }

export async function clearCart(wixClient: WixClient) {
  try {
    return await wixClient.currentCart.deleteCurrentCart();
  } catch (error) {
    const wixError = error as WixError;
    if (wixError.details?.applicationError?.code === "OWNED_CART_NOT_FOUND") {
      return;
    }
    throw error;
  }
}
