import express from "express"
import cors from "cors"
const app = express();

import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.DB_SERVER_PORT;

import { reqIPlogger} from "../utils.js"
app.use(cors(), reqIPlogger);

import { getMovies ,getScreenings} from "./database.js";
// app.use(express.static("public"));

app.get("/api/movies",async (req,res) => {
    console.log("Fetching Movies from the DB...")
    const movies = await getMovies()
    res.status(200).json(movies)
})

app.get("/api/screenings",async(req,res) => {
    console.log("Fetching Screenings from the DB...")
    const screenings = await getScreenings()
    res.status(200).json(screenings)
})

app.listen(PORT,() => {
    console.log("The server is listening on port ",PORT)
})
