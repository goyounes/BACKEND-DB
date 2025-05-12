import express from "express"
import cors from "cors"
const app = express();

import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.DB_SERVER_PORT;

import { reqIPlogger} from "../utils.js"
app.use(cors(), reqIPlogger,express.json());


import * as dbFunc from "./database.js";
// app.use(express.static("public"));

app.get("/api/movies",async (req,res) => {
    console.log("Fetching Movies from the DB...")
    const movies = await dbFunc.getMovies()
    res.status(200).json(movies)
})

app.get("/api/movies/:id",async (req,res,next) => {
    const id = req.params.id
    console.log(`Fetching Movie with id :${id} from the DB...`)
    try {
        const movie = await dbFunc.getMovie(id);
        res.status(200).json(movie);
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})

app.post("/api/movies",async (req,res,next) => {
    console.log(`adding Movie with title: ${req.body.title} from the DB...`)
    const {title, poster_img, description, age_rating, is_team_pick, score} = req.body
    if (!title ){
        res.status(400).json({ error: 'Title is required and must be a string' });
    }
    // validation code has to be inserted here eventually 
    const movie = {
		title: title,
		poster_img: poster_img || null,
		description: description || null,
		age_rating: age_rating || null,
		is_team_pick: is_team_pick || null,
		score: score || null
    }
    try {
        const db_inserted_movie = await dbFunc.addMovie(movie);
        res.status(201).json(db_inserted_movie);
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})

app.get("/api/screenings",async(req,res) => {
    console.log("Fetching Screenings from the DB...")
    const screenings = await dbFunc.getScreenings()
    res.status(200).json(screenings)
})

app.get("/api/screenings/:id",async (req,res,next) => {
    const id = req.params.id
    console.log(`Fetching Screening with id :${id} from the DB...`)
    try {
    const screening = await dbFunc.getScreening(id)
    res.status(200).json(screening)
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})

app.get("/api/cinemas",async(req,res) => {
    console.log("Fetching Cinemas from the DB...")
    const cinemas = await dbFunc.getCinemas()
    res.status(200).json(cinemas)
})

app.get("/api/cinema/:id",async (req,res) => {
    const id = req.params.id
    console.log("Fetching cinema with id :"+ id +" from the DB...")
    const cinema = await dbFunc.getCinema(id)
    res.status(200).json(cinema)
})


app.use((err, req, res, next) => {
  console.log("API: Middleware logging error stack ...")
  console.error(err.stack); // Log the stack trace
  res.status(err.status || 500).send(err.message || "Something broke in the API server !");
});

app.listen(PORT,() => {
    console.log("The server is listening on port ",PORT)
})
