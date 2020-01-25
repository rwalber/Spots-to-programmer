import axios from '../../node_modules/axios'

const api = axios.create({
    baseURL: 'http://localhost:4200',
})

export default api;