"use client";
import styles from "@/components/dashboard/users/singleUser/singleUser.module.css";
import { Button } from "@/components/ui/button";
import { fetchAdmin } from "@/lib/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AdminType } from "../../../../../types";

const SingleUserPage = ({ params }: { params: any }) => {
  const { data: session } = useSession();
  // @ts-ignore
  const token = session?.user.accessToken;
  const [admin, setAdmin] = useState<AdminType | null>(null);
  const AdminSchema = z.object({
    ten: z.string().min(7),
    cccd: z.string().min(9, { message: "Required" }),
    gioiTinh: z.string(),
    username: z.string(),
    password: z.string(),
    email: z.string().email(),
  });
  type TAdminSchema = z.infer<typeof AdminSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<TAdminSchema>({
    resolver: zodResolver(AdminSchema),
  });
  useEffect(() => {
    const fetchAdminData = async () => {
      const adminData = await fetchAdmin(token, params.id);
      setAdmin(adminData);
      reset({
        // reset form with fetched data
        ten: adminData.ten,
        cccd: adminData.cccd,
        gioiTinh: adminData.gioiTinh,
        username: adminData.account.tk,
        password: adminData.account.mk,
        email: adminData.account.email,
      });
    };
    fetchAdminData();
  }, [token, params.id, reset]);
  //   const user = await fetchUser(id);

  if (!admin) {
    return <div>Loading...</div>; // or some other loading indicator
  }
  const onSubmit = async (data: TAdminSchema) => {
    console.log(token);
    const response = await fetch(
      `http://localhost:8080/api/auth/admin/${admin?.id_admin}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    // const res = await fetch("/api/users", {
    //
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
          <label>Name</label>
          <input {...register("ten")} required className="px-4 py-2 rounded" />
          {errors.ten && (
            <p className="text-red-500">{`${errors.ten.message}`}</p>
          )}

          <label>Căn cước công dân</label>
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
          )}

          <Button>Sửa</Button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
