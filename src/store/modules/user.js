import { getToken, setToken, removeToken } from './../../datasources/localstorage.storage'
import User from './../../models/User'
import UserRole from './../../models/UserRole'

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
    },

    GetAllUsers() {
      return new Promise((resolve, reject) => {
        this.$repository.user.listing()
          .then(res => {
            User.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    RegisterUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.user.register(data)
          .then(res => {
            resolve(res.data)
            User.insert({ data: res.data })
            dispatch('GetAllUsers')
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    RegisterIndividual({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.user.register(data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    DeleteUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        this.$repository.user.delete(id)
          .then(res => {
            resolve(res)
            User.delete(id)
            dispatch('GetAllUsers')
          })
          .catch(err => {
            reject(err)
          })
      })

    },

    async GetUserRoles({ commit }, id) {
      let res = await this.$repository.user.getUserRoles(id)
      const data = res.data
      
      for (let role of data) {
        await UserRole.create({
          data: {
            roleId: role.uuid,
            userId: id
          }
        })
      }

      return res.data
    },

    async AssignUserRole({ commit }, data) {
      let res = await this.$repository.user.assignUserRoles(data.userId, data.roleId)
      return res.data
    },

    async UnassignUserRole({ commit }, data) {
      let res = await this.$repository.user.unassignUserRoles(data.userId, data.roleId)
      return res.data
    }
  }
}

export default user
