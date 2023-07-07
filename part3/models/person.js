const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGO_URI;

console.log("Connecting to MongoDB...")

mongoose
  .connect(url)
  .then(result => console.log("Connected to database successfully"))
  .catch(error => console.log("Error in connection", error.message))

const personSchema = new mongoose.Schema({
  "name": {
    "type": String, required: true, unique: true
  },
  "number": {
    "type": String, required: true, unique: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)