const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database is running successfully")
    })
    .catch(err=>{
        console.log("Error connecting to DB", err) 
    })
}

module.exports = connectToDB