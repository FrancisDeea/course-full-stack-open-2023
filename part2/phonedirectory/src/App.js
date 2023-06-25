import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
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

    const find = persons.find(person => person.name === newName)

    if (find) return alert(`${newName} is already added to phonebook`)

    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      Filter (shown with): <input value={filter} onChange={handleChangeFilter} />
      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input type='tel' value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        numbersToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)
      }

    </div>
  )
}

export default App