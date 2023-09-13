const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 5,
        required: true,
        unique: true
    },

    favoriteGenre: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', schema)