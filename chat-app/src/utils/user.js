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

const getUser=(id)=>{
    const existingUser=users.find((user)=>{
        return id===user.id
})
if(existingUser)return existingUser
return undefined

}

const getUsersInRoom=(room)=>{

const usersInRoom=users.filter((user)=>user.room===room)

if(usersInRoom)return usersInRoom
return []

}

const removeUser=(id)=>{
    const index=users.findIndex((user)=>user.id===id)

    if(index!==-1){
        return users.splice(index,1)[0]
    }
}

addUsers({
    id:22,
    username:'Vaibhav ',
    room:' New Delhi '

})

addUsers({
    id:32,
    username:'Mike ',
    room:' New Delhi '

})

addUsers({
    id:42,
    username:'Vaibhav ',
    room:'Mumbai '

})



console.log(users)

console.log(getUser(22))
console.log(getUser(52))

console.log(getUsersInRoom('new delhi'))
console.log(getUsersInRoom('kolkata'))

// console.log(removeUser(22))

// console.log(users)

// const res=addUsers({
//     id:33,
//     username:'vaibhav',
//     room:'New delhi'
// })

// console.log(res)

