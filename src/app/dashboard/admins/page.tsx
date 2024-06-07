// "use client";
import Search from "@/components/dashboard/search/search";
import styles from "@/components/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import { Kh, User } from "../../../../types";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import useSWR from "swr";
import { fetchAdmins } from "@/lib/request";
import { Button } from "@/components/ui/button";

const UsersPage = async ({ searchParams }: { searchParams: any }) => {
  // const { data: session } = useSession();
  const session = await getSession();

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  // const { count, users } = await fetchUsers(q, page);
  // @ts-ignore
  const admins = await fetchAdmins(session?.user?.accessToken);
  console.log(admins);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/admins/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Ten</td>
            <td>cccd</td>
            <td>Gioi Tinh</td>
            <td>action</td>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id_admin}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={"/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {admin.ten}
                </div>
              </td>
              <td>{admin.cccd}</td>
              <td>{admin.gioiTinh}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/admins/${admin.id_admin}`}>
                    <Button className="bg-green-500">View</Button>
                  </Link>
                  <form action={""}>
                    <input type="hidden" name="id" value={admin.id_admin} />
                    <Button className="bg-red-600">Delete</Button>
                  </form>
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
