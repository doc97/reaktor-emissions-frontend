import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const CountrySelection = ({ countries, value, setCountry }) => {
  return (
    <Dropdown search selection clearable
      placeholder='Select Country'
      options={countries}
      value={value}
      onChange={setCountry} />
  )
}

export default CountrySelection