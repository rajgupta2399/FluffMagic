"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import darkThemeLogo from "../assets/1.png";
import lightThemeLogo from "../assets/2.png";

export default function Logo() {
  const { theme } = useTheme();

  return (
    <Link href="/" className="relative block h-10 w-10 sm:h-14 sm:w-14">
      <Image
        src={theme === "dark" ? lightThemeLogo : darkThemeLogo}
        alt="Website logo"
        className="object-contain"
        fill
        sizes="(max-width: 640px) 40px, 56px"
        priority
      />
    </Link>
  );
}
