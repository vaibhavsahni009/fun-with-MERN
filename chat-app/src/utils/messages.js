const generateMessageTime=(text)=>({text,
createdAt:new Date().getTime()})

const generateLocationTime=(text)=>({text,
    createdAt:new Date().getTime()})
    

module.exports = {generateMessageTime,generateLocationTime}


