"use client";
import {
  ChevronRightIcon,
  CreditCard,
  Inbox,
  LayoutGridIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Card } from "@/components/ui/card";
import { GheType, Showtime, SuatChieuType, VeType } from "../../../../types";
import { RadioGroup } from "@/components/ui/radio-group";
import { MoMo, Vnpay } from "@/components/logo";
import PaymentOption from "@/components/payment-option";
import Timer from "@/components/timer";
import {
  fetchReservedGheBySuatChieuId,
  fetchSeatByRoomID,
  getVNpayLink,
} from "@/lib/request";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Step = {
  icon: React.ReactNode | any;
  label: string;
};
type OrderInfo = {
  amount: number;
  orderInfo: string;
};

const steps: Step[] = [
  { icon: <LayoutGridIcon size={34} />, label: "Chọn ghế" },
  // { icon: <ShoppingBag size={34} />, label: "Bắp nước" },
  { icon: <CreditCard size={34} />, label: "Thanh toán" },
  { icon: <Inbox size={34} />, label: "Thông tin vé" },
];
const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
export default function Page({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const { data: session } = useSession();

  const { data, error, isLoading } = useSWR<SuatChieuType>(
    `http://localhost:8080/api/suatChieu/${params.id}`,
    fetcher
  );
  const [Ghes, setGhes] = useState<GheType[] | null>(null);
  const [selectedGheIds, setSelectedGheIds] = useState<number[]>([]);
  const [reservedGheIds, setReservedGheIds] = useState<VeType[] | null>(null);
  useEffect(() => {
    if (!isLoading && data) {
      const roomID = data?.phong.idPhong; // replace with your room ID
      fetchReservedGheBySuatChieuId(data?.idSuatChieu || -1)
        .then((data) => setReservedGheIds(data))
        .catch((error) => console.error(error));
      fetchSeatByRoomID(roomID || 0)
        .then((data) => setGhes(data))
        .catch((error) => console.error(error));
    }
  }, [data, isLoading]);
  let timeout: NodeJS.Timeout;
  const COUNTDOWN_AMOUNT_TOTAL = 5 * 60;
  const timerRef = useRef<HTMLDivElement>(null);
  const [numTogglesOn, setNumTogglesOn] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [toggleStates, setToggleStates] = useState(
    Array.from({ length: 9 }, () => Array(10).fill(false))
  );
  const [paymentOption, setPaymentOption] = useState<string>("vnpay");
  const delta = currentStep - previousStep;
  const next = async () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        // await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };
  const router = useRouter();
  const handleSutmit = async () => {
    try {
      const orderInfo = JSON.stringify({
        tong: totalCost,
        suatchieu: data?.idSuatChieu,
        rap: data?.phong.rap.tenRap,
        diachi: data?.phong.rap.diaChi,
        selectedGheIds: selectedGheIds,
        phong: data?.phong.idPhong,
        // @ts-ignore
        username: session?.user?.username,
      });
      console.log(orderInfo);
      const VNPayLink = await getVNpayLink({
        amount: totalCost,
        orderInfo: orderInfo,
        // @ts-ignore
        token: session?.user?.accessToken,
      });
      console.log(VNPayLink);
      router.push(VNPayLink);
      // if (!response.ok) {
      //   throw new Error('VNPay API request failed');
      // }

      // const result = await response.json();

      // // Redirect to the result
      // router.push(result.url);
    } catch (error) {
      console.error(error);
    }
  };
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  if (!session) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
        <h1>Bạn cần đăng nhập để đặt vé</h1>
      </div>
    );
  }

  const ticketCost = numTogglesOn * (data?.gia ?? 0);
  const extraCost = numTogglesOn * 5000;
  const totalCost = ticketCost + extraCost;
  console.log(Ghes);
  console.log(reservedGheIds?.map((ve: VeType) => console.log(ve.ghe.idGhe)));
  return (
    <div>
      <div className="flex justify-center items-center gap-10 my-2">
        {steps.map((step, index) =>
          currentStep === index ? (
            <React.Fragment key={index}>
              <div>
                {step.icon &&
                  React.cloneElement(step.icon, {
                    className:
                      currentStep === index ? "text-red-500" : "text-gray-500",
                  })}
                <h1 className="font-serif text-red-500">{step.label}</h1>
              </div>
              {index < steps.length - 1 && (
                <ChevronRightIcon size={34} className="opacity-20" />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>
              <div>
                {step.icon}
                <h1 className="font-serif">{step.label}</h1>
              </div>
              {index < steps.length - 1 && (
                <ChevronRightIcon size={34} className="opacity-20" />
              )}
            </React.Fragment>
          )
        )}
      </div>
      {currentStep === 0 && (
        <div className="flex-grow p-6 md:overflow-y-auto md:p-1 md:px-60">
          <div className="flex h-screen bg-slate-400">
            {/* <Form /> */}
            {/* <StepperDemo /> */}
            <div className="w-2/3 flex flex-col mt-3 border-r">
              <span className="block ml-12 text-center bg-slate-200 w-auto">
                Màn hình
              </span>
              <div className="flex ">
                <div className="table-cell mx-2 flex-col justify-center w-10 items-center">
                  {rows.map((row, index) => (
                    <Toggle
                      key={index}
                      className="bg-transparent  text-center border w-10 border-slate-300 my-2"
                      disabled
                    >
                      {row}
                    </Toggle>
                  ))}
                </div>
                <div className="flex flex-wrap">
                  {Ghes?.reduce((rows, ghe, index) => {
                    if (index % 10 === 0) {
                      rows.push([]);
                    }
                    rows[rows.length - 1].push(ghe);
                    return rows;
                  }, [] as GheType[][]).map((row, rowIndex) => (
                    <div key={rowIndex} className="flex w-full">
                      {row.map((ghe, index) => (
                        <div
                          key={index}
                          className="table-cell mx-2 flex-col justify-center w-10 items-center"
                        >
                          <Toggle
                            className={`bg-slate-200  data-[state=on]:bg-green-500  border-slate-300 text-center border w-10  my-2`}
                            onPressedChange={(pressed) => {
                              setNumTogglesOn((prevNumTogglesOn) => {
                                const newToggleStates = toggleStates.map(
                                  (row) => [...row]
                                );
                                newToggleStates[rowIndex][index] =
                                  !newToggleStates[rowIndex][index];
                                setToggleStates(newToggleStates);
                                let newNumTogglesOn = pressed
                                  ? prevNumTogglesOn + 1
                                  : prevNumTogglesOn - 1;
                                setSelectedGheIds((prevSelectedGheIds) => {
                                  if (pressed) {
                                    if (
                                      !prevSelectedGheIds.includes(ghe.idGhe)
                                    ) {
                                      return [...prevSelectedGheIds, ghe.idGhe];
                                    }
                                  } else {
                                    return prevSelectedGheIds.filter(
                                      (id) => id !== ghe.idGhe
                                    );
                                  }
                                  return prevSelectedGheIds;
                                });
                                return newNumTogglesOn;
                              });
                            }}
                            disabled={
                              reservedGheIds?.some(
                                (ve: VeType) => ve.ghe.idGhe === ghe.idGhe
                              ) ||
                              (numTogglesOn === 4 &&
                                toggleStates[rowIndex][index] === false)
                                ? true
                                : false
                            }
                            defaultPressed={toggleStates[rowIndex][index]}
                          >
                            {`${ghe.hangGhe}${ghe.soGhe}`}
                          </Toggle>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-1/3 flex-col mx-2 my-2 justify-center items-center">
              <Card className="w-full mb-2">
                <div className="p-4">
                  <p>{data?.phim.ten}</p>
                  <p className="font-bold">{data?.phong.rap.tenRap}</p>
                  <p>
                    Suất:
                    <strong>{`${
                      data?.gioBatDau.split("T")[1].split(".")[0]
                    } ${data?.ngayChieu
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}`}</strong>
                  </p>
                  <p>
                    Phòng chiếu: <strong>{data?.phong.tenPhong}</strong>
                  </p>
                </div>
              </Card>
              <Card className="w-full mb-6 p-6">
                <div className="flex flex-wrap items-center">
                  <div className="flex-grow flex-shrink flex-auto">
                    <h6 className="card-title text-uppercase mb-2 text-[#d9d9d9] font-bold text-lg">
                      Tổng đơn hàng
                    </h6>
                    <span className="h2 mb-0 ticketing-total-amount font-bold text-black text-lg">
                      {numTogglesOn * (data?.gia ?? 0)} đ
                    </span>
                  </div>
                </div>
              </Card>
              <Button onClick={prev} disabled={currentStep === 0}>
                Previous
              </Button>
              <Button
                onClick={next}
                disabled={
                  currentStep === steps.length - 1 || numTogglesOn === 0
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
      {currentStep === 1 && (
        <div className="flex-grow p-6 md:overflow-y-auto md:p-1 md:px-60">
          <div className="flex h-screen bg-[#f9fbfd]">
            <div className="w-2/3 flex flex-col mt-3 border-r leading-10 p-4">
              <div className="w-auto mb-2 p-4">
                <div className="my-3 text-left h-10 leading-10 ">
                  <p className=" bg-[#edf2f9] text-[#95aac9] ">
                    Tóm tắt đơn hàng
                  </p>
                </div>
                <div className="w-full block overflow-x-auto mb-14">
                  <table className="align-middle w-full border-collapse bg-white  border-gray-500 text-[#12263f]">
                    <thead>
                      <tr className="border-b-2 text-[#95aac9]">
                        <th className="text-left">Mô tả</th>
                        <th className="text-center">Số lượng</th>
                        <th className="text-right">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b-2">
                        <td>Standard</td>
                        <td className="text-center">{numTogglesOn}</td>
                        <td className="text-right">{ticketCost}đ</td>
                      </tr>
                      <tr className="border-b-2">
                        <td>Phí tiện ích</td>
                        <td className="text-center"></td>
                        <td className="text-right">{extraCost} đ</td>
                      </tr>
                      <tr className="border-b-2">
                        <td colSpan={2} className="text-left">
                          Tổng
                        </td>
                        <td className="text-right">{totalCost} đ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="my-3 text-left h-10 leading-10 ">
                  <p className=" bg-[#edf2f9] text-[#95aac9] ">
                    Hình thức thanh toán
                  </p>
                </div>
                <RadioGroup
                  onValueChange={(value: string) => {
                    setPaymentOption(value);
                  }}
                  defaultValue="Vnpay"
                >
                  <PaymentOption
                    value="Vnpay"
                    id="r1"
                    label="Vnpay"
                    Icon={Vnpay}
                  />
                  <PaymentOption
                    value="MoMo"
                    id="r2"
                    label="MoMo"
                    Icon={MoMo}
                  />
                </RadioGroup>
              </div>
            </div>
            <div className="w-1/3 flex-col mx-2 my-2 justify-center items-center">
              <Card className="w-full mb-6 p-6">
                <div className="flex flex-wrap items-center">
                  <div className="flex-grow flex-shrink flex-auto">
                    <h6 className="card-title text-uppercase mb-2 text-[#d9d9d9] font-bold text-lg">
                      Tổng đơn hàng
                    </h6>
                    <span className="h2 mb-0 ticketing-total-amount font-bold text-black text-lg">
                      {totalCost} đ
                    </span>
                  </div>
                  <div className="col text-right border-left ticketing-countdown-timer">
                    <h6 className="card-title text-uppercase text-[#d9d9d9] font-bold mb-2 text-lg">
                      Thời gian giữ ghế
                    </h6>
                    <Timer
                      ref={timerRef}
                      currentStep={currentStep}
                      initialSeconds={COUNTDOWN_AMOUNT_TOTAL}
                    />
                  </div>
                </div>
              </Card>
              <Card className="w-full mb-2 p-6">
                <div className="flex flex-wrap items-center">
                  <p>
                    Vé đã mua không thể đổi hoặc hoàn tiền. Mã vé sẽ được gửi 01
                    lần qua số điện thoại và email đã nhập. Vui lòng kiểm tra
                    lại thông tin trước khi tiếp tục.
                  </p>
                </div>
              </Card>
              <div className="flex flex-1 flex-grow items-center justify-around">
                <Button
                  onClick={handleSutmit}
                  disabled={currentStep === steps.length - 1}
                >
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
