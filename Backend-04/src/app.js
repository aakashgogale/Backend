
// server create krna
// server ko config krna

const express = require("express")

const app = express()
 // server create ho jata he

app.use(express.json()) 

 const notes = [
    {
        title : "test title 1",
        description : "test title 1"
    }
 ]



app.get("/",(req, res)=>{
    res.send("hello")
}) 

app.post("/notes", (req, res)=>{
    console.log(req.send);
    notes.push(req.body)

    console.log(notes)
    res.send("Notes created")
})

app.get("/notes", (req, res)=>{
    res.send(notes)
})

app.delete("/notes/:index", (req, res)=>{
   delete notes[req.params.index]

   res.send("notes delete successfully")
    
})

app.patch("/notes/:index", (req, res)=>{
    
    notes[req.params.index].description = req.body.description

    res.send("notes updated successfully")
})

module.exports = app

