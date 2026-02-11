
const mongoose = require("mongoose")

function conectedToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Conected to database");
    })
}

module.exports = conectedToDB