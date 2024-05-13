import styles from "@/components/dashboard/dashboard.module.css";
import Footer from "@/components/dashboard/footer/footer";
import Navbar from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname =  usePathname();
  // console.log(pathname);
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
