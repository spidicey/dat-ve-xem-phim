"use client";
import {
  LayoutGridIcon,
  ShoppingBag,
  CreditCard,
  Inbox,
  ChevronRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Card } from "@/components/ui/card";
import { Showtime } from "../../../types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MoMo, Vnpay } from "@/components/logo";
import PaymentOption from "@/components/payment-option";
import Timer from "@/components/timer";
import { getVNpayLink } from "@/lib/request";
import { useRouter } from 'next/navigation'
type Step = {
  icon: React.ReactNode | any;
  label: string;
};
type OrderInfo = {
  amount: number;
  orderInfo: string;
}

const steps: Step[] = [
  { icon: <LayoutGridIcon size={34} />, label: "Chọn ghế" },
  // { icon: <ShoppingBag size={34} />, label: "Bắp nước" },
  { icon: <CreditCard size={34} />, label: "Thanh toán" },
  { icon: <Inbox size={34} />, label: "Thông tin vé" },
];
const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const cols = [1, 2, 3, 4, 5, 6, 7, 8];
const showtime: Showtime = {
  id_cinema: 1,
  cinema_name: "DCINE Bến Thành",
  film_name: "The Batman",
  address: "Số 6, Mạc Đĩnh Chi, Q.1, Tp. Hồ Chí Minh",
  id_room: 1,
  sub: "2D Phụ Đề Việt",
  schedule_start: ["2:45", "3:45", "4:45", "23:45", "1:45", "5:45"],
  day: "14/04/2024",
};
// 5 minutes for timer

export default function Page() {
  let timeout: NodeJS.Timeout;
  const COUNTDOWN_AMOUNT_TOTAL = 5 * 60;
  const timerRef = useRef<HTMLDivElement>(null);
  const [numTogglesOn, setNumTogglesOn] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [toggleStates, setToggleStates] = useState(
    Array(rows.length * cols.length).fill(false)
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
  const router = useRouter()
  const handleSutmit = async () => {
    try {
      const VNPayLink = await getVNpayLink({amount:numTogglesOn*50000,orderInfo:"asd"});
      router.push(VNPayLink)
      console.log(VNPayLink);
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
                <div className="flex ">
                  {cols.map((col, index) => (
                    <div
                      key={index}
                      className="table-cell mx-2 flex-col justify-center w-10 items-center"
                    >
                      {rows.map((row, index) => (
                        <Toggle
                          key={index}
                          className={`bg-slate-200  data-[state=on]:bg-green-500  border-slate-300 text-center border w-10  my-2`}
                          onPressedChange={(pressed) => {
                            setNumTogglesOn((prevNumTogglesOn) => {
                              const newToggleStates = [...toggleStates];
                              newToggleStates[
                                rows.indexOf(row) * cols.length + col - 1
                              ] =
                                !newToggleStates[
                                  rows.indexOf(row) * cols.length + col - 1
                                ];
                              setToggleStates(newToggleStates);
                              let newNumTogglesOn = pressed
                                ? prevNumTogglesOn + 1
                                : prevNumTogglesOn - 1;

                              return newNumTogglesOn;
                            });
                          }}
                          disabled={
                            numTogglesOn === 4 &&
                            toggleStates[
                              rows.indexOf(row) * cols.length + col - 1
                            ] === false
                              ? true
                              : false
                          }
                          defaultPressed={
                            toggleStates[
                              rows.indexOf(row) * cols.length + col - 1
                            ]
                          }
                        >
                          {`${row}${col}`}
                        </Toggle>
                        // </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-1/3 flex-col mx-2 my-2 justify-center items-center">
              <Card className="w-full mb-2">
                <div className="p-4">
                  <p>{showtime.film_name}</p>
                  <p className="font-bold">{showtime.cinema_name}</p>
                  <p>
                    Suất:
                    <strong>{`${showtime.schedule_start[0]} ${showtime.day}`}</strong>
                  </p>
                  <p>
                    Phòng chiếu: <strong>{showtime.id_room}</strong>
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
                      {numTogglesOn * 50000} đ
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
                        <td className="text-center">1</td>
                        <td className="text-right">95,000 đ</td>
                      </tr>
                      <tr className="border-b-2">
                        <td>Phí tiện ích</td>
                        <td className="text-center"></td>
                        <td className="text-right">5,000 đ</td>
                      </tr>
                      <tr className="border-b-2">
                        <td colSpan={2} className="text-left">
                          Tổng
                        </td>
                        <td className="text-right">100,000 đ</td>
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
                      100,000 đ
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