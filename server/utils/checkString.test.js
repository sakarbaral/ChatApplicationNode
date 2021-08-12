const expect=require('expect');

const{checkString}= require('./checkString');

describe('Check String',()=>{
    it("Should accept only strings",()=>{
            let lala=checkString(100);
            expect(lala).toBe(false);
    });
});

describe('Check Length',()=>{
    it("Should accept strings greater than length 0",()=>{
            let lala=checkString("");

            expect(lala).toBe(false);
    });
});