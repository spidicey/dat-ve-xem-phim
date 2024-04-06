import axios from "axios";
import { Movie } from "../../types";

const API_KEY: string = process.env.NEXT_PUBLIC_API_KEY ?? "";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
const READ_ACCESS_TOKEN: string =
  process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN ?? "";
export const getTrendingMovies = async (): Promise<any[]> => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA4OWZmOWJjY2NlYWMwNDg4ZWVmN2MxYjM0YjBlNSIsInN1YiI6IjY2MGVhMzNlOWRlZTU4MDEzMTA5MWEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI640_F_1EqSLMYriTU5I5nmkTTENrQrm-i0sSJG5T4`,
    },
  };
  const res = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?language=vi-vie&page=${3}`,
    options
  );

  const data = res.data;
  return data?.results as any[];
};

export const getMovies = async (query: string) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results;
};

export default async function getMovieDetails(id: number): Promise<Movie>{
  console.log("test3 " + process.env.NEXT_PUBLIC_API_KEY);
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA4OWZmOWJjY2NlYWMwNDg4ZWVmN2MxYjM0YjBlNSIsInN1YiI6IjY2MGVhMzNlOWRlZTU4MDEzMTA5MWEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI640_F_1EqSLMYriTU5I5nmkTTENrQrm-i0sSJG5T4",
    },
  };
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=vi-vie`,
    options
  );
  const data = res.data;
  return data as Movie;
}

export const getSimilarMovies = async (id: number) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};
