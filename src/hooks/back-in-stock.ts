import { wixBrowserClient } from "@/lib/wix-client.browser";
import {
  BackInStockNotificationRequestValues,
  createBackInStockNotificationRequest,
} from "../wix-api/backInStockNotification";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";

type ApplicationError = {
  code: string;
  // Add other error properties if needed
};

type ErrorDetails = {
  applicationError: ApplicationError;
};

type CustomWixError = Error & {
  details?: ErrorDetails;
};

export function useCreateBackInStockNotificationRequest() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: BackInStockNotificationRequestValues) =>
      createBackInStockNotificationRequest(wixBrowserClient, values),
    onError(error: unknown) {
      console.error(error);

      // Type guard to check if it's a Wix error
      const isWixError = (err: unknown): err is CustomWixError => {
        return (
          err instanceof Error &&
          (err as CustomWixError).details?.applicationError !== undefined
        );
      };

      if (
        isWixError(error) &&
        error.details?.applicationError?.code ===
          "BACK_IN_STOCK_NOTIFICATION_REQUEST_ALREADY_EXISTS"
      ) {
        toast({
          variant: "destructive",
          description: "You are already subscribed to this product.",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again.",
        });
      }
    },
  });
}
