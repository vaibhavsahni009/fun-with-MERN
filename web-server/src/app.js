const express = require('express')
const path = require('path')

const app=express()
const publicDir=path.join(__dirname,'../public')

app.use(express.static(publicDir))




app.get('/weather',(req,res)=>{
    res.send({
        forecast:'something',
        name:'delhi'
    })

})


app.listen(3000,()=>{

    console.log("server Started")
})