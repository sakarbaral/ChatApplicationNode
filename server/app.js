const express=require('express');
var path = require("path");
const http=require('http');
const socketIO=require('socket.io');

const {createMessage,getMap}=require('./utils/message.js');
const {checkString}=require('./utils/checkString.js');

const app=express();
const server=http.createServer(app);
let io=socketIO(server);

const pathn=path.join(__dirname,'/../public');
app.use(express.static(pathn));
const port= process.env.PORT || 3000;


io.on('connection',(socket)=>{
    console.log("A user has connected");
    


    socket.on('join',(message,callback)=>{
        if(!checkString(message.name)||!checkString(message.room))
        callback("Name and room is required");

        socket.join(message.room);
        
    socket.emit('rcvMessage',createMessage("Admin",`Welcome to ${message.room}`));

    socket.broadcast.to(message.room).emit('rcvMessage',createMessage('Admin',"A new user has just joined"));

    });


    socket.on('newMessage',(message,callback)=>{
        console.log("newMessage",message);
        io.emit('rcvMessage',createMessage(message.from,message.text));
        if(callback){
        callback("YOYO THIS IS THE SERVER SPEAKING!");}
    });

    socket.on('disconnect',()=>{
        console.log("Disconnected from the server");
    });

    socket.on('createLocation',(coords)=>{
        io.emit('newLocation',getMap('Admin',coords.lat,coords.lng));
    });
    
});


server.listen(port,()=>{
    console.log("Server started on port",port);
});


