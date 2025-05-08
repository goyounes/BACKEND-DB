-- DROP TABLE genre 
USE cinephoria;

CREATE TABLE genre (
    genre_id integer PRIMARY KEY AUTO_INCREMENT,
    genre_title varchar(255) NOT NULL
);

INSERT INTO genre(genre_id,genre_title)
VALUES 
(1, "action"),
(2, "adventure"),
(3, "animation"),-- 
(4, "biography"),
(5, "comedy");

SELECT * FROM genre;
