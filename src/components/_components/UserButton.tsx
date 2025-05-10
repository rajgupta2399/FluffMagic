"use client";

import { useTheme } from "next-themes";
import { SunIcon } from "./Icons/SunIcon";
import { MoonIcon } from "./Icons/MoonIcon";
// import { Button } from "../ui/button";
// import useAuth from "@/hooks/auth";

interface UserButtonProps {
  className?: string;
}

export default function UserButton({ className }: UserButtonProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // const { login } = useAuth();

  return (
    <>
      <button onClick={toggleTheme} className={className}>
        {theme === "light" ? (
          <MoonIcon className="size-5" />
        ) : (
          <SunIcon className="size-5" />
        )}
      </button>
    </>
  );
}
