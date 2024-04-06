import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Movie } from "../../../../types";
import getMovieDetails from "@/lib/request";

export default async function page({ params }: any) {
  const IMG_BASE_URL: String | undefined =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  console.log(params);
  const movie = await getMovieDetails(params.id);
  console.log(movie);
  return (
    <div className="my-4 mx-5">
      <div className="flex flex-grow ">
        <Image
          src={`${IMG_BASE_URL}` + movie.poster_path}
          alt="poster"
          width={200}
          height={448}
        ></Image>
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <div className="my-3 flex gap-0">
            <h5 className="bg-red-600 py-1 px-2 text-white mr-2 rounded">
              {movie.release_date}
            </h5>
            <h5 className="bg-red-600 py-1 px-2 text-white mr-2 rounded">
              {movie.original_language}
            </h5>
            <h5 className="bg-red-600 py-1 px-2 text-white mr-2 rounded">
              {movie.status}
            </h5>
          </div>
          <div className="my-3">
            <p>
              {movie.genres.map((genre: any) => {
                return (
                  <span
                    className=" bg-red-600 py-1 px-2 text-white mr-2 rounded"
                    key={genre.id}
                  >
                    {genre.name}
                  </span>
                );
              })}
            </p>
          </div>
          <div className="max-w-2xl">
            <p >{movie?.overview !== "" ? movie?.overview : "Hiện chưa có mô tả"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
