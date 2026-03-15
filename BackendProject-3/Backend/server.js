const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first"); 



const app = require("./src/app")
require("dotenv").config()
const connectToDB = require("./src/config/database")


connectToDB()
app.listen(3000, ()=>{
    console.log("Server is runing on port 3000")
})