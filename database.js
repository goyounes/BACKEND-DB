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

export async function getMovies(){
    const result = await pool.query("SELECT * FROM movies");
    console.log(result[0])
    return result[0]
}

export async function getScreenings(){
    const result = await pool.query("SELECT * FROM screenings");
    console.log(result[0])
    return result[0]
}
export async function getClearScreenings(){
    const result = await pool.query("SELECT * FROM screenings");
    console.log(result[0])
    return result[0]
}

// await pool.end()