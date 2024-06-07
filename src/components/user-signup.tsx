"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { notification } from "antd";
import { KhachHang } from "../../types";
import { useMemo } from "react";

interface UserSignUpProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof KhachHang>;

type NotificationType = "success" | "info" | "warning" | "error";

export function UserSignUpForm({ className, ...props }: UserSignUpProps) {
  const Context = React.createContext({ name: "Default" });
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };
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
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  async function onSubmit(data: TAdminSchema) {
    setIsLoading(true);
    console.log(data);
    const response = await fetch("http://localhost:8080/api/auth/khachHang", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    setIsLoading(false);

    if (response?.status === 201) {
      openNotificationWithIcon("success");
      setTimeout(() => {
        router.push("/login");
      }, 1000); // wait for 2 seconds
    }
    if (response?.status === 400) {
      openNotificationWithIcon("error");
    }
    if (response?.status === 500) {
      openNotificationWithIcon("error");
    }
  }
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only">Username or Email</Label>
              <Input
                id="name"
                type="input"
                autoCapitalize="none"
                placeholder="Tên"
                autoCorrect="off"
                disabled={isLoading || isGitHubLoading}
                {...register("ten")}
              />
              {errors?.ten && (
                <p className="px-1 text-xs text-red-600">
                  {errors.ten.message}
                </p>
              )}
              <Label className="sr-only">Username or Email</Label>
              <Input
                id="username"
                type="input"
                autoCapitalize="none"
                placeholder="Căn cước công dân"
                autoCorrect="off"
                disabled={isLoading || isGitHubLoading}
                {...register("cccd")}
              />
              {errors?.cccd && (
                <p className="px-1 text-xs text-red-600">
                  {errors.cccd.message}
                </p>
              )}
              <Label className="sr-only">Username or Email</Label>
              <Input
                id="username"
                type="input"
                autoCapitalize="none"
                placeholder="Giới tính"
                autoCorrect="off"
                disabled={isLoading || isGitHubLoading}
                {...register("gioiTinh")}
              />
              {errors?.gioiTinh && (
                <p className="px-1 text-xs text-red-600">
                  {errors.gioiTinh.message}
                </p>
              )}
              <Label className="sr-only">Username or Email</Label>
              <Input
                id="name"
                type="input"
                autoCapitalize="none"
                placeholder="Tài Khoản"
                autoCorrect="off"
                disabled={isLoading || isGitHubLoading}
                {...register("username")}
              />
              {errors?.username && (
                <p className="px-1 text-xs text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Password
              </Label>
              <Input
                id="pasword"
                placeholder="Mật khẩu"
                type="password"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading || isGitHubLoading}
                {...register("password")}
              />
              {errors?.password && (
                <p className="px-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
              <Label className="sr-only">Username or Email</Label>
              <Input
                id="username"
                type="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="Email"
                disabled={isLoading || isGitHubLoading}
                {...register("email")}
              />
              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              onClick={() => openNotificationWithIcon("error")}
              className={cn(buttonVariants())}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </button>
          </div>
        </form>
        {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true)
          signIn("github")
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button> */}
      </div>
    </Context.Provider>
  );
}
