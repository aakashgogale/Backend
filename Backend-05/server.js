
const app = require("./src/app")

// app.get("/", (req, res)=>{
//     res.send("hello")
// })

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})