
const {MongoClient,ObjectID} =require('mongodb')



const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'


MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true},(error,client)=>{
    if(error){
        return console.log('unable to connect to database')
    }

    console.log('connected')
    const db=client.db(databaseName)


    // db.collection('users').updateOne({_id:new ObjectID("5f91997b0c21606aca1ef498")},
    // {
    //     $set:{
    //         age:20
           
            
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((e)=>{
    //     console.log(e)
    // })

    // db.collection('tasks').updateMany({completed:false},
    // {
    //     $set:{
    //         completed:true
           
            
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((e)=>{
    //     console.log(e)
    // })


    db.collection('tasks').deleteOne({
        description:"second task"
    }).then((result)=>console.log(result)).catch((e)=>{console.log(e)})
})