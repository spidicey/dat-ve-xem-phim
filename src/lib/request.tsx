import axios from "axios";
import { Movie } from "../../types";
import fs from "fs";
import path from "path";

const API_KEY: string = process.env.NEXT_PUBLIC_API_KEY ?? "";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
const READ_ACCESS_TOKEN: string =
  process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN ?? "";
export const fetchTrendingMovies = async (page: number): Promise<Movie[]> => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA4OWZmOWJjY2NlYWMwNDg4ZWVmN2MxYjM0YjBlNSIsInN1YiI6IjY2MGVhMzNlOWRlZTU4MDEzMTA5MWEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI640_F_1EqSLMYriTU5I5nmkTTENrQrm-i0sSJG5T4`,
    },
  };

  const res = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?language=vi-vie&page=${page}`,
    options
  );

  const data = res.data;
  const data1 = data?.results;

  return data?.results as Movie[];
};
type orderInfo = {
  amount: number;
  orderInfo: string;
};
export default async function fetchMovieDetails(id: number): Promise<Movie> {
  // console.log("test3 " + process.env.NEXT_PUBLIC_API_KEY);
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA4OWZmOWJjY2NlYWMwNDg4ZWVmN2MxYjM0YjBlNSIsInN1YiI6IjY2MGVhMzNlOWRlZTU4MDEzMTA5MWEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI640_F_1EqSLMYriTU5I5nmkTTENrQrm-i0sSJG5T4",
    },
    timeout: 5000,
  };
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=vi-vie`,
    options
  );
  const data = res.data;
  return data as Movie;
}

export const getMovies = async (query: string) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results;
};

export const getSimilarMovies = async (id: number) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export const getVNpayLink = async ({ amount, orderInfo }: orderInfo) => {
  const options = {
    params: {
      amount,
      orderInfo,
    },
    timeout: 5000,
  };
  const res = await axios.get(
    "http://127.0.0.1:8080/api/submitOrder",
    options
  );
  return res.data;
};

// export const fetchDataJson = async (): Promise<any[]> => {
//   const options = {
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA4OWZmOWJjY2NlYWMwNDg4ZWVmN2MxYjM0YjBlNSIsInN1YiI6IjY2MGVhMzNlOWRlZTU4MDEzMTA5MWEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI640_F_1EqSLMYriTU5I5nmkTTENrQrm-i0sSJG5T4`,
//     },
//   };

//   const data = fs.readFileSync(path.resolve("res.json"), "utf-8");
//   const movies = JSON.parse(data);

//   const ids: number[] = [
//     ...new Set<number>(movies.map((movie: { id: number }) => movie.id)),
//   ];

//   const movieDataPromises = ids.map(async (id: number) => {
//     const res = await axios.get(
//       `https://api.themoviedb.org/3/movie/${id}?language=vi-vie`,
//       options
//     );
//     return res.data;
//   });

//   const movieData = await Promise.all(movieDataPromises);

// fs.writeFile("res1.json", JSON.stringify(movieData), (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("File has been created");
// });

//   // console.log(movieData);

//   return ids;

//   // console.log(json);
//   return ids;
// };

// export const fetchGenres = async (): Promise<any[]> => {
//   const options = {
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA4OWZmOWJjY2NlYWMwNDg4ZWVmN2MxYjM0YjBlNSIsInN1YiI6IjY2MGVhMzNlOWRlZTU4MDEzMTA5MWEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI640_F_1EqSLMYriTU5I5nmkTTENrQrm-i0sSJG5T4`,
//     },
//   };

//   const res = await axios.get(
//     `https://api.themoviedb.org/3/genre/movie/list?language=vi`,
//     options
//   );

//   const data = res.data;
//   fs.writeFile("genres.json", JSON.stringify(data), (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log("File has been created");
//   });
//   return data;
// };
