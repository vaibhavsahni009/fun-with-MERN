const express = require('express');
const User =require('../models/user')
const auth=require('../middleware/auth')
const multer=require('multer');
const router= new express.Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token= await user.generateAuthToken()
        
        res.status(201).send({user,token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/user/login',async (req,res)=>{
    try {
        
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token= await user.generateAuthToken()
        res.send({user,token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try {
        
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })

        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


router.post('/users/logoutAll',auth,async (req,res)=>{
    try {
        
        req.user.tokens=[]

        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me',auth, async (req, res) => {

    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (error) {
    //     res.status(500).send(error)
    // }

    res.send(req.user)
})

router.get('/users/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/users/me',auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'password', 'email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            'errror': 'Invalid Updates!'
        })
    }

    try {

        const user = await req.user
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save()

        // if (!user) {
        //     return res.status(404).send()
        // }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }

})

router.delete('/users/me',auth, async (req, res) => {

    try {
        // const user = await User.findByIdAndDelete(req.params.id)
        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

const upload=multer({
    dest:'avatars',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpeg|jpg)$/)){
            return cb(new Error('Please upload an image file'))
        }

        cb(undefined,true)
    }
})

router.post('/users/me/avatar',upload.single('avatar'),(req,res)=>{
    res.send()
},(error,req,res,next)=>{
  res.status(400).send({Error:error.message})  
})

module.exports=router