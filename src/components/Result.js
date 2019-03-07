import React from 'react'

const Result = ({ country, perCapita }) => {
  const style = {
    marginTop: 10,
    padding: 5,
    border: 'solid',
    borderWidth: 2
  }

  const elem = () => {
    if (!country)
      return null
    
    return (
      <div style={style}>
        <div>Country: {country.name}</div>
        <div>Key: {country.key}</div>
        <div>Per capita: {perCapita.toString()}</div>
      </div>
    )
  }

  return (
    <div>
      {elem()}
    </div>
  )
}

export default Result