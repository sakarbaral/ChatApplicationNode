const express=require('express');
var path = require("path");
const http=require('http');
const socketIO=require('socket.io');

const app=express();
const server=http.createServer(app);
let io=socketIO(server);

const pathn=path.join(__dirname,'/public');
app.use(express.static(pathn));
const port= process.env.PORT || 3000;


io.on('connection',(socket)=>{
    console.log("A user has connected");

    socket.emit('rcvMessage',{
        from:"Admin",
        message:"Message has been received"
    });

    socket.on('newMessage',(message)=>{
        console.log("newMessage",message);
    })

    socket.on('disconnect',()=>{
        console.log("Disconnected from the server");
    })
})


server.listen(port,()=>{
    console.log("Server started on port",port);
}) 


