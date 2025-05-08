import express from "express"
const app = express();
const PORT = 3000;

app.get("/",(req,res) => {
    res.status(200).send("Main page")
})

app.listen(PORT,() => {
    console.log("The server is listening on port ",PORT)
})
