import axios from "axios";

const url = 'http://localhost:3001/persons'

const getAll = () => {
   return axios.get(url).then(request => request.data)
}

const create = (newPerson) => {
    console.log(newPerson)
   return axios.post(url, newPerson).then(request => request.data)
}

const deletePerson = id => {
    return axios.delete(`${url}/${id}`).then(request => request.data)
}

const update= (id, object) => {
    return axios.put(`${url}/${id}`, object).then(request => request.data)
}

const service = {getAll, create, deletePerson, update}
export default service