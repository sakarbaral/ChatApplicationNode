let expect = require('expect');

let{createMessage,getMap} = require('./message');

describe('Create message',()=>{
    it("Should generate correct message",()=>{
        let from="joka",
        text="Random"
        message=createMessage(from,text);

    expect(typeof message.timeStamp).toBe('number');
    expect(message).toMatchObject({from,text});
    });
});

describe("Get map",()=>{
    it("Should generate the map with location",()=>{
        let from="Koka",
        lat=20,
        lng=19,
        url=`https://www.google.com/maps?q=${lat},${lng}`,
        message=getMap(from,lat,lng);


    expect(typeof message.timeStamp).toBe('number');
    expect(message).toMatchObject({from,url});

    })
})
