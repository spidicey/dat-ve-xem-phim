"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import axios from "axios";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import useSWR from "swr";
import { SuatChieuType } from "../../types";
type GroupedShowtimes = Record<string, SuatChieuType[]>;

const fetcher = async (url: string) => {
  const res = await axios.get(url, {
    headers: {
      // accept: "application/json",
      // Authorization:
      //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA4OWZmOWJjY2NlYWMwNDg4ZWVmN2MxYjM0YjBlNSIsInN1YiI6IjY2MGVhMzNlOWRlZTU4MDEzMTA5MWEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI640_F_1EqSLMYriTU5I5nmkTTENrQrm-i0sSJG5T4",
    },
    timeout: 5000,
  });
  return res.data;
};
export default function MovieShowtime({
  day,
  movieId,
}: {
  day: string | undefined | null;
  movieId: string | undefined;
}) {
  const { data, error } = useSWR<SuatChieuType[]>(
    `http://localhost:8080/api/suatChieu/phim/${movieId}`,
    fetcher
  );
  const [isOpen, setIsOpen] = React.useState<boolean[]>([]);
  React.useEffect(() => {
    if (data) {
      data.forEach((showtime) => {
        showtime.ngayChieu = showtime.ngayChieu
          .split("T")[0]
          .split("-")
          .reverse()
          .join("/");
        if (showtime.gioBatDau.includes("T")) {
          showtime.gioBatDau = showtime.gioBatDau.split("T")[1].split(".")[0];
        }
        setIsOpen(new Array(data.length).fill(false));
      });
    }
  }, [data]);

  const toggleOpen = (index: number) => {
    setIsOpen(isOpen.map((open, i) => (i === index ? !open : open)));
  };
  const filteredShowtimes = data
    ?.filter((showtime: SuatChieuType) => {
      return (
        showtime.ngayChieu.split("T")[0].split("-").reverse().join("/") === day
      );
    })
    .sort((a, b) => {
      return a.ngayChieu.localeCompare(b.ngayChieu);
    });
  let groupedShowtimes: GroupedShowtimes = {};

  if (filteredShowtimes && filteredShowtimes.length > 0) {
    groupedShowtimes = filteredShowtimes?.reduce((grouped: any, showtime) => {
      const key = showtime.phong.tenPhong;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(showtime);
      return grouped;
    }, {});
  }
  return (
    <div>
      {filteredShowtimes?.length === 0 ? (
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          Không có lịch chiếu phù hợp với điều kiện tìm kiếm của bạn.
          <br />
          Hãy thử chọn một ngày khác.
        </div>
      ) : (
        Object.entries(groupedShowtimes).map(([phong, showtimes], index) => {
          // You can access each phong and its corresponding showtimes here
          return (
            <Collapsible
              key={phong}
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
                  <h4 className="text-sm font-semibold">Phòng chiếu {phong}</h4>
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-2">
                <h4 className="text-body mb-0 name font-weight-normal">
                  {showtimes[0].phong.rap.tenRap}
                </h4>
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                  {showtimes[0].phong.rap.diaChi} -
                  <br />
                  <label className="small font-bold">
                    {showtimes[0].ngonNgu}
                  </label>
                  <div className="font-bold flex flex-wrap mt-2">
                    {showtimes.map((showtime, index) => {
                      const now = new Date();
                      const gioBatDau = new Date(showtime.gioBatDau);
                      const isPast = gioBatDau <= now;
                      return (
                        <Link
                          key={index}
                          href={`/checkout/${showtime.idSuatChieu}`}
                          className={`w-20 h-[54px] space-x-4 ${
                            isPast ? "pointer-events-none opacity-50" : ""
                          }`}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-20 h-[54px] space-x-4 px-4"
                          >
                            {showtime.gioBatDau}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })
      )}
    </div>
  );
}
