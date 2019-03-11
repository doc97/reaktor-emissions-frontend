import React from 'react'
import { Table } from 'semantic-ui-react'

const CountryData = ({ data, perCapita }) => {
  const years = Object.keys(data).sort((a, b) => b - a) // descending order
  const elems = years.map(year => {
    const pop = data[year].population
    let co2 = data[year].emissions

    if (pop === null && co2 === null)
      return null

    if (perCapita && co2 !== null)
      co2 = pop == null ? null : (1000 * co2 / pop)

    if (co2 !== null)
      co2 = Number(co2).toFixed(5)

    return (
      <Table.Row key={year}>
        <Table.Cell>{year}</Table.Cell>
        <Table.Cell>{pop === null ? 'N/A' : pop}</Table.Cell>
        <Table.Cell>{co2 === null ? 'N/A' : co2}</Table.Cell>
      </Table.Row>
    )
  })

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Year</Table.HeaderCell>
          <Table.HeaderCell>Population</Table.HeaderCell>
          <Table.HeaderCell>Emissions ({perCapita ? 't/capita' : 'kt'})</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {elems}
      </Table.Body>
    </Table>
  )
}

export default CountryData