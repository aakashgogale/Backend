
const mongoose = require("mongoose")

const noteSchema =  mongoose.Schema(()=>{
    title: String
    description: String
})

const noteModel = mongoose.model("day-8", noteSchema)

module.exports = noteModel