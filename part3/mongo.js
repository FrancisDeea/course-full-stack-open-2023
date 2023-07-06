const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("Please specify a valid password as an argument to connect to database: node mongo.js <password>")
    process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://admin:${password}@cluster0.lykmqds.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose
    .connect(url)
    .then(result => console.log("Connected to database successfully"))
    .catch(error => {
        console.log(error)
        process.exit()
    })

const personSchema = new mongoose.Schema({
    "name": String,
    "number": String
})

const Person = new mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    const person = new Person({
        "name": process.argv[3],
        "number": process.argv[4]
    })

    person.save().then(result => {
        console.log(`Added ${result.name} with number: <${result.number}> to phonebook`)
        mongoose.connection.close()
    })
} else if (process.argv.length === 3) {
    console.log("Phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
    console.log("You have to provide exact parameters in correct order. Try again!")
    process.exit(1)
}