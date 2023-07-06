const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

console.log("Connecting to MongoDB...")

mongoose
    .connect(url)
    .then(result => console.log("Connected to database successfully"))
    .catch(error => console.log("Error in connection", error.message))

const personSchema = new mongoose.Schema({
    "name": String,
    "number": String
})

module.exports = mongoose.model('Person', personSchema)