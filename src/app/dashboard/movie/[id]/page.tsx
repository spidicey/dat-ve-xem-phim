/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import fetchMovieDetails, { fetchGenres } from "@/lib/request";
import {
    Plus,
    Trash
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Movie } from "../../../../../types";
const labels = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
  "design",
  "question",
  "maintenance",
];
export default function page({ params }: { params: any }) {
  const { id } = params;
  const [movie, setMovie] = useState<Movie>(null);
  const [genres, setGenres] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  console.log(id);
  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await fetchMovieDetails(id);
      const genreData = await fetchGenres();
      setGenres(genreData);
      console.log(genreData);
      setLoading(false);
    };
    fetchMovie();
  }, [id]);
  const removeGenre = (id: number) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      genres: prevMovie.genres.filter((genre) => genre.id !== id),
    }));
  };
  const addGenre = (genreToAdd: object) => {
    setMovie((prevMovie) => {
      if (prevMovie.genres.some((genre) => genre.id === genreToAdd.id)) {
        return prevMovie;
      } else {
        return {
          ...prevMovie,
          genres: [...prevMovie.genres, genreToAdd],
        };
      }
    });
  };
  const IMG_BASE_URL: String | undefined =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const [label, setLabel] = React.useState("feature");
  const [open, setOpen] = React.useState(false);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex-grow p-6 md:overflow-y-auto">
      <div className="flex flex-grow ">
        <Image
          src={`${IMG_BASE_URL}` + movie.poster_path}
          alt="poster"
          width={300}
          height={448}
        ></Image>
        <div className="ml-4">
          <form action="">
            <input
              className="w-full text-3xl font-bold"
              defaultValue={movie.title}
            />
            <div className="my-3 flex gap-0">
              <input
                className="bg-red-600 py-1 px-2 text-white mr-2 rounded"
                defaultValue={movie.release_date}
              />
              <input
                className="bg-red-600 py-1 px-2 text-white mr-2 rounded"
                defaultValue={movie.original_language}
              />
              <input
                className="bg-red-600 py-1 px-2 text-white mr-2 rounded"
                defaultValue={movie.status}
              />
            </div>
            <div className="flex w-full flex-col items-start justify-between rounded-md border my-3 px-4 py-3 sm:flex-row sm:items-center">
              <p className="text-sm font-medium leading-none">
                <div className="my-3 flex overflow-y-auto">
                  {movie.genres.map((genre: any) => {
                    return (
                      <div
                        className=" bg-red-600 py-1 px-2 text-white mr-2 rounded"
                        key={genre.id}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            {genre.name}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Edit</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => removeGenre(genre.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Xoá
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    );
                  })}
                </div>
              </p>
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Plus />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Thể loại</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    {genres.map((genre: any) => {
                      return (
                        <DropdownMenuItem
                          key={genre.id}
                          onClick={() => addGenre(genre)}
                        >
                          {genre.name}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="max-w-2xl">
              
                {movie?.overview !== "" ? (
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Mô tả
                    </label>
                    <textarea
                      id="message"
                      defaultValue={movie.overview}
                      className="block p-2.5 w-full h-60 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your thoughts here..."
                    ></textarea>
                  </div>
                ) : (
                  "Hiện chưa có mô tả"
                )}
            </div>
          </form>
        </div>
      </div>
    </div>
    // <div>hello</div>
  );
}
