const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first"); 

const mongoose = require("mongoose");

function databaseToConect(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Conected to database");
    })
}

module.exports = databaseToConect