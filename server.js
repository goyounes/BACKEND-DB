import express from "express"
import cors from "cors"
import { reqIPlogger, throwError} from "./utils.js"
import dotenv from "dotenv"
dotenv.config()

const app = express();
const PORT = 3000;
const DB_API_URL = process.env.DB_API_URL // change if DB backend is diff

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

app.get("/movies",async (req,res,next) => {
    try {
        const result = await fetch(DB_API_URL+"/movies",{headers:{'X-Requested-By': 'backend-server'}})
        const movies = await result.json()
        res.status(200).render("pages/movies.ejs",{movies})
    } catch (error) {
        next(error)
    }
})

app.get("/movies/recent",async (req,res,next) => {
    try {
        const result = await fetch(DB_API_URL+"/movies/recent",{headers:{'X-Requested-By': 'backend-server'}})
        const movies = await result.json()
        res.status(200).render("pages/movies_recent.ejs",{movies})
    } catch (error) {
        next(error)
    }
})

app.get('/movies/create', (req, res,next) => {
    // res.sendFile("/static/create_movie.html",{root:"."})
    res.status(200).render("pages/create_movie.ejs",{DB_API_URL});
});


app.get("/movies/:id",async (req,res,next) => {
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


// Screenings
app.get("/screenings",async (req,res,next) => {
    const cinema_id = req.query.cinema_id || null;
    const movie_id = req.query.movie_id || null;
    try {
        const url = new URL(DB_API_URL+"/screenings");
        if (cinema_id) url.searchParams.append("cinema_id", cinema_id);
        if (movie_id) url.searchParams.append("movie_id", movie_id);

        const result = await fetch(url,{headers:{'X-Requested-By': 'backend-server'}})
        const screenings = await result.json()
        res.status(200).render("pages/screenings.ejs",{screenings})
    } catch (error) {
        next(error)
    }
})

app.get('/screenings/create', (req, res,next) => {
    // res.sendFile("/static/create_screening.html",{root:"."})
    res.status(200).render("pages/create_screening.ejs",{DB_API_URL});
});

app.get("/screenings/all",async (req,res,next) => {
    try {
        const result = await fetch(DB_API_URL+"/screenings/all",{headers:{'X-Requested-By': 'backend-server'}})
        const screenings = await result.json()
        res.status(200).render("pages/screenings.ejs",{screenings})
    } catch (error) {
        next(error)
    }
})

app.get("/screenings/:id",async (req,res,next) => {
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





app.get("/users",async (req,res,next) => {
    try {
        const result = await fetch(DB_API_URL+"/users",{headers:{'X-Requested-By': 'backend-server'}})
        const users = await result.json()
        res.status(200).render("pages/users.ejs",{users})
    } catch (error) {
        next(error)
    }
})

app.get('/users/create', (req, res,next) => {
    // res.sendFile("/static/create_user.html",{root:"."})
    res.status(200).render("pages/create_user.ejs",{DB_API_URL});
});


app.get("/users/:id",async (req,res,next) => {
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


app.get("/tickets",async (req,res,next) => {
    try {
        const result = await fetch(DB_API_URL+"/tickets",{headers:{'X-Requested-By': 'backend-server'}})
        const tickets = await result.json()
        res.status(200).render("pages/tickets.ejs",{tickets})
    } catch (error) {
        next(error)
    }
})
app.get("/tickets/:id",async (req,res,next) => {
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



app.get('/checkout', async (req,res,next) => {
    const screening_id = req.query.screening_id || null;
    try {
        const url = new URL(DB_API_URL+"/checkout");
        if (screening_id) url.searchParams.append("screening_id", screening_id);

        const result = await fetch(url,{headers:{'X-Requested-By': 'backend-server'}})
        const checkoutInfo = await result.json()
        console.log("checkoutInfo",checkoutInfo)
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
