import React from 'react'

const CountrySelect = ({ setCountry, countries }) => {
  const options = countries.map(country => {
    return (
      <option
        key={country.key}
        value={country.key}>
        {country.name}
      </option>
    )
  })

  const handleSelect = (event) => {
    const country = countries.filter(c => c.key === event.target.value)[0]
    setCountry(country === undefined ? null : country)
  }

  return (
    <div>
      <select onChange={handleSelect}>
        <option key='' value=''>Choose a country</option>
        {options}
      </select>
    </div>
  )
}

export default CountrySelect