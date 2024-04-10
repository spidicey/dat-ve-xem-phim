const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "dat_ve_xem_phim",
  password: "12345",
  port: 5432,
});

const data = fs.readFileSync(path.resolve("phim.json"), "utf-8");
const movies = JSON.parse(data);
// console.log(movies);
// const insertMovies = async () => {
//   for (const movie of movies) {
//     const { id, poster_path, title, original_language,release_date,status,runtime,overview,adult} = movie;
//     console.log(id, poster_path, title, original_language,release_date,status,runtime,overview,adult);
//     await pool.query(
//       "insert into phim (idphim, anh, ten, quocgia, namphathanh, trangthai, thoiluong, mota, dotuoi, id_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
//       [id, poster_path, title, original_language,release_date,status,runtime,overview,adult,1]
//     );
//   }
// };


const insertGenresDetails = async () => {
  for (const movie of movies) {
    const { id, genres} = movie;

    for (const genre of genres){
      console.log(id, genre);
      await pool.query(
        "insert into ct_theloai (idtheloai, idphim) values ($1,$2);",
        [genre.id,id]
      );
    }
    
  }
};
insertGenresDetails()
// insertMovies()
