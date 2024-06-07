"use client";
import MovieShowtime from "@/components/showtime";
import {usePathname, useSearchParams} from "next/navigation";
import React from "react";

export default function Page() {
  const params = useSearchParams();
  const day = params?.get("day");
  const path = usePathname();
  const movieId = path?.split("/")[2];
  console.log(movieId);
  return <MovieShowtime movieId={movieId} day={day} />;
}
