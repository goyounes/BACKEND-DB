import express from "express"
import cors from "cors"
import { reqIPlogger , fetchJson} from "./utils.js"
const app = express();
const PORT = 3000;
const APIpath = "http://localhost:5000" // change if DB backend is diff

app.set("view engine","ejs")
app.use(cors(), reqIPlogger);
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the stack trace
  res.status(err.status || 500).send("Something broke in the API server !");
});


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

app.get("/movies/:id",async (req,res) => {
    const id = req.params.id
    console.log("accesing data from DB for movie with movie_id =",id)
    const movie = await fetchJson(APIpath + "/api/movies/" + id ,{headers:{'X-Requested-By': 'backend-server'}})
    // if (!res.ok) {
    //     console.log("error handeled like a boss !")
    //     throw new Error(`Error ${res.status}: ${res.statusText}`);
    // }
    res.status(200).render("pages/one_movie.ejs",{movie})
})

app.get("/screenings",async (req,res) => {
    const screenings = await fetchJson(APIpath+"/api/screenings",{headers:{'X-Requested-By': 'frontend-server'}})
    res.status(200).render("pages/screenings.ejs",{screenings})
})

app.get("/screenings/:id",async (req,res) => {
    const id = req.params.id
    console.log("accesing data from DB for screening with screening_id =",id)
    const screening = await fetchJson(APIpath + "/api/screenings/" + id ,{headers:{'X-Requested-By': 'backend-server'}})
    // if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    res.status(200).render("pages/one_screening.ejs",{screening})
})

// app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.log("Server: Middleware logging error stack ...");
  console.error(err.stack); // Log the stack trace
  res.status(err.status || 500).send(err.message || "Something broke in the web server !");
});

app.listen(PORT,() => {
    console.log("The server is listening on port ",PORT)
})
