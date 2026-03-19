import app from "./src/app.js"
import { createServer } from "http"
import { Server } from "socket.io"

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket)=>{
    console.log("A user connected")

    socket.on("message", (msg)=>{
        console.log("Message received:", msg)
        io.emit("message")
    })

})

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})