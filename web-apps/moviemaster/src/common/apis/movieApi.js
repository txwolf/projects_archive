import axios from 'axios'

export const APIKey = process.env.REACT_APP_API_KEY

export default axios.create({
  baseURL: 'http://www.omdbapi.com/',
})
