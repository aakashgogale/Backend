// Server create krte he 
// server ko config krte he 

const express = require("express")

const notes = [
    {
        title: "title test 1",
        description: "title description 1"
    },
    {
        title: "title test 2",
        description: "title description 2"
    }
]

const app = express() // server create

app.get("/", (req, res)=>{
    res.send(notes)
}) //GET method ka use server se data lene (fetch/read) ke liye hota hai.
// Isme hum koi data change nahi karte, sirf dekhte / mangwate hain.

app.post("/notes", (req, res)=>{
    req.send(res.send)
})



module.exports = app 