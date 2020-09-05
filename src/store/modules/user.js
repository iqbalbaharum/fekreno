import { getToken, setToken, removeToken } from './../../utils/token'

const user = {
  state: {
    token: getToken(process.env.MAIN_BE_TOKEN),
    roles: [],
    session: '',
  },

  mutations: {
    LOGIN: (state, token) => {
      state.token = token
      setToken(process.env.MAIN_BE_TOKEN, token)
    },

    LOGOUT: (state) => {
      state.token = ''
      removeToken(process.env.MAIN_BE_TOKEN)
    },

    SET_ROLES: (state, roles) => {
      state.roles = roles
    },

    SET_SESSION: (state, session) => {
      state.session = session
    }
  },

  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        this.$repository.user.login(userInfo.email, userInfo.password)
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

    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        this.$repository.user.getInfo()
          .then(res => {
            const data = res.data
            commit('SET_ROLES', data.roles)
            commit('SET_SESSION', data.session)
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    Logout ({ commit }) {
      return new Promise((resolve) => {
        this.$repository.user.logout()
        commit('SET_ROLES', [])
        commit('SET_SESSION', '')
        commit('LOGOUT')
        resolve()
      })
    }
  }
}

export default user
