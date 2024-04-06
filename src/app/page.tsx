import React, { Suspense, useEffect, useState } from "react";
import getMovieDetails from "../lib/request";
import { getTrendingMovies } from "../lib/request";
import Image from "next/image";
import { Movie } from "../../types";
import MovieCard from "@/components/card-movie";
export default async function Page() {
  const movies: Movie[] = await getTrendingMovies();
  const data1 = await getMovieDetails(848538);
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <Suspense fallback={<div>Loading...</div>}>
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Suspense>
    </div>
  );
}
