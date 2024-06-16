"use client";
import styles from "@/components/dashboard/users/singleUser/singleUser.module.css";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const SingleUserPage = ({ params }: { params: any }) => {
  const { data: session } = useSession();
  const [date, setDate] = useState<Date>();
  // @ts-ignore
  const token = session?.user.accessToken;

  const SuatChieuSchema = z.object({
    gioBatDau: z.string(),
    thoiLuong: z.number(),
    ngonNgu: z.string(),
    ngayChieu: z.string(),
    sub: z.string(),
    gia: z.number(),
    phim: z.number(),
    phong: z.number(),
    token: z.string(),
  });

  type TSuatChieuSchema = z.infer<typeof SuatChieuSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    getValues,
    control,
  } = useForm<TSuatChieuSchema>({
    resolver: zodResolver(SuatChieuSchema),
  });
  const onSubmit = async (data: TSuatChieuSchema) => {
    data = { ...data, phim: params.id, token: token };
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
    // if (response.status === 201) {
    //   <Alert>
    //     <Terminal className="h-4 w-4" />
    //     <AlertTitle>Thêm thanh công !</AlertTitle>

    //   </Alert>;
    // }
    // console.log(response);
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
          <label htmlFor="gioBatDau">Giờ bắt đầu:</label>
          <input
            type="text"
            {...register("gioBatDau")}
            className="px-4 py-2 rounded"
          />
          {errors.gioBatDau && (
            <p className="text-red-500">{errors.gioBatDau.message}</p>
          )}

          <label htmlFor="thoiLuong">Thời lượng:</label>
          <input
            type="number"
            {...register("thoiLuong", { valueAsNumber: true })}
            className="px-4 py-2 rounded"
          />
          {errors.thoiLuong && (
            <p className="text-red-500">{errors.thoiLuong.message}</p>
          )}

          <label htmlFor="ngonNgu">Ngôn ngữ:</label>
          <input
            type="text"
            {...register("ngonNgu")}
            className="px-4 py-2 rounded"
          />
          {errors.ngonNgu && (
            <p className="text-red-500">{errors.ngonNgu.message}</p>
          )}

          <label htmlFor="ngayChieu">Ngày chiếu:</label>
          <input
            type="date"
            {...register("ngayChieu")}
            className="px-4 py-2 rounded"
          />
          {errors.ngayChieu && (
            <p className="text-red-500">{errors.ngayChieu.message}</p>
          )}

          <label htmlFor="sub">Sub:</label>
          <input
            type="text"
            {...register("sub")}
            className="px-4 py-2 rounded"
          />
          {errors.sub && <p className="text-red-500">{errors.sub.message}</p>}

          <label htmlFor="gia">Giá:</label>
          <input
            type="number"
            {...register("gia", { valueAsNumber: true })}
            className="px-4 py-2 rounded"
          />
          {errors.gia && <p className="text-red-500">{errors.gia.message}</p>}

          <label htmlFor="phong">Phòng:</label>
          <input
            type="number"
            {...register("phong", { valueAsNumber: true })}
            className="px-4 py-2 rounded"
          />
          {errors.phong && (
            <p className="text-red-500">{errors.phong.message}</p>
          )}
          <Button type="submit">Thêm</Button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
