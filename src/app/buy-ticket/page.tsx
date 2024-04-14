"use client";
import {
  LayoutGridIcon,
  ShoppingBag,
  CreditCard,
  Inbox,
  ChevronRightIcon,
} from "lucide-react";
import Form from "@/components/form";
import StepperDemo from "@/components/stepper-demo";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";
import { set } from "zod";
type Step = {
  icon: React.ReactNode | any;
  label: string;
};
const steps: Step[] = [
  { icon: <LayoutGridIcon size={34} />, label: "Chọn ghế" },
  { icon: <ShoppingBag size={34} />, label: "Bắp nước" },
  { icon: <CreditCard size={34} />, label: "Thanh toán" },
  { icon: <Inbox size={34} />, label: "Thông tin vé" },
];
const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const cols = [1, 2, 3, 4, 5, 6, 7, 8];
export default function Page() {
  const [numTogglesOn, setNumTogglesOn] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [toggleStates, setToggleStates] = useState(
    Array(rows.length * cols.length).fill(false)
  );

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
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 md:px-96">
        <div className="flex justify-between items-center">
          {steps.map((step, index) =>
            currentStep === index ? (
              <React.Fragment key={index}>
                <div>
                  {step.icon &&
                    React.cloneElement(step.icon, {
                      className:
                        currentStep === index
                          ? "text-red-500"
                          : "text-gray-500",
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
        <div className="flex h-screen">
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
                    className="bg-slate-200 text-center border w-10 border-slate-300 my-2"
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
          <div className="w-1/3 flex-col mr-8 justify-center items-center">
            <div>{numTogglesOn}</div>
            <Button onClick={prev} disabled={currentStep === 0}>
              Previ
            </Button>
            <Button onClick={next} disabled={currentStep === steps.length - 1}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
