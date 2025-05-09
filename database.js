import mysql from "mysql2"

const pool = mysql.createPool({
    host : "127.0.0.1",
    user : "root",
    password : "",
    database : "cinephoria",
}).promise()

// async function testConnection() {    try {        const connection = await pool.getConnection();        console.log("Connected to MySQL!");        connection.release();     } catch (error) {        console.error("Connection failed:", error);    }}
// testConnection();

export async function getMovies(){
    const result = await pool.query("SELECT * FROM movies");
    const rows = result[0]
    console.log(rows)
    return rows
}

export async function getScreenings(){
    const result = await pool.query("SELECT * FROM screenings");
    const rows = result[0]
    console.log(rows)
    return rows
}

// await pool.end()