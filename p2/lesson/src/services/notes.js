import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  if(newToken) {
    token = `bearer ${newToken}`
  } else {
    token = null
  }
}

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

const service = { getAll, create, update, setToken }
export default service