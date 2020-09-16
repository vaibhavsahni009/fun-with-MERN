const request = require('request')



const openWeather=(address,callback)=>{

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(address)}&units=metric&appid=1a8c679aec2646f20ff70bb853785c1b`
    request({url, json:true},(err,res)=>{
        if (err)callback('Unable to connect to internet!')
        else if (res.body.cod!==200)callback(res.body.message)
        else callback(undefined,`It's currently ${res.body.main.temp} degrees out with some ${res.body.weather[0].description}.`)


    })


}

module.exports=openWeather