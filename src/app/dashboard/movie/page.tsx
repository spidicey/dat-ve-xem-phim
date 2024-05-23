import React from "react";
import Search from "@/components/dashboard/search/search";
import styles from "@/components/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import { User, Kh, Movie } from "../../../../types";
import { fetchTrendingMovies } from "@/lib/request";
import { m } from "framer-motion";
export default async function Page() {
  const movies: Movie[] = await fetchTrendingMovies(1);
  const IMG_BASE_URL: String | undefined =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/admin/movie/add">
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
          {movies.map((movie: Movie) => (
            <tr key={movie.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={`${IMG_BASE_URL}` + movie.poster_path}
                    alt="poster"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="text-white">{movie.title}</div>
              </td>
              <td>{movie.overview}</td>
              {/* <td>{user.createdAt?.toString().slice(4, 16)}</td> */}
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/movie/${movie.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={""}>
                    <input type="hidden" name="id" value={movie.id} />
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
}
