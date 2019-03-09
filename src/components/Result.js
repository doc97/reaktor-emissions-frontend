import React, { useState, useEffect } from 'react'
import dataService from '../services/emissions'

const Result = ({ country }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!country) {
      setData(null)
    } else {
      dataService.getCountryData(country.key)
        .then(result => {
          setData(result)
        })
    }
  }, [ country ])

  const style = {
    marginTop: 10,
    padding: 5,
    border: 'solid',
    borderWidth: 2
  }

  const yearlyData = (data) => {
    const years = Object.keys(data).sort((a, b) => b - a) // descending order
    const elems = years.map(year => {
      const pop = data[year].population
      const co2 = data[year].emissions

      if (pop === null && co2 === null)
        return null

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
            <th>Emissions</th>
          </tr>
        </thead>
        <tbody>
          {elems}
        </tbody>
      </table>
    )
  }

  const elem = () => {
    if (!data)
      return null
    
    return (
      <div style={style}>
        <h2>Country: {data.name} ({data.key})</h2>
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

export default Result