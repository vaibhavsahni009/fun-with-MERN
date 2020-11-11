const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})


// const User = mongoose.model('User',{
//     name:{
//         type: String
//     },
//     age:{
//         type:Number}
// })

// const me= new User({
//     name:"Vaibhav",
//     age:20
// })

// me.save().then((user)=>{
//     console.log(user)
// }).catch((e)=>{
//     console.log(e)
// })

const Task =mongoose.model('Task',{
    completed:{
        type:Boolean,
        
    },
    description:{
        type:String}
})

const task =new Task({
    completed:false,
    
    description:'Completing this app'
})

task.save().then((task)=>{
    console.log(task)
}).catch((e)=>{
    console.log(e)
})