const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    login:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: [6,"password too easy to break"]
    }
})
userSchema.plugin(uniqueValidator, { message: 'Error, +{PATH} already exists.' })
module.exports = mongoose.model('User',userSchema)