import Header from "@/components/main-nav";
import { fetchProfile } from "@/lib/request";
import { KhachHangType } from "../../../types";

export default async function Page({ searchParams }: { searchParams: any }) {
  console.log(searchParams.username);
  // // @ts-ignore
  const acc: KhachHangType = await fetchProfile(searchParams.username);
  console.log(acc);
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div>Profile</div>
        <div>Tên: {acc.ten}</div>
        <div>CCCD: {acc.cccd}</div>
        <div>Giới tính{acc.gioiTinh}</div>
        <div>Email: {acc.account.email}</div>
        <div>Role: {acc.account.role}</div>
      </div>
    </>
  );
}
