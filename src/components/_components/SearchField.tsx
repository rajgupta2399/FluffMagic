"use client";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";

interface SearchFieldProps {
  className?: string;
  placeholder?: string; // Add placeholder prop
}

export default function SearchField({ 
  className,
  placeholder = "Search for products, brands..." // Default placeholder
}: SearchFieldProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn("grow", className)}
      role="search" // Add ARIA role
    >
      <div className="relative">
        <Input
          name="q"
          type="search" // Use proper input type
          defaultValue={currentQuery}
          placeholder={placeholder}
          className="w-full rounded-full border border-gray-300 bg-white px-5 py-2.5 pl-12 text-sm text-gray-800 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-[#1e2025] dark:text-white dark:placeholder:text-gray-400"
          aria-label="Search products" // Accessibility improvement
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 transform"
          aria-label="Submit search"
        >
          <SearchIcon className="size-5 text-muted-foreground" />
        </button>
      </div>
    </form>
  );
}