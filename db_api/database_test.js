import * as db from "./database.js";

db.getMovies();
db.getGenres();
db.getMovieGenres();
db.getCinemas();
db.getRooms();
db.getSeats();
db.getScreenings();
db.getQualities();
db.getScreeningQualities();
db.getRoles();
db.getUsers();
db.getTickets();

db.addMovie({
    "movie_id": 10,
    "title": "The Shawshank Redemption",
    "poster_img": null,
    "description": "Two imprisoned men form a deep friendship, finding solace and eventual redemption through acts of common decency.",
    "age_rating": 18,
    "is_team_pick": 1,
    "score": "4.5"
})