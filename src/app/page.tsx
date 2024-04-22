import React, { Suspense, useEffect, useState } from "react";
import { fetchTrendingMovies } from "../lib/request";
import { Movie } from "../../types";
import MovieCard from "@/components/movies/card-movie";
import Header from "@/components/main-nav";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default async function Page() {
  const movies: Movie[] = await fetchTrendingMovies(1);
  return (
    <>
        <Header />
      <div className="grid grid-cols-4 gap-4 mt-4">
        <Suspense fallback={<div>Loading...</div>}>
          {movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Suspense>
      </div>
      <Pagination className="my-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
