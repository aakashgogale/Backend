require("dotenv").config()
const databaseToConect = require("./src/config/database")
const app = require("./src/app")

databaseToConect()
app.listen(3000, ()=>{
    console.log("Server is runing on port 3000");
})