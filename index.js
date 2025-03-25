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
    socket.on("senddata",(data)=>{
        const {name,mail,uid}=data
        //console.log("the data got",data)
        let val=users.find((udata)=>udata.id==uid)
        if(val)
        {

        }
        else{
            users.push({name:name,id:uid,socketid:socket.id})
        }
        console.log(users)

    })
    io.emit("message",messages)
    io.emit("noofusers",users)
    
socket.on("message",(data)=>{
    messages.push({name:data.name,msg:data.msg})
    console.log(messages)
    //socket.emit("message",messages)
    io.emit("message",messages)
    console.log(messages)
   
   
   
})
socket.on("personmsgd",(data)=>{
    console.log("message recived is",data)
    
    io.to(data.socketId).emit('msgto', {
        from: data.from,
        message: data.message,
      });
})


socket.on("disconnect",()=>{
    console.log("user disconnected")
})

})
server.listen(port,()=>{
 console.log(port)
})