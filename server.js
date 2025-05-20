import express from "express"
import cors from "cors"
import { reqIPlogger, throwError} from "./utils.js"
import dotenv from "dotenv"
dotenv.config()

const app = express();
const PORT = 3000;
const APIpath = process.env.DB_API_URL // change if DB backend is diff

app.set("view engine","ejs")
app.use(cors(), reqIPlogger);
app.use(express.static('public'));

app.get("/home",(req,res) => {
    res.redirect("/")
})
app.get("/",(req,res) => {
    res.status(200).render("pages/index.ejs")
})

app.get('/reservation', (req, res) => {
    res.sendFile("/static/reservation.html",{root:"."})
});

app.get("/movies",async (req,res,next) => {
    try {
        const result = await fetch(APIpath+"/movies",{headers:{'X-Requested-By': 'backend-server'}})
        const movies = await result.json()
        res.status(200).render("pages/movies.ejs",{movies})
    } catch (error) {
        next(error)
    }
})

app.get("/movies/recent",async (req,res,next) => {
    try {
        const result = await fetch(APIpath+"/movies/recent",{headers:{'X-Requested-By': 'backend-server'}})
        const movies = await result.json()
        res.status(200).render("pages/movies_recent.ejs",{movies})
    } catch (error) {
        next(error)
    }
})

app.get('/movies/create', (req, res) => {
    res.sendFile("/static/create_movie.html",{root:"."})
});


app.get("/movies/:id",async (req,res,next) => {
    const id = req.params.id
    console.log("accesing API for movie with movie_id =",id)
    try {
        const result = await fetch(APIpath + "/movies/" + id ,{headers:{'X-Requested-By': 'backend-server'}})
        const movie = await result.json() // either a reosurce obj or err obj
        if ('error' in movie) throwError (movie.error.message,movie.error.status)
        res.status(200).render("pages/one_movie.ejs",{movie})
    } catch (error) {
        next(error) // network request or re-thrown error
    }
})


// Screenings
app.get("/screenings",async (req,res,next) => {
    try {
        const result = await fetch(APIpath+"/screenings",{headers:{'X-Requested-By': 'backend-server'}})
        const screenings = await result.json()
        res.status(200).render("pages/screenings.ejs",{screenings})
    } catch (error) {
        next(error)
    }
})

app.get('/screenings/create', (req, res) => {
    res.sendFile("/static/create_screening.html",{root:"."})
});

app.get("/screenings/all",async (req,res,next) => {
    try {
        const result = await fetch(APIpath+"/screenings/all",{headers:{'X-Requested-By': 'backend-server'}})
        const screenings = await result.json()
        res.status(200).render("pages/screenings.ejs",{screenings})
    } catch (error) {
        next(error)
    }
})

app.get("/screenings/:id",async (req,res,next) => {
    const id = req.params.id
    console.log("accesing API for screening with screening_id =",id)
    try {
        const result = await fetch(APIpath + "/screenings/" + id ,{headers:{'X-Requested-By': 'backend-server'}})
        const screening = await result.json() // either a reosurce obj or err obj
        if ('error' in screening) throwError (screening.error.message,screening.error.status)
        res.status(200).render("pages/one_screening.ejs",{screening})
    } catch (error) {
        next(error) // network request or re-thrown error
    }
})

app.get("/users",async (req,res,next) => {
    try {
        const result = await fetch(APIpath+"/users",{headers:{'X-Requested-By': 'backend-server'}})
        const users = await result.json()
        res.status(200).render("pages/users.ejs",{users})
    } catch (error) {
        next(error)
    }
})

app.get('/users/create', (req, res) => {
    res.sendFile("/static/create_user.html",{root:"."})
});


app.get("/users/:id",async (req,res,next) => {
    const id = req.params.id
    console.log("accesing API for movie with movie_id =",id)
    try {
        const result = await fetch(APIpath + "/users/" + id ,{headers:{'X-Requested-By': 'backend-server'}})
        const user = await result.json() // either a reosurce obj or err obj
        if ('error' in user) throwError (user.error.message,user.error.status)
        res.status(200).render("pages/one_user.ejs",{user})
    } catch (error) {
        next(error) // network request or re-thrown error
    }
})

app.get("/cinemas",async (req,res,next) => {
    try {
        const result = await fetch(APIpath+"/cinemas",{headers:{'X-Requested-By': 'backend-server'}})
        const cinemas = await result.json()
        res.status(200).render("pages/cinemas.ejs",{cinemas})
    } catch (error) {
        next(error)
    }
})

app.use((err, req, res, next) => {
  console.log("Server: Middleware logging error stack ...");
  console.error(err.stack); // Log the stack trace
  res.status(err.status || 500).send(err.message || "Something broke in the web server !");
});

app.listen(PORT,() => {
    console.log("The server is listening on port ",PORT)
})
