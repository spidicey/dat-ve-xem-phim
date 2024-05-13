"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-slate-400 p-5 rounded-lg bg-[var(--bgSoft)] flex items-center justify-between">
      <div className="text-[var(--textSoft)] font-bold capitalize">
        {pathname.split("/").pop()}
      </div>
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-2 bg-slate-700 p-2 rounded-lg text-white">
          <MdSearch />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none text-[var(--text)] outline-none"
          />
        </div>
        <div className="flex space-x-5">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
