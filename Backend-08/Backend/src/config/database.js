const mongoose = require("mongoose")
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");


function connectToDb(){
    mongoose.connect("mongodb+srv://aakashgogale123_db_user:4aw2BNwlYL4e0G8t@cluster0.tbot6iw.mongodb.net/")
    .then(()=>{
        console.log("Connected to Database");
    })
}

module.exports = connectToDb