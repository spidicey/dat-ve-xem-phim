import React from "react";
import DateButton from "../../../../components/DateButton";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: number;
  };
}) {
  return (
    <div>
      <div className="flex">
        <DateButton />
      </div>
      {children}
    </div>
  );
}
