import React, { useState, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import Home from './components/pages/Home'
import Country from './components/pages/Country'
import NotFound from './components/pages/NotFound'
import NavBar from './components/NavBar'
import emissionService from './services/emissions'

const App = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [countries, setCountries] = useState([])
  const [perCapita, setPerCapita] = useState(false)

  useEffect(() => {
    emissionService.getData()
      .then(obj => {
        const countryData = Object.keys(obj).map(key => {
          return {
            key,
            name: obj[key].name
          }
        })
        setCountries(countryData)
      })
  }, [])

  const togglePerCapita = () => { setPerCapita(!perCapita) }

  const handleRefresh = () => {
    if (refreshing)
      return
    setRefreshing(true)

    emissionService.issueUpdate()
    .then(updatedData => {
      const countryData = Object.keys(updatedData).map(key => {
        return {
          key,
          name: updatedData[key].name
        }
      })
      setCountries(countryData)
    })
    .catch(error => console.log(error))
    .then(() => setRefreshing(false))
  }

  const columnStyle = {
    padding: 40,
    background: '#dbe8ff',
    boxShadow: '-2px -2px 5px rgba(0, 0, 0, 0.2), 2px 2px 2px rgba(0, 0, 0, 0.2)'
  }

  const backgroundStyle = {
    background: '#f4f8ff',
  }

  return (
    <div style={backgroundStyle}>
      <Grid centered columns={1}>
        <Grid.Column style={columnStyle} width={10}>
          <Router>
            <div>
              <NavBar
                refreshing={refreshing}
                handleRefresh={handleRefresh} />
              <Switch>
                <Route exact path='/' render={() =>
                  <Home
                    countries={countries}
                    togglePerCapita={togglePerCapita} />
                } />
                <Route exact path='/country/:key' render={({ match }) =>
                  <Country
                    countryKey={match.params.key}
                    perCapita={perCapita}
                    togglePerCapita={togglePerCapita} />
                }/>
                <Route component={NotFound} />
              </Switch>
            </div>
          </Router>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default App
