
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
    let li=document.createElement('li');
    li.innerText=`${message.from}:${message.text}`
    document.querySelector('body').appendChild(li);
});

socket.on('newLocation',(message)=>{
    console.log("Received Message",message);
    let li=document.createElement('li');
    let a =document.createElement('a');
    a.setAttribute('target','_blank');
    a.setAttribute('href',message.url);
    a.innerText="My current location";
    li.appendChild(a);
    document.querySelector('body').appendChild(li);
});




// socket.emit('newMessage',{from:"lala",text:"some text from lala"},(message)=>{console.log(message);});


document.querySelector("#submit-btn").addEventListener('click',(e)=>{
e.preventDefault();
socket.emit("newMessage",{
    from:"User",
    text: document.querySelector("#message-txt").value
},()=>{

}
)
});

document.querySelector("#send-location").addEventListener("click",()=>{
    if(!navigator.geolocation){
        return alert("Geolocation isn't supported")
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('createLocation',{
            lat:position.coords.latitude,
            lng:position.coords.longitude
        })
    },()=>{
        alert("Unable to get location");
    });
});