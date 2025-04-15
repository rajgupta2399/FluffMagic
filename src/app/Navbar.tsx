import * as React from "react";
import { Home, User, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Logo from "../assets/fluffmagic.png";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import whatsapp from "../assets/whatsapp.png";
import ProfileIcon from "@/components/_components/ProfileIcon";
// import { MoonIcon } from "@/components/_components/Icons/MoonIcon";
import { getCart } from "@/wix-api/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import { getWixServerClient } from "@/lib/wix-client.server";
import UserButton from "@/components/_components/UserButton";
import { getCollections } from "@/wix-api/collections";
import SearchField from "@/components/_components/SearchField";
// interface ComponentItem {
//   title: string;
//   href: string;
//   description?: string;
//   icon: React.ReactElement; // Correct TypeScript type for JSX Elements
// }

export default async function Header() {
  // const components: ComponentItem[] = [
  //   {
  //     title: "Baby Care",
  //     href: "/baby-care",
  //     icon: <Baby className="h-5 w-5 text-blue-600" />,
  //   },
  //   {
  //     title: "Critical Care",
  //     href: "/docs/primitives/hover-card",
  //     icon: <GitCommitVerticalIcon className="h-5 w-5 text-green-600" />,
  //   },
  //   {
  //     title: "Digital Instruments",
  //     href: "/docs/primitives/progress",
  //     icon: <FileDigit className="h-5 w-5 text-purple-600" />,
  //   },
  //   {
  //     title: "Gauze Products",
  //     href: "/docs/primitives/progress",
  //     icon: <Bandage className="h-5 w-5 text-purple-600" />,
  //   },
  //   {
  //     title: "Home and Personal Protection",
  //     href: "/docs/primitives/progress",
  //     icon: <HomeIcon className="h-5 w-5 text-purple-600" />,
  //   },
  //   {
  //     title: "Home Patient care",
  //     href: "/docs/primitives/progress",
  //     icon: <PanelTopInactive className="h-5 w-5 text-purple-600" />,
  //   },
  //   {
  //     title: "Laboratory Products",
  //     href: "/docs/primitives/progress",
  //     icon: <MusicIcon className="h-5 w-5 text-purple-600" />,
  //   },
  //   {
  //     title: "Orthopaedic Supplies",
  //     href: "/docs/primitives/progress",
  //     icon: <MusicIcon className="h-5 w-5 text-purple-600" />,
  //   },
  //   {
  //     title: "Pediatrician",
  //     href: "/docs/primitives/progress",
  //     icon: <MusicIcon className="h-5 w-5 text-purple-600" />,
  //   },
  //   {
  //     title: "Surgical",
  //     href: "/docs/primitives/progress",
  //     icon: <MusicIcon className="h-5 w-5 text-purple-600" />,
  //   },
  //   {
  //     title: "Surgical Sutures",
  //     href: "/docs/primitives/progress",
  //     icon: <MusicIcon className="h-5 w-5 text-purple-600" />,
  //   },
  //   {
  //     title: "Syringe & Needles",
  //     href: "/docs/primitives/progress",
  //     icon: <MusicIcon className="h-5 w-5 text-purple-600" />,
  //   },
  //   {
  //     title: "Urology",
  //     href: "/docs/primitives/progress",
  //     icon: <MusicIcon className="h-5 w-5 text-purple-600" />,
  //   },
  // ];

  const cart = await getCart(await getWixServerClient());
  const collections = await getCollections(await getWixServerClient());

  console.log(collections);

  // const [cart, loggedInMember, collections] = await Promise.all([
  //   getCart(wixClient),
  //   getLoggedInMember(wixClient),
  //   getCollections(wixClient),
  // ]);

  // const totalQuantity =
  //   cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  return (
    <>
      {/* Top Navbar for Large Screens */}
      <header className="fixed left-0 top-0 z-50 hidden w-full bg-background shadow-lg dark:bg-[#16181D] lg:block">
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-8">
          {/* Left Side - Logo & Navigation */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/">
              <Image
                width={60}
                height={50}
                src={Logo}
                alt="logo"
                className="w-10 sm:w-14"
              />
            </Link>

            {/* Navigation Links */}
            <ul className="flex items-center gap-6">
              <li className="mt-1">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center gap-2 hover:bg-transparent focus:bg-transparent">
                        <LayoutGrid className="h-5 w-5 text-gray-800 dark:text-white" />
                        <span className="text-[15px] font-medium uppercase text-gray-800 dark:text-white">
                          Browse Categories
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="dark:bg-[#16181D grid w-[235px] gap-3 p-4">
                          {collections.map((collection) => (
                            <li key={collection._id}>
                              <Link
                                href={`/collections/${collection.slug}`}
                                legacyBehavior
                                passHref
                              >
                                <NavigationMenuLink
                                  className={cn(
                                    navigationMenuTriggerStyle(),
                                    "w-full justify-start whitespace-nowrap",
                                  )}
                                >
                                  {collection.name}
                                </NavigationMenuLink>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </li>

              <li className="mt-1">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem className="flex items-center gap-2 hover:bg-transparent focus:bg-transparent">
                      <span className="text-[15px] font-medium uppercase text-gray-800 dark:text-white">
                        <Link href="/shop">All Products</Link>
                      </span>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </li>
            </ul>
          </div>

          {/* Center - Search Bar */}
          {/* <div className="relative w-1/3"> */}
          <SearchField className="max-w-96" />
          {/* </div> */}

          {/* Right Side - Icons */}
          <div className="flex items-center gap-4">
            <ShoppingCartButton initialData={cart} />
            <UserButton />
            <ProfileIcon />
          </div>
        </nav>
      </header>

      {/* Mobile Navigation (Logo + Menu Button) */}
      <header className="fixed left-0 top-0 z-50 w-full bg-slate-50 shadow-lg lg:hidden">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          {/* Logo */}
          <Link href={"/"}>
            <Image width={60} height={100} src={Logo} alt="logo" />
          </Link>
          {/* <a href="#" className="flex items-center gap-2 text-gray-900"></a> */}
          <div className="flex items-center gap-3 align-middle">
            {/* In your mobile header */}
            <div className="flex items-center gap-3 align-middle">
              <a href="#" className="">
                <Image src={whatsapp} alt="whatsapp" width={28} height={50} />
              </a>
              <ShoppingCartButton initialData={cart} />
            </div>
          </div>
        </nav>
      </header>

      {/* Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 z-50 w-full bg-slate-50 shadow-lg lg:hidden">
        <ul className="flex justify-around py-3">
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <Home className="h-5 w-5" />
              <span className="text-xs font-semibold">Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <LayoutGrid className="h-5 w-5" />
              <span className="text-xs font-semibold">Categories</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              {/* <ShoppingCart className="h-5 w-5" /> */}
              <ShoppingCartButton initialData={cart} />
              <span className="text-xs font-semibold">Cart</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <User className="h-5 w-5" />
              <span className="text-xs font-semibold">Profile</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
