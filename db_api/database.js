import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config({ path: './db_api/.env' })

const pool = mysql.createPool({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE,
    typeCast: function (field, next) {// mysql2 driver sends decimal type data as string, converted this to number
        if (field.type == "NEWDECIMAL") {
            var value = field.string();
            return (value === null) ? null : Number(value);
        }
        return next();
    }
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
export async function getTable(table_name){    
    if (!allowedTables.includes(table_name)) { 
        throw new Error("Unauthorized table access.");
    }
    const [result_rows] = await pool.query(`SELECT * FROM ${table_name}`);

    dbTableLogger(table_name,result_rows)
    return result_rows
}

export async function getTableRow(table_name,id){
    const [columns] = await pool.query(`
		SELECT column_name
        FROM information_schema.columns
        WHERE table_name = ? AND TABLE_SCHEMA = ?
        ORDER BY ordinal_position;
    `,[table_name,process.env.MYSQL_DATABASE])
    const name_for_id_column = columns[0].COLUMN_NAME
    const [selected_row] = await pool.query(`SELECT * FROM ${table_name} WHERE ${name_for_id_column} = ${id}`);
    // if (selected_row.length ===0){
    //     return null
    // }
    if (selected_row.length === 0) {
        const error = new Error(`Resource with ID ${id} not found`);
        error.status = 404;
        throw error;  // Throw the error with status 404
    }
    dbTableLogger(table_name,selected_row)
    return selected_row
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


export const getMovie = async(id) => getTableRow("movies",id)
export const getScreening = async(id) => getTableRow("screenings",id)
export const getCinema = async(id) => getTableRow("cinemas",id)

export const addMovie = async(movie) => addTableRow("movie")

export async function getClearScreenings(){
    const [result_rows] = await pool.query("SELECT * FROM screenings");
    console.log(result_rows)
    // need to add more stuff
    return result_rows
}

// await pool.end()