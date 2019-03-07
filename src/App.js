import React, { useState, useEffect } from 'react'
import Result from './components/Result'
import CountrySelection from './components/CountrySelection'
import dataService from './services/emissions'

const App = () => {
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState([])
  const [perCapita, setPerCapita] = useState(false)

  useEffect(() => {
    dataService.getData()
      .then(json => JSON.parse(json))
      .then(obj => {
        const countryData = Object.keys(obj).map(key => {
          return {
            key,
            name: obj[key].name
          }
        })
        setCountries(countryData)
      })
  }, [])

  return (
    <div>
      <h1>CO2-emissions</h1>
      <CountrySelection
        setCountry={setCountry}
        countries={countries} />
      <Result country={country} perCapita={perCapita} />
    </div>
  )
}

export default App
