const users=[]

const addUsers=({id,username,room})=>{

username=username.trim().toLowerCase()
room=room.trim().toLowerCase()

if(!username||!room){
    return {
        error:'Username and room required'
    }
}

const existingUser=users.find((user)=>{
    return username===user.username && room===user.room
})

if(existingUser){
    return{
        error:'Username in use'
    }
}

const user={id,username,room}
users.push(user)
return {user}

}


addUsers({
    id:22,
    username:'Vaibhav ',
    room:' New Delhi '

})

console.log(users)

const res=addUsers({
    id:33,
    username:'vaibhav',
    room:'New delhi'
})

console.log(res)

