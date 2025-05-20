import * as dbFunc from "./database.js";
import express from "express"
import { throwError, decodeBinaryToBase64, getImgDataAndImgStype, hashPassword } from "../utils.js"

const app = express();

import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.DB_SERVER_PORT;

import cors from "cors"
import {reqIPlogger} from "../utils.js"
app.use(cors(), reqIPlogger, express.json({ limit: '10mb' }) );

// ---------------------------------------------- Movies ----------------------------------------------
app.get("/api/v1/movies",async (req,res,next) => {
    console.log("Fetching Movies from the DB...")
    try {
        const movies = await dbFunc.getMovies()
        movies.forEach((movie) => {movie.poster_img = decodeBinaryToBase64(movie.poster_img)})
        res.status(200).json(movies)
    } catch (error) {
        next(error)  // Passes the error to the global error-handling middleware
    }
})

app.get("/api/v1/movies/recent",async (req,res,next) => {
    console.log("Fetching Movies from the DB...")
    try {
        const movies = await dbFunc.getRecentMovies()
        movies.forEach((movie) => {movie.poster_img = decodeBinaryToBase64(movie.poster_img)})
        res.status(200).json(movies)
    } catch (error) {
        next(error)  // Passes the error to the global error-handling middleware
    }
})

app.get("/api/v1/movies/:id",async (req,res,next) => {
    const id = req.params.id
    if (isNaN(Number(id))) throwError("ID is not a number, get operation failed",400) //Checks if id is a number/string of a number
    
    console.log(`Fetching Movie with id :${id} from the DB...`)
    try {
        const movie = await dbFunc.getMovie(id);
        movie.poster_img = decodeBinaryToBase64(movie.poster_img)
        res.status(200).json(movie);
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})
app.post("/api/v1/movies",async (req,res,next) => {
    const movie = req.body
    if (!movie.title)  throwError("Title is required and must be a string, create operation failed",400)
    // MORE validation code has to be inserted here eventually, erros have to be returned at the same time.
    // Post should be able to update all the fields, if an NotNULL field is missing, it shouldnt work.

    console.log(`Adding Movie with title: ${movie.title} to the DB...`)
    try {
        const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB in bytes 10 000 000
        [movie.poster_img,movie.poster_img_type] = getImgDataAndImgStype(movie.poster_img,movie.poster_img_type,MAX_SIZE_BYTES)

    // console.log(`Adding Movie with title: ${movie.title} to the DB...`);
    const db_inserted_movie = await dbFunc.addMovie(movie);
    if (db_inserted_movie === null) return res.sendStatus(204);
    db_inserted_movie.poster_img = decodeBinaryToBase64(db_inserted_movie.poster_img)
    res.status(201).json(db_inserted_movie);

  } catch (err) {
    next(err);
  }
})
app.put("/api/v1/movies/:id",async (req,res,next) => {
    const id = req.params.id
    if (isNaN(Number(id)))   throwError("ID is not a number, update operation failed",400)   //Checks if id is a number/string of a number
    const movie = req.body
    if (!movie.title)  throwError("Title is required and must be a string, create operation failed",400)
    
    console.log(`Updating Movie with id :${id} from the DB...`)
    try {
        const db_updated_movie = await dbFunc.updateMovie(id,movie); 
        res.status(200).json(db_updated_movie);
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})
// #2 How to handle soft deletes vs hard deletes, What about movies? users? seats?
// #3 i think good buisness practise for (Auditing,customer data analysis) it's intersting to always soft delete everything that's important
app.delete("/api/v1/movies/:id",async (req,res,next) => {
    const id = req.params.id
    console.log(`Deleting Movie with id :${id} from the DB...`)
    try {
        const movie = await dbFunc.deleteMovie(id);
        res.status(200).json(movie);
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})

// -------------------------------------------------------------------------------------------------------------------------
// -----------------------Screenings-----------------------Screnings-----------------------Screenings-----------------------
// -------------------------------------------------------------------------------------------------------------------------
app.get("/api/v1/screenings",async (req,res,next) => {
    const cinema_id = req.query.cinema_id || null;
    const movie_id = req.query.movie_id || null;
    console.log("Fetching Screenings from the DB...")
    cinema_id && console.log(cinema_id)
    movie_id && console.log(movie_id)
    try {
        const screenings = await dbFunc.getScreenings(cinema_id,movie_id)
        res.status(200).json(screenings)
    } catch (error) {
        next(error)  // Passes the error to the global error-handling middleware
    }
})
app.post("/api/v1/movies",async (req,res,next) => {
    const movie = req.body
    if (!movie.title)  throwError("Title is required and must be a string, create operation failed",400)
    // MORE validation code has to be inserted here eventually, erros have to be returned at the same time.
    // Post should be able to update all the fields, if an NotNULL field is missing, it shouldnt work.

    console.log(`Adding Movie with title: ${movie.title} to the DB...`)
    try {
        const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB in bytes 10 000 000
        [movie.poster_img,movie.poster_img_type] = getImgDataAndImgStype(movie.poster_img,movie.poster_img_type,MAX_SIZE_BYTES)

    // console.log(`Adding Movie with title: ${movie.title} to the DB...`);
    const db_inserted_movie = await dbFunc.addMovie(movie);
    if (db_inserted_movie === null) return res.sendStatus(204);
    db_inserted_movie.poster_img = decodeBinaryToBase64(db_inserted_movie.poster_img)
    res.status(201).json(db_inserted_movie);

  } catch (err) {
    next(err);
  }
})

app.get("/api/v1/screenings/:id",async (req,res,next) => {
    const id = req.params.id
    if (isNaN(Number(id))) throwError("ID is not a number, get operation failed",400) //Checks if id is a number/string of a number
    
    console.log(`Fetching Screening with id :${id} from the DB...`)
    try {
    const screening = await dbFunc.getScreening(id)
    res.status(200).json(screening)
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})


// -------------------------------------------------------------------------------------------------------------------------
// -------------------------Cinemas-------------------------Cinemas-------------------------Cinemas-------------------------
// -------------------------------------------------------------------------------------------------------------------------
app.get("/api/v1/cinemas",async (req,res,next) => {
    console.log("Fetching Cinemas from the DB...")
    try {
        const cinemas = await dbFunc.getCinemas()
        res.status(200).json(cinemas)
    } catch (error) {
        next(error)  // Passes the error to the global error-handling middleware
    }
})

app.get("/api/v1/cinemas/rooms",async (req,res,next) => {
    console.log(`Fetching Rooms in all Cinemas from the DB...`)
    try {
        const rooms = await dbFunc.getAllRoomsInCinemas()
        res.status(200).json(rooms)
    } catch (error) {
        next(error)  // Passes the error to the global error-handling middleware
    }
})

app.get("/api/v1/cinemas/:id",async (req,res,next) => {
    const id = req.params.id
    if (isNaN(Number(id))) throwError("ID is not a number, get operation failed",400) //Checks if id is a number/string of a number
    
    console.log(`Fetching Cinemas with id :${id} from the DB...`)
    try {
    const cinemas = await dbFunc.getCinema(id)
    res.status(200).json(cinemas)
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})

app.get("/api/v1/cinemas/:id/rooms",async (req,res,next) => {
    const id = req.params.id
    if (isNaN(Number(id))) throwError("ID is not a number, get operation failed",400) //Checks if id is a number/string of a number
    
    console.log(`Fetching Rooms in Cinemas with id :${id} from the DB...`)
    try {
        const rooms = await dbFunc.getRoomsListInCinema(id)
        res.status(200).json(rooms)
    } catch (error) {
        next(error)  // Passes the error to the global error-handling middleware
    }
})

app.get("/api/v1/cinemas/:id/movies",async (req,res,next) => {
    const id = req.params.id
    if (isNaN(Number(id))) throwError("ID is not a number, get operation failed",400) //Checks if id is a number/string of a number
    
    console.log(`Fetching Movies showing in Cinemas with id :${id} from the DB...`)
    try {
        const movies = await dbFunc.getMoviesListInCinema(id)
        movies.forEach((movie) => {movie.poster_img = decodeBinaryToBase64(movie.poster_img)})
        res.status(200).json(movies)
    } catch (error) {
        next(error)  // Passes the error to the global error-handling middleware
    }
})

app.get("/api/v1/cinemas/:id/movies/:id2/screenings",async (req,res,next) => {
    const cinema_id = req.params.id
    const movie_id = req.params.id2
    if (isNaN(Number(cinema_id))) throwError("cinema_id is not a number, get operation failed",400) //Checks if id is a number/string of a number
    if (isNaN(Number(movie_id))) throwError("movie_id is not a number, get operation failed",400) //Checks if id is a number/string of a number
    
    console.log(`Fetching Screenings for Movie with id: ${movie_id} showing in Cinemas with id: ${cinema_id} from the DB...`)
    try {
        const screenings = await dbFunc.getMovieScreeningsByCinema(cinema_id,movie_id)
        res.status(200).json(screenings)
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})

// -------------------------------------------------------------------------------------------------------------------------
// --------------------------Users--------------------------Users--------------------------Users----------------------------
// -------------------------------------------------------------------------------------------------------------------------
app.get("/api/v1/users",async (req,res,next) => {
    console.log("Fetching Users from the DB...")
    try {
        const users = await dbFunc.getUsers()
        res.status(200).json(users)
    } catch (error) {
        next(error)  // Passes the error to the global error-handling middleware
    }
})

app.get("/api/v1/users/:id",async (req,res,next) => {
    const id = req.params.id
    if (isNaN(Number(id))) throwError("ID is not a number, get operation failed",400) //Checks if id is a number/string of a number
    
    console.log(`Fetching User with id :${id} from the DB...`)
    try {
        const user = await dbFunc.getUser(id);
        res.status(200).json(user);
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})
app.post("/api/v1/users",async (req,res,next) => {
    const user = req.body
    if (!user.user_name ||!user.user_email ||!user.user_password) throwError("Missing user data, creation operation failed",400) //Checks if id is a number/string of a number
    // MORE validation code has to be inserted here eventually, erros have to be returned at the same time.
    // Post should be able to update all the fields, if an NotNULL field is missing, it shouldnt work.
    user.user_password_hash = await hashPassword(user.user_password);
    delete user.user_password;
    console.log(`Adding User :${user.user_name} email:${user.user_email} created succesfully to the DB`)
    try {
        const db_inserted_user = await dbFunc.addUser(user);
        if (db_inserted_user===null) res.sendStatus(204)      //Request succesful but no body or data to return 
        res.status(201).json(db_inserted_user);
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})
app.put("/api/v1/users/:id",async (req,res,next) => {
    const id = req.params.id
    if (isNaN(Number(id)))   throwError("ID is not a number, update operation failed",400)   //Checks if id is a number/string of a number  
    const user = req.body
    if (!user.user_name ||!user.user_email ||!user.user_password)  throwError("Missing user data, creation operation failed",400)

    console.log(`Updating User :${user.user_name} email:${user.user_email} from the DB...`)
    try {
        const db_updated_user = await dbFunc.updateUser(id,user); 
        res.status(200).json(db_updated_user);
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})
// #2 How to handle soft deletes vs hard deletes, What about movies? users? seats?
// #3 i think good buisness practise for (Auditing,customer data analysis) it's intersting to always soft delete everything that's important
app.delete("/api/v1/users/:id",async (req,res,next) => {
    const id = req.params.id
    console.log(`Deleting User with id :${id} email:${user.user_email} user:${user.user_name} from the DB...`)
    try {
        const movie = await dbFunc.deleteUser(id);
        res.status(200).json(movie);
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
})



app.use((err, req, res, next) => {
  console.log("API: Middleware logging error stack ...")
  console.error(err.stack);  // Log the stack trace for debugging
  // Send structured error response
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status,
      code: err.code || 'INTERNAL_API_ERROR',
      details: err.details || null,
    }
  });
});

app.listen(PORT,() => {
    console.log("The server is listening on port ",PORT)
})
