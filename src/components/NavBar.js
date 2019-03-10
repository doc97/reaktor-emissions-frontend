import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Loader, Icon } from 'semantic-ui-react'

const NavBar = ({ location, refreshing, handleRefresh}) => {
  const iconStyle = {
    marginRight: 5
  }
  const marginStyle = {
    marginLeft: 10
  }

  return (
    <Menu stackable>
      <Menu.Item active={location.pathname === '/'}>
        <Icon name='home' />
        <Link to='/'>Home</Link>
      </Menu.Item>
      <Menu.Item>
        <div>
          <Icon name='exchange' style={iconStyle} />
          <Link to='/country/compare'>Compare</Link>
        </div>
      </Menu.Item>
      <Menu.Item position='right' onClick={handleRefresh}>
        <div>
          <Icon name='refresh' style={iconStyle} />
          Refresh
          <Loader inline
            active={refreshing}
            size='tiny'
            style={marginStyle} />
        </div>
      </Menu.Item>
    </Menu>
  )
}

export default withRouter(NavBar)