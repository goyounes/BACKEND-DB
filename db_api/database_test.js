import * as db from "./database.js";

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
// await db.getUsers();
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
// await db.getRecentMovies()
// await db.getRoomsInCinema(1)
// await db.getAllRoomsInCinemas(1)
// await db.getCheckoutInfo(5)

// await db.CheckPassword(19,"123456789")
// console.log(
//     await db.CheckPassword(await db.getUserIdByEmail("Younqfsfqsr.Ing@gmail.com")   ,   "123456789")
// )

await db.getAvailbleSeats(7)

process.exit(0)
