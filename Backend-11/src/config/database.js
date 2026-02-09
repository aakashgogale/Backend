
const mongoose = require("mongoose")

function conectedToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Conected to DataBase")   
    })
}

module.exports = conectedToDb