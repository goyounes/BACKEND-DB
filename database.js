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
"movies","genres","movie_genres"
,"cinemas","rooms","seats"
,"screenings","qualities","screening_qualities"
,"roles","users","tickets"
]
async function dbTableLogger(table_name,array){
    const [columns] = await pool.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = ?
        ORDER BY ordinal_position
        LIMIT 5;
    `,table_name);
    const colNames = columns.map(col => col.column_name);
    console.log(colNames)
    const logArray = array.map (a => Object.entries(a).filter( ([key]) => colNames.includes(key) ))
    // const logArray = array.map(a => Object.entries(a))

    console.table(logArray);
    console.log("\n   -------  \n")
    console.log(logArray)
}
export async function getTable(table_name){
    if (!allowedTables.includes(table_name)) { 
        throw new Error("Unauthorized table access.");
    }
    const result = await pool.query(`SELECT * FROM ${table_name}`);
    // console.log(table + " :",Object.values(result[0]));
    // console.log(result[0])
    dbTableLogger(table_name,result[0])

    return result[0]
}

export async function getMovies(){
    return await getTable("movies")
}

export async function getScreenings(){
    const result = await pool.query("SELECT * FROM screenings");
    console.log("Data sent for these Movies", result[0].map(a=>a.title))

    return result[0]
}
export async function getClearScreenings(){
    const result = await pool.query("SELECT * FROM screenings");
    console.log(result[0])
    return result[0]
}

// await pool.end()