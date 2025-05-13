import * as db from "./database.js";
import { fetchJson } from "../utils.js";

// db.getMovies();
// db.getGenres();
// db.getMovieGenres();
// db.getCinemas();
// db.getRooms();
// db.getSeats();
// db.getScreenings();
// db.getQualities();
// db.getScreeningQualities();
// db.getRoles();
// db.getUsers();
// db.getTickets();

// db.addMovie({
//     "title": "The Shawshank Redemption",
//     "poster_img": null,
//     "description": "Two imprisoned men form a deep friendship, finding solace and eventual redemption through acts of common decency.",
//     "age_rating": 18,
//     "is_team_pick": 1,
//     "score": "4.5"
// })

// await db.addScreening({
//   "movie_id": 1,
//   "cinema_id": 5,
//   "room_id": 3,
//   "start_date": "2025-10-15",
//   "start_time": "16:30:00",
//   "end_time": "18:30:00"
// })

const path = "http://localhost:5000/api/movies/1548" // change if DB backend is diff
try {
  const movie = await fetchJson(path ,{headers:{'X-Requested-By': 'backend-server'}})
  } catch (error) {
  console.error
}


process.exit(0)
