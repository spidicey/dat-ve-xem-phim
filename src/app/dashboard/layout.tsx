"use client";
import styles from "@/components/dashboard/dashboard.module.css";
import Navbar from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import {useSession} from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  // if (!session) {
  //   return <div>Unauthorized</div>;
  // }
  return (
    <div className="flex bg-slate-500">
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
