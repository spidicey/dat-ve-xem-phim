import exp from "constants";
import z from "zod";
// export type Movie = {
//     adult: boolean;
//     backdrop_path: string;
//     id: number;
//     title: string;
//     original_language: string;
//     original_title: string;
//     overview: string;
//     poster_path: string;
//     media_type: string;
//     genres: any[];
//     popularity: number;
//     release_date: string;
//     video: boolean;
//     vote_average: number;
//     vote_count: number;
//     status: string;
//   };
export const Movie = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  id: z.number(),
  title: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  media_type: z.string(),
  genres: z.array(z.unknown()),
  popularity: z.number(),
  release_date: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  status: z.string(),
});

export const Showtime = z.object({
  id_cinema: z.number(),
  cinema_name: z.string(),
  address: z.string(),
  id_room: z.number(),
  sub: z.string(),
  day: z.string(),
  schedule_start: z.array(z.string()),
});

export type Showtime = z.infer<typeof Showtime>;

export type Movie = z.infer<typeof Movie>;
