const request=require('request')

const openWeather=require('./utils/openWeather.js')



if(process.argv[2])
openWeather(process.argv[2],(err,{name='No city',forecast='No forecast'}={})=>{
//default parameter
if(err)return console.log(err)
console.log(name)
console.log(forecast)


})
else console.log('Provide a valid city name')