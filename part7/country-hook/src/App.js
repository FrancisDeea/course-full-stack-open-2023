import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

  useEffect(() => {
    if (name) {
      axios.get(`${baseUrl}/${name}`).then((response) => {
        setCountry(response)
      })
      .catch((error) => {
        setCountry(error.response.status)
      })
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country === 404) {
    return (
      <div>
        <p>Not found...</p>
      </div>
    )
  }

  const { name, flags, population, capital } = country.data;

  return (
    <div>
      <h3>{name.common} </h3>
      <div>capital {capital[0]} </div>
      <div>population {population}</div>
      <img src={flags.svg} height='100' alt={`flag of ${name.common}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App