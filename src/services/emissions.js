import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/emissions'

const getData = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const getCountryData = (key) => {
  return axios.get(`${baseUrl}/${key}`).then(response => response.data)
}

const getYearlyCountryData = (key, year) => {
  return axios.get(`${baseUrl}/${key}/${year}`).then(response => response.data)
}

export default { getData, getCountryData, getYearlyCountryData }