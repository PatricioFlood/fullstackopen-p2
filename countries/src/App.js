import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ResCountries from './components/ResCountries'

const App = () => {

  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
  }, [])

  const filterCountries = newSearch === ''
    ? countries
    : countries.filter(country => country
      .name
      .common
      .toLowerCase()
      .includes(newSearch.toLowerCase())
    )

  const handleSearchChange = event => {
    setNewSearch(event.target.value)
  }

  const setSearchCountry = (country) => () => {
    setNewSearch(country)
  }

  return (
    <div>
      <h1>Countries</h1>
      find countries <input value={newSearch} onChange={handleSearchChange}></input>
      <div>
        <ResCountries filterCountries={filterCountries} setSearchCountry={setSearchCountry} />
      </div>
    </div>
  )
}

export default App