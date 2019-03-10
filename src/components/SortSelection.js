import React from 'react'
import { Dropdown } from 'semantic-ui-react';

const SortSelection = ({ options, sort, setSort }) => (
  <span>
    Sort by{' '}
    <Dropdown inline upward={false}
      options={options}
      defaultValue={sort}
      onChange={(event, data) => {
        setSort(data.text)
      }} />
  </span>
)

export default SortSelection