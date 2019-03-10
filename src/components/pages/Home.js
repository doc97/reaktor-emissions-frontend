import React, { useState } from 'react'
import SearchBar from '../SearchBar';
import PerCapitaCheckbox from '../PerCapitaCheckbox';
import CountryList from '../CountryList';

const Home = ({ countries, togglePerCapita }) => {
  const [search, setSearch] = useState('')

  return (
    <div>
      <h1>CO2-emissions</h1>
      <SearchBar setSearch={setSearch} />
      <PerCapitaCheckbox togglePerCapita={togglePerCapita} />
      <CountryList countries={countries} search={search} />
    </div>
  )
}

export default Home