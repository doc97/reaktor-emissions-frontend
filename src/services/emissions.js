import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/emissions'

const getData = () => {
  return axios.get(baseUrl).then(response => response.data)
}

export default { getData }