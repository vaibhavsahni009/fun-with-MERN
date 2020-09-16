const request=require('request')

const openWeather=require('./utils/openWeather.js')



openWeather('delhi',(err,data)=>{

console.log('Error' ,err)
console.log('Data',data)


})