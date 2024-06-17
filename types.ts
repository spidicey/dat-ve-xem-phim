import z from "zod";
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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "Zip is required"),
});

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

export const KhachHang = z.object({
  id_kh: z.number(),
  ten: z.string(),
  cccd: z.string(),
  diaChi: z.string().optional(),
  gioiTinh: z.string(),
  account: Account,
});
export const TheLoai = z.object({
  idTheLoai: z.number(),
  theLoai: z.string(),
});

export const Admin = z.object({
  id_admin: z.number(),
  ten: z.string(),
  cccd: z.string().min(9),
  gioiTinh: z.string(),
  account: Account,
});
export const Rap = z.object({
  idRap: z.number(),
  tenRap: z.string(),
  diaChi: z.string(),
});

export const Phong = z.object({
  idPhong: z.number(),
  tenPhong: z.string(),
  rap: Rap,
});
export const Ghe = z.object({
  idGhe: z.number(),
  loaiGhe: z.string(),
  phong: Phong, // Assuming Phong schema is already defined
  hangGhe: z.string(),
  soGhe: z.string(),
});
export const Phim = z.object({
  id: z.number(),
  anh: z.string(),
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
export const SuatChieu = z.object({
  idSuatChieu: z.number(),
  gioBatDau: z.string(),
  thoiLuong: z.number(),
  ngonNgu: z.string(),
  ngayChieu: z.string().transform((data) => {
    return data.split("T")[0];
  }),
  sub: z.string(),
  gia: z.number(),
  admin: Admin,
  phong: Phong,
  phim: Phim,
});
export const HoaDon = z.object({
  idHoaDon: z.number(),
  khachHang: KhachHang,
  ngayTao: z.string(),
});
export const Ve = z.object({
  idVe: z.number(),
  ghe: Ghe,
  suatChieu: SuatChieu,
  hoaDon: HoaDon,
});

export type PhimType = z.infer<typeof Phim>;
export type TheLoaiType = z.infer<typeof TheLoai>;
export type SuatChieuType = z.infer<typeof SuatChieu>;
export type GheType = z.infer<typeof Ghe>;
export type VeType = z.infer<typeof Ve>;
export type AdminType = z.infer<typeof Admin>;
export type RapType = z.infer<typeof Rap>;
export type HoaDonType = z.infer<typeof HoaDon>;
export type KhachHangType = z.infer<typeof KhachHang>;
export type User = z.infer<typeof User>;
export type Kh = z.infer<typeof Kh>;
export type Account = z.infer<typeof Account>;
export type Showtime = z.infer<typeof Showtime>;
export type Movie = z.infer<typeof Movie>;
