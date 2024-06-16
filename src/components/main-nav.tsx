"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "./logo.png";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Search from "./search";
import { Button } from "./ui/button";
import { Account } from "./user-dropdown";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-center items-center space-x-2 bg-slate-300">
      <Link href="/">
        <Image
          src={logo}
          width={100}
          height={100}
          alt="Picture of the author"
          className="m-2 mr-4"
        />
      </Link>
      <NavigationMenu className="items-end">
        <NavigationMenuList style={{ display: "flex", listStyle: "none" }}>
          <NavigationMenuItem>
            <Link className="mt-1 rounded-md " href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Đặt vé phim chiếu rạp
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/movie/search" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Tìm kiếm phim
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Search placeholder="Search" />
      {session ? (
        <Account />
      ) : (
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
      )}
      {/* <Account /> */}
    </nav>
  );
}
