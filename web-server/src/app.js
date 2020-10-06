const express = require('express')
const path = require('path')
const hbs =require('hbs')
const openWeather=require('./utils/openWeather')

const app=express()
const port = process.env.PORT || 3000

const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')


app.use(express.static(publicDirPath))

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather'
    ,    name:'Ging'
    
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name:'Ging'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        help_message:'Well help',
        name:'Ging'

    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.city){
        return res.send({
            error:'You must provide an address'
        })
    }

    openWeather(req.query.city,(err,{city='No city',forecast='No forecast'}={})=>{
        //using default for empty data
    if(err)return res.send({error: err})
    // console.log(data.name)
    // console.log(data.forecast)
    
    res.send({
        address:req.query.city,
        forecast,
        city
    })
    })


})

app.get('/help/*',(req, res)=>{
    res.render('page_not_found',{
        title:'404',
        message:'Help Article not found',
        name:'Ging'

    })
})

app.get('*',(req, res)=>{
    res.render('page_not_found',{
        title:'404',
        message:'Page not found',
        name:'Ging'

    })
})

app.listen(port,()=>{

    console.log("server Started")
})