//server ko start krna 
// or database se connect krna 
require("dotenv").config();
const app = require("./src/app")
const connectToDb = require('./src/config/database')


connectToDb()
app.listen(3000, ()=>{
    console.log("server is runing on port 3000"); 
})