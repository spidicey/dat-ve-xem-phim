/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import {
  AdminType,
  GheType,
  HoaDonType,
  KhachHangType,
  Movie,
  PhimType,
  VeType,
} from "../../types";
import { encodePng } from "next/dist/server/lib/squoosh/impl";
import { time } from "console";

const API_KEY: string = process.env.NEXT_PUBLIC_API_KEY ?? "";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
const READ_ACCESS_TOKEN: string =
  process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN ?? "";
export const fetcher = async (url: string) => {
  const res = await axios.get(url, {
    headers: {
      accept: "application/json",
      // Authorization:
      //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA4OWZmOWJjY2NlYWMwNDg4ZWVmN2MxYjM0YjBlNSIsInN1YiI6IjY2MGVhMzNlOWRlZTU4MDEzMTA5MWEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI640_F_1EqSLMYriTU5I5nmkTTENrQrm-i0sSJG5T4",
    },
    timeout: 5000,
  });
  return res.data;
};

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
  token: string;
};
export async function fetchMovieDetails(id: number): Promise<PhimType> {
  // console.log("test3 " + process.env.NEXT_PUBLIC_API_KEY);
  const options = {
    headers: {
      accept: "application/json",
      // Authorization:
      //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA4OWZmOWJjY2NlYWMwNDg4ZWVmN2MxYjM0YjBlNSIsInN1YiI6IjY2MGVhMzNlOWRlZTU4MDEzMTA5MWEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI640_F_1EqSLMYriTU5I5nmkTTENrQrm-i0sSJG5T4",
    },
    timeout: 5000,
  };
  const res = await axios.get(`http://localhost:8080/api/phim/${id}`, options);
  const data = res.data;
  return data;
}

export async function fetchSeatByRoomID(id: number): Promise<GheType[]> {
  // console.log("test3 " + process.env.NEXT_PUBLIC_API_KEY);
  const options = {
    headers: {
      accept: "application/json",
      // Authorization:
      //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA4OWZmOWJjY2NlYWMwNDg4ZWVmN2MxYjM0YjBlNSIsInN1YiI6IjY2MGVhMzNlOWRlZTU4MDEzMTA5MWEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI640_F_1EqSLMYriTU5I5nmkTTENrQrm-i0sSJG5T4",
    },
    timeout: 5000,
  };
  const res = await axios.get(
    `http://localhost:8080/api/ghe/phong/${id}`,
    options
  );
  const data = res.data;
  return data;
}

export async function fetchReservedGheBySuatChieuId(
  id: number
): Promise<VeType[]> {
  const options = {
    headers: {
      accept: "application/json",
      // Authorization:
      //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA4OWZmOWJjY2NlYWMwNDg4ZWVmN2MxYjM0YjBlNSIsInN1YiI6IjY2MGVhMzNlOWRlZTU4MDEzMTA5MWEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI640_F_1EqSLMYriTU5I5nmkTTENrQrm-i0sSJG5T4",
    },
    timeout: 5000,
  };
  const res = await axios.get(
    `http://localhost:8080/api/ve/idSuatChieu/${id}`,
    options
  );
  const data = res.data;
  return data;
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

export const getVNpayLink = async ({ amount, orderInfo, token }: orderInfo) => {
  console.log(token);
  const options = {
    authorization: `Bearer ${token}`,
    params: {
      amount,
      orderInfo: encodeURIComponent(JSON.stringify(orderInfo)),
    },
    timeout: 5000,
  };
  const res = await axios.get(
    "http://localhost:8080/api/checkout/submitOrder",
    options
  );
  return res.data;
};

export const fetchAdmins = async (token: string): Promise<AdminType[]> => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(`http://localhost:8080/api/auth/admin`, options);
  return res.data;
};

export const fetchAdmin = async (
  token: string,
  id: number
): Promise<AdminType> => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(
    `http://localhost:8080/api/auth/admin/${id}`,
    options
  );
  return res.data;
};

export const fetchGenres = async (): Promise<any[]> => {
  const options = {
    headers: {
      accept: "application/json",
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA4OWZmOWJjY2NlYWMwNDg4ZWVmN2MxYjM0YjBlNSIsInN1YiI6IjY2MGVhMzNlOWRlZTU4MDEzMTA5MWEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI640_F_1EqSLMYriTU5I5nmkTTENrQrm-i0sSJG5T4`,
    },
  };

  const res = await axios.get(`http://localhost:8080/api/theLoai`, options);

  const data = res.data;
  return data;
};
function useSWR(
  arg0: string,
  fetcher: (url: string) => Promise<any>
): { data: any; error: any } {
  throw new Error("Function not implemented.");
}

export const fetchPhim = async (): Promise<PhimType[]> => {
  const options = {
    headers: {
      accept: "application/json",
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA4OWZmOWJjY2NlYWMwNDg4ZWVmN2MxYjM0YjBlNSIsInN1YiI6IjY2MGVhMzNlOWRlZTU4MDEzMTA5MWEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI640_F_1EqSLMYriTU5I5nmkTTENrQrm-i0sSJG5T4`,
    },
  };

  const res = await axios.get(`http://localhost:8080/api/phim`, options);

  const data = res.data;

  return data;
};

export const fetchUser = async (token: string): Promise<KhachHangType[]> => {
  const options = {
    headers: {
      accept: "application/json",
      // Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(
    `http://localhost:8080/api/auth/khachHang`,
    options
  );
  return res.data;
};

export const fetchBill = async (id: number): Promise<HoaDonType> => {
  const options = {
    headers: {
      accept: "application/json",
      // Authorization: `Bearer ${token}`,
    },
    timeout: 5000,
  };
  const res = await axios.get(
    `http://localhost:8080/api/hoaDon/${id}`,
    options
  );
  return res.data;
};

export const fetchVe = async (idHoaDon: number): Promise<VeType[]> => {
  const options = {
    headers: {
      accept: "application/json",
      // Authorization: `Bearer ${token}`,
    },
    timeout: 5000,
  };
  const res = await axios.get(
    `http://localhost:8080/api/ve/idHoaDon/${idHoaDon}`,
    options
  );
  return res.data;
};
