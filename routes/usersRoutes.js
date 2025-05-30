import { Router } from 'express';
const router = Router();
import { throwError} from "../utils.js"

router.get("/",async (req,res,next) => {
    const DB_API_URL = process.env.DB_API_URL
    try {
        const result = await fetch(DB_API_URL+"/users",{headers:{'X-Requested-By': 'backend-server'}})
        const users = await result.json()
        res.status(200).render("pages/users.ejs",{users})
    } catch (error) {
        next(error)
    }
})

router.get('/create', (req, res,next) => {
    const DB_API_URL = process.env.DB_API_URL
    // res.sendFile("/static/create_user.html",{root:"."})
    res.status(200).render("pages/create_user.ejs",{DB_API_URL});
});


router.get("/:id",async (req,res,next) => {
    const DB_API_URL = process.env.DB_API_URL
    const id = req.params.id
    console.log("accesing API for user with user_id =",id)
    try {
        const result = await fetch(DB_API_URL + "/users/" + id ,{headers:{'X-Requested-By': 'backend-server'}})
        const user = await result.json() // either a reosurce obj or err obj
        if ('error' in user) throwError (user.error.message,user.error.status)
        res.status(200).render("pages/one_user.ejs",{user})
    } catch (error) {
        next(error) // network request or re-thrown error
    }
})

export default router;