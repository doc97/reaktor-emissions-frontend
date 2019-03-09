import React from 'react'
import { List, Card } from 'semantic-ui-react'

const CountryList = ({ countries, search }) => {
  const filtered = countries.filter(country => {
    const noSearch = search === ''
    const nameMatches = country.name.toLowerCase().includes(search.toLowerCase())
    return noSearch || nameMatches
  })
  const items = filtered.map(country => (
    <List.Item key={country.key}>
      <Card fluid={true} onClick={(event) => console.log(country.key)}>
        <Card.Content>{country.name}</Card.Content>
      </Card>
    </List.Item>
  ))
  return (
    <List>
      {items}
    </List>
  )
}

export default CountryList