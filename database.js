import mysql from "mysql2"

const pool = mysql.createPool({
    host : "127.0.0.1",
    user : "root",
    password : "",
    database : "cinephoria",
}).promise()

// async function testConnection() {    try {        const connection = await pool.getConnection();        console.log("Connected to MySQL!");        connection.release();     } catch (error) {        console.error("Connection failed:", error);    }}
// testConnection();

const result = await pool.query("SELECT * FROM genre");
const rows = result[0]
console.log(rows)
await pool.end()