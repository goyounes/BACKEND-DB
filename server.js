import dotenv from "dotenv";
dotenv.config(); //give full path
const DB_API_URL = process.env.DB_API_URL // change if DB backend is diff

import { reqIPlogger, throwError } from "./utils.js"
import express from "express"
import cors from "cors"
const app = express();
const PORT = 3000;

// Routes
import usersRoutes from  './routes/usersRoutes.js'
import moviesRoutes from  './routes/moviesRoutes.js'
import screeningsRoutes from  './routes/screeningsRoutes.js'
import ticketsRoutes from  './routes/ticketsRoutes.js'
import adminRoutes from  './routes/adminRoutes.js'
app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);
app.use('/screenings', screeningsRoutes);
app.use('/tickets', ticketsRoutes);
app.use('/admin', adminRoutes);

app.set("view engine","ejs")
app.use(cors(), reqIPlogger);
app.use(express.static('public'));

app.get("/home",(req,res,next) => {
    res.redirect("/")
})
app.get("/",(req,res,next) => {
    res.status(200).render("pages/index.ejs")
})

app.get('/reservation', (req, res,next) => {
    // res.sendFile("/static/reservation.html",{root:"."})
    res.status(200).render("pages/reservation.ejs",{DB_API_URL});
});

app.get('/contact', (req, res,next) => {
    // res.sendFile("/static/contact.html",{root:"."})
    res.status(200).render("pages/contact.ejs",{DB_API_URL});
});



app.get("/cinemas",async (req,res,next) => {
    try {
        const result = await fetch(DB_API_URL+"/cinemas",{headers:{'X-Requested-By': 'backend-server'}})
        const cinemas = await result.json()
        res.status(200).render("pages/cinemas.ejs",{cinemas})
    } catch (error) {
        next(error)
    }
})


app.get("/messages",async (req,res,next) => {
    try {
        const result = await fetch(DB_API_URL+"/messages",{headers:{'X-Requested-By': 'backend-server'}})
        const messages = await result.json()
        res.status(200).render("pages/messages.ejs",{messages})
    } catch (error) {
        next(error)
    }
})


app.get('/checkout', async (req,res,next) => {
    const screening_id = req.query.screening_id || null;
    try {
        const url = new URL(DB_API_URL+"/checkout");
        if (screening_id) url.searchParams.append("screening_id", screening_id);

        const result = await fetch(url,{headers:{'X-Requested-By': 'backend-server'}})
        const checkoutInfo = await result.json()
        // console.log("checkoutInfo",checkoutInfo)
        res.render('pages/checkout.ejs', { checkoutInfo, DB_API_URL });
    } catch (error) {
        next(error)
    }

});

//Propogate errors to the the user
app.use((err, req, res, next) => {
  console.log("Server: Middleware logging error stack ...");
  console.error(err.stack); // Log the stack trace
  res.status(err.status || 500).send(err.message || "Something broke in the web server !");
});

app.listen(PORT,() => {
    console.log("The server is listening on port ",PORT)
})
