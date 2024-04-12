"use client";
import MovieShowtime from "@/components/showtime";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  const params = useSearchParams();
  const day = params.get("day");
  return <MovieShowtime day={day} />;
}
