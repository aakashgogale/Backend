// server create krte he 
// server ko congig krte he 

const express = require("express")

const app = express()

app.use(express.json()) // midleware 

const notes = []

app.post("/notes", (req, res)=>{
    
    notes.push(req.body)

    res.status(201).json({
        message:"note created successfull"
    })

})

app.get("/notes", (req, res)=>{
    
    res.status(200).json({
        notes: notes
    })
})

app.delete("/notes/:index", (req, res)=>{

    delete notes[req.res.index]
    
    res.status(200).json({
        message:"note deleted successfully"
    })
})

app.patch("/notes/:index",(req, res)=>{
    notes[req.params.index].description = req.body.description

    res.status(200).json({
        message:"note successfully updated"
    })
})

module.exports = app
