"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { members } from "@wix/members";
import { LogInIcon, LogOutIcon, UserIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import useAuth from "@/hooks/auth";
import { SunIcon } from "./Icons/SunIcon";
import { MoonIcon } from "./Icons/MoonIcon";

interface ProfileIconProps {
  loggedInMember: members.Member | null;
  className?: string;
}

const ProfileIcon = ({ loggedInMember }: ProfileIconProps) => {
  const { login, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Function to format the user's display name
  const getDisplayName = () => {
    if (!loggedInMember) return "";
    
    const firstName = loggedInMember.contact?.firstName || "";
    const lastName = loggedInMember.contact?.lastName || "";
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    return firstName || lastName || loggedInMember.loginEmail;
  };

  // Function to get avatar fallback initials
  const getAvatarInitials = () => {
    if (!loggedInMember) return "U";
    
    const firstName = loggedInMember.contact?.firstName?.[0] || "";
    const lastName = loggedInMember.contact?.lastName?.[0] || "";
    
    return `${firstName}${lastName}` || "U";
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleTheme}
        className="rounded-full p-2 hover:bg-gray-100 dark:bg-[#16181D] hidden"
      >
        {theme === "light" ? (
          <MoonIcon className="size-5" />
        ) : (
          <SunIcon className="size-5" />
        )}
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={
                loggedInMember?.profile?.photo?.url ||
                "https://github.com/shadcn.png"
              }
              // alt={getDisplayName()}
            />
            <AvatarFallback>
              {getAvatarInitials()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 dark:bg-[#16181D]">
          {loggedInMember && (
            <>
              <DropdownMenuLabel className=" text-center">
                {getDisplayName()}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4 dark:bg-[#16181D]" />
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </>
          )}

          {loggedInMember ? (
            <DropdownMenuItem onClick={() => logout()}>
              <LogOutIcon className="mr-2 h-4 w-4 dark:bg-[#16181D]" />
              Log out
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => login()}>
              <LogInIcon className="mr-2 h-4 w-4 dark:bg-[#16181D]" />
              Log in
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileIcon;