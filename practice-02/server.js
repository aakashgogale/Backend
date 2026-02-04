
const connectToDb = require("./src/config/database")
const app = require("./src/app")
const mongoose = require("mongoose")

const notes = []

app.post("/notes", (req, res)=>{
    
})


connectToDb()
app.listen(3000, ()=>{
    console.log("server is runing on port 3000");
})