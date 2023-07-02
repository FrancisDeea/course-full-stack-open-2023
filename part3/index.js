const express = require('express');
const app = express();
const PORT = 3001;

const persons = [
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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const date = new Date();
    const totalPersons = persons.length;

    response.send(`<p>Phonebook has info for ${totalPersons}.</p> <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const find = persons.find(person => person.id === id);

    if(!find) {
        return response.status(404).json({error: "Person not found"})
    }

    return response.json(find)
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})