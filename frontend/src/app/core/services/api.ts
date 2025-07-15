import axios from 'axios'

export const api = axios.create({
  timeout: 60000,
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  },
  baseURL: 'http://localhost:8000'
})