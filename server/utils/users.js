// [{

// }]



class users{
    constructor(){
        this.users=[];
    }
    addUser(id,name,room){
        let user={id,name,room};
        this.users.push(user);
            return user;
    }

    getUsers(room){
        let users=this.users.filter((user)=>user.room===room);
        let names=users.map((user)=> user.name);

        return names;
    }

    getUserByID(id){
        return this.users.filter((user)=>user.id==id)[0];
    }

    removeUser(id){
        let user=this.getUserByID(id);

        if(user){
            this.users=this.users.filter((user)=> user.id !== id);
        }

        return user;
    }


}


module.exports={users};