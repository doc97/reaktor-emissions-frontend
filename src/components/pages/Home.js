import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import SearchBar from '../SearchBar';
import CountryList from '../CountryList';
import SortSelection from '../SortSelection';
import YearSelection from '../YearSelection';

const Home = ({ countries, sort, setSort, year, setYear }) => {
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

  const lastYear = new Date().getFullYear() - 1
  const years = [...Array(59).keys()].map(i => lastYear - i).sort((a, b) => b - a)
  const yearOptions = years.map(y => {
    return {
      text: '' + y,
      value: '' + y
    }
  })

  const sortedCountries = () => {
    return countries.sort((a, b) => {
      const hasData = (obj, property) => {
        return obj.yearlyData[year] !== undefined &&
          obj.yearlyData[year][property] !== undefined &&
          obj.yearlyData[year][property] !== null
      }
      const numericCompare = (a, b, property, desc=true) => {
        if (!hasData(a, property))
          return 1
        if (!hasData(b, property))
          return -1

        if (desc)
          return b.yearlyData[year][property] - a.yearlyData[year][property]
        return a.yearlyData[year][property] - b.yearlyData[year][property]
      }
      const relativeEmissionsCompare = (a, b, desc=true) => {
        if (!hasData(a, 'population') || !hasData(a, 'emissions'))
          return 1
        if (!hasData(b, 'population') || !hasData(b, 'emissions'))
          return -1

        const aRelativeEmissions = a.yearlyData[year].emissions / a.yearlyData[year].population
        const bRelativeEmissions = b.yearlyData[year].emissions / b.yearlyData[year].population
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
      <Grid stackable columns={2}>
        <Grid.Row>
          <Grid.Column computer={10}>
            <SearchBar setSearch={setSearch} />
          </Grid.Column>
          <Grid.Column width={4}>
            <YearSelection
              options={yearOptions}
              year={year}
              setYear={setYear} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <SortSelection options={sortOptions} sort={sort} setSort={setSort} />
      <CountryList countries={sortedCountries()} search={search} />
    </div>
  )
}

export default Home