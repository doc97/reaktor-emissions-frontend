import React, { useState, useEffect } from 'react'
import dataService from '../../services/emissions'
import PerCapitaToggle from '../PerCapitaToggle'
import NotFound from './NotFound';
import CountryData from '../CountryData';

const Country = ({ countryKey, perCapita, togglePerCapita }) => {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    if (!countryKey) {
      setData(null)
    } else {
      dataService.getCountryData(countryKey)
        .then(result => {
          setData(result)
        })
        .catch(_ => setData(null))
    }
  }, [ countryKey ])

  const elem = () => {
    if (data === undefined)
      return null
    if (data === null)
      return <NotFound />

    const style = {
      marginTop: 10,
      padding: 5,
    }

    return (
      <div style={style}>
        <h1>Country: {data.name} ({data.key})</h1>
        <PerCapitaToggle togglePerCapita={togglePerCapita} />
        <CountryData data={data.yearlyData} perCapita={perCapita} />
      </div>
    )
  }

  return (
    <div>
      {elem()}
    </div>
  )
}

export default Country