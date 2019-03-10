import React, { useState } from 'react'
import SearchBar from '../SearchBar';
import CountryList from '../CountryList';

const Home = ({ countries }) => {
  const [search, setSearch] = useState('')

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>CO2-emissions</h1>
      <SearchBar setSearch={setSearch} />
      <CountryList countries={countries} search={search} />
    </div>
  )
}

export default Home