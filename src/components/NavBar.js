import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Loader } from 'semantic-ui-react'

const NavBar = ({ location, refreshing, handleRefresh}) => {
  return (
    <Menu stackable>
      <Menu.Item active={location.pathname === '/'}>
        <Link to='/'>Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/country/compare'>Compare</Link>
      </Menu.Item>
      <Menu.Item position='right' onClick={handleRefresh}>
        <Loader inline
          active={refreshing}
          size='tiny'
          style={{ marginRight: 10 }} />
        <div>Refresh</div>
      </Menu.Item>
    </Menu>
  )
}

export default withRouter(NavBar)