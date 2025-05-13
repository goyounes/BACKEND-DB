import mysql from "mysql2"
import dotenv from "dotenv"
import { throwError } from "../utils.js";
dotenv.config({ path: './db_api/.env' })

const pool = mysql.createPool({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
//type cast Canceled to stay consistent, handle data convertion at time of use/display IF NEEDED
    // typeCast: function (field, next) {// mysql2 driver sends decimal type data as string, converted this to number
    //     if (field.type == "NEWDECIMAL") {
    //         var value = field.string();
    //         return (value === null) ? null : Number(value);
    //     }
    //     return next();
    // }
}).promise()

// async function testConnection() {    try {        const connection = await pool.getConnection();        console.log("Connected to MySQL!");        connection.release();     } catch (error) {        console.error("Connection failed:", error);    }}
// testConnection();



async function dbTableLogger(table_name,array){
    const [columns] = await pool.query(`
		SELECT column_name
        FROM information_schema.columns
        WHERE table_name = ? AND DATA_TYPE !='text' AND TABLE_SCHEMA = ?
        ORDER BY ordinal_position;
    `,[table_name,process.env.MYSQL_DATABASE]);
    // removes columns that have long texts.
    const colToDisplay = columns.map(col => col.COLUMN_NAME); // has keys i want to display
    const logArray = array.map((obj) => {
        return Object.fromEntries(colToDisplay.map( (key) => [key,obj[key]] ))
    })
    console.table(logArray)
}
export async function getNameForIdColumn(table_name){    
    const [columns] = await pool.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = ? AND TABLE_SCHEMA = ?
        ORDER BY ordinal_position;
    `,[table_name,process.env.MYSQL_DATABASE])
    return columns[0].COLUMN_NAME
}

// Get Resources
const allowedTables = [
"movies","genres","movie_genres",                 "cinemas","rooms","seats",
"screenings","qualities","screening_qualities",   "roles","users","tickets"]

export async function getTable(table_name){    
    if (!allowedTables.includes(table_name)) throwError("Unauthorized table access.",400);

    const [result_rows] = await pool.query(`SELECT * FROM ${table_name};`);

    await dbTableLogger(table_name,result_rows)
    return result_rows
}

export const getMovies = async () => getTable("movies");
export const getGenres = async () => getTable("genres");
export const getMovieGenres = async () => getTable("movie_genres");
export const getCinemas = async () => getTable("cinemas");
export const getRooms = async () => getTable("rooms");
export const getSeats = async () => getTable("seats");
export const getScreenings = async () => getTable("screenings");
export const getQualities = async () => getTable("qualities");
export const getScreeningQualities = async () => getTable("screening_qualities");
export const getRoles = async () => getTable("roles");
export const getUsers = async () => getTable("users");
export const getTickets = async () => getTable("tickets");

// Get Resource
export async function getTableRow(table_name,id){
    const name_for_id_column = await getNameForIdColumn(table_name)

    const [result] = await pool.query(`SELECT * FROM ${table_name} WHERE ${name_for_id_column} = ${id};`);
    if (result.length === 0)     throwError(`Resource with ID ${id} not found`,404)

    await dbTableLogger(table_name,result)
    const selected_row = result[0]
    return selected_row
}

export const getMovie = async(id) => getTableRow("movies",id)
export const getScreening = async(id) => getTableRow("screenings",id)
export const getCinema = async(id) => getTableRow("cinemas",id)

// Add Resource
export async function addMovie(movie){
    const {title, poster_img, description, age_rating, is_team_pick, score} = movie
    const [result] = await pool.query(`
        INSERT INTO movies (title, poster_img, description, age_rating, is_team_pick, score) 
        VALUES (?,?,?,?,?,?);
    `,[title, poster_img, description, age_rating, is_team_pick, score])
    if (!result.insertId) return null //return null
    return await getTableRow('movies',result.insertId)
}

export async function addScreening(screening){
    const {movie_id,cinema_id,room_id,start_date,start_time,end_time} = screening
    const [result] = await pool.query(`
    INSERT INTO screenings(movie_id,cinema_id,room_id,start_date,start_time,end_time)
    VALUES (?,?,?,?,?,?);
    `,[movie_id, cinema_id, room_id, start_date, start_time, end_time])
    if (!result.insertId) return {}//console.log("Alert: no insertId was provided")   #1 How to handle this insert id missing case
    return await getTableRow('screenings',result.insertId)
}


// Update Resource -- Work in progress
export async function updateMovie(id,movie){
    const name_for_id_column = await getNameForIdColumn('movies')
    const movie_id = id
    const {title, poster_img, description, age_rating, is_team_pick, score} = movie //ignore movieObj.movie_id as you cannot chose / modify it
    
    const [result] = await pool.query(`
        UPDATE movies
        SET title = ?, poster_img = ?, description = ?, age_rating = ?, is_team_pick = ?, score = ?
        WHERE ${name_for_id_column} = ?;
    `,[title, poster_img, description, age_rating, is_team_pick, score, movie_id])
    if (result.affectedRows === 0 )   throwError("Movie not found for update",404)

    return await getTableRow('movies',movie_id)
}



// Delete Resource
export async function deleteTableRow(table_name,id){
    // const name_for_id_column = await getNameForIdColumn(table_name)
    // const result = await pool.query(`DELETE FROM ${table_name} WHERE ${name_for_id_column} = ${id};`);
    throwError("Delete operations are not supported as of now",501)
}
export const deleteMovie = async(id) => deleteTableRow("movies",id)