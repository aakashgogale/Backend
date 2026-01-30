
const app = require("./src/app")

const mongoose = require("mongoose")

function connectedToDb(){
    mongoose.connect("mongodb+srv://aakash:2E6XFUJh3cr0WJkt@cluster0.h6iavno.mongodb.net/backendpractice")
    .then(()=>{
        console.log("Contected to Database");
    })
}

connectedToDb()

app.listen(3000, ()=>{
    console.log("server is runing on port 3000");
})