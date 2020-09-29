const express = require('express')
const path = require('path')
const hbs =require('hbs')

const app=express()
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
    res.send({
        forecast:'something',
        name:'delhi'
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

app.listen(3000,()=>{

    console.log("server Started")
})