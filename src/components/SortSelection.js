import React from 'react'
import { Dropdown } from 'semantic-ui-react';

const SortSelection = ({ options, sort, setSort }) => (
  <div style={{ marginTop: 10 }}>
    Sort by{' '}
    <Dropdown inline upward={false}
      options={options}
      defaultValue={sort}
      onChange={(event, data) => {
        setSort(data.value)
      }} />
  </div>
)

export default SortSelection