import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    published: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: {
        type: [String],
        required: true
    }
})

export default mongoose.model('Book', schema)
