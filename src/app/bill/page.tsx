import React from "react";
import { HoaDonType } from "../../../types";
import { fetchBill, fetchBills } from "@/lib/request";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page({ searchParams }: { searchParams: any }) {
  console.log(searchParams.username);
  // // @ts-ignore
  const bills: HoaDonType[] = await fetchBills(searchParams.username);
  console.log(bills);
  return (
    <div className="flex flex-col items-center justify-center">
      <div>Danh sách hoá đơn</div>

      {bills.map((bill: HoaDonType) => (
        <div key={bill.idHoaDon} className="text-center flex m-1 p-1">
          <Link href={`/bill/${bill.idHoaDon}`}>
            <Button>
              {bill.khachHang.ten}
              {":"}
              {bill.ngayTao}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
