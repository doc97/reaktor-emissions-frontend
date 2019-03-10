import React from 'react'
import { Dropdown } from 'semantic-ui-react';

const YearSelection = ({ options, year, setYear }) => (
  <Dropdown selection
    options={options}
    defaultValue={year}
    onChange={(event, data) => {
      setYear(data.value)
    }} />
)

export default YearSelection