import styles from "@/components/dashboard/dashboard.module.css";
import Navbar from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import Header from "@/components/main-nav";
import Unauthorized from "@/components/unauthorize";
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
