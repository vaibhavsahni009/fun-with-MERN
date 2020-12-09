require('../src/db/mongoose')
const User = require('../src/models/user')



// 5fb3e5678a4f64fce23137a7

User.findByIdAndUpdate('5fb419ea38763a60ee860acb', {
    age: 20
}).then((user) => {
    console.log(user)
    return User.countDocuments({
        age: 20
    })
}).then((result) => {
    console.log(result)
}).catch(e => {
    console.log(e)
})