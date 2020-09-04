const fs = require('fs')


// fs.writeFileSync('1-json.json','{"name":"Andrew","planet":"Earth","age":27}')

const dataBuffer=fs.readFileSync('1-json.json')

var jsonData=dataBuffer.toString()

var data=JSON.parse(jsonData)

data.name="Vaibhav"
data.age=20

jsonData=JSON.stringify(data)

fs.writeFileSync('1-json.json',jsonData)
