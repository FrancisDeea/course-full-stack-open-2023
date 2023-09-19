import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    born: {
        type: Number
    },
    bookCount: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Author', schema)