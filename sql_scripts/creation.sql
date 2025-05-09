-- DROP TABLE genre 
USE cinephoria;

CREATE TABLE genres (
    genre_id INT PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR(255) NOT NULL
);

INSERT INTO genres(genre_id,genre_name)
VALUES 
(1, "action"),
(2, "adventure"),
(3, "animation"), 
(4, "biography"),
(5, "comedy");

SELECT * FROM genres;
-- ---------------------------------------------------------------------------------------------------------------------------

CREATE TABLE movies (
    movie_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    -- length TIME,
    poster_img BLOB, 
    description TEXT,
    age_rating INT,
    is_team_pick BOOL,
    score DECIMAL(2,1)
);

INSERT INTO movies (title, poster_img, description, age_rating, is_team_pick, score) 
VALUES
('The Shawshank Redemption', NULL, 'Two imprisoned men form a deep friendship, finding solace and eventual redemption through acts of common decency.', 18, TRUE, 4.5),
('The Dark Knight', NULL, 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.', 13, TRUE, 3.7),
('Inception', NULL, 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.', 13, TRUE, 2.5),
('The Matrix', NULL, 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 13, TRUE, 1.5),
('The Godfather', NULL, 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 18, FALSE, 9.2),
('Pulp Fiction', NULL, 'The lives of two mob hitmen, a boxer, a gangster’s wife, and a pair of diner bandits intertwine in four tales of violence and redemption',18,FALSE,4.3);

SELECT * FROM movies;
-- ----------------------JOINING TABLE-----------------------------------------------------------------------------------------------------

CREATE TABLE movie_genres (
	movie_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE
);

INSERT INTO movie_genres(movie_id,genre_id)
VALUES 
(1,1),
(1,3),
(2,4),
(2,5),
(3,2),
(4,1),
(4,3),
(4,4),
(5,2),
(5,3),
(6,5),
(6,1);

SELECT * FROM movie_genres;

-- ---------------------------------------------------------------------------------------------------------------------------

CREATE TABLE cinemas (
    cinema_id INT PRIMARY KEY AUTO_INCREMENT,
    cinema_name VARCHAR(255) NOT NULL,
    cinema_location VARCHAR(255) NOT NULL,
    isDeleted BOOl DEFAULT FALSE
);

INSERT INTO cinemas(cinema_id,cinema_name,cinema_location,isDeleted)
VALUES 
(1,"Nantes","12 Rue de la Loire, 44000 Nantes",FALSE),
(2,"Bordeaux","33 Rue du Chai des Farines, 33800 Bordeaux",FALSE),
(3,"Paris","42 Rue de Rivoli, 75004 Paris",FALSE),
(4,"Toulouse","18 Rue du Languedoc, 31000 Toulouse",FALSE),
(5,"Lille","77 Rue Nationale, 59800 Lille",FALSE),
(6,"Charleroi","26 Rue Léon Bernus, 6000 Charleroi",FALSE),
(7,"Liège","59 Quai de la Batte, 4020 Liège",FALSE);

SELECT * FROM cinemas;
-- ---------------------------------------------------------------------------------------------------------------------------

CREATE TABLE rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_capacity VARCHAR(255) NOT NULL,
	cinema_id INT,
    FOREIGN KEY (cinema_id) REFERENCES cinemas(cinema_id)
);

INSERT INTO rooms(room_id,room_capacity,cinema_id)
VALUES 
(1,20,2),
(2,20,3),
(3,30,5),
(4,20,6),
(5,40,1),
(6,20,7),
(7,30,5),
(8,20,6),
(9,20,7),
(10,30,7);

SELECT * FROM rooms;
-- ---------------------------------------------------------------------------------------------------------------------------

CREATE TABLE seats (
    seat_id INT PRIMARY KEY AUTO_INCREMENT,
    seat_number INT NOT NULL,
	isReserved BOOL,
    isAccesible BOOL,
    room_id INT,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);

INSERT INTO seats(seat_id,seat_number,isReserved,isAccesible,room_id)
VALUES 
(1,1,FALSE,FALSE,1),
(2,2,FALSE,FALSE,1),
(3,3,FALSE,FALSE,1),
(4,4,FALSE,FALSE,1),
(5,5,FALSE,FALSE,1),
(6,6,FALSE,FALSE,1),
(7,7,FALSE,FALSE,1),
(8,8,FALSE,FALSE,1),
(9,9,FALSE,FALSE,1),
(10,10,FALSE,FALSE,1),
(11,11,FALSE,FALSE,1),
(12,12,FALSE,FALSE,1),
(13,13,FALSE,FALSE,1),
(14,14,FALSE,FALSE,1),
(15,15,FALSE,FALSE,1),
(16,16,FALSE,FALSE,1),
(17,17,FALSE,FALSE,1),
(18,18,FALSE,FALSE,1),
(19,19,FALSE,FALSE,1),
(20,20,FALSE,FALSE,1),
(21,1,FALSE,FALSE,2),
(22,2,FALSE,FALSE,2),
(23,3,FALSE,FALSE,2),
(24,4,FALSE,FALSE,2),
(25,5,FALSE,FALSE,2),
(26,6,FALSE,FALSE,2),
(27,7,FALSE,FALSE,2),
(28,8,FALSE,FALSE,2),
(29,9,FALSE,FALSE,2),
(30,10,FALSE,FALSE,2),
(31,11,FALSE,FALSE,2),
(32,12,FALSE,FALSE,2),
(33,13,FALSE,FALSE,2),
(34,14,FALSE,FALSE,2),
(35,15,FALSE,FALSE,2),
(36,16,FALSE,FALSE,2),
(37,17,FALSE,FALSE,2),
(38,18,FALSE,FALSE,2),
(39,19,FALSE,FALSE,2),
(40,20,FALSE,FALSE,2),
(41,1,FALSE,FALSE,3),
(42,2,FALSE,FALSE,3),
(43,3,FALSE,FALSE,3),
(44,4,FALSE,FALSE,3),
(45,5,FALSE,FALSE,3),
(46,6,FALSE,FALSE,3),
(47,7,FALSE,FALSE,3),
(48,8,FALSE,FALSE,3),
(49,9,FALSE,FALSE,3),
(50,10,FALSE,FALSE,3),
(51,11,FALSE,FALSE,3),
(52,12,FALSE,FALSE,3),
(53,13,FALSE,FALSE,3),
(54,14,FALSE,FALSE,3),
(55,15,FALSE,FALSE,3),
(56,16,FALSE,FALSE,3),
(57,17,FALSE,FALSE,3),
(58,18,FALSE,FALSE,3),
(59,19,FALSE,FALSE,3),
(60,20,FALSE,FALSE,3),
(61,21,FALSE,FALSE,3),
(62,22,FALSE,FALSE,3),
(63,23,FALSE,FALSE,3),
(64,24,FALSE,FALSE,3),
(65,25,FALSE,FALSE,3),
(66,26,FALSE,FALSE,3),
(67,27,FALSE,FALSE,3),
(68,28,FALSE,FALSE,3),
(69,29,FALSE,FALSE,3),
(70,30,FALSE,FALSE,3),
(71,1,FALSE,FALSE,4),
(72,2,FALSE,FALSE,4),
(73,3,FALSE,FALSE,4),
(74,4,FALSE,FALSE,4),
(75,5,FALSE,FALSE,4),
(76,6,FALSE,FALSE,4),
(77,7,FALSE,FALSE,4),
(78,8,FALSE,FALSE,4),
(79,9,FALSE,FALSE,4),
(80,10,FALSE,FALSE,4),
(81,11,FALSE,FALSE,4),
(82,12,FALSE,FALSE,4),
(83,13,FALSE,FALSE,4),
(84,14,FALSE,FALSE,4),
(85,15,FALSE,FALSE,4),
(86,16,FALSE,FALSE,4),
(87,17,FALSE,FALSE,4),
(88,18,FALSE,FALSE,4),
(89,19,FALSE,FALSE,4),
(90,20,FALSE,FALSE,4),
(91,1,FALSE,FALSE,5),
(92,2,FALSE,FALSE,5),
(93,3,FALSE,FALSE,5),
(94,4,FALSE,FALSE,5),
(95,5,FALSE,FALSE,5),
(96,6,FALSE,FALSE,5),
(97,7,FALSE,FALSE,5),
(98,8,FALSE,FALSE,5),
(99,9,FALSE,FALSE,5),
(100,10,FALSE,FALSE,5),
(101,11,FALSE,FALSE,5),
(102,12,FALSE,FALSE,5),
(103,13,FALSE,FALSE,5),
(104,14,FALSE,FALSE,5),
(105,15,FALSE,FALSE,5),
(106,16,FALSE,FALSE,5),
(107,17,FALSE,FALSE,5),
(108,18,FALSE,FALSE,5),
(109,19,FALSE,FALSE,5),
(110,20,FALSE,FALSE,5),
(111,21,FALSE,FALSE,5),
(112,22,FALSE,FALSE,5),
(113,23,FALSE,FALSE,5),
(114,24,FALSE,FALSE,5),
(115,25,FALSE,FALSE,5),
(116,26,FALSE,FALSE,5),
(117,27,FALSE,FALSE,5),
(118,28,FALSE,FALSE,5),
(119,29,FALSE,FALSE,5),
(120,30,FALSE,FALSE,5),
(121,31,FALSE,FALSE,5),
(122,32,FALSE,FALSE,5),
(123,33,FALSE,FALSE,5),
(124,34,FALSE,FALSE,5),
(125,35,FALSE,FALSE,5),
(126,36,FALSE,FALSE,5),
(127,37,FALSE,FALSE,5),
(128,38,FALSE,FALSE,5),
(129,39,FALSE,FALSE,5),
(130,40,FALSE,FALSE,5),
(131,1,FALSE,FALSE,6),
(132,2,FALSE,FALSE,6),
(133,3,FALSE,FALSE,6),
(134,4,FALSE,FALSE,6),
(135,5,FALSE,FALSE,6),
(136,6,FALSE,FALSE,6),
(137,7,FALSE,FALSE,6),
(138,8,FALSE,FALSE,6),
(139,9,FALSE,FALSE,6),
(140,10,FALSE,FALSE,6),
(141,11,FALSE,FALSE,6),
(142,12,FALSE,FALSE,6),
(143,13,FALSE,FALSE,6),
(144,14,FALSE,FALSE,6),
(145,15,FALSE,FALSE,6),
(146,16,FALSE,FALSE,6),
(147,17,FALSE,FALSE,6),
(148,18,FALSE,FALSE,6),
(149,19,FALSE,FALSE,6),
(150,20,FALSE,FALSE,6),
(151,1,FALSE,FALSE,7),
(152,2,FALSE,FALSE,7),
(153,3,FALSE,FALSE,7),
(154,4,FALSE,FALSE,7),
(155,5,FALSE,FALSE,7),
(156,6,FALSE,FALSE,7),
(157,7,FALSE,FALSE,7),
(158,8,FALSE,FALSE,7),
(159,9,FALSE,FALSE,7),
(160,10,FALSE,FALSE,7),
(161,11,FALSE,FALSE,7),
(162,12,FALSE,FALSE,7),
(163,13,FALSE,FALSE,7),
(164,14,FALSE,FALSE,7),
(165,15,FALSE,FALSE,7),
(166,16,FALSE,FALSE,7),
(167,17,FALSE,FALSE,7),
(168,18,FALSE,FALSE,7),
(169,19,FALSE,FALSE,7),
(170,20,FALSE,FALSE,7),
(171,21,FALSE,FALSE,7),
(172,22,FALSE,FALSE,7),
(173,23,FALSE,FALSE,7),
(174,24,FALSE,FALSE,7),
(175,25,FALSE,FALSE,7),
(176,26,FALSE,FALSE,7),
(177,27,FALSE,FALSE,7),
(178,28,FALSE,FALSE,7),
(179,29,FALSE,FALSE,7),
(180,30,FALSE,FALSE,7),
(181,1,FALSE,FALSE,8),
(182,2,FALSE,FALSE,8),
(183,3,FALSE,FALSE,8),
(184,4,FALSE,FALSE,8),
(185,5,FALSE,FALSE,8),
(186,6,FALSE,FALSE,8),
(187,7,FALSE,FALSE,8),
(188,8,FALSE,FALSE,8),
(189,9,FALSE,FALSE,8),
(190,10,FALSE,FALSE,8),
(191,11,FALSE,FALSE,8),
(192,12,FALSE,FALSE,8),
(193,13,FALSE,FALSE,8),
(194,14,FALSE,FALSE,8),
(195,15,FALSE,FALSE,8),
(196,16,FALSE,FALSE,8),
(197,17,FALSE,FALSE,8),
(198,18,FALSE,FALSE,8),
(199,19,FALSE,FALSE,8),
(200,20,FALSE,FALSE,8),
(201,1,FALSE,FALSE,9),
(202,2,FALSE,FALSE,9),
(203,3,FALSE,FALSE,9),
(204,4,FALSE,FALSE,9),
(205,5,FALSE,FALSE,9),
(206,6,FALSE,FALSE,9),
(207,7,FALSE,FALSE,9),
(208,8,FALSE,FALSE,9),
(209,9,FALSE,FALSE,9),
(210,10,FALSE,FALSE,9),
(211,11,FALSE,FALSE,9),
(212,12,FALSE,FALSE,9),
(213,13,FALSE,FALSE,9),
(214,14,FALSE,FALSE,9),
(215,15,FALSE,FALSE,9),
(216,16,FALSE,FALSE,9),
(217,17,FALSE,FALSE,9),
(218,18,FALSE,FALSE,9),
(219,19,FALSE,FALSE,9),
(220,20,FALSE,FALSE,9),
(221,1,FALSE,FALSE,10),
(222,2,FALSE,FALSE,10),
(223,3,FALSE,FALSE,10),
(224,4,FALSE,FALSE,10),
(225,5,FALSE,FALSE,10),
(226,6,FALSE,FALSE,10),
(227,7,FALSE,FALSE,10),
(228,8,FALSE,FALSE,10),
(229,9,FALSE,FALSE,10),
(230,10,FALSE,FALSE,10),
(231,11,FALSE,FALSE,10),
(232,12,FALSE,FALSE,10),
(233,13,FALSE,FALSE,10),
(234,14,FALSE,FALSE,10),
(235,15,FALSE,FALSE,10),
(236,16,FALSE,FALSE,10),
(237,17,FALSE,FALSE,10),
(238,18,FALSE,FALSE,10),
(239,19,FALSE,FALSE,10),
(240,20,FALSE,FALSE,10),
(241,21,FALSE,FALSE,10),
(242,22,FALSE,FALSE,10),
(243,23,FALSE,FALSE,10),
(244,24,FALSE,FALSE,10),
(245,25,FALSE,FALSE,10),
(246,26,FALSE,FALSE,10),
(247,27,FALSE,FALSE,10),
(248,28,FALSE,FALSE,10),
(249,29,FALSE,FALSE,10),
(250,30,FALSE,FALSE,10);

SELECT * FROM seats;
-- ---------------------------------------------------------------------------------------------------------------------------

CREATE TABLE screenings (
    screening_id INT PRIMARY KEY AUTO_INCREMENT,
	movie_id INT,
	cinema_id INT,
    room_id INT,
    start_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    FOREIGN KEY (cinema_id) REFERENCES cinemas(cinema_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);

INSERT INTO screenings(movie_id,cinema_id,room_id,start_date,start_time,end_time)
VALUES 
(1,1,5,"2025-10-15","15:30:00","17:30:00"),
(1,1,5,"2025-10-15","19:30:00","21:30:00"),
(1,2,1,"2025-10-15","15:30:00","17:30:00"),
(1,3,2,"2025-10-15","15:30:00","17:30:00"),
(1,5,3,"2025-10-16","16:30:00","18:30:00"),
(1,5,7,"2025-10-16","16:30:00","18:30:00"),
(2,6,4,"2025-11-10","15:30:00","17:00:00"),
(3,7,10,"2025-12-30","20:00:00","22:30:00");

SELECT * FROM screenings;

-- CREATE a trigger to make sure the cinema_id gets updated in case of any change of the rooms TABLE 

DELIMITER //
CREATE TRIGGER update_screenings_cinema_id
BEFORE UPDATE ON rooms
FOR EACH ROW
BEGIN
    IF NEW.cinema_id <> OLD.cinema_id THEN
        UPDATE screenings
        SET cinema_id = NEW.cinema_id
        WHERE room_id = NEW.room_id;
    END IF;
END;
DROP TRIGGER IF EXISTS update_screenings_cinema_id;
//
DELIMITER ;

-- ---------------------------------------------------------------------------------------------------------------------------

CREATE TABLE qualities (
    quality_id INT PRIMARY KEY AUTO_INCREMENT,
    quality_name VARCHAR(255) NOT NULL
);

INSERT INTO qualities(quality_id,quality_name)
VALUES 
(1, "4DX"),
(2, "3D"),
(3, "4K"), 
(4, "FHD");

SELECT * FROM qualities;
-- ----------------------JOINING TABLE 2-----------------------------------------------------------------------------------------------------

CREATE TABLE screening_qualities (
	screening_id INT NOT NULL,
    quality_id INT NOT NULL,
    PRIMARY KEY (screening_id, quality_id),
    FOREIGN KEY (screening_id) REFERENCES screenings(screening_id) ON DELETE CASCADE,
    FOREIGN KEY (quality_id) REFERENCES qualities(quality_id) ON DELETE CASCADE
);

INSERT INTO screening_qualities(screening_id,quality_id)
VALUES 
(1,3),
(1,1),
(2,3),
(2,1),
(3,3),
(3,2),
(4,3),
(4,1),
(4,2),
(5,3),
(6,3),
(7,2),
(8,4);


SELECT * FROM screening_qualities;

-- ----------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------Users side---------------------------------------------------------------------------------------------------

CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(255) NOT NULL
);

INSERT INTO roles(role_id,role_name)
VALUES 
(1, "visitor"),
(2, "user"),
(3, "employee"), 
(4, "admin");

SELECT * FROM roles;
-- ---------------------------------------------------------------------------------------------------------------------------

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

INSERT INTO users(user_name,user_email,user_password,first_name,last_name,role_id)
VALUES 
("bbraney0","bbraney0@tinyurl.com","wG0@3l?E","Bernard","Braney",2),
("ffolonin1","ffolonin1@ucla.edu","yC0~tBzc&(vu(","Fletch","Folonin",2),
("rkinnier2","rkinnier2@thetimes.co.uk","sQ5\H4D&Vq","Raynor","Kinnier",3),
("bmongin3","bmongin3@seesaa.net","jV5}O~lyv1hC","Butch","Mongin",4),
("phaglinton4","phaglinton4@acquirethisname.com","nS8?gJ=A8G*0","Pamelina","Haglinton",2),
("mshambroke5","mshambroke5@lulu.com","kT4*7x3?Tr","Miner","Shambroke",2),
("dmundford6","dmundford6@java.com","pI5{L8KN>*1`","Denis","Mundford",2),
("gkelinge7","gkelinge7@cmu.edu","gX9}P#%~h3","Guthrie","Kelinge",2),
("hyanyushkin8","hyanyushkin8@sciencedaily.com","mC9,4%R7=0hc","Hamlin","Yanyushkin",2),
("smessiter9","smessiter9@marketwatch.com","hX3'qMU_%XKLBg&","Sydney","Messiter",2),
("cburrena","cburrena@yahoo.com","oA4!$NV6bk/>e'K6","Clement","Burren",3),
("hvaneschib","hvaneschib@google.co.jp","hN6%+>~LC5XYamg","Heywood","Vaneschi",4),
("fdavallc","fdavallc@networksolutions.com","lN8<A$82lbmx0NRc","Faye","Davall",2),
("lleadstond","lleadstond@ning.com","uP5~?@yU`!j","Lenore","Leadston",4),
("jfleischmanne","jfleischmanne@globo.com","pZ1?4d<5+","June","Fleischmann",2);


SELECT * FROM users;
-- ---------------------------------------------------------------------------------------------------------------------------

CREATE TABLE tickets (
    ticket_id INT PRIMARY KEY AUTO_INCREMENT,
	screening_id INT,
	user_id INT,
    seat_id INT,
	QR_code BLOB,
    FOREIGN KEY (screening_id) REFERENCES screenings(screening_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (seat_id) REFERENCES seats(seat_id)
);

INSERT INTO tickets(screening_id,user_id,seat_id)
VALUES 
(1,1,91),
(1,2,92),
(2,6,96),
(2,7,97),
(3,15,15),
(7,10,80),
(7,13,83),
(8,14,234),
(8,15,235);


SELECT * FROM tickets;

