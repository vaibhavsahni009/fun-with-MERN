const request=require('request')

const openWeather=require('./utils/openWeather.js')



if(process.argv[2])
openWeather(process.argv[2],(err,data)=>{
    // Thought of destructuring data but in case of 
    // err it will give undefined so might find work around that
if(err)return console.log(err)
console.log(data.name)
console.log(data.forecast)


})
else console.log('Provide a valid city name')