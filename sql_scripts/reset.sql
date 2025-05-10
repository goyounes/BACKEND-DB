USE cinephoria;

DROP TABLE movie_genres;
DROP TABLE screening_qualities;
DROP TABLE tickets; 
DROP TABLE screenings;

DROP TABLE genres;
DROP TABLE movies;
DROP TABLE qualities;
DROP TABLE users;
DROP TABLE roles;
DROP TABLE seats;
DROP TABLE rooms;
DROP TABLE cinemas;
SHOW TABLES;

SELECT * from information_schema;

        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'movies'
        ORDER BY ordinal_position
        LIMIT 2;
        
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE table_name = 'movies';
  
          SELECT column_name,DATA_TYPE
        FROM information_schema.columns
        WHERE table_name = "movies"
        ORDER BY ordinal_position
        LIMIT 5;