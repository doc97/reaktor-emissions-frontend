import React, { useState, useEffect } from 'react'
import PerCapitaToggle from '../PerCapitaToggle'
import CountryData from '../CountryData';
import CountrySelection from '../CountrySelection';
import emissionService from '../../services/emissions'
import { Button, Icon } from 'semantic-ui-react';

const Compare = ({ countries, perCapita, togglePerCapita }) => {
  const [countryA, setCountryA] = useState(null)
  const [countryB, setCountryB] = useState(null)
  const [combined, setCombined] = useState(null)

  useEffect(() => {
    if (countryA === null || countryB === null) {
      setCombined(null)
      return
    }
    
    const combinedData = {}
    const years = new Set([...Object.keys(countryA.yearlyData), ...Object.keys(countryB.yearlyData)])
    years.forEach(year => {
      const popA = countryA.yearlyData[year].population
      const popB = countryB.yearlyData[year].population
      const co2A = countryA.yearlyData[year].emissions
      const co2B = countryB.yearlyData[year].emissions

      combinedData[year] = {
        population: (!popA || !popB) ? null : popA - popB,
        emissions: (!co2A || !co2B) ? null : co2A - co2B
      }
    })
    setCombined(combinedData)
  }, [ countryA, countryB ])

  const setCountryData = (key, setData) => {
    emissionService.getCountryData(key)
      .then(result => {
        setData(result)
      })
      .catch(_ => setData(null))
  }

  const switchCountries = () => {
    const tmp = countryA
    setCountryA(countryB)
    setCountryB(tmp)
  }

  const toOption = (country) => {
    return {
      text: !country ? '' : country.name,
      value: !country ? '' : country.key
    }
  }

  const toValue = (country) => !country ? '' : country.key

  const countryOptions = countries.map(country => toOption(country))

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <CountrySelection
          countries={countryOptions}
          value={toValue(countryA)}
          setCountry={(event, data) => { setCountryData(data.value, setCountryA)}} />
        <span style={{ marginLeft: 15, marginRight: 10 }}>
          <Button color='blue' onClick={() => switchCountries()}>
            <Button.Content>
              <Icon name='exchange' />
            </Button.Content>
          </Button>
        </span>
        <CountrySelection
          countries={countryOptions}
          value={toValue(countryB)}
          setCountry={(event, data) => { setCountryData(data.value, setCountryB)}} />
      </div>
      <PerCapitaToggle togglePerCapita={togglePerCapita} />
      { combined &&
        <CountryData data={combined} perCapita={perCapita} />
      }
    </div>
  )
}

export default Compare