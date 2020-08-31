import { LocalStorage } from 'quasar'
import UserRepo from '../../repositories/UserRepository'

const user = {
  state: {
    token: LocalStorage.getItem('token'),
  },

  mutations: {
    LOGIN: (state, token) => {
      state.token = token
      LocalStorage.set('token', token)
      setAxiosHeaders(state)
    },

    LOGOUT: (state) => {
      state.token = ''
      LocalStorage.clear()
      setAxiosHeaders(state)
    }
  },

  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        UserRepo.login(userInfo)
          .then(res => {
            const token = res.data.token
            commit('LOGIN', token)
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })

      })
    },

    GetInfo () {
      return new Promise((resolve, reject) => {
        UserRepo.getInfo()
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    }
  }
}

export default user
