// server ko crreate krna 

const express = require("express")
const noteModel = require("./models/note.model")

const app = express()




app.use(express.json())// Middleware , ye nahi likhoge to body me apki information nahi aayegi


//note create krne ke liye ya kuch bhi create krne ke liye POST use krte he 

// -POST /api/notes
app.post("/api/notes", async (req, res)=>{
    const {title, description}= req.body

   const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note created Successfully",
        note
    })

})

// get /api/note
//fatch all the notes data from mongo
app.get("/api/notes",async (req, res)=>{
    
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        note
    })
})

app.delete("/api/notes/:id", async (req, res)=>{
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(201).json({
        message: "Deleted successfully"
    })
})

app.patch("/api/notes/:id",async (req, res)=>{
    const id = req.params.id

    const {description} = req.body

  const note= await noteModel.findByIdAndUpdate(id, {description})

    res.status(201).json({
        message:"Note updated Successfully",
        note
    })
})




module.exports = app