"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function DateButton() {
  const weekday = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];
  const dates: { date: string; weekday: string }[] = Array.from(
    { length: 7 },
    (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const day = date.getDate();
      const month = date.getMonth() + 1; // JavaScript months are 0-11
      const year = date.getFullYear();
      const weekday = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"][
        date.getDay()
      ];
      return {
        date: `${day}/${month}/${year}`,
        weekday,
      };
    }
  );
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dayParams = searchParams.get("day");
  return (
    <div className="flex">
      {dates.map(({ date, weekday }) => {
        const [day, month] = date.split("/");
        const formattedDate = `${day}/${month}`;
        // console.log(day, formattedDate, day.includes(formattedDate));
        return (
          <Link key={date} href={`?day=${date}`} data-date={date}>
            <Button
              variant="ghost"
              className={clsx(
                "flex-col gap-2 p-3 text-sm font-medium  md:flex-none md:p-2 md:px-3 w-24 h-20 hover:text-[#b78a28]",
                {
                  "text-[#b78a28]":
                    dayParams?.includes(formattedDate),
                }
              )}
            >
              {formattedDate}
              <br />
              <span>{weekday}</span>
            </Button>
          </Link>
        );
      })}
    </div>
  );
}