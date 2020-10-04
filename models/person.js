const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    favoriteFood: {
        type: [String]
    }
})

let Person=module.exports = mongoose.model('singlePerson', personSchema)