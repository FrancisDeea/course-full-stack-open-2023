require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())

// eslint-disable-next-line no-unused-vars
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))

app.use(cors())

app.post('/api/persons', (request, response, next) => {
  const body = request.body

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
  const body = request.body

  const person = {
    "name": body.name,
    "number": body.number
  }

  Person
    .findByIdAndUpdate(request.params.id, person, { runValidators: true, new: true })
    .then(updatedPerson => updatedPerson.toJSON())
    .then(updatedPerson => response.json(updatedPerson))
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

// eslint-disable-next-line no-unused-vars
app.get('/api/info', async (request, response, next) => {
  const date = new Date()
  const totalPersons = await Person.estimatedDocumentCount()

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
    return response.status(400).json({ "error": error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})