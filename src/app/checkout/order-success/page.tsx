import { Card } from '@/components/ui/card'
import React from 'react'
import { Success } from '@/components/logo';
export default function Page() {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-slate-600">
    <div className="flex flex-grow items-center flex-col p-6 md:overflow-y-auto md:p-12 md:px-96 ">
      <Card className="p-16 w-">
        <div className="flex flex-col items-center gap-5 p-10">
          <Success />
          <h1 className="text-2xl font-bold">Đặt vé thành công</h1>
          <p className="text-lg">Quý khác đã thanh toán thành công 1.000.000 cho dịch vụ mua vé</p> 
        </div>
      </Card>
    </div>
  </div>
  )
}
