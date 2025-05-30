import { Router } from 'express';
const router = Router();
import { throwError} from "../utils.js"

router.get("/",async (req,res,next) => {
    const DB_API_URL = process.env.DB_API_URL
    try {
        const result = await fetch(DB_API_URL+"/movies",{headers:{'X-Requested-By': 'backend-server'}})
        const movies = await result.json()
        res.status(200).render("pages/movies.ejs",{movies})
    } catch (error) {
        next(error)
    }
})

router.get("/recent",async (req,res,next) => {
    const DB_API_URL = process.env.DB_API_URL
    try {
        const result = await fetch(DB_API_URL+"/movies/recent",{headers:{'X-Requested-By': 'backend-server'}})
        const movies = await result.json()
        res.status(200).render("pages/movies_recent.ejs",{movies})
    } catch (error) {
        next(error)
    }
})

router.get('/create', (req, res,next) => {
    const DB_API_URL = process.env.DB_API_URL
    // res.sendFile("/static/create_movie.html",{root:"."})
    res.status(200).render("pages/create_movie.ejs",{DB_API_URL});
});


router.get("/:id",async (req,res,next) => {
    const DB_API_URL = process.env.DB_API_URL
    const id = req.params.id
    console.log("accesing API for movie with movie_id =",id)
    try {
        const result = await fetch(DB_API_URL + "/movies/" + id ,{headers:{'X-Requested-By': 'backend-server'}})
        const movie = await result.json() // either a reosurce obj or err obj
        if ('error' in movie) throwError (movie.error.message,movie.error.status)
        res.status(200).render("pages/one_movie.ejs",{movie})
    } catch (error) {
        next(error) // network request or re-thrown error
    }
})

export default router;