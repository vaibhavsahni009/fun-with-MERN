const request = require('request')



const openWeather=(address,callback)=>{

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(address)}&units=metric&appid=1a8c679aec2646f20ff70bb853785c1b`
    request({url, json:true},(err,{body})=>{
        if (err)callback('Unable to connect to internet!')
        else if (body.cod!==200)callback(body.message)
        else 
        callback(undefined,
            {
                city:body.name,
                forecast:`It's currently ${body.main.temp} degrees out with some ${body.weather[0].description}.`
            })


    })


}

module.exports=openWeather