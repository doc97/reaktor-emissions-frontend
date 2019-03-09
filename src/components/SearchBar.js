import React from 'react'
import { Input } from 'semantic-ui-react'

const SearchBar = ({ setSearch }) => (
  <div>
    <Input fluid
      action={{ icon: 'search' }}
      placeholder='Search...'
      onChange={(event) => setSearch(event.target.value)} />
  </div>
)

export default SearchBar