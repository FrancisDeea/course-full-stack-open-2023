require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const Person = require('./models/person');
const person = require('./models/person');

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

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({ "error": "Name missing" })
    }
    if (!body.number) {
        return response.status(400).json({ "error": "Number missing" })
    }

    Person
        .find({ "name": body.name })
        .then(result => {
            return response.status(400).json({ "error": "This person already exists in database" })
        })
        .catch(error => console.log(error.message))

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(result => {
        console.log(`${result.name} was added to database successfully`)
        response.json(result)
    })

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(result => response.json(result))
        .catch(error => console.log(error))
})

app.get('/api/info', (request, response) => {
    const date = new Date();
    const totalPersons = persons.length;

    response.send(`<p>Phonebook has info for ${totalPersons}.</p> <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const find = persons.find(person => person.id === id);

    if (!find) {
        return response.status(404).json({ error: "Person not found" })
    }

    response.json(find)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})