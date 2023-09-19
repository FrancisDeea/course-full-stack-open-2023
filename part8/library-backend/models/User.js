import mongoose from 'mongoose';

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

export default mongoose.model('User', schema)