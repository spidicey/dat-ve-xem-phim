import Search from "@/components/dashboard/search/search";
import styles from "@/components/dashboard/users/users.module.css";
import { fetchAdmins, fetchPhim } from "@/lib/request";
import Image from "next/image";
import Link from "next/link";
import { PhimType } from "../../../../types";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const phim: PhimType[] = await fetchPhim();

  // console.log(phim);
  const IMG_BASE_URL: String | undefined =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* <Search placeholder="Search for a user..." /> */}
        <Link href="/dashboard/movie/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Tên</td>
            <td>Mô tả</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {phim.map((movie: PhimType) => (
            <tr key={movie.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={movie.anh}
                    alt="poster"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="text-white">{movie.ten}</div>
              </td>
              <td>{movie.moTa}</td>
              {/* <td>{user.createdAt?.toString().slice(4, 16)}</td> */}
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/movie/${movie.id}`}>
                    <Button className="bg-green-500">View</Button>
                  </Link>
                  {/* <form action={""}>
                    <input type="hidden" name="id" value={movie.id} />
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
}
