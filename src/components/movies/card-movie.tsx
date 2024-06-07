import React from "react";
import {PhimType} from "../../../types";
import Link from "next/link";
import Image from "next/image";
import {Card} from "../ui/card";

export default function MovieCard({ movie }: { movie: PhimType }) {
  const IMG_BASE_URL: String | undefined =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  return (
    <Card className="max-w-60 overflow-hidden max-h-[500px] mx-auto">
      <Link href={`/movie/${movie.id}/schedule`}>
        <Image
          className="cursor-default"
          src={`${IMG_BASE_URL}` + movie.anh}
          alt="poster"
          width={448}
          height={448}
        ></Image>
      </Link>
      <Link
        href={`/movie/${movie.id}/schedule`}
        className="font-bold  hover:text-red-500"
      >
        {movie.ten}
      </Link>
      <h5>{movie.moTa}</h5>
    </Card>
  );
}
