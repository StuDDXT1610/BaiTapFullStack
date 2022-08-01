const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    address: {
        required: true,
        type: String
    },
    gender:{
        required: true,
        type: String
    },   
    email: {
        required : true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)