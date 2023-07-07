require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const Person = require('./models/person');

const generateId = () => {
    const maxId = Math.max(...persons.map(person => person.id))
    return Math.floor(Math.random() * (9999 - maxId) + maxId)
}

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))

app.use(cors())

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({ "error": "Name missing" })
    }
    if (!body.number) {
        return response.status(400).json({ "error": "Number missing" })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(result => {
            console.log(`${result.name} was added to database successfully`)
            response.json(result)
        })
        .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        "name": body.name,
        "number": body.number
    }

    Person
        .findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(result => {
            console.log("This person was deleted from database successfully: ", result)
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(result => response.json(result))
        .catch(error => console.log(error))
})

app.get('/api/info', async (request, response, next) => {
    const date = new Date();
    const totalPersons = await Person.estimatedDocumentCount();

    response.send(`<p>Phonebook has info for ${totalPersons}.</p> <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(note => {
            if (note) {
                return response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ "error": "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ "error": "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({"error": error.message})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})