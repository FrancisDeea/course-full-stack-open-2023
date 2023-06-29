import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const numbersToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const find = persons.some(person => person.name === newName)

    if (find) return alert(`${newName} is already added to phonebook`)

    const newPerson = {
      name: newName,
      number: newNumber
    }

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => setPersons(persons.concat(response.data)))
      .catch(error => console.log(error))

    setNewName("")
    setNewNumber("")
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => setPersons(response.data))
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
      <Persons persons={numbersToShow} />

    </div>
  )
}

export default App