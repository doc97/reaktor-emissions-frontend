import axios from 'axios'

const baseUrl = '/api/emissions'

const getData = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const getCountryData = (key) => {
  return axios.get(`${baseUrl}/${key}`).then(response => response.data)
}

const getYearlyCountryData = (key, year) => {
  return axios.get(`${baseUrl}/${key}/${year}`).then(response => response.data)
}

const issueUpdate = () => {
  return axios.post(`${baseUrl}/update`).then(response => response.data)
}

export default {
  getData,
  getCountryData,
  getYearlyCountryData,
  issueUpdate
}