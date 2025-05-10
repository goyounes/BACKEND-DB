import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const pool = mysql.createPool({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE ,
}).promise()

// async function testConnection() {    try {        const connection = await pool.getConnection();        console.log("Connected to MySQL!");        connection.release();     } catch (error) {        console.error("Connection failed:", error);    }}
// testConnection();

const allowedTables = [
"movies","genres","movie_genres",                 "cinemas","rooms","seats",
"screenings","qualities","screening_qualities",   "roles","users","tickets"]

async function dbTableLogger(table_name,array){
    const [columns] = await pool.query(`
		SELECT column_name
        FROM information_schema.columns
        WHERE table_name = ? AND DATA_TYPE !='text'
        ORDER BY ordinal_position;
    `,[table_name]);
    // removes columns that have long texts.
    const colToDisplay = columns.map(col => col.COLUMN_NAME); // has keys i want to display
    const logArray = array.map((obj) => {
        return Object.fromEntries(colToDisplay.map( (key) => [key,obj[key]] ))
    })
    console.table(logArray)

}
export async function getTable(table_name){
    if (!allowedTables.includes(table_name)) { 
        throw new Error("Unauthorized table access.");
    }
    const [result] = await pool.query(`SELECT * FROM ${table_name}`);

    dbTableLogger(table_name,result)
    return result
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


export async function getClearScreenings(){
    const result = await pool.query("SELECT * FROM screenings");
    console.log(result[0])
    return result[0]
}

// await pool.end()