"use client";
import styles from "@/components/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { use } from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";

const SingleUserPage = ({ params }: { params: any }) => {
  //   const user = await fetchUser(id);
  type User = {
    id: number;
    img?: string;
    name: string;
    username: string;
    password: string;
    email: string;
    phone?: string;
    address?: string;
    isAdmin: boolean;
    isActive: boolean;
    createdAt: Date;
    role: string;
    action: string;
  };

  const user: User = {
    id: 1,
    img: "/path/to/image.jpg",
    name: "John Doe",
    username: "johndoe",
    password: "password",
    email: "john.doe@example.com",
    createdAt: new Date(),
    isAdmin: true,
    isActive: true,
    role: "Admin",
    action: "Edit",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin ? "true" : "false",
    },
  });

  const onsubmit = async (data: FieldValues) => {
    console.log(data);
    // const res = await fetch("/api/users", {
    //
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/noavatar.png"} alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onsubmit)} className={styles.form}>
          <input type="hidden" {...register("id")}  required />
          <label>Username</label>
          <input
            type="text"
            {...register("username")}
            required
          />
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            required
          />
          <label>Password</label>
          <input type="password" {...register("password")} required />
          <label>Phone</label>
          <input
            type="text"
            {...register("phone")}
            required
          />
          <label>Address</label>
          <textarea
            {...register("address")}
            required
          />
          <label>Is Admin?</label>
          <select
            {...register("isAdmin")}
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button>Thêm</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
