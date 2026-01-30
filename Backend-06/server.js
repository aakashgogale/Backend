
const app = require("./src/app")

const mongoose = require("mongoose")


function connectToDb(){
    mongoose.connect("Mongoose_Url")// production ke time ye url galti se bhi github pr nahi jana chahiye like publicly 
    .then(()=>{
        console.log("Connected to Database");
        
    })
}

connectToDb();
//Conect for the database
// Cluster - Storage + procesore

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
    
})