let socket= io();

scrollBottom=()=>{
let messages= document.querySelector("body").lastElementChild;

messages.scrollIntoView();
}

socket.on('connect',()=>{
    console.log("Connected to the server");
    let search=window.location.search.substring(1);
    let vars=JSON.parse('{"'+decodeURI(search).replace(/&/g,'","').replace(/\+/g,'" "').replace(/\=/g,'":"')+'"}');
    socket.emit('join',vars,(err)=>{
        if(err){
            alert(err);
            window.location.href="/";
        }
       
    })
    
    // socket.emit('newMessage',{
    //     from: "lala",
    //     message:"YOYO WASSAPP"
    // })
});

socket.on('disconnect',()=>{
    console.log("Disconnected from the server");
})


socket.on('rcvMessage',(message)=>{
    const temp=document.querySelector('#message-template').innerHTML;
    const fmtTime=moment(message.timeStamp).format('LT');
    const html= Mustache.render(temp,{
        from: message.from,
        text: message.text,
        timeStamp: fmtTime
    });
    const div=document.createElement('div');
    div.innerHTML=html;
    document.querySelector('body').appendChild(div);
    scrollBottom();

    // const fmtTime=moment(message.timeStamp).format('LT');
    // console.log("Received Message",message);
    // let li=document.createElement('li');
    // li.innerText=`${message.from} ${fmtTime}:${message.text}`
    // document.querySelector('body').appendChild(li);
});

socket.on('newLocation',(message)=>{
    // const fmtTime=moment(message.timeStamp).format('LT');
    // console.log("Received Message",message);
    // let li=document.createElement('li');
    // let a =document.createElement('a');
    // li.innerText=`${message.from} ${fmtTime}:`
    // a.setAttribute('target','_blank');
    // a.setAttribute('href',message.url);
    // a.innerText="My current location";
    // li.appendChild(a);
    // document.querySelector('body').appendChild(li);


    const temp=document.querySelector('#location-template').innerHTML;
    const fmtTime=moment(message.timeStamp).format('LT');

    const html= Mustache.render(temp,{
        from: message.from,
        text: message.url,
        timeStamp: fmtTime
    });
    const div=document.createElement('div');
    div.innerHTML=html;
    document.querySelector('body').appendChild(div);
    scrollBottom();
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