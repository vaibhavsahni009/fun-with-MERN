
const {MongoClient,ObjectID} =require('mongodb')



const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'


MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true},(error,client)=>{
    if(error){
        return console.log('unable to connect to database')
    }

    console.log('connected')
    const db=client.db(databaseName)


    // db.collection('users').insertMany([{
    //     name:'Vaibhav',
    //     age:20
    // },{
    //     name:'Dhruv',
    //     age:20
    // }],(error,result)=>{

    //     if(error){
    //         return console.log('unable to insert document');
    //     }
    //     console.log(result.ops);

    // })

//     db.collection('tasks').insertMany([{
//         description:'first task',
//         completed: true
//     },{
//         description:'second task',
//         completed: false
//     },{
//         description:'third task',
//         completed: false
//     }
// ],(error,result)=>{

//         if(error){
//             return console.log('unable to insert document');
//         }
//         console.log(result.ops);

//     })

db.collection('tasks').findOne({_id:new ObjectID('5f92de4cd5b1dcaef41753c5')},(error,task)=>{

    if(error){
        return console.log('Unable to fetch')
    }

    console.log(task)

})

db.collection('tasks').find({completed:false}).toArray((error,task)=>{
    
    if(error){
        return console.log('Unable to fetch')
    }
    
    console.log(task)

})

})