import React, { useState, useEffect } from 'react'
import dataService from '../../services/emissions'
import NotFound from './NotFound';

const Country = ({ countryKey, perCapita }) => {
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

  const yearlyData = (data) => {
    const years = Object.keys(data).sort((a, b) => b - a) // descending order
    const elems = years.map(year => {
      const pop = data[year].population
      let co2 = data[year].emissions

      if (pop === null && co2 === null)
        return null

      if (perCapita && co2 !== null)
        co2 = pop == null ? 'N/A' : (1000 * co2 / pop).toFixed(5)

      return (
        <tr key={year}>
          <td align="center">{year}</td>
          <td align="center">{pop === null ? 'N/A' : pop}</td>
          <td align="center">{co2 === null ? 'N/A' : co2}</td>
        </tr>
      )
    })

    return (
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Population</th>
            <th>Emissions ({perCapita ? 't/capita' : 'kt'})</th>
          </tr>
        </thead>
        <tbody>
          {elems}
        </tbody>
      </table>
    )
  }

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
        <div>{yearlyData(data.yearlyData)}</div>
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