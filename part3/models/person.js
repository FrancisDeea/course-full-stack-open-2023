const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// eslint-disable-next-line no-undef
const url = process.env.MONGO_URI

console.log("Connecting to MongoDB...")

mongoose
  .connect(url)
  // eslint-disable-next-line no-unused-vars
  .then(result => console.log("Connected to database successfully"))
  .catch(error => console.log("Error in connection", error.message))

const numberValidator = [
  {
    validator: (number) => {
      const regex = /(?=\S{8,})(^(\d+-?)+\d+$)/g
      return regex.test(number)
    },
    msg: "Number must have 8 digits (hyphens inclusive)"
  }
]


const personSchema = new mongoose.Schema({
  "name": {
    "type": String, required: true, unique: true, minLength: 3
  },
  "number": {
    "type": String, required: true, unique: true, validate: numberValidator
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