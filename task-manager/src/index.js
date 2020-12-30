const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next)=>{
//     res.status(503).send('Maintanence mode')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


// _____________________________________________________________________________________________________________
// _____________________________________________________________________________________________________________

app.listen(port, () => {
    console.log(port + " listening")
})
