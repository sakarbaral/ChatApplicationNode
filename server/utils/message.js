const moment=require('moment');

var createMessage= (from,text)=>{
return {
        from,
        text,
        timeStamp: moment().valueOf()
    };
};

let getMap=(from,lat,lng)=>{
    return{
        from,
        url:`https://www.google.com/maps?q=${lat},${lng}`,
        timeStamp: moment().valueOf()
    };
};

module.exports={createMessage,getMap}