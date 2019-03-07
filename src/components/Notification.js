import React from 'react';

const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1
  }

  if (message === '')
    return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
