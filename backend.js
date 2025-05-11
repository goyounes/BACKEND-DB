import express from "express"
import { getMovies ,getScreenings} from "./database.js";
import cors from "cors"
import { reqIPlogger } from "./utils.js"
const app = express();
const PORT = 3000;
app.set("view engine","ejs")


app.use(cors(), reqIPlogger);
app.get("/home",(req,res) => {
    res.render("/index.ejs")
})
app.use(express.static("public"));


app.get("/",(req,res) => {
    res.status(200).render("/index.ejs",{root:"."})
})

// app.get("/movies",async (req,res) => {
//     res.status(200).sendFile("./public/movies.html",{root:"."})
// })

// app.get("/screenings",async(req,res) => {
//     res.status(200).sendFile("./public/screenings.html",{root:"."})
// })

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
