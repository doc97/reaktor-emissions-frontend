import React, { useState, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import dataService from './services/emissions'
import SearchBar from './components/SearchBar';
import PerCapitaCheckbox from './components/PerCapitaCheckbox';
import CountryList from './components/CountryList';

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [perCapita, setPerCapita] = useState(false)

  useEffect(() => {
    dataService.getData()
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

  const togglePerCapita = () => { setPerCapita(!perCapita) }

  return (
    <Grid centered columns={1}>
      <Grid.Column width={5}>
        <h1>CO2-emissions</h1>
        <SearchBar setSearch={setSearch} />
        <PerCapitaCheckbox togglePerCapita={togglePerCapita} />
        <CountryList countries={countries} search={search} />
      </Grid.Column>
    </Grid>
  )
}

export default App
