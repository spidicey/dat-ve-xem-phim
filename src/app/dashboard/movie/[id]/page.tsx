/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchGenres, fetchMovieDetails } from "@/lib/request";
import axios from "axios";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  PhimType,
  SuatChieuType,
  TheLoai,
  TheLoaiType,
} from "../../../../../types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function page({ params }: { params: any }) {
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

  const { id } = params;
  // @ts-ignore
  const [movie, setMovie] = useState<PhimType>(null);
  const [genres, setGenres] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { data, error } = useSWR<SuatChieuType[]>(
    `http://localhost:8080/api/suatChieu/phim/${id}`,
    fetcher
  );
  const MovieSchema = z.object({
    anh: z.string(),
    ten: z.string(),
    quocGia: z.string(),
    namPhatHanh: z.string(),
    trangThai: z.string(),
    thoiLuong: z.string(),
    moTa: z.string(),
    doTuoi: z.boolean(),
    theLoais: z.array(TheLoai).optional(),
  });
  type TMovieSchema = z.infer<typeof MovieSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    getValues,
    control,
  } = useForm<TMovieSchema>({
    resolver: zodResolver(MovieSchema),
    defaultValues: {
      thoiLuong: "", // provide a default value
    },
  });
  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await fetchMovieDetails(id);
      const genreData = await fetchGenres();
      setGenres(genreData);
      setMovie(movieData);
      setLoading(false);
    };
    fetchMovie();
  }, []);
  const removeGenre = (id: number) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      genres: prevMovie.theLoais.filter((genre) => genre.idTheLoai !== id),
    }));
  };
  const addGenre = (genreToAdd: TheLoaiType) => {
    setMovie((prevMovie) => {
      if (
        prevMovie.theLoais.some(
          (genre) => genre.idTheLoai === genreToAdd.idTheLoai
        )
      ) {
        return prevMovie;
      } else {
        return {
          ...prevMovie,
          theLoais: [...prevMovie.theLoais, genreToAdd],
        };
      }
    });
  };
  const onSubmit = async (data: TMovieSchema) => {
    console.log(data);
    // const parsedData = {
    //   ...data,
    //   theLoais: genreToAdd,
    // };
    // const response = await fetch("http://localhost:8080/api/phim", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //     // @ts-ignore
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // console.log(response);
  };
  const IMG_BASE_URL: String | undefined =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const [open, setOpen] = React.useState(false);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex-grow p-6 md:overflow-y-auto">
      <div className="flex flex-grow ">
        <Image src={movie.anh} alt="poster" width={300} height={448}></Image>
        <div className="ml-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="w-full text-3xl font-bold"
              {...register("ten")}
              defaultValue={movie.ten}
            />
            <div className="my-3 flex gap-0">
              <input
                className="bg-red-600 py-1 px-2 text-white mr-2 rounded"
                {...register("namPhatHanh")}
                defaultValue={
                  movie.namPhatHanh
                    ? new Date(movie.namPhatHanh).toISOString().split("T")[0]
                    : "N/A"
                }
              />
              <input
                className="bg-red-600 py-1 px-2 text-white mr-2 rounded"
                defaultValue={movie.quocGia}
                {...register("quocGia")}
              />
              <input
                className="bg-red-600 py-1 px-2 text-white mr-2 rounded"
                defaultValue={movie.trangThai}
                {...register("trangThai")}
              />
            </div>
            <div className="flex w-full flex-col items-start justify-between rounded-md border my-3 px-4 py-3 sm:flex-row sm:items-center">
              <p className="text-sm font-medium leading-none">
                <div className="my-3 flex overflow-y-auto">
                  {movie.theLoais.map((genre: TheLoaiType) => {
                    return (
                      <div
                        className=" bg-red-600 py-1 px-2 text-white mr-2 rounded"
                        key={genre.idTheLoai}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            {genre.theLoai}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Edit</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => removeGenre(genre.idTheLoai)}
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
                    {genres.map((genre: TheLoaiType) => {
                      return (
                        <DropdownMenuItem
                          key={genre.idTheLoai}
                          onClick={() => addGenre(genre)}
                        >
                          {genre.theLoai}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="max-w-2xl">
              {movie?.moTa !== "" ? (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Mô tả
                  </label>
                  <textarea
                    id="message"
                    defaultValue={movie.moTa}
                    className="block p-2.5 w-full h-60 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>
              ) : (
                "Hiện chưa có mô tả"
              )}
            </div>
            <Button type="submit" className="mt-4">
              Lưu
            </Button>
          </form>
        </div>
      </div>
      <Link href={`/dashboard/movie/${id}/add`}>
        <Button className="mt-4">Thêm Suất Chiếu</Button>
      </Link>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="w-[100px]">Tên</TableHead>
            <TableHead>Ngày Chiều</TableHead>
            <TableHead>Giờ Chiếu</TableHead>
            <TableHead className="text-right">Giá</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((showtime: SuatChieuType) => (
            <TableRow key={showtime.idSuatChieu}>
              <TableCell className="font-medium">{showtime.phim.ten}</TableCell>
              <TableCell>
                {showtime.ngayChieu
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/")}
              </TableCell>
              <TableCell>
                {showtime.gioBatDau.split("T")[1].split(".")[0]}
              </TableCell>
              <TableCell className="text-right">{showtime.gia}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    // <div>hello</div>
  );
}
