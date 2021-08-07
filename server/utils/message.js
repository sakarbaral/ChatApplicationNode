var createMessage= (from,text)=>{
return {
        from,
        text,
        timeStamp: new Date().getTime()
    };
};

let getMap=(from,lat,lng)=>{
    return{
        from,
        url:`https://www.google.com/maps?q=${lat},${lng}`,
        timeStamp: new Date().getTime()
    };
};

module.exports={createMessage,getMap}