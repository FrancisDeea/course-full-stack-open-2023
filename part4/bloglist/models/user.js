const mongoose = require('mongoose')
const validatorUnique = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: String,
    username: {"type": String, minLength: 3, required: true, unique: true},
    passwordHash: {"type": String, required: true},
    blogs: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.plugin(validatorUnique)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User