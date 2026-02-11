const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first"); 

require("dotenv").config()
const app = require("./src/app")
const conectedToDB = require("./src/config/db")


conectedToDB()
app.listen(3000, ()=>{
    console.log("Serveer is runing on port 3000");
})