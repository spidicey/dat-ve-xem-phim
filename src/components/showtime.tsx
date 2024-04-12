"use client";
import * as React from "react";
import { ChevronsUpDown, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { Label } from "./ui/label";
import { Showtime } from "../../types";

const showtimes: Showtime[] = [
  {
    id_cinema: 1,
    cinema_name: "DCINE Bến Thành",
    address: "Số 6, Mạc Đĩnh Chi, Q.1, Tp. Hồ Chí Minh",
    id_room: 1,
    sub: "2D Phụ Đề Việt",
    schedule_start: ["2:45", "3:45", "4:45", "23:45", "1:45", "5:45"],
    day: "12/04/2024",
  },
  {
    id_cinema: 2,
    cinema_name: "DCINE Quận 7",
    address: "Số 7, Nguyễn Văn Linh, Q.7, Tp. Hồ Chí Minh",
    id_room: 2,
    sub: "3D Phụ Đề Việt",
    schedule_start: ["1:30", "4:30", "7:30"],
    day: "13/04/2024",
  },
  {
    id_cinema: 3,
    cinema_name: "DCINE Thủ Đức",
    address: "Số 8, Võ Văn Ngân, Thủ Đức, Tp. Hồ Chí Minh",
    id_room: 3,
    sub: "2D Phụ Đề Anh",
    schedule_start: ["2:00", "5:00", "8:00"],
    day: "15/04/2024",
  },
  // Add more showtimes as needed
];

showtimes.forEach((showtime) => {
  showtime.schedule_start.sort((a, b) => {
    const timeA = new Date();
    const timeB = new Date();
    timeA.setHours(Number(a.split(":")[0]));
    timeA.setMinutes(Number(a.split(":")[1]));
    timeB.setHours(Number(b.split(":")[0]));
    timeB.setMinutes(Number(b.split(":")[1]));
    return timeA.getTime() - timeB.getTime();
  });
});

export default function MovieShowtime({ day }: any) {
  const [isOpen, setIsOpen] = React.useState<boolean[]>(
    showtimes.map(() => false)
  );

  const toggleOpen = (index: number) => {
    setIsOpen(isOpen.map((open, i) => (i === index ? !open : open)));
  };
  const filteredShowtimes = showtimes.filter(
    (showtime) => showtime.day === day
  );
  return (
    <div>
      {filteredShowtimes.map((showtime, index) => (
        <Collapsible
          key={index}
          open={isOpen[index]}
          onOpenChange={() => toggleOpen(index)}
          className="w-auto space-y-2"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-[500px] flex justify-start items-center space-x-4 px-4"
            >
              <ChevronsUpDown className="h-4 w-4" />
              <h4 className="text-sm font-semibold">
                Phòng chiếu {showtime.id_room}
              </h4>
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-2">
            <h4 className="text-body mb-0 name font-weight-normal">
              {showtime.cinema_name}
            </h4>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              {showtime.address} -
              <br />
              <label className="small font-bold">{showtime.sub}</label>
              <div className="font-bold flex flex-wrap mt-2">
                {showtime.schedule_start.map((time, index) => {
                  const currentTime = new Date();
                  const scheduleTime = new Date();
                  scheduleTime.setHours(Number(time.split(":")[0]));
                  scheduleTime.setMinutes(Number(time.split(":")[1]));

                  const isPast = currentTime >= scheduleTime;

                  return (
                    <Link
                      key={index}
                      href=""
                      className={`w-20 h-[54px] space-x-4 ${
                        isPast ? "pointer-events-none opacity-50" : ""
                      }`}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-20 h-[54px] space-x-4 px-4"
                      >
                        {time}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
