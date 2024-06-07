import React from "react";
import useSWR from "swr";
import { fetchBill, fetchVe } from "@/lib/request";
import { Card } from "@/components/ui/card";
import { Success } from "@/components/logo";
import { HoaDonType, VeType } from "../../../../types";
export default async function Page({ params }: { params: any }) {
  const billId = params.id;
  const bill: HoaDonType = await fetchBill(billId);
  const tickets: VeType[] = await fetchVe(billId);
  console.log(bill);
  console.log(tickets[0].suatChieu.phong);
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-slate-600">
      <div className="flex flex-grow items-center flex-col p-6 md:overflow-y-auto md:p-12 md:px-96 ">
        <Card className="p-16 w-">
          <div className="flex flex-col items-center gap-5 p-10">
            <h1 className="text-2xl font-bold">Hoá đơn</h1>
            <p className="text-lg">Mã hoá đơn: {bill.idHoaDon}</p>
            <p className="text-lg">khách hàng: {bill.khachHang.ten}</p>
            <p>Danh sách vé:</p>
            <Card>
              {tickets.map((ticket: VeType) => (
                <div key={ticket.idVe}>
                  <p>Mã vé: {ticket.idVe}</p>
                  <p>Ghế: {ticket.ghe.soGhe}</p>
                  <p>Phim: {ticket.suatChieu.phim.ten}</p>
                  <p>Rạp: {ticket.ghe.phong.rap.tenRap}</p>
                  <p>
                    Ngày chiếu:{" "}
                    {ticket.suatChieu.gioBatDau.split("T")[1].split(".")[0]}{" "}
                    {ticket.suatChieu.ngayChieu
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                  </p>
                </div>
              ))}
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
