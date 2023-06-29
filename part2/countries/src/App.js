import { useEffect, useState } from 'react';
import Result from './components/Result';
import Search from './components/Search';
import axios from 'axios';

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    const filter = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()));
    setResult(filter)


  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => setCountries(response.data))
  }, [])

  return (
    <>
      <div>
        <Search search={search} handleChange={handleChange} />
      </div>

      <div>
        <Result data={result} setData={setResult} />
      </div>
    </>
  )
}

export default App