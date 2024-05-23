import { deleteUser } from "@/lib/actions";
import { fetchUsers } from "@/lib/data";
import Pagination from "@/components/dashboard/pagination/pagination";
import Search from "@/components/dashboard/search/search";
import styles from "@/components/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import { User, Kh } from "../../../../types";
const UsersPage = async ({ searchParams }: { searchParams: any }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  // const { count, users } = await fetchUsers(q, page);
  const khData: Kh[] = [
    {
      id_kh: 1,
      cccd: "123456789",
      ten: "John Doe",
      diachi: "123 Main St",
      gioitinh: "Male",
      account: {
        id_acc: 1,
        tk: "johndoe",
        mk: "password",
        email: "john.doe@example.com",
        role: "User",
      },
    },
    {
      id_kh: 2,
      cccd: "987654321",
      ten: "Jane Smith",
      diachi: "456 Elm St",
      gioitinh: "Female",
      account: {
        id_acc: 2,
        tk: "janesmith",
        mk: "password",
        email: "jane.smith@example.com",
        role: "Admin",
      },
    },
    // Add more Kh objects as needed
  ];
  const users: User[] = [
    {
      id: 1,
      img: "/path/to/image.jpg",
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      createdAt: new Date(),
      isAdmin: true,
      isActive: true,
      role: "Admin",
      action: "Edit",
    },
    {
      id: 2,
      img: "/path/to/image.jpg",
      name: "Jane Doe",
      username: "janedoe",
      email: "jane.doe@example.com",
      createdAt: new Date(),
      isAdmin: false,
      isActive: false,
      role: "User",
      action: "Edit",
    },
    // Add more users as needed
  ];
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
            <td>Name</td>
            <td>Email</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {khData.map((kh) => (
            <tr key={kh.id_kh}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={"/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {kh.ten}
                </div>
              </td>
              <td>{kh.account.email}</td>
              {/* <td>{user.createdAt?.toString().slice(4, 16)}</td> */}
              <td>
                <div className={styles.buttons}>
                  <Link href={`/admin/admins/${kh.id_kh}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={""}>
                    <input type="hidden" name="id" value={kh.id_kh} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
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
