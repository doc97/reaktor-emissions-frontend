import React from 'react'
import { Link } from 'react-router-dom'
import { List, Card } from 'semantic-ui-react'

const CountryList = ({ countries, search }) => {
  const filtered = countries.filter(country => {
    const noSearch = search === ''
    const nameMatches = country.name.toLowerCase().includes(search.toLowerCase())
    return noSearch || nameMatches
  })
  const items = filtered.map(country => (
    <List.Item key={country.key}>
      <Link to={`/country/${country.key}`}>
        <Card fluid>
          <Card.Content>{country.name}</Card.Content>
        </Card>
      </Link>
    </List.Item>
  ))
  return (
    <List>
      {items}
    </List>
  )
}

export default CountryList