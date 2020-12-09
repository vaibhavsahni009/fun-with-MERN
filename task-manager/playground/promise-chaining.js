require('../src/db/mongoose')
const User = require('../src/models/user')



// 5fb3e5678a4f64fce23137a7

// User.findByIdAndUpdate('5fb419ea38763a60ee860acb', {
//     age: 20
// }).then((user) => {
//     console.log(user)
//     return User.countDocuments({
//         age: 20
//     })
// }).then((result) => {
//     console.log(result)
// }).catch(e => {
//     console.log(e)
// })

const updateAndCount = async (id, age) => {

    const user = await User.findByIdAndUpdate(id, {
        age
    })
    const count = await User.countDocuments({
        age
    })
    return count
}


updateAndCount('5fb419ea38763a60ee860acb', 2).then((count) => {
    console.log(count)
}).catch(e => console.log(e))