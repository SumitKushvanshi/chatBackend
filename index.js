import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import cors from 'cors'


const app=express();
const server=http.createServer(app);
app.use(cors())

const io=new Server(server,{
    cors: {
    origin: "http://localhost:5173", // your React dev server
    methods: ["GET", "POST"]
  }
})

io.on("connection",(socket)=>{
    console.log("User is connected",socket.id)



    socket.on("chatMessage",(msg)=>{
        console.log("User message is",msg)
          io.emit("chatMessage", msg);
    })


    socket.on("disconnect",()=>{
        console.log("User is disconnected")
    })
})






app.get('/',(req,res)=>{
    res.send(`<h1>Hlo</h1>`)
})





server.listen(5000, () => {
  console.log("🚀 Server is running on PORT : 5000");
});