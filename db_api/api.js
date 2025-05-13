import express from "express"
import cors from "cors"
import { throwError } from "../utils.js"
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
    if (isNaN(Number(id))) throwError("ID is not a number, update operation failed",400) //Checks if id is a number/string of a number
    
    console.log(`Fetching Movie with id :${id} from the DB...`)
    try {
        const movie = await dbFunc.getMovie(id);
        console.log("did we enter here?")
        console.log(movie)
        res.status(200).json(movie);
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})
app.post("/api/movies",async (req,res,next) => {
    const movie = req.body
    if (!title)  throwError("Title is required and must be a string",400)
    // MORE validation code has to be inserted here eventually, erros have to be returned at the same time.

    console.log(`Adding Movie with title: ${req.body.title} to the DB...`)
    try {
        const db_inserted_movie = await dbFunc.addMovie(movie);
        if (db_inserted_movie===null) res.sendStatus(204)      //Request succesful but no body or data to return 
        res.status(201).json(db_inserted_movie);
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})
app.put("/api/movies/:id",async (req,res,next) => {
    const id = req.params.id
    if (isNaN(Number(id)))   throwError("ID is not a number, update operation failed",400)   //Checks if id is a number/string of a number
    
    console.log(`Updating Movie with id :${id} from the DB...`)
    try {
        const movie = req.body
        const db_updated_movie = await dbFunc.updateMovie(id,movie); 
        res.status(200).json(db_updated_movie);
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})
// #2 How to handle soft deletes vs hard deletes, What about movies? users? seats?
// #3 i think good buisness practise for (Auditing,customer data analysis) it's intersting to always soft delete everything that's important
app.delete("/api/movies/:id",async (req,res,next) => {
    const id = req.params.id
    console.log(`Deleting Movie with id :${id} from the DB...`)
    try {
        const movie = await dbFunc.deleteMovie(id);
        res.status(200).json(movie);
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
    if (isNaN(Number(id))) throwError("ID is not a number, update operation failed",400) //Checks if id is a number/string of a number
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

  // Default error handling structure
  const status = err.status || 500;
  const code = err.code || "INTERNAL_API_ERROR";
  const message = err.message || "Something broke in the API server !";

  res.status(status).json({
    error: {message, status, code, details: err.details || null},
  });
});

app.listen(PORT,() => {
    console.log("The server is listening on port ",PORT)
})
