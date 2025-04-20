import { LoadingButton } from "./LoadingButton";
import { ButtonProps } from "../ui/button";
import { useCartCheckout } from "@/hooks/checkout";

export default function CheckoutButton(props: ButtonProps) {
  const { startCheckoutFlow, pending } = useCartCheckout();

  return (
    <LoadingButton onClick={startCheckoutFlow} loading={pending} {...props}>
      Checkout
    </LoadingButton>
  );
}
