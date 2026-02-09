require("dotenv").config()
const app = require("./src/app")
const conectedToDb = require("./src/config/database")

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first"); 


conectedToDb()
app.listen(3000, ()=>{
    console.log("Server is runing on port 3000"); 
})