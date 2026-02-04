
const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    title: String,
    description: String,
})

const noteModel = mongoose.model("new_Notes", noteSchema)

module.exports = noteModel