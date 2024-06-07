"use client";
import styles from "@/components/dashboard/users/singleUser/singleUser.module.css";
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
import { fetchGenres } from "@/lib/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Plus, Terminal, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TheLoai, TheLoaiType } from "../../../../../types";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
const SingleUserPage = ({ params }: { params: any }) => {
  const { data: session } = useSession();
  const [date, setDate] = useState<Date>();
  // @ts-ignore
  const token = session?.user.accessToken;
  const [genres, setGenres] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [genreToAdd, setGenreToAdd] = useState<TheLoaiType[]>();
  const removeGenre = (id: number) => {
    setGenreToAdd((prevGenre) => {
      return prevGenre?.filter((genre) => genre.idTheLoai !== id);
    });
  };
  const addGenre = (genreToAdd: TheLoaiType) => {
    setGenreToAdd((prevGenre) => {
      if (
        prevGenre?.some((genre) => genre.idTheLoai === genreToAdd.idTheLoai)
      ) {
        return prevGenre;
      } else {
        return [...(prevGenre || []), genreToAdd];
      }
    });
  };
  useEffect(() => {
    const fetchMovie = async () => {
      const genreData = await fetchGenres();
      const updatedGenreData = genreData.map(({ phims, ...genre }) => genre);
      setGenres(updatedGenreData);
    };
    fetchMovie();
  }, []);
  const TheLoaiSchema = z.object({
    // Define the schema for TheLoai here
  });

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
    setValue("theLoais", genreToAdd);
  }, [genreToAdd, setValue]);
  const onSubmit = async (data: TMovieSchema) => {
    console.log(data);
    const parsedData = {
      ...data,
      theLoais: genreToAdd,
    };
    const response = await fetch("http://localhost:8080/api/phim", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 201) {
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Thêm thanh công !</AlertTitle>
      </Alert>;
    }
    console.log(response);
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/noavatar.png"} alt="" fill />
        </div>
        {/* {user.username} */}
      </div>
      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <label htmlFor="anh">Ảnh:</label>
          <input
            type="text"
            {...register("anh")}
            className="px-4 py-2 rounded"
          />
          {errors.anh && <p className="text-red-500">{errors.anh.message}</p>}

          <label htmlFor="ten">Tên:</label>
          <input
            type="text"
            {...register("ten")}
            className="px-4 py-2 rounded"
          />
          {errors.ten && <p className="text-red-500">{errors.ten.message}</p>}

          <label htmlFor="quocGia">Quốc Gia:</label>
          <input
            type="text"
            {...register("quocGia")}
            className="px-4 py-2 rounded"
          />
          {errors.quocGia && (
            <p className="text-red-500">{errors.quocGia.message}</p>
          )}

          <label htmlFor="namPhatHanh">Năm Phát Hành:</label>
          <input
            type="date"
            {...register("namPhatHanh")}
            className="px-4 py-2 rounded"
          />
          {errors.namPhatHanh && (
            <p className="text-red-500">{errors.namPhatHanh.message}</p>
          )}

          <label htmlFor="trangThai">Trạng Thái:</label>
          <input
            type="text"
            {...register("trangThai")}
            className="px-4 py-2 rounded"
          />
          {errors.trangThai && (
            <p className="text-red-500">{errors.trangThai.message}</p>
          )}

          <label htmlFor="thoiLuong">Thời Lượng:</label>
          <input
            type="text"
            {...register("thoiLuong")}
            className="px-4 py-2 rounded"
          />
          {errors.thoiLuong && (
            <p className="text-red-500">{errors.thoiLuong.message}</p>
          )}

          <label htmlFor="moTa">Mô Tả:</label>
          <textarea {...register("moTa")} className="px-4 py-2 rounded" />
          {errors.moTa && <p className="text-red-500">{errors.moTa.message}</p>}

          <label htmlFor="doTuoi">Độ Tuổi:</label>
          <input
            type="checkbox"
            {...register("doTuoi")}
            className="px-4 py-2 rounded"
          />
          {errors.doTuoi && (
            <p className="text-red-500">{errors.doTuoi.message}</p>
          )}

          {/* <label htmlFor="theLoais">Thể Loại:</label>
          <input
            type="text"
            {...register("theLoais")}
            className="px-4 py-2 rounded"
            placeholder="Nhập các thể loại, cách nhau bởi dấu phẩy"
          />
          {errors.theLoais && (
            <p className="text-red-500">{errors.theLoais.message}</p>
          )} */}
          <div className="flex w-full flex-col items-start justify-between rounded-md border my-3 px-4 py-3 sm:flex-row sm:items-center">
            <div className="my-3 flex overflow-y-auto">
              {genreToAdd?.map((genre: TheLoaiType) => {
                return (
                  <div
                    className=" bg-red-600 py-1 px-2 text-white mr-2 rounded"
                    key={genre.idTheLoai}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger>{genre.theLoai}</DropdownMenuTrigger>
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
          {/* <label>Căn cước công dân</label>
          <input
            type="number"
            {...register("cccd")}
            required
            className="px-4 py-2 rounded"
          />
          {errors.cccd && (
            <p className="text-red-500">{`${errors.cccd.message}`}</p>
          )}

          <label>Gender</label>
          <select
            {...register("gioiTinh")}
            required
            className="px-4 py-2 rounded"
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
          {errors.gioiTinh && (
            <p className="text-red-500">{`${errors.gioiTinh.message}`}</p>
          )}

          <label>Username</label>
          <input
            type="text"
            {...register("username")}
            required
            className="px-4 py-2 rounded"
          />
          {errors.username && (
            <p className="text-red-500">{`${errors.username.message}`}</p>
          )}

          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            required
            className="px-4 py-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500">{`${errors.password.message}`}</p>
          )}

          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            required
            className="px-4 py-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )} */}

          <Button type="submit">Thêm</Button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
