const express=require('express');
require('./db/mongoose')
const User=require('./models/user')
const Task=require('./models/task')


const app = express()
const port=process.env.PORT||3000

app.use(express.json())

app.post('/users',async(req,res)=>{
    const user=new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }

    // user.save().then(
    //     ()=>{res.status(201).send(user)}
    //     ).catch((e)=>{
    //             res.status(400).send(e)}
    //         )
    
    // res.send('testing')
} )

app.get('/users',async(req,res)=>{

    try {
        const users=await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
    // User.find({}).then(
    //     (users)=>{
    //         res.send(users)
    //     }).catch((e)=>{
    //         res.status(500).send()
    //     })
})

app.get('/users/:id',async(req,res)=>{

    try {
        const user=await User.findById(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }

    // User.findById(req.params.id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})
// _____________________________________________________________________________________________________________
// _____________________________________________________________________________________________________________

app.get('/tasks',async (req,res)=>{
    try {
        const tasks=await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
    // Task.find({}).then(
    //     (tasks)=>{
    //         res.send(tasks)
    //     }).catch((e)=>{
    //         res.status(500).send()
    //     })
})

app.get('/tasks/:id',async (req,res)=>{
    try {
        const task=await Task.findById(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }

    // Task.findById(req.params.id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

app.post('/tasks',(req,res)=>{
    const task=new Task(req.body)

    try {
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }

    // task.save().then(
    //     ()=>{res.status(201).send(task)}
    //     ).catch((e)=>{
    //             res.status(400).send(e)}
    //         )
    
    // res.send('testing')
} )

app.listen(port,()=>{
    console.log(port+" listening")
})