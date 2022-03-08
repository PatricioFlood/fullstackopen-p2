import React from 'react'
import Wheather from './Weather'

const Countries = ({ filterCountries, setSearchCountry }) => {
  const length = filterCountries.length
  if (length > 10) return (
    <p>Too many matches, specify another filter</p>
  )
  else if (length === 1) return (
    <Country country={filterCountries[0]} />
  )
  else if (length === 0) return (
    <div>
      <p>No countries found</p>
    </div>
  )
  else return (
    <div>
      {filterCountries.map(
        country => (
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={setSearchCountry(country.name.common)}>show</button>
          </p>
        )
      )}
    </div>
  )
}

const Country = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>Capital {country.capital}</p>
    <p>Population {country.population}</p>
    <h3>Languages</h3>
    <ul>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt={'country flag'} />
    <Wheather countryName={country.name.common} />
  </div>
)

export default Countries