const generateMessageTime=(username,text)=>({username,text,
createdAt:new Date().getTime()})

const generateLocationTime=(username,text)=>({username,text,
    createdAt:new Date().getTime()})
    

module.exports = {generateMessageTime,generateLocationTime}


