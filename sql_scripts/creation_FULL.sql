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
(5, "comedy"),
(6, "crime"),
(7, "cult movie"),
(8, "disney"),
(9, "documentary"),
(10, "drama"),
(11, "family"),
(12, "fantasy"),
(13, "film-noir"),
(14, "gangster"),
(15, "history"),
(16, "horror"),
(17, "military"),
(18, "music"),
(19, "musical"),
(20, "mystery"),
(21, "nature"),
(22, "neo-noir"),
(23, "period"),
(24, "pixar"),
(25, "road movie"),
(26, "romance"),
(27, "sci-fi"),
(28, "short"),
(29, "spy"),
(30, "super hero"),
(31, "thriller"),
(32, "visually stunning"),
(33, "war"),
(34, "western");
