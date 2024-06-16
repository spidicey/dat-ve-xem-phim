"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export default function MovieNav() {
  const params = useParams();
  const pathname = usePathname();
  const components: { label: string; title: string; href: string }[] = [
    {
      label: "schedule",
      title: "Lịch chiếu",
      href: `/movie/${params?.id}/schedule`,
    },
  ];
  return (
    <NavigationMenu>
      <NavigationMenuList style={{ display: "flex", listStyle: "none" }}>
        {components.map((component) => {
          return (
            <NavigationMenuItem
              key={component.label}
              className={clsx(
                "gap-2 rounded-md p-3 text-sm font-medium  md:flex-none  md:p-2 md:px-3"
              )}
            >
              <Link href={component.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(
                    "gap-2 rounded-md  p-3 text-sm font-medium  hover:text-[#b78a28] md:flex-none md:justify-start md:p-2 md:px-3",
                    {
                      "bg-slate-500-100 text-[#b78a28]":
                        pathname === component.href,
                    }
                  )}
                >
                  {component.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
