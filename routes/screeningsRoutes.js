import { Router } from 'express';
const router = Router();
import { throwError} from "../utils.js"

router.get("/",async (req,res,next) => {
    const DB_API_URL = process.env.DB_API_URL
    const cinema_id = req.query.cinema_id || null;
    const movie_id = req.query.movie_id || null;
    try {
        const url = new URL(DB_API_URL+"/screenings");
        if (cinema_id) url.searchParams.routerend("cinema_id", cinema_id);
        if (movie_id) url.searchParams.routerend("movie_id", movie_id);

        const result = await fetch(url,{headers:{'X-Requested-By': 'backend-server'}})
        const screenings = await result.json()
        res.status(200).render("pages/screenings.ejs",{screenings})
    } catch (error) {
        next(error)
    }
})

router.get('/create', (req, res,next) => {
    const DB_API_URL = process.env.DB_API_URL
    // res.sendFile("/static/create_screening.html",{root:"."})
    res.status(200).render("pages/create_screening.ejs",{DB_API_URL});
});

router.get("/all",async (req,res,next) => {
    const DB_API_URL = process.env.DB_API_URL
    try {
        const result = await fetch(DB_API_URL+"/screenings/all",{headers:{'X-Requested-By': 'backend-server'}})
        const screenings = await result.json()
        res.status(200).render("pages/screenings.ejs",{screenings})
    } catch (error) {
        next(error)
    }
})

router.get("/:id",async (req,res,next) => {
    const DB_API_URL = process.env.DB_API_URL
    const id = req.params.id
    console.log("accesing API for screening with screening_id =",id)
    try {
        const result = await fetch(DB_API_URL + "/screenings/" + id ,{headers:{'X-Requested-By': 'backend-server'}})
        const screening = await result.json() // either a reosurce obj or err obj
        if ('error' in screening) throwError (screening.error.message,screening.error.status)
        res.status(200).render("pages/one_screening.ejs",{screening})
    } catch (error) {
        next(error) // network request or re-thrown error
    }
})

export default router;