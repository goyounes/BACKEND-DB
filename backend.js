import express from "express"
import { getMovies ,getScreenings} from "./database.js";
import cors from "cors"
import { reqIPlogger , fetchJson} from "./utils.js"
const app = express();
const PORT = 3000;
const APIpath = "http://localhost:3000" // change if DB backend is diff
app.set("view engine","ejs")
app.use(cors(), reqIPlogger);

app.get("/home",(req,res) => {
    res.redirect("/")
})
app.get("/",(req,res) => {
    res.status(200).render("pages/index.ejs")
})
app.get("/movies",async (req,res) => {
    const movies = await fetchJson(APIpath+"/api/movies")
    res.status(200).render("pages/movies.ejs",{movies})
})
app.get("/screenings",async (req,res) => {
    const screenings = await fetchJson(APIpath+"/api/screenings")
    res.status(200).render("pages/screenings.ejs",{screenings})
})

app.use(express.static("public"));

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
