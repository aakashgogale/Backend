const connectToDb = require("./src/config/database")
const app = require("./src/app");
require("./src/config/database")();
require("dotenv").config()


app.listen(3000, ()=>{
    console.log("server is runing on port 3000");
})
