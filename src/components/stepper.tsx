"use client";
import {ChevronRightIcon, CreditCard, Inbox, LayoutGridIcon, ShoppingBag,} from "lucide-react"; // replace with your actual icon library
import React, {useState} from "react";

type Step = {
  icon: React.ReactNode;
  label: string;
};

const steps: Step[] = [
  { icon: <LayoutGridIcon size={34} />, label: "Chọn ghế" },
  { icon: <ShoppingBag size={34} />, label: "Bắp nước" },
  { icon: <CreditCard size={34} />, label: "Thanh toán" },
  { icon: <Inbox size={34} />, label: "Thông tin vé" },
];

export default function HorizontalLinearStepper() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div>
            {step.icon}
            <h1 className="font-serif">{step.label}</h1>
          </div>
          {index < steps.length - 1 && (
            <ChevronRightIcon size={34} className="opacity-20" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
