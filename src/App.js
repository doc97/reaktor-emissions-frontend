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
import Compare from './components/pages/Compare'

const App = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [countries, setCountries] = useState([])
  const [perCapita, setPerCapita] = useState(false)
  const [sort, setSort] = useState('country code')
  const [year, setYear] = useState('' + (new Date().getFullYear() - 1))

  const updateCountryData = (data) => {
    const countryData = Object.keys(data).map(key => {
      return {
        key,
        name: data[key].name,
        yearlyData: data[key].yearlyData
      }
    })
    setCountries(countryData)
  }

  useEffect(() => {
    emissionService.getData().then(data => { updateCountryData(data) })
  }, [])

  const togglePerCapita = () => { setPerCapita(!perCapita) }

  const handleRefresh = () => {
    if (refreshing)
      return
    setRefreshing(true)

    emissionService.issueUpdate()
    .then(updatedData => { updateCountryData(updatedData) })
    .catch(error => console.log(error))
    .then(() => setRefreshing(false))
  }

  const columnStyle = {
    minHeight: '100vh',
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
        <Grid.Column
          style={columnStyle}
          computer={10}
          largeScreen={12}
          tablet={14}
          mobile={16}>
          <Router>
            <div>
              <NavBar
                refreshing={refreshing}
                handleRefresh={handleRefresh} />
              <Switch>
                <Route exact path='/' render={() =>
                  <Home
                    countries={countries}
                    sort={sort}
                    setSort={setSort}
                    year={year}
                    setYear={setYear} />
                } />
                <Route exact path='/country/compare' render={() =>
                  <Compare
                    countries={countries}
                    perCapita={perCapita}
                    togglePerCapita={togglePerCapita}
                    />
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
