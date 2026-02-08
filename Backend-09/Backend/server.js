// Node.js DNS code for connect with Google DNS 
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first"); 

const app = require("./src/app")
const ConecteToDatabase = require("./src/config/database")
require("dotenv").config()

ConecteToDatabase()
app.listen(3000, ()=>{
    console.log('Server is runing on port 3000');
})