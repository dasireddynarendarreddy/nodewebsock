const express=require("express")
const http=require("http")
const socketIo=require("socket.io")
const app=express()
const server=http.createServer(app)
require('dotenv').config()
//const io=socketIo(server)
const FRONTEND_URL=process.env.FRONTEND_URL;
const io = socketIo(server, {
    cors: {
      origin: FRONTEND_URL, // Add your frontend URL
      methods: ["GET", "POST"],
    },
  });
  let messages=[]
  let users=[]
const port =3000
app.get('/data',(req,res)=>{
    res.send("hi guys!")
     
})
io.on("connection",(socket)=>{
    
    
    socket.emit("count",io.engine.clientsCount)
socket.on("message",(msg)=>{
    messages=[...messages,msg]
    //socket.emit("message",messages)
    io.emit("message",messages)
   
   
})
socket.on("senddata",(data)=>{
    const {name,mail,uid}=data
    let val=users.find((udata)=>udata.id===uid)
    if(!val)
    {
    users.push({id:uid,name,name,mail:mail})
    }
    
    console.log(users)

})
socket.on("disconnect",()=>{
    console.log("user disconnected")
})

})
server.listen(port,()=>{
 console.log(port)
})