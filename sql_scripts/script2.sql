SELECT *,screenings.screening_id, movies.title FROM screenings
JOIN movies ON screenings.movie_id = movies.movie_id;



SELECT cinema_id,cinema_name FROM cinemas
WHERE NOT isDeleted;

