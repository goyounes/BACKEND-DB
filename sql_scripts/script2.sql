SELECT *,screenings.screening_id, movies.title FROM screenings
JOIN movies ON screenings.movie_id = movies.movie_id;



SELECT cinema_id,cinema_name FROM cinemas
WHERE NOT isDeleted;

USE cinephoria;

INSERT INTO movies (title,  description, age_rating, is_team_pick, score) 
VALUES ("hello","hello again ",25,TRUE,4.5);

INSERT INTO movies (movie_id,title,  description, age_rating, is_team_pick, score) 
VALUES
(5,'The Shawshank Redemption', 'Two imprisoned men form a deep friendship, finding solace and eventual redemption through acts of common decency.', 18, TRUE, 4.5);

