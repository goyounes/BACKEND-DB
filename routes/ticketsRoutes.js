import { Router } from 'express';
const router = Router();
import { throwError} from "../utils.js"


router.get("/",async (req,res,next) => {
    const DB_API_URL = process.env.DB_API_URL
    try {
        const result = await fetch(DB_API_URL+"/tickets",{headers:{'X-Requested-By': 'backend-server'}})
        const tickets = await result.json()
        res.status(200).render("pages/tickets.ejs",{tickets})
    } catch (error) {
        next(error)
    }
})
router.get("/:id",async (req,res,next) => {
    const DB_API_URL = process.env.DB_API_URL
    const id = req.params.id
    console.log("accesing API for ticket with ticket_id =",id)
    try {
        const result = await fetch(DB_API_URL+ "/tickets/" + id,{headers:{'X-Requested-By': 'backend-server'}})
        const tickets = await result.json()
        if ('error' in tickets) throwError (tickets.error.message,tickets.error.status)
        res.status(200).render("pages/tickets.ejs",{tickets})
    } catch (error) {
        next(error)
    }
})

export default router;