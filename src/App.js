import React, { useState, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import Home from './components/pages/Home'
import Country from './components/pages/Country'
import NotFound from './components/pages/NotFound'
import dataService from './services/emissions'

const App = () => {
  const [countries, setCountries] = useState([])
  const [perCapita, setPerCapita] = useState(false)

  useEffect(() => {
    dataService.getData()
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

  return (
    <Grid centered columns={1}>
      <Grid.Column width={10}>
        <Router>
          <div>
            <Switch>
              <Route exact path='/' render={() =>
                <Home
                  countries={countries}
                  togglePerCapita={togglePerCapita} />
              } />
              <Route exact path='/country/:key' render={({ match }) =>
                <Country
                  countryKey={match.params.key}
                  perCapita={perCapita} />
              }/>
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Grid.Column>
    </Grid>
  )
}

export default App
