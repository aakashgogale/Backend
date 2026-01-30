
const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
})

const noteModel = mongoose.model("notes", noteSchema) 
// opreation perform krne liye hume model bnane pdte he or ye bahaut jaruri hota he

module.exports = noteModel