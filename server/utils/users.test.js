const expect = require("expect");

const {users}=require('./users.js');

describe('user',()=>{
    let usero;

    beforeEach(()=>{
        usero= new users();
        usero.users=[{
            id:'1',
            name:'Ram',
            room:'Joker'
        },{
            id:'2',
            name:'Shyam',
            room:'Batman'
        },{
            id:'3',
            name:'Ghanshyam',
            room:'Batman'
        }];
    });
    it("Should add new users",()=>{
        let user1 =new users();
        usera={
            id:'idtest',
            name:'nametest',
            room:'roomtest'
        };
        let luser=user1.addUser(usera.id,usera.name,usera.room);

        expect(user1.users).toEqual([usera]);

    });

    it('Should return names in Batmnan Room',()=>{
        let user=usero.getUsers('Batman');

        expect(user).toEqual(['Shyam','Ghanshyam']);
    })

    it("Should find user from id",()=>{
        let id='10';
        user=usero.getUserByID(id);

        expect(usero.id).toBeUndefined();

        id='2';
        user=usero.getUserByID(id);
        expect(user.id).toBe(id);
    });

    it('Should remove user',()=>{
        let id='1';
        user=usero.removeUser(id);

        expect(user.id).toBe(id);
        expect(usero.users.length).toBe(2);
    });

    it('Should not remove user',()=>{
        let id='100';
        user=usero.removeUser(id);

        expect(user).toBeUndefined();
        expect(usero.users.length).toBe(3);
    })
});