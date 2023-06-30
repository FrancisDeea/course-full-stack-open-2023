import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import axios from 'axios'
import services from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const numbersToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const handleClickDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      services.removePerson(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)))
        .catch(error => console.log(error))
    }
  }

  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleUpdate = (id, newPerson) => {
    services
      .updatePerson(id, newPerson)
      .then(updatedPerson => setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson)))
      .catch(error => console.log(error))

    setNewName("");
    setNewNumber("");
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const findPerson = persons.find(person => person.name === newName);

    if (findPerson && findPerson.number === newNumber) return alert(`${newName} is already added to phonebook`)

    if (findPerson && findPerson.number !== newNumber) {
      const newPerson = { ...findPerson, number: newNumber }
      if (window.confirm(`${findPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
         return handleUpdate(findPerson.id, newPerson)
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    services.createPerson(newPerson)
      .then(createdPerson => setPersons(persons.concat(createdPerson)))
      .catch(error => console.log(error))

    setNewName("")
    setNewNumber("")
  }

  useEffect(() => {
    services.getAll()
      .then(serverPersons => setPersons(serverPersons))
      .catch(error => console.log(error))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={filter} onchange={handleChangeFilter} />

      <h2>Add new</h2>
      <Form
        number={newNumber}
        name={newName}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={numbersToShow} onclick={handleClickDelete} />

    </div>
  )
}

export default App