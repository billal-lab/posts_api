const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id:{
        type: mongoose.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema)