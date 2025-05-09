import express from "express"
import { getMovies ,getScreenings} from "./database.js";

const app = express();
const PORT = 3000;

// app.use(express.static("public"));

app.get("/",(req,res) => {
    res.status(200).send("go to /home page")
})

app.get("/home",(req,res) => {
    res.status(200).sendFile("./public/index.html",{root:"."})
})

app.get("/movies",async (req,res) => {
    res.status(200).sendFile("./public/movies.html",{root:"."})
})

app.get("/screenings",async(req,res) => {
    res.status(200).sendFile("./public/screenings.html",{root:"."})
})

app.get("/database/movies",async (req,res) => {
    const movies = await getMovies()
    res.status(200).json(movies)
})

app.get("/database/screenings",async(req,res) => {
    const screenings = await getScreenings()
    res.status(200).json(screenings)
})



app.listen(PORT,() => {
    console.log("The server is listening on port ",PORT)
})
