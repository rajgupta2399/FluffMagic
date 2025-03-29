// components/ui/loading-button.tsx
"use client";

import { Button, ButtonProps } from "../ui/button";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading, children, ...props }, ref) => {
    return (
      <Button ref={ref} disabled={loading} {...props}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";