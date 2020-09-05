import axios from 'axios'
import { getToken } from './localstorage.storage'

const axiosInstance = axios.create({
  baseURL: process.env.MAIN_BE_URL,
  timeout: 5000
})

axiosInstance.interceptors.request.use(
  config => {
    if(getToken(process.env.MAIN_BE_TOKEN)) {
      config.headers['Authorization'] = 'Bearer ' + getToken(process.env.MAIN_BE_TOKEN)
    }

    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

export default axiosInstance

