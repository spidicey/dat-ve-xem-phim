import React from "react";
import Image from "next/image";
import { PhimType, TheLoaiType } from "../../../types";

export default function MovieComponent({ movie }: { movie: PhimType }) {
  const IMG_BASE_URL: String | undefined =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  return (
    <div className="flex flex-grow ">
      <Image
        src={`${IMG_BASE_URL}` + movie.anh}
        alt="poster"
        width={200}
        height={448}
      ></Image>
      <div className="ml-4">
        <h1 className="text-3xl font-bold">{movie.ten}</h1>
        <div className="my-3 flex gap-0">
          <h5 className="bg-red-600 py-1 px-2 text-white mr-2 rounded">
            {movie.namPhatHanh
              ? new Date(movie.namPhatHanh).toISOString().split("T")[0]
              : "N/A"}
          </h5>
          <h5 className="bg-red-600 py-1 px-2 text-white mr-2 rounded">
            {movie.quocGia}
          </h5>
          <h5 className="bg-red-600 py-1 px-2 text-white mr-2 rounded">
            {movie.trangThai}
          </h5>
        </div>
        <div className="my-3">
          <p>
            {movie.theLoais.map((genre: TheLoaiType) => {
              return (
                <span
                  className=" bg-red-600 py-1 px-2 text-white mr-2 rounded"
                  key={genre.idTheLoai}
                >
                  {genre.theLoai}
                </span>
              );
            })}
          </p>
        </div>
        <div className="max-w-2xl">
          <p>{movie?.moTa !== "" ? movie?.moTa : "Hiện chưa có mô tả"}</p>
        </div>
      </div>
    </div>
  );
}
