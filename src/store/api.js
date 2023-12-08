import axios from "axios"

const API = "http://localhost:3030/api";

const api = axios.create({
    baseURL: API,
})

export const getData = () => api.get('/cards')