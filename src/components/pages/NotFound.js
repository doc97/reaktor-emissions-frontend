import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const style = {
    marginTop: 20,
    textAlign: 'center',
  }
  return (
    <div style={style}>
      <h1>404 Not Found</h1>
      <div>
        <Link to='/'>Return home</Link>
      </div>
    </div>
  )
}

export default NotFound
