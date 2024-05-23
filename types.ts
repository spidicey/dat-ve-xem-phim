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
  film_name: z.string(),
  address: z.string(),
  id_room: z.number(),
  sub: z.string(),
  day: z.string(),
  schedule_start: z.array(z.string()),
});

export const FormDataSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required')
})


export const Account = z.object({
  id_acc: z.number(),
  tk: z.string(),
  mk: z.string(),
  email: z.string(),
  role: z.string(),
});

export const Kh = z.object({
  id_kh: z.number(),
  cccd: z.string(),
  ten: z.string(),
  diachi: z.string(),
  gioitinh: z.string(),
  account: Account,
});

export const User = z.object({
  id: z.number(),
  img: z.string().optional(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  createdAt: z.date(),
  isAdmin: z.boolean(),
  isActive: z.boolean(),
  role: z.string(),
  action: z.string(),
});


export const TheLoai = z.object({
  idTheLoai: z.number(),
  theLoai: z.string(),
});

export const Admin = z.object({
  id_admin: z.number(),
  ten: z.string(),
  cccd: z.string(),
  gioiTinh: z.string(),
  account: Account,
});

export const Phim = z.object({
  id: z.number(),
  anh: z.string().optional(),
  ten: z.string(),
  quocGia: z.string().optional(),
  namPhatHanh: z.date().optional(),
  trangThai: z.string().optional(),
  thoiLuong: z.number(),
  moTa: z.string(),
  doTuoi: z.boolean(),
  admin: Admin,
  theLoais: z.array(TheLoai),
});

export type PhimType = z.infer<typeof Phim>;
export type TheLoaiType = z.infer<typeof TheLoai>;
export type User = z.infer<typeof User>;
export type Kh = z.infer<typeof Kh>;
export type Account = z.infer<typeof Account>;
export type Showtime = z.infer<typeof Showtime>;
export type Movie = z.infer<typeof Movie>;
