
const mongoose = require("mongoose")

function ConecteToDatabase(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Conected to Database");
    })
}

module.exports = ConecteToDatabase