"use client";
import MovieCard from "@/components/movies/card-movie";
import MoviePagination from "@/components/movies/pagination";
import { useState, Suspense } from "react";
import useSWR from "swr";
import { PhimType } from "../../../../types";
import Header from "@/components/main-nav";
import axios from "axios";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string ;
  };
}) {
  // const [page, setPage] = useState(Number(searchParams?.page) || 1);
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
  const size = 16;
  const { data, error } = useSWR(
    `http://localhost:8080/api/phim/search?query=${searchParams?.query}`,
    fetcher
  );
  if (error)
    return (
      <>
        <Header />
        <div>Failed to load</div>
      </>
    );
  if (!data)
    return (
      <>
        <Header />
        <div>Loading</div>
      </>
    );

  return (
    <>
      <Header />
      <div className="grid grid-cols-4 gap-4 mt-4">
        <Suspense fallback={<div>Loading...</div>}>
          {data.map((movie: PhimType) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Suspense>
      </div>
      {/* <MoviePagination
        totalPosts={data.totalPages * size}
        postsPerPage={size}
        currentPage={page}
        setCurrentPage={setPage}
      ></MoviePagination> */}
    </>
  );
}
