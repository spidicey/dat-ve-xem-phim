"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative flex  flex-shrink-0 ">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-full  border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon onClick={e=>console.log(1)} className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
