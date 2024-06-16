import Search from "@/components/dashboard/search/search";
import styles from "@/components/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import { Kh, User } from "../../../../types";
import { getSession } from "next-auth/react";
import { fetchUsers } from "@/lib/request";
import { Button } from "@/components/ui/button";

const UsersPage = async ({ searchParams }: { searchParams: any }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  // const session = await getSession();
  // const { count, users } = await fetchUsers(q, page);
  // console.log(session);
  const khachHang = await fetchUsers("");
  console.log(khachHang);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Gioi Tinh</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {khachHang.map((khachHang) => (
            <tr key={khachHang.id_kh}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={"/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {khachHang.ten}
                </div>
              </td>
              <td>{khachHang.cccd}</td>
              <td>{khachHang.gioiTinh}</td>
              {/* <td>{user.createdAt?.toString().slice(4, 16)}</td> */}
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${khachHang.id_kh}`}>
                    <Button className="bg-green-500">View</Button>
                  </Link>
                  {/* <form action={""}>
                    <input type="hidden" name="id" value={khachHang.id_kh} />
                    <Button className="bg-red-600">Delete</Button>
                  </form> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination count={count} /> */}
    </div>
  );
};

export default UsersPage;
