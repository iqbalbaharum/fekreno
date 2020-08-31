import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 5000
})

axiosInstance.interceptors.request.use(
  config => {
    if(store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + store.getters.token
    }

    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

export default ({ Vue  }) => {
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
