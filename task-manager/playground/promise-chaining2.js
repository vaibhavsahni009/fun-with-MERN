require('../src/db/mongoose')
const Task = require('../src/models/task')


// Task.findByIdAndDelete('5faacd17314b94f7988884e1').then((task) => {
//     console.log(task)
//     return Task.countDocuments({
//         completed: false
//     })
// }).then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({
        completed: false
    })
    return count
}

deleteTaskAndCount('5faacd17314b94f7988884e1').then(result => console.log(result)).catch(e => console.log(e))