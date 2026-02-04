
const mongoose = require("mongoose")
function connectToDb(){
    mongoose.connect("mongodb+srv://NotesData:VHW01SvhmMbuepV4@cluster0.ynzhx9c.mongodb.net/notesData")
    .then(()=>{
        console.log("Connected to Database");
    })
}

module.exports = connectToDb