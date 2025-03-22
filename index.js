const express=require("express")
const http=require("http")
const socketIo=require("socket.io")
const app=express()
const server=http.createServer(app)
require('dotenv').config()
//const io=socketIo(server)
let frontendUrl=process.env.FRONTEND_URL;


const io = socketIo(server, {
    cors: {
      origin:process.env.NODE_ENV==="production"?process.env.FRONTEND_URL:"http://localhost:5173", // Add your frontend URL
      methods: ["GET", "POST"],
    },
  });
  let messages=[]
  let users=[]
const port =3000
console.log(process.env.NODE_ENV)
app.get('/data',(req,res)=>{
    res.send("hi guys!")
     
})
io.on("connection",(socket)=>{
    socket.emit("senddata",(data)=>{
        const {name,mail,uid}=data
        let val=users.find((udata)=>udata.id===uid)
        if(val)
        {
            users.push({id:uid,name:name,mail:mail})
        }

    })
    io.emit("message",messages)
    io.emit("noofusers",users)
    socket.emit("count",io.engine.clientsCount)
socket.on("message",(data)=>{
    messages.push({name:data.name,msg:data.msg})
    console.log(messages)
    //socket.emit("message",messages)
    io.emit("message",messages)
   
   
   
})


socket.on("disconnect",()=>{
    console.log("user disconnected")
})

})
server.listen(port,()=>{
 console.log(port)
})