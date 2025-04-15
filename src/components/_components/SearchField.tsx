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
  placeholder = "Search for products, brands...", // Default placeholder
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
      className={cn("mx-auto w-full max-w-md", className)} // Centered & width control
      role="search"
    >
      <div className="relative">
        <Input
          name="q"
          type="search"
          defaultValue={currentQuery}
          placeholder={placeholder ?? "Search products..."}
          aria-label="Search products"
          className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 pl-12 text-sm text-gray-900 shadow-md transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:border-gray-700 dark:bg-[#1f1f23] dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-blue-600 focus:outline-none"
          aria-label="Submit search"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
