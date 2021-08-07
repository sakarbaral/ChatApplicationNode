
let socket= io();

socket.on('connect',()=>{
    console.log("Connected to the server");
    
    // socket.emit('newMessage',{
    //     from: "lala",
    //     message:"YOYO WASSAPP"
    // })
});

socket.on('disconnect',()=>{
    console.log("Disconnected from the server");
})


socket.on('rcvMessage',(message)=>{
    console.log("Received Message",message);
})