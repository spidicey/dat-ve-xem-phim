import { usePathname } from "next/navigation";
import { Movie } from "../../../../types";
import MovieNav from "@/components/movie-nav";
import fetchMovieDetails, { fetchGenres } from "@/lib/request";
import MovieComponent from "@/components/movie";
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: number;
  };
}) {
  // const pathname =  usePathname();
  // console.log(pathname);
  const movie = await fetchMovieDetails(params.id);
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 md:px-96 ">
        {/* <div></div> */}
        <MovieComponent movie={movie} />
        <MovieNav />
        {children}
      </div>
    </div>
  );
}
