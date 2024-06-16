"use client";
import Header from "@/components/main-nav";
import MovieCard from "@/components/movies/card-movie";
import axios from "axios";
import { Suspense, useState } from "react";
import useSWR from "swr";
import { PhimType } from "../../types";
import MoviePagination from "@/components/movies/pagination";

const fetcher = (url: string): Promise<any> =>
  axios.get(url).then((res) => res.data);
export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // const movies: Movie[] = await fetchTrendingMovies(1);
  const [page, setPage] = useState(Number(searchParams?.page) || 1);
  const size = 16;
  const { data, error } = useSWR(
    `http://localhost:8080/api/phim?page=${page}&size=${size}`,
    fetcher
  );

  if (error)
    return (
      <>
        {/* <Header /> */}
        <div>Failed to load</div>
      </>
    );
  if (!data)
    return (
      <>
        {/* <Header /> */}
        <div>Loading</div>
      </>
    );
  return (
    <>
      <Header />
      <div className="grid grid-cols-4 gap-4 mt-4">
        <Suspense fallback={<div>Loading...</div>}>
          {data.content.map((movie: PhimType) => (
            // console.log(movie),
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Suspense>
      </div>
      <MoviePagination
        totalPosts={data.totalPages * size}
        postsPerPage={size}
        currentPage={page}
        setCurrentPage={setPage}
      ></MoviePagination>
    </>
  );
}
