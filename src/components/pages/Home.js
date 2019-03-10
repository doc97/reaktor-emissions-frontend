import React, { useState } from 'react'
import SearchBar from '../SearchBar';
import CountryList from '../CountryList';
import SortSelection from '../SortSelection';

const Home = ({ countries, sort, setSort }) => {
  const [search, setSearch] = useState('')

  const sortOptions = [
    {
      text: 'country code',
      value: 'country code'
    },
    {
      text: 'name',
      value: 'name'
    },
    {
      text: 'population (desc)',
      value: 'population (desc)'
    },
    {
      text: 'population (asc)',
      value: 'population (asc)'
    },
    {
      text: 'emissions (desc)',
      value: 'emissions (desc)'
    },
    {
      text: 'emissions (asc)',
      value: 'emissions (asc)'
    },
    {
      text: 'relative emissions (desc)',
      value: 'relative emissions (desc)'
    },
    {
      text: 'relative emissions (asc)',
      value: 'relative emissions (asc)'
    }
  ]

  const sortedCountries = () => {
    return countries.sort((a, b) => {
      const latestYear = '2017'
      const hasData = (obj, property) => {
        return obj.yearlyData[latestYear] !== undefined &&
          obj.yearlyData[latestYear][property] !== undefined &&
          obj.yearlyData[latestYear][property] !== null
      }
      const numericCompare = (a, b, property, desc=true) => {
        if (!hasData(a, property))
          return 1
        if (!hasData(b, property))
          return -1

        if (desc)
          return b.yearlyData[latestYear][property] - a.yearlyData[latestYear][property]
        return a.yearlyData[latestYear][property] - b.yearlyData[latestYear][property]
      }
      const relativeEmissionsCompare = (a, b, desc=true) => {
        if (!hasData(a, 'population') || !hasData(a, 'emissions'))
          return 1
        if (!hasData(b, 'population') || !hasData(b, 'emissions'))
          return -1

        const aRelativeEmissions = a.yearlyData[latestYear].emissions / a.yearlyData[latestYear].population
        const bRelativeEmissions = b.yearlyData[latestYear].emissions / b.yearlyData[latestYear].population
        if (desc)
          return bRelativeEmissions - aRelativeEmissions
        return aRelativeEmissions - bRelativeEmissions
      }

      switch (sort) {
        case 'country code':
          return ('' + a.key).localeCompare(b.key)
        case 'name':
          return ('' + a.name).localeCompare(b.name)
        case 'population (desc)':
          return numericCompare(a, b, 'population', true)
        case 'population (asc)':
          return numericCompare(a, b, 'population', false)
        case 'emissions (desc)':
          return numericCompare(a, b, 'emissions', true)
        case 'emissions (asc)':
          return numericCompare(a, b, 'emissions', false)
        case 'relative emissions (desc)':
          return relativeEmissionsCompare(a, b, true)
        case 'relative emissions (asc)':
          return relativeEmissionsCompare(a, b, false)
        default:
          return 0
      }
    })
  }

  return (
    <div>
      <h1>CO2-emissions</h1>
      <SearchBar setSearch={setSearch} />
      <SortSelection options={sortOptions} sort={sort} setSort={setSort} />
      <CountryList countries={sortedCountries()} search={search} />
    </div>
  )
}

export default Home