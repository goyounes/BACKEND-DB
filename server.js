import express from "express"
import cors from "cors"
import { reqIPlogger , fetchJson} from "./utils.js"
const app = express();
const PORT = 3000;
const APIpath = "http://localhost:5000" // change if DB backend is diff

app.set("view engine","ejs")
app.use(cors(), reqIPlogger);

app.get("/home",(req,res) => {
    res.redirect("/")
})
app.get("/",(req,res) => {
    res.status(200).render("pages/index.ejs")
})
app.get("/movies",async (req,res) => {
    const movies = await fetchJson(APIpath+"/api/movies",{headers:{'X-Requested-By': 'backend-server'}})
    res.status(200).render("pages/movies.ejs",{movies})
})
app.get("/screenings",async (req,res) => {
    const screenings = await fetchJson(APIpath+"/api/screenings",{headers:{'X-Requested-By': 'frontend-server'}})
    res.status(200).render("pages/screenings.ejs",{screenings})
})

// app.use(express.static("public"));

app.listen(PORT,() => {
    console.log("The server is listening on port ",PORT)
})
