USE cinephoria;
SHOW TABLES;

SELECT * FROM genres;
SELECT * FROM movies;
SELECT * FROM movie_genres;

SELECT * FROM cinemas;
SELECT * FROM rooms;
SELECT * FROM seats;

SELECT * FROM screenings;
SELECT * FROM qualities;
SELECT * FROM screening_qualities;

SELECT * FROM users;
SELECT * FROM roles;
SELECT * FROM tickets;



-- Creat Table to show all the cinemas and Thier respective rooms
SELECT cinemas.cinema_id,cinemas.cinema_name,room_id
 FROM cinemas 
JOIN rooms 
 ON cinemas.cinema_id = rooms.cinema_id;
 
 -- create Table with screen_id and all the QUALITIES in that screening in one line
SELECT screening_id, GROUP_CONCAT(quality_name SEPARATOR '; ') AS qualities FROM screening_qualities JOIN qualities 
ON screening_qualities.quality_id = qualities.quality_id
GROUP BY screening_id;

-- SHOW all seats for any screening
SELECT screening_id,seat_id, seat_number, screenings.room_id
FROM screenings 
JOIN rooms 
ON screenings.room_id = rooms.room_id
LEFT JOIN seats 
ON rooms.room_id = seats.room_id 
ORDER BY screening_id,screenings.room_id,seats.seat_id;

-- Check that all users picked seats that have the same number as thier ID.
SELECT users.user_id,users.user_name,tickets.ticket_id,seats.seat_id, seats.seat_number
FROM users LEFT JOIN tickets 
ON users.user_id = tickets.user_id
JOIN seats 
ON tickets.seat_id = seats.seat_id;

-- reading information stored in MYSQL
		SELECT column_name
        FROM information_schema.columns;

		SELECT *
        FROM information_schema.columns
                WHERE table_name = movies AND DATA_TYPE !='text';
        ORDER BY ordinal_position;