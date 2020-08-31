import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.BALJS_URL,
  timeout: 5000
})

axiosInstance.interceptors.request.use(
  config => {
    //if(store.getters.token) {
    //  config.headers['Authorization'] = 'Bearer ' + store.getters.token
    //}

    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

export default axiosInstance

