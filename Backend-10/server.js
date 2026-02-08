const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first"); 

require("dotenv").config()
const app = require("./src/app")
const conectToDb = require("./src/config/database")

conectToDb()
app.listen(3000, ()=>{
    console.log("server is runing on port 3000");
})